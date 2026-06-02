/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Volume2, VolumeX, Radio } from 'lucide-react';

interface YouTubeMusicPlayerProps {
  isAccepted: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  theme: string;
}

export const YouTubeMusicPlayer: React.FC<YouTubeMusicPlayerProps> = ({
  isAccepted,
  isMuted,
  onToggleMute,
  theme
}) => {
  const activeSrc = isAccepted ? '/celebration.mp3' : '/proposal.mp3';
  const activeTrackTitle = isAccepted 
    ? "With You For You - Prateek Kuhad"
    : "Don't Go Breaking My Heart - Backstreet Boys";

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync HTML5 Audio state with React props
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check if the current audio source ends with activeSrc (since audio.src is absolute)
    if (!audio.src.endsWith(activeSrc)) {
      audio.src = activeSrc;
      audio.load();
    }

    if (isMuted) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.warn("Audio playback failed or was interrupted:", err);
      });
    }
  }, [activeSrc, isMuted]);

  return (
    <motion.div
      id="youtube-music-player-widget"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 p-2.5 rounded-full border shadow-sm backdrop-blur-md transition-all ${
        theme === 'galaxy'
          ? 'bg-purple-950/55 border-purple-800/40 text-purple-200'
          : theme === 'dark'
            ? 'bg-zinc-900/80 border-zinc-800/50 text-zinc-200'
            : 'bg-white/95 border-pink-100/90 text-pink-600'
      }`}
    >
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      />

      {/* Spinning Disc / Vinyl Concept */}
      <div className="relative">
        <motion.div
          animate={!isMuted ? { rotate: 360 } : {}}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className={`w-9 h-9 rounded-full flex items-center justify-center border ${
            theme === 'galaxy' 
              ? 'bg-purple-900 border-purple-700 text-purple-350' 
              : theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-zinc-355'
                : 'bg-pink-100 border-pink-200 text-pink-500'
          } shadow-sm relative`}
        >
          <Music className="w-4 h-4" />
          {!isMuted && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
          )}
        </motion.div>
      </div>

      {/* Track info & Sound levels */}
      <div className="flex flex-col text-left pr-2">
        <span className={`text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-1 ${
          theme === 'galaxy' ? 'text-pink-300' : theme === 'dark' ? 'text-rose-400' : 'text-pink-500'
        }`}>
          <Radio className="w-3 h-3 text-rose-500 inline" /> 
          {isAccepted ? "Date Soundtrack" : "Proposal Soundtrack"}
        </span>
        <span className={`text-xs font-bold font-sans tracking-tight max-w-[160px] truncate ${
          theme === 'galaxy' || theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
        }`} title={activeTrackTitle}>
          {activeTrackTitle}
        </span>
      </div>

      {/* Master Audio Controller Button with interactive guidance badge */}
      <div className="relative flex items-center">
        <button
          onClick={onToggleMute}
          className={`cursor-pointer w-8 h-8 rounded-full flex items-center justify-center transition-all relative ${
            isMuted
              ? theme === 'galaxy'
                ? 'bg-purple-900/60 hover:bg-purple-800/80 text-purple-300 border border-purple-500/40 animate-pulse'
                : theme === 'dark'
                  ? 'bg-zinc-800/60 hover:bg-zinc-700/80 text-zinc-300 border border-zinc-700/40 animate-pulse'
                  : 'bg-pink-50 hover:bg-pink-100 text-pink-500 border border-pink-200 shadow-md shadow-pink-100/60 animate-[pulse_1.5s_infinite]'
              : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-110 text-white shadow-md'
          }`}
          title={isMuted ? "Click to play cozy background soundtrack" : "Mute background music"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 fill-none" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 fill-none animate-pulse" />
          )}
        </button>

        <AnimatePresence>
          {isMuted && (
            <motion.span
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className={`absolute -bottom-9 right-0 md:left-1/2 md:-translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg font-bold text-[9px] uppercase tracking-widest shadow-md flex items-center gap-1 border animate-bounce cursor-pointer ${
                theme === 'galaxy'
                  ? 'bg-purple-950 border-purple-700/80 text-purple-300'
                  : theme === 'dark'
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                    : 'bg-gradient-to-r from-pink-550 via-rose-500 to-pink-600 border-pink-105 text-white'
              }`}
              onClick={onToggleMute}
            >
              <Radio className="w-2.5 h-2.5 animate-pulse text-white inline" />
              <span>Tap to sound 🎵</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Sound Waves Feedback */}
      {!isMuted && (
        <div className="flex gap-[1.5px] items-end h-3 pr-2 select-none">
          <span className="w-[1.5px] bg-pink-500 hover:bg-rose-500 animate-[pulse_0.7s_infinite] h-full" />
          <span className="w-[1.5px] bg-pink-500 hover:bg-rose-500 animate-[pulse_0.9s_infinite] h-2" />
          <span className="w-[1.5px] bg-pink-500 hover:bg-rose-500 animate-[pulse_0.5s_infinite] h-3" />
        </div>
      )}
    </motion.div>
  );
};
