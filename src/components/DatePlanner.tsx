/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Utensils,
  Film,
  Sun,
  Home,
  Check,
  Send,
  Heart,
  RotateCcw,
  Smile,
  Flame,
  CheckSquare,
  Square
} from 'lucide-react';
import { saveSubmission, SubmissionData } from '../lib/firebase';

interface DatePlannerProps {
  from: string;
  to: string;
  onReset: () => void;
}

export const DatePlanner: React.FC<DatePlannerProps> = ({ from, to, onReset }) => {
  const [whyAccept, setWhyAccept] = useState<string>('');
  const [activity, setActivity] = useState<string>('Movie Time');
  const [selectedDinners, setSelectedDinners] = useState<string[]>(['Pasta and Chicken']);
  const [whisper, setWhisper] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const activities = [
    { name: 'Movie Time', icon: Film, bg: 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100/50 hover:border-indigo-300' },
    { name: 'Beach Day', icon: Sun, bg: 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100/50 hover:border-amber-300' },
    { name: 'Fine Dining', icon: Utensils, bg: 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100/50 hover:border-rose-300' },
    { name: 'Lazy Hometime', icon: Home, bg: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100/50 hover:border-emerald-300' },
    { name: 'Amusement Park', icon: Sparkles, bg: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100/50 hover:border-purple-300' },
  ];

  const dinners = [
    { id: 'pasta', name: 'Pasta and Chicken', emoji: '🍝' },
    { id: 'pizza', name: 'Cheezy Pizza', emoji: '🍕' },
    { id: 'chinese', name: 'Chinese', emoji: '🥢' },
    { id: 'me', name: 'Me 😏', emoji: '🍓' },
  ];

  const handleToggleDinner = (dinnerName: string) => {
    setSelectedDinners((prev) => {
      if (prev.includes(dinnerName)) {
        // Must select at least one
        if (prev.length === 1) return prev;
        return prev.filter((d) => d !== dinnerName);
      } else {
        return [...prev, dinnerName];
      }
    });
  };

  const handleSubmit = async () => {
    if (!whyAccept.trim()) {
      alert("Please tell Mannik why did you accept the proposal! 👉👈");
      return;
    }
    setSubmitting(true);
    const submission: SubmissionData = {
      whyAccept: whyAccept.trim(),
      activity,
      dinners: selectedDinners,
      whisper: whisper.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      await saveSubmission(submission);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      id="date-planner-panel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="w-full max-w-lg bg-white/95 backdrop-blur-md border border-pink-100 rounded-3xl p-6 md:p-8 shadow-xl relative z-10"
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={onReset}
          className="text-gray-400 hover:text-pink-500 rounded-full p-2 hover:bg-pink-50 transition-all cursor-pointer"
          title="Restart proposal"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="planner-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="text-center mb-4">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block bg-pink-50 text-pink-500 rounded-full p-3 mb-2"
              >
                <Heart className="w-6 h-6 fill-pink-500" />
              </motion.div>
              <h2 className="font-sans font-extrabold text-2xl text-gray-800 tracking-tight">
                Plan Our Perfect Date!
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Customize details for your dream date with <span className="font-semibold text-pink-500">{from}</span>
              </p>
            </div>

            {/* Step 1: Why did you accept the proposal? 👉👈 */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-pink-500" />
                1. Why did you accept the proposal? 👉👈
              </label>
              <textarea
                placeholder="Write your beautiful reason..."
                value={whyAccept}
                onChange={(e) => setWhyAccept(e.target.value)}
                rows={3}
                className="w-full bg-pink-50/20 hover:bg-pink-50/40 border border-pink-100 rounded-2xl px-4 py-3 outline-none text-gray-700 font-sans text-sm focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all font-medium resize-none shadow-sm"
              />
            </div>

            {/* Step 2: Select Activity */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-500" />
                2. Choose our activity
              </label>
              <div className="flex flex-wrap gap-2">
                {activities.map((act) => {
                  const IconComp = act.icon;
                  const isSelected = activity === act.name;
                  return (
                    <button
                      key={act.name}
                      type="button"
                      onClick={() => setActivity(act.name)}
                      className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs border font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-md shadow-pink-100 scale-[1.03]'
                          : `bg-white text-gray-600 border-gray-100 ${act.bg}`
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      {act.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Choose Dinners (Multiple checks allowed) */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-pink-500" />
                3. Pick dinners (Select multiple!) 🍕
              </label>
              <div className="grid grid-cols-2 gap-2">
                {dinners.map((dn) => {
                  const isSelected = selectedDinners.includes(dn.name);
                  return (
                    <button
                      key={dn.id}
                      type="button"
                      onClick={() => handleToggleDinner(dn.name)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs border font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-pink-50 text-pink-700 border-pink-300 shadow-sm'
                          : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{dn.emoji}</span>
                        <span className="font-bold">{dn.name}</span>
                      </div>
                      <div>
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-pink-500 fill-pink-100" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Write a sweetest and wildest whisper */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-pink-500" />
                4. Add one sweetest and one wildest whisper
              </label>
              <textarea
                placeholder="Give me something juicy to read..."
                value={whisper}
                onChange={(e) => setWhisper(e.target.value)}
                maxLength={240}
                rows={3}
                className="w-full bg-pink-50/20 hover:bg-pink-50/40 border border-pink-100 rounded-2xl px-4 py-3 outline-none text-gray-700 font-sans text-sm focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all font-medium resize-none shadow-sm"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !whyAccept}
                className={`w-full py-3.5 rounded-2xl font-sans font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  submitting
                    ? 'bg-gray-400 text-white'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-pink-100'
                }`}
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting Details...' : `Lock & Submit Plan to ${from}! 🔒💞`}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="planner-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-5"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              className="inline-block text-6xl"
            >
              🎉💌
            </motion.div>
            <div className="space-y-2">
              <h3 className="font-sans font-black text-2xl text-gray-900 leading-tight">
                Plan Submitted Successfully!
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                Your dreamy date responses have been dispatched safely. Mannik is going to be overjoyed reading these! 🥰
              </p>
            </div>

            <div className="bg-gradient-to-tr from-pink-50/80 to-rose-50/60 border border-pink-100 rounded-2xl p-5 text-left max-w-md mx-auto shadow-inner space-y-2">
              <div className="text-[10px] uppercase font-bold text-pink-500 tracking-wider">
                Submitted Summary
              </div>
              <div className="space-y-1.5 text-xs text-gray-700 font-mono">
                <div>
                  <span className="font-bold text-gray-900">Why accepted: </span>
                  <p className="italic text-gray-600 pl-3 mt-0.5 font-sans">"{whyAccept}"</p>
                </div>
                <div>
                  <span className="font-bold text-gray-900">Activity: </span>
                  <span className="bg-pink-100/60 px-2 py-0.5 rounded text-pink-700 text-[10px] font-sans font-bold">{activity}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900">Dinners: </span>
                  <span className="text-gray-800 font-sans text-[11px]">{selectedDinners.join(', ')}</span>
                </div>
                {whisper.trim() && (
                  <div>
                    <span className="font-bold text-gray-900">Whispers: </span>
                    <p className="bg-pink-100/30 text-rose-600 px-3 py-1.5 rounded-lg italic mt-1 font-sans">"{whisper}"</p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-400">
              You're all set! Tell Mannik to open his "Inbox" at the bottom of the page to read it!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
