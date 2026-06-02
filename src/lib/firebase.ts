/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';

// Combine static JSON config with environment variables (Vite environment variables override JSON)
const firebaseConfig = {
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) || firebaseConfigJson.projectId,
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) || firebaseConfigJson.appId,
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string) || firebaseConfigJson.apiKey,
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || firebaseConfigJson.authDomain,
  firestoreDatabaseId: (import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID as string) || firebaseConfigJson.firestoreDatabaseId,
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) || firebaseConfigJson.storageBucket,
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || firebaseConfigJson.messagingSenderId,
  measurementId: (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string) || firebaseConfigJson.measurementId || "",
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Check if we have a valid configuration (not placeholder)
const isValidConfig = firebaseConfig && firebaseConfig.projectId && firebaseConfig.projectId !== "placeholder";

let db: any = null;

if (isValidConfig) {
  try {
    const app = initializeApp(firebaseConfig);
    // CRITICAL: The app will break without specifying the custom firestoreDatabaseId if provided
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    console.log("Firebase initialized successfully with Database ID:", firebaseConfig.firestoreDatabaseId);
  } catch (e) {
    console.error("Firebase initialization failed:", e);
  }
} else {
  console.warn("Firebase config is placeholder. Falling back to local storage only.");
}

export { db };

export interface SubmissionData {
  id?: string;
  whyAccept: string;
  activity: string;
  dinners: string[];
  whisper: string;
  submittedAt: string;
}

// Connection check verification
if (db) {
  const testConnection = async () => {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
      console.log("Firestore connection test completed successfully.");
    } catch (error) {
      if (error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration. The client is offline.");
      }
    }
  };
  testConnection();
}

// Save a submission (Dual Strategy: Saves to LocalStorage FIRST, and then to Firestore if active)
export async function saveSubmission(data: SubmissionData): Promise<void> {
  // 1. Always save to local storage (instant response)
  const localKey = 'proposal_submissions';
  const localData = localStorage.getItem(localKey);
  const list = localData ? JSON.parse(localData) : [];
  list.unshift(data);
  localStorage.setItem(localKey, JSON.stringify(list));

  // 2. Save to Firestore if available
  if (db) {
    const path = 'submissions';
    try {
      const subRef = collection(db, path);
      await addDoc(subRef, data);
      console.log("Successfully saved submission to Cloud Firestore!");
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  } else {
    console.log("Firestore is not active. Submission saved to LocalStorage only.");
  }
}

// Fetch submissions (Dual Strategy: retrieves and blends from LocalStorage and Cloud Firestore)
export async function fetchSubmissions(): Promise<SubmissionData[]> {
  const localKey = 'proposal_submissions';
  const localData = localStorage.getItem(localKey);
  let submissionList: SubmissionData[] = localData ? JSON.parse(localData) : [];

  if (db) {
    const path = 'submissions';
    try {
      const subRef = collection(db, path);
      const querySnapshot = await getDocs(subRef);
      const remoteList: SubmissionData[] = [];
      querySnapshot.forEach((doc) => {
        remoteList.push({ id: doc.id, ...doc.data() } as SubmissionData);
      });
      
      // Sort by submittedAt descending
      remoteList.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      
      // Merge unique ones back to the list
      const seen = new Set(submissionList.map(item => item.submittedAt));
      remoteList.forEach(item => {
        if (!seen.has(item.submittedAt)) {
          submissionList.push(item);
        }
      });
      submissionList.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    } catch (err) {
      // Catch and throw JSON error details as instructed by Section 3 of the skill
      handleFirestoreError(err, OperationType.LIST, path);
    }
  }

  return submissionList;
}
