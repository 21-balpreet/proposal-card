/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Flame, Sparkles } from 'lucide-react';
import { CuteIllustration } from './CuteIllustrations';
import { IllustrationState } from '../types';

interface ValentineCardProps {
  from: string;
  to: string;
  onAccept: () => void;
  onBackToGenerator?: () => void;
}

export const ValentineCard: React.FC<ValentineCardProps> = ({
  from,
  to,
  onAccept,
  onBackToGenerator,
}) => {
  const [sadStep, setSadStep] = useState<number>(0);
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState<number>(1);

  // Guilt-trip messages for the 'No' button cycle
  const guiltTripMessages = [
    "No 🥺?",
    "Are you sure? 🥺",
    "Really sure? 🥺💔",
    "Are you absolutely positive? 😭",
    "Please think about it again! 🧸",
    "But look at this cute face... 😿",
    "If you say no, I will be super sad... 💔",
    "Ok fine, I'll stop asking... 😔",
    "Just kidding, please say yes! ❤️"
  ];

  // Map progress steps to physical illustrations
  const getIllustrationState = (step: number): IllustrationState => {
    if (step === 0) return 'waiting';
    if (step === 1 || step === 2) return 'confused';
    if (step === 3 || step === 4) return 'sad';
    if (step === 5 || step === 6) return 'heartbroken';
    return 'crying';
  };

  // Yes button scaling
  const getYesScale = () => {
    // Increment scale with each step
    return 1 + sadStep * 0.45;
  };

  // Elusive "No" button behavior - it darts away when hovered/pressed
  const handleNoEvade = () => {
    // Only start dodging from step 3 onwards for extra surprise comedy!
    if (sadStep < 2) return;

    // Generate random coordinates within a parent sandbox
    const randomX = (Math.random() - 0.5) * 320; // -160px to 160px
    const randomY = (Math.random() - 0.5) * 220; // -110px to 110px

    setNoOffset({ x: randomX, y: randomY });
    // Shrink the button slightly to represent it getting harder to hit
    setNoScale(Math.max(0.4, 1 - (sadStep - 2) * 0.12));
  };

  const handleNoClick = () => {
    // Cycle step
    setSadStep((prev) => (prev + 1) % guiltTripMessages.length);
    // Trigger coordinate dodge
    handleNoEvade();
  };

  return (
    <motion.div
      id="valentine-prop-card"
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className="w-full max-w-md bg-white/90 backdrop-blur-md border border-pink-100 rounded-3xl p-6 md:p-8 shadow-xl relative text-center z-10"
    >
      {/* Upper Sparkle Deco */}
      <div className="absolute top-4 right-4 text-pink-500 font-sans text-xs flex items-center gap-1 bg-pink-50/80 px-2.5 py-1 rounded-full border border-pink-100">
        <Sparkles className="w-3.5 h-3.5 fill-pink-100" />
        <span className="font-bold select-none">For Angela ✨</span>
      </div>

      {/* Main Vector Character */}
      <div className="mt-4 mb-3">
        <CuteIllustration state={getIllustrationState(sadStep)} />
      </div>

      {/* Proposal Heading */}
      <h3 className="font-sans font-bold text-gray-800 text-xl tracking-tight leading-snug">
        Hi Angela! <span className="text-pink-500 font-extrabold">{from}</span> has a question for you... 💝
      </h3>

      <h2 className="font-sans font-extrabold text-2xl md:text-4xl text-gray-900 tracking-tight mt-3 mb-6 transition-all leading-normal bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">
        Will you be my girlfriend?
      </h2>

      {/* Guilt trip subheader */}
      <AnimatePresence mode="wait">
        {sadStep > 0 && (
          <motion.p
            key={sadStep}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="text-pink-600 font-sans font-medium text-sm mt-[-10px] mb-5 italic"
          >
            "{guiltTripMessages[sadStep]}"
          </motion.p>
        )}
      </AnimatePresence>

      {/* Interactive Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[140px] relative">
        {/* YES BUTTON (grows with step) */}
        <motion.button
          id="btn-yes"
          onClick={onAccept}
          animate={{ scale: getYesScale() }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          style={{ transformOrigin: 'center' }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-sans font-bold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-pink-200 cursor-pointer active:scale-95 transition-shadow flex items-center gap-2 relative z-50 overflow-visible"
        >
          <Heart className="w-4 h-4 fill-white animate-pulse" />
          YES!
        </motion.button>

        {/* NO BUTTON (Darts away or cycles dialogue) */}
        <motion.button
          id="btn-no"
          onClick={handleNoClick}
          onMouseEnter={handleNoEvade}
          onTouchStart={handleNoEvade}
          animate={{
            x: noOffset.x,
            y: noOffset.y,
            scale: noScale,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-sans font-semibold text-sm px-6 py-3.5 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center gap-1.5"
        >
          {sadStep === 0 ? guiltTripMessages[0] : guiltTripMessages[sadStep]}
        </motion.button>
      </div>

      {/* Hint for dodger mode */}
      {sadStep >= 2 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="text-[10px] text-gray-400 font-mono mt-4"
        >
          *Warning: The 'No' button is highly ticklish! 😜*
        </motion.p>
      )}
    </motion.div>
  );
};
