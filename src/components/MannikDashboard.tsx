/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Inbox, 
  Lock, 
  Unlock, 
  RefreshCw, 
  User, 
  Flame, 
  Utensils, 
  Sparkles, 
  Check, 
  MapPin, 
  BookHeart,
  ChevronRight
} from 'lucide-react';
import { fetchSubmissions, SubmissionData } from '../lib/firebase';

interface MannikDashboardProps {
  theme: string;
}

export const MannikDashboard: React.FC<MannikDashboardProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchSubmissions();
      setSubmissions(data);
    } catch (e) {
      console.error("Error fetching submissions:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      loadData();
    }
  }, [isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === 'mannik') {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect passphrase! Hint: Enter your name "mannik" 🤫');
    }
  };

  return (
    <div id="mannik-dashboard-wrapper" className="w-full max-w-lg mx-auto px-4 mt-4 mb-2 z-20">
      {/* Outer Dashboard Drawer Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 ${
            theme === 'galaxy'
              ? 'bg-purple-950/70 border-purple-800/40 text-purple-300 hover:bg-purple-900/50'
              : theme === 'dark'
                ? 'bg-zinc-900/80 border-zinc-800/50 text-zinc-300 hover:bg-zinc-850/60'
                : 'bg-white/95 border-pink-100 text-pink-550 hover:bg-pink-50/50'
          }`}
        >
          <Inbox className="w-3.5 h-3.5 animate-bounce" />
          <span>{isOpen ? "Hide Mannik’s Inbox 📬" : "Open Mannik’s Dashboard Inbox 📬"}</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 15 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`mt-4 rounded-3xl border p-5 shadow-xl backdrop-blur-md overflow-hidden ${
              theme === 'galaxy'
                ? 'bg-purple-950/90 border-purple-800/60 text-purple-200'
                : theme === 'dark'
                  ? 'bg-zinc-900/90 border-zinc-800/65 text-zinc-200'
                  : 'bg-white/98 border-pink-100'
            }`}
          >
            {!isUnlocked ? (
              /* Passphrase Unlock Panel */
              <motion.form
                onSubmit={handleUnlock}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center py-6 text-center space-y-4"
              >
                <div className="bg-pink-50 text-pink-500 rounded-full p-3 shadow-md">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-gray-800 text-base">
                    Inbox Is Locked for Security
                  </h4>
                  <p className="text-gray-400 text-xs max-w-xs leading-normal">
                    To prevent Angela from seeing this dashboard, please key in your name <span className="font-bold text-pink-550">mannik</span> to unlock her submissions!
                  </p>
                </div>

                <div className="w-full max-w-sm flex flex-col gap-2">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter passphrase..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-pink-50/20 hover:bg-pink-50/40 border border-pink-100 rounded-2xl px-4 py-3 outline-none text-gray-800 font-bold font-sans text-sm tracking-widest text-center focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all shadow-inner"
                    />
                  </div>
                  {errorMsg && (
                    <span className="text-[11px] font-bold text-rose-500 animate-bounce">
                      {errorMsg}
                    </span>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-110 text-white font-sans font-bold text-xs py-3 rounded-2xl transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    Unlock Submissions 🔓
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Submissions Dashboard Panel */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b pb-3 border-gray-100/50">
                  <div className="flex items-center gap-2 text-pink-600 font-extrabold text-sm">
                    <Unlock className="w-4 h-4 text-emerald-500" />
                    <span>Angela's Planners ({submissions.length})</span>
                  </div>
                  <button
                    onClick={loadData}
                    disabled={loading}
                    className="p-1.5 rounded-full hover:bg-pink-50 border border-transparent hover:border-pink-100 transition-all text-gray-400 hover:text-pink-500 cursor-pointer disabled:opacity-50"
                    title="Refresh data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {loading && submissions.length === 0 ? (
                  <div className="flex flex-col items-center py-10 space-y-2">
                    <div className="w-5 h-5 rounded-full border-2 border-pink-500 border-t-transparent animate-spin" />
                    <span className="text-xs text-gray-400">Loading dynamic updates...</span>
                  </div>
                ) : submissions.length === 0 ? (
                  <div className="flex flex-col items-center py-12 text-center text-gray-400 space-y-2">
                    <Inbox className="w-8 h-8 text-gray-300" />
                    <span className="text-xs font-semibold">No submissions received yet!</span>
                    <span className="text-[10px] text-gray-400">Once Angela fills the planner, they'll land here instantly! 💌</span>
                  </div>
                ) : (
                  /* List of Submissions */
                  <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1 divide-y divide-gray-100/40">
                    {submissions.map((sub, idx) => (
                      <div 
                        key={sub.id || idx} 
                        className={`pt-3 first:pt-0 space-y-2 text-xs text-left`}
                      >
                        {/* Subheader Metadata */}
                        <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                          <span className="font-bold flex items-center gap-1 text-pink-500">
                            <BookHeart className="w-3.5 h-3.5 text-pink-500" /> Submission #{submissions.length - idx}
                          </span>
                          <span>{new Date(sub.submittedAt).toLocaleString()}</span>
                        </div>

                        {/* Why Accepted Row */}
                        <div className="p-3 bg-pink-50/40 border border-pink-100/40 rounded-xl space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-pink-600 block">
                            💖 Why accepted the proposal:
                          </span>
                          <span className="text-gray-700 italic font-medium leading-relaxed font-sans mt-0.5 block">
                            "{sub.whyAccept}"
                          </span>
                        </div>

                        {/* Choices Badges Row */}
                        <div className="flex flex-wrap gap-2 text-[11px]">
                          {/* Activity */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100/40 text-indigo-700 font-bold">
                            <Sparkles className="w-3 h-3 text-indigo-500" />
                            <span>{sub.activity}</span>
                          </div>

                          {/* Multiple Dinners */}
                          {sub.dinners && (
                            <div className="flex flex-wrap gap-1 items-center">
                              {sub.dinners.map((dn, dIdx) => (
                                <span 
                                  key={dn} 
                                  className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100/40 text-rose-700 font-bold flex items-center gap-1"
                                >
                                  <Utensils className="w-3 h-3 text-rose-500" />
                                  <span>{dn}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Whisper Row */}
                        {sub.whisper && (
                          <div className="p-3 bg-rose-50/20 border border-rose-105/30 rounded-xl space-y-1">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-rose-500 flex items-center gap-1">
                              <Flame className="w-3 h-3 text-rose-500 animate-pulse" /> Sweetest & Wildest Whisper:
                            </span>
                            <span className="text-gray-700 font-sans italic font-medium mt-0.5 block">
                              "{sub.whisper}"
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
