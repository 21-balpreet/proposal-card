/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sun, Moon } from 'lucide-react';
import { ThemeType } from './types';
import { FloatingHearts } from './components/FloatingHearts';
import { ValentineCard } from './components/ValentineCard';
import { DatePlanner } from './components/DatePlanner';
import { YouTubeMusicPlayer } from './components/YouTubeMusicPlayer';
import { MannikDashboard } from './components/MannikDashboard';

export default function App() {
  const [from, setFrom] = useState<string>('Mannik');
  const [to, setTo] = useState<string>('Angela');
  const [theme, setTheme] = useState<ThemeType>('pink');
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  // Background Audio state for YouTube player
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Parse URL query coordinates on load as fallback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromParam = params.get('from');
    const toParam = params.get('to');
    const themeParam = params.get('theme') as ThemeType;

    if (fromParam) setFrom(fromParam);
    if (toParam) setTo(toParam);
    if (themeParam) setTheme(themeParam);
  }, []);

  // Web Audio chime arpeggio (fairy dust sparkles!)
  const playFairyDustChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Romantic sparkling arpeggio notes (F5, A5, C6, E6, G6, C7)
      const notes = [698.46, 880.00, 1046.50, 1318.51, 1567.98, 2093.00];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        // Sound envelope (fast rise, gentle bell decay)
        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.6);
      });
    } catch (e) {
      console.warn('Audio Context not started or blocked:', e);
    }
  };

  const handleAcceptProposal = () => {
    setIsAccepted(true);
    playFairyDustChime();
    
    // Automatically unmute upon accepting to surprise her with romantic track
    if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleReset = () => {
    setIsAccepted(false);
  };

  const isDark = theme === 'galaxy' || theme === 'dark';

  const toggleDarkLightMode = () => {
    if (isDark) {
      setTheme('pink');
    } else {
      setTheme('dark');
    }
  };

  // Map theme variables to CSS classes
  const themeStyles: Record<
    ThemeType,
    {
      bg: string;
      accent: string;
      btnTheme: string;
      cardBorder: string;
      floatingSparkles: string;
    }
  > = {
    pink: {
      bg: 'bg-gradient-to-tr from-[#FFF0F2] via-[#FFE5EC] to-[#FFF3F5]',
      accent: 'text-pink-500 fill-pink-500',
      btnTheme: 'bg-gradient-to-r from-pink-500 to-rose-450 hover:from-pink-600',
      cardBorder: 'border-pink-100',
      floatingSparkles: 'text-pink-300',
    },
    lavender: {
      bg: 'bg-gradient-to-tr from-[#F1E9FD] via-[#E8D9FC] to-[#F5EEFF]',
      accent: 'text-purple-500 fill-purple-500',
      btnTheme: 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600',
      cardBorder: 'border-purple-100',
      floatingSparkles: 'text-purple-300',
    },
    peach: {
      bg: 'bg-gradient-to-tr from-[#FFF1EB] via-[#FFD8CC] to-[#FFF6F2]',
      accent: 'text-orange-500 fill-orange-500',
      btnTheme: 'bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500',
      cardBorder: 'border-orange-100',
      floatingSparkles: 'text-orange-300',
    },
    mint: {
      bg: 'bg-gradient-to-tr from-[#EAFCEF] via-[#D2F5DF] to-[#F2FFF6]',
      accent: 'text-emerald-500 fill-emerald-505',
      btnTheme: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600',
      cardBorder: 'border-emerald-100',
      floatingSparkles: 'text-emerald-300',
    },
    galaxy: {
      bg: 'bg-radial-gradient from-[#1E1145] via-[#0D0722] to-[#04010F]',
      accent: 'text-pink-400 fill-pink-400',
      btnTheme: 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:brightness-110',
      cardBorder: 'border-purple-950/40',
      floatingSparkles: 'text-pink-400',
    },
    dark: {
      bg: 'bg-gradient-to-tr from-[#09090b] via-[#18181b] to-[#09090b]',
      accent: 'text-rose-500 fill-rose-500',
      btnTheme: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700',
      cardBorder: 'border-zinc-800',
      floatingSparkles: 'text-zinc-600',
    },
  };

  const currentThemeStyle = themeStyles[theme];

  return (
    <div
      id="app-root-container"
      className={`min-h-screen relative overflow-hidden flex flex-col justify-between p-4 selection:bg-pink-100 selection:text-pink-600 transition-all duration-1000 ${
        theme === 'galaxy' || theme === 'dark' ? 'text-white' : 'text-gray-800'
      } ${currentThemeStyle.bg}`}
    >
      {/* Background Hearts System */}
      <FloatingHearts burst={isAccepted} themeColor={theme} />

      {/* Top Header Row (Holding the music controller and the Light/Dark mode toggle switch) */}
      <header className="w-full flex items-center justify-between px-4 py-2 max-w-5xl mx-auto z-20 gap-4">
        {/* Spacer for desktop centering balance */}
        <div className="w-10 h-10 hidden sm:block" />

        {/* Dynamic Multi-Part Music Widget */}
        <YouTubeMusicPlayer
          isAccepted={isAccepted}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
          theme={theme}
        />

        {/* Light/Dark Mode Switch */}
        <button
          onClick={toggleDarkLightMode}
          className={`w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 ${
            isDark
              ? 'bg-zinc-900/80 border-zinc-800/60 text-yellow-400 hover:bg-zinc-800'
              : 'bg-white/95 border-pink-100/90 text-zinc-600 hover:bg-pink-50/50'
          }`}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <Sun className="w-4 h-4 fill-yellow-400/20" />
          ) : (
            <Moon className="w-4 h-4 fill-zinc-200" />
          )}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex items-center justify-center py-6 px-2">
        <AnimatePresence mode="wait">
          {!isAccepted ? (
            /* Proposal Cards asks */
            <motion.div
              key="asking-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <ValentineCard
                from={from}
                to={to}
                onAccept={handleAcceptProposal}
              />
            </motion.div>
          ) : (
            /* YES Accepted Celebration & Date Planner Panel */
            <motion.div
              key="celebrating-planner"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center gap-6"
            >
              {/* Upper Banner Celebration */}
              <div className="text-center max-w-md z-10 px-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6 }}
                  className="inline-block"
                >
                  <Heart className="w-16 h-16 text-rose-500 fill-rose-500 drop-shadow-md mx-auto" />
                </motion.div>
                <h1 className={`font-sans font-extrabold text-3xl md:text-4xl tracking-tight mt-4 ${
                  theme === 'galaxy' || theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  She Said YES! 🎉💖
                </h1>
                <p className={`text-sm mt-2 font-medium leading-relaxed ${
                  theme === 'galaxy' || theme === 'dark' ? 'text-gray-350' : 'text-gray-600'
                }`}>
                  You have made <span className="text-pink-500 font-bold">{from}</span> the happiest partner in the universe!
                  Lets schedule our perfect dream date together. 🥰
                </p>
              </div>

              {/* Date Planner UI Component */}
              <DatePlanner from={from} to={to} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Layout Controls Panel */}
      <div className="w-full flex flex-col gap-4 z-20 pb-4">
        {/* Floating Dynamic Bottom Theme Bar */}
        <div className="w-full max-w-lg mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border backdrop-blur-md shadow-lg ${
              theme === 'galaxy'
                ? 'bg-purple-950/70 border-purple-800/40 text-purple-200'
                : theme === 'dark'
                  ? 'bg-zinc-900/80 border-zinc-800/40 text-zinc-200'
                  : 'bg-white/95 border-pink-100/80'
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              theme === 'galaxy' ? 'text-purple-300' : theme === 'dark' ? 'text-rose-450' : 'text-pink-500'
            }`}>
              💖 Choose page mood theme 💖
            </span>
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {([
                { id: 'pink', name: 'Sweet Pink', label: '🌸' },
                { id: 'lavender', name: 'Lavender Cloud', label: '🔮' },
                { id: 'peach', name: 'Cozy Peach', label: '🍑' },
                { id: 'mint', name: 'Mint Choco', label: '🌿' },
                { id: 'galaxy', name: 'Cosmic Dream', label: '✨' },
                { id: 'dark', name: 'Midnight Dark', label: '🌙' },
              ] as const).map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    title={t.name}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-md scale-105'
                        : theme === 'galaxy'
                          ? 'bg-purple-900/30 border-purple-800/40 text-purple-200 hover:bg-purple-800/30'
                          : theme === 'dark'
                            ? 'bg-zinc-800/30 border-zinc-700/40 text-zinc-200 hover:bg-zinc-700/30'
                            : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-pink-50/40 hover:border-pink-200'
                    }`}
                  >
                    <span>{t.label}</span>
                    <span className="hidden xs:inline">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Secure Mannik Dashboard log for immediate viewing of her plan submissions */}
        <MannikDashboard theme={theme} />
      </div>

      {/* Cozy Footer Banner */}
      {isAccepted && (
        <footer className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-dashed border-gray-200/50 pt-4 pb-2 text-xs text-gray-400 text-center z-10">
          <p className="font-medium mx-auto">
            Made with 💖 for Mannik & Angela • Crafted with cozy interactive planner logs.
          </p>
        </footer>
      )}
    </div>
  );
}
