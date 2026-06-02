/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IllustrationState } from '../types';

interface CuteIllustrationProps {
  state: IllustrationState;
}

export const CuteIllustration: React.FC<CuteIllustrationProps> = ({ state }) => {
  return (
    <div id="illustration-container" className="relative w-48 h-48 mx-auto flex items-center justify-center">
      <AnimatePresence mode="wait">
        {state === 'waiting' && <WaitingIllustration key="waiting" />}
        {state === 'confused' && <ConfusedIllustration key="confused" />}
        {state === 'sad' && <SadIllustration key="sad" />}
        {state === 'heartbroken' && <HeartbrokenIllustration key="heartbroken" />}
        {state === 'crying' && <CryingIllustration key="crying" />}
        {state === 'celebrating' && <CelebratingIllustration key="celebrating" />}
      </AnimatePresence>
    </div>
  );
};

// 1. WAITING: Sweet, blinking eyes, tail wagging, holding a tiny letter
const WaitingIllustration: React.FC = () => (
  <motion.div
    id="ill-waiting"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="w-full h-full"
  >
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="100" cy="180" rx="45" ry="8" fill="rgba(0,0,0,0.06)" />

      {/* Tail (wagging) */}
      <motion.path
        d="M 140 140 Q 170 110 160 80 Q 150 70 145 80 Q 150 100 135 125"
        stroke="#E6E6E6"
        strokeWidth="12"
        strokeLinecap="round"
        animate={{ rotate: [0, -15, 10, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        style={{ transformOrigin: "135px 125px" }}
      />

      {/* Body */}
      <rect x="65" y="100" width="70" height="70" rx="35" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

      {/* Ears */}
      <polygon points="50,60 80,45 85,80" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" strokeLinejoin="round" />
      <polygon points="45,55 75,40 80,75" fill="#FFD1D0" /> {/* Inner Left Ear */}

      <polygon points="150,60 120,45 115,80" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" strokeLinejoin="round" />
      <polygon points="155,55 125,40 120,75" fill="#FFD1D0" /> {/* Inner Right Ear */}

      {/* Head */}
      <motion.ellipse
        cx="100"
        cy="90"
        rx="55"
        ry="48"
        fill="#FFFFFF"
        stroke="#F5D3D1"
        strokeWidth="4"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {/* We nest eyes & mouth within head motion by using a div instead or just grouping them. 
            For SVG cleanliness, we keep absolute values, but let's animate the main container */}
      </motion.ellipse>

      {/* Moving Head Elements */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {/* Eyes (Blinking) */}
        <motion.circle
          cx="80"
          cy="85"
          r="6"
          fill="#4A3B32"
          animate={{ scaleY: [1, 0.1, 1, 1, 0.1, 1, 1] }}
          transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1, 0.5, 0.55, 0.6, 1] }}
          style={{ transformOrigin: "80px 85px" }}
        />
        <motion.circle
          cx="120"
          cy="85"
          r="6"
          fill="#4A3B32"
          animate={{ scaleY: [1, 0.1, 1, 1, 0.1, 1, 1] }}
          transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1, 0.5, 0.55, 0.6, 1] }}
          style={{ transformOrigin: "120px 85px" }}
        />

        {/* Blushing cheeks */}
        <circle cx="68" cy="98" r="6" fill="#FFAAA6" opacity="0.6" />
        <circle cx="132" cy="98" r="6" fill="#FFAAA6" opacity="0.6" />

        {/* Cute nose and mouth */}
        <path d="M 97 91 L 103 91 L 100 94 Z" fill="#4A3B32" />
        <path d="M 94 98 Q 100 102 100 98 Q 100 102 106 98" stroke="#4A3B32" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Whiskers */}
        <line x1="35" y1="90" x2="50" y2="92" stroke="#F5D3D1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="33" y1="98" x2="48" y2="98" stroke="#F5D3D1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="165" y1="90" x2="150" y2="92" stroke="#F5D3D1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="167" y1="98" x2="152" y2="98" stroke="#F5D3D1" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {/* Love Letter in Hands (gently pulsing) */}
      <motion.g
        animate={{ scale: [1, 1.08, 1], y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 145px" }}
      >
        {/* Envelope */}
        <rect x="80" y="130" width="40" height="26" rx="4" fill="#FFEDEB" stroke="#FF8585" strokeWidth="2.5" />
        {/* Envelope Flap flap */}
        <path d="M 80 130 L 100 143 L 120 130" stroke="#FF8585" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        {/* Little Heart Sticker */}
        <path d="M 100 144 C 98 141, 95 141, 100 147 C 105 141, 102 141, 100 144" fill="#FF5E62" />
      </motion.g>

      {/* Little paws holding letter */}
      <circle cx="76" cy="143" r="6" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="2" />
      <circle cx="124" cy="143" r="6" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="2" />
    </svg>
  </motion.div>
);

// 2. CONFUSED: Head tilted, question mark popping up, blinking with eyes looking up
const ConfusedIllustration: React.FC = () => (
  <motion.div
    id="ill-confused"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="w-full h-full"
  >
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <ellipse cx="100" cy="180" rx="45" ry="8" fill="rgba(0,0,0,0.06)" />

      {/* Tail (moving slower) */}
      <motion.path
        d="M 140 140 Q 165 115 160 85"
        stroke="#E6E6E6"
        strokeWidth="12"
        strokeLinecap="round"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        style={{ transformOrigin: "140px 140px" }}
      />

      {/* Body with tilted coordinate */}
      <rect x="65" y="105" width="70" height="65" rx="32" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

      {/* Head tilted slightly */}
      <motion.g
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 120px" }}
      >
        {/* Ears */}
        <polygon points="50,65 80,50 85,85" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="45,60 75,45 80,80" fill="#FFD1D0" />
        <polygon points="150,65 120,50 115,85" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="155,60 125,45 120,80" fill="#FFD1D0" />

        {/* Head Circle */}
        <ellipse cx="100" cy="95" rx="55" ry="46" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

        {/* Eyes looking up sideways */}
        <circle cx="83" cy="88" r="5.5" fill="#4A3B32" />
        <circle cx="117" cy="88" r="5.5" fill="#4A3B32" />
        {/* Pupils looking up */}
        <circle cx="84" cy="86" r="2" fill="#FFFFFF" />
        <circle cx="118" cy="86" r="2" fill="#FFFFFF" />

        {/* Blush */}
        <circle cx="70" cy="102" r="5" fill="#FFAAA6" opacity="0.5" />
        <circle cx="130" cy="102" r="5" fill="#FFAAA6" opacity="0.5" />

        {/* Confused mouth: small circle o_o */}
        <circle cx="100" cy="102" r="4.5" fill="#4A3B32" />
        <path d="M 97 96 L 103 96 L 100 99 Z" fill="#4A3B32" />
      </motion.g>

      {/* Floating Animated Question Mark */}
      <motion.text
        x="135"
        y="50"
        fill="#FF6584"
        fontSize="34"
        fontWeight="bold"
        fontFamily="sans-serif"
        animate={{ y: [0, -12, 0], scale: [1, 1.15, 1], rotate: [0, 10, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        ?
      </motion.text>

      {/* Little paws tucked in */}
      <circle cx="85" cy="145" r="5.5" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="2" />
      <circle cx="115" cy="145" r="5.5" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="2" />
    </svg>
  </motion.div>
);

// 3. SAD: Drooped ears, downcast face, sigh bubble
const SadIllustration: React.FC = () => (
  <motion.div
    id="ill-sad"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="w-full h-full"
  >
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <ellipse cx="100" cy="183" rx="40" ry="7" fill="rgba(0,0,0,0.06)" />

      {/* Tail (drooping low) */}
      <path d="M 140 145 Q 155 160 145 170 Q 135 180 135 165" stroke="#E6E6E6" strokeWidth="10" strokeLinecap="round" fill="none" />

      {/* Body leaning down */}
      <rect x="68" y="112" width="64" height="60" rx="30" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

      {/* Head breathing/sighing */}
      <motion.g
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      >
        {/* SAD Ears drooped downward */}
        <motion.path
          d="M 50 78 Q 28 85 45 105 Q 55 105 60 90 Z"
          fill="#FFFFFF"
          stroke="#F5D3D1"
          strokeWidth="4"
          strokeLinejoin="round"
          animate={{ rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        />
        <path d="M 45 83 Q 32 88 42 98 Q 50 98 54 90 Z" fill="#FFD1D0" />

        <motion.path
          d="M 150 78 Q 172 85 155 105 Q 145 105 140 90 Z"
          fill="#FFFFFF"
          stroke="#F5D3D1"
          strokeWidth="4"
          strokeLinejoin="round"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        />
        <path d="M 155 83 Q 168 88 158 98 Q 150 98 146 90 Z" fill="#FFD1D0" />

        {/* Head */}
        <ellipse cx="100" cy="100" rx="54" ry="43" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

        {/* Sad Curved Eyes (looking down) */}
        <path d="M 72 96 Q 80 102 88 96" stroke="#4A3B32" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 112 96 Q 120 102 128 96" stroke="#4A3B32" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Sad mouth: (upside-down curve) */}
        <path d="M 96 112 Q 100 106 104 112" stroke="#4A3B32" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Blush of sadness */}
        <circle cx="70" cy="110" r="4.5" fill="#FFAAA6" opacity="0.35" />
        <circle cx="130" cy="110" r="4.5" fill="#FFAAA6" opacity="0.35" />
      </motion.g>

      {/* Sad paws holding chest/each other */}
      <circle cx="88" cy="148" r="5" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="2" />
      <circle cx="112" cy="148" r="5" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="2" />
    </svg>
  </motion.div>
);

// 4. HEARTBROKEN: Cat holding a cracked red heart, shaking with sad eyes
const HeartbrokenIllustration: React.FC = () => (
  <motion.div
    id="ill-heartbroken"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="w-full h-full"
  >
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <ellipse cx="100" cy="183" rx="40" ry="7" fill="rgba(0,0,0,0.06)" />

      {/* Shaking Body Loop */}
      <motion.g
        animate={{ x: [-1, 1, -1, 1, 0], y: [-0.5, 0.5, -0.5, 0, 0] }}
        transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
      >
        <rect x="68" y="112" width="64" height="60" rx="30" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

        {/* Drooped Ears */}
        <path d="M 50 78 Q 28 85 45 105 Q 55 105 60 90 Z" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />
        <path d="M 150 78 Q 172 85 155 105 Q 145 105 140 90 Z" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

        {/* Head */}
        <ellipse cx="100" cy="100" rx="54" ry="43" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

        {/* Shivering sad eyes: wide, watery, look down */}
        <circle cx="78" cy="98" r="7" fill="#4A3B32" />
        <circle cx="122" cy="98" r="7" fill="#4A3B32" />
        {/* Giant pupils */}
        <circle cx="76" cy="96" r="3" fill="#FFFFFF" />
        <circle cx="120" cy="96" r="3" fill="#FFFFFF" />
        {/* Tiny glistening dots */}
        <circle cx="80" cy="100" r="1" fill="#FFFFFF" />
        <circle cx="124" cy="100" r="1" fill="#FFFFFF" />

        {/* Trembling wave mouth */}
        <path d="M 95 110 Q 97 107 100 110 Q 103 113 105 110" stroke="#4A3B32" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* Cracked Heart in Hands */}
      <motion.g
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ transformOrigin: "100px 145px" }}
      >
        {/* Red Heart */}
        <path
          d="M 100 152 C 85 132, 70 135, 100 115 C 130 135, 115 132, 100 152"
          fill="#FF5252"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        {/* Heart Crack Path */}
        <path d="M 100 118 L 102 128 L 98 134 L 103 140 L 99 150" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* Crying tears dropping */}
      <motion.circle
        cx="72"
        cy="105"
        r="3"
        fill="#A1E5FC"
        animate={{ y: [0, 30], opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeIn" }}
      />
      <motion.circle
        cx="128"
        cy="105"
        r="3"
        fill="#A1E5FC"
        animate={{ y: [5, 35], opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0.6, ease: "easeIn" }}
      />

      {/* Paws grasping heart */}
      <circle cx="74" cy="138" r="5" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="2" />
      <circle cx="126" cy="138" r="5" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="2" />
    </svg>
  </motion.div>
);

// 5. CRYING: Waterfall tear streams, sobbing shoulders
const CryingIllustration: React.FC = () => (
  <motion.div
    id="ill-crying"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="w-full h-full"
  >
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <ellipse cx="100" cy="183" rx="38" ry="6" fill="rgba(0,0,0,0.06)" />

      {/* Sobbing body moving up and down violently */}
      <motion.g
        animate={{ y: [2, -4, 2] }}
        transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
      >
        <rect x="70" y="115" width="60" height="55" rx="27" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

        {/* Ears flapping a bit */}
        <path d="M 50 82 Q 28 89 45 109 Q 55 109 60 94 Z" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />
        <path d="M 150 82 Q 172 89 155 109 Q 145 109 140 94 Z" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

        {/* Head */}
        <ellipse cx="100" cy="103" rx="54" ry="42" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

        {/* Tight squeezed crying eyes: >_< */}
        <path d="M 72 100 L 82 105 L 72 110" stroke="#4A3B32" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 128 100 L 118 105 L 128 110" stroke="#4A3B32" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Open crying mouth */}
        <motion.ellipse
          cx="100"
          cy="119"
          rx="8"
          ry="11"
          fill="#E05B58"
          stroke="#4A3B32"
          strokeWidth="3"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
        {/* Tongue inside mouth */}
        <path d="M 95 124 Q 100 119 105 124" fill="#FFC2C1" />

        {/* Tears waterfall streams */}
        <path d="M 78 106 L 78 145" stroke="#75E6FF" strokeWidth="6.5" strokeLinecap="round" opacity="0.85" />
        <path d="M 122 106 L 122 145" stroke="#75E6FF" strokeWidth="6.5" strokeLinecap="round" opacity="0.85" />

        {/* Splashing Teardrops outwards */}
        <motion.path
          d="M 70 120 Q 60 125 55 115"
          stroke="#75E6FF"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [1, 0], scale: [0.5, 1.2] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          style={{ transformOrigin: "70px 120px" }}
        />
        <motion.path
          d="M 130 120 Q 140 125 145 115"
          stroke="#75E6FF"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [1, 0], scale: [0.5, 1.2] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          style={{ transformOrigin: "130px 120px" }}
        />
      </motion.g>

      {/* Sad hands covers face */}
      <circle cx="74" cy="148" r="5.5" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="2" />
      <circle cx="126" cy="148" r="5.5" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="2" />
    </svg>
  </motion.div>
);

// 6. CELEBRATING: Smiling with heart eyes, bounce and jump, throwing giant beating heart
const CelebratingIllustration: React.FC = () => (
  <motion.div
    id="ill-celebrating"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="w-full h-full"
  >
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <ellipse cx="100" cy="182" rx="46" ry="9" fill="rgba(0,0,0,0.06)" />

      {/* Bouncing, jumping cat */}
      <motion.g
        animate={{ y: [0, -22, 0], rotate: [0, 3, -3, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        {/* Tail wagging rapidly */}
        <motion.path
          d="M 140 140 Q 175 110 160 70 Q 145 60 148 75 Q 155 95 135 125"
          stroke="#E6E6E6"
          strokeWidth="12"
          strokeLinecap="round"
          animate={{ rotate: [-20, 20, -20] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
          style={{ transformOrigin: "135px 125px" }}
        />

        {/* Body */}
        <rect x="65" y="100" width="70" height="70" rx="35" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

        {/* Ears standing tall */}
        <polygon points="50,55 80,40 85,75" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="45,50 75,35 80,70" fill="#FFD1D0" />
        <polygon points="150,55 120,40 115,75" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="155,50 125,35 120,70" fill="#FFD1D0" />

        {/* Head */}
        <ellipse cx="100" cy="85" rx="56" ry="46" fill="#FFFFFF" stroke="#F5D3D1" strokeWidth="4" />

        {/* Blinking/sparkling heart eyes ❤️ ❤️ */}
        <g fill="#FF477E">
          {/* Heart Left Eye */}
          <motion.path
            d="M 80 88 C 73 78, 66 82, 80 94 C 94 82, 87 78, 80 88"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            style={{ transformOrigin: "80px 88px" }}
          />
          {/* Heart Right Eye */}
          <motion.path
            d="M 120 88 C 113 78, 106 82, 120 94 C 134 82, 127 78, 120 88"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
            style={{ transformOrigin: "120px 88px" }}
          />
        </g>

        {/* Cheerful wide-open smiling mouth */}
        <path d="M 92 100 Q 100 112 108 100" fill="#E65E6B" stroke="#4A3B32" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 94 92 L 100 95 L 106 92" stroke="#4A3B32" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Blush of supreme joy! */}
        <circle cx="66" cy="100" r="7.5" fill="#FFAAA6" />
        <circle cx="134" cy="100" r="7.5" fill="#FFAAA6" />

        {/* Whiskers */}
        <line x1="33" y1="84" x2="48" y2="87" stroke="#F5D3D1" strokeWidth="2.5" />
        <line x1="31" y1="91" x2="46" y2="92" stroke="#F5D3D1" strokeWidth="2.5" />
        <line x1="167" y1="84" x2="152" y2="87" stroke="#F5D3D1" strokeWidth="2.5" />
        <line x1="169" y1="91" x2="154" y2="92" stroke="#F5D3D1" strokeWidth="2.5" />

        {/* Paws raised in celebration yay! */}
        <motion.circle
          cx="60"
          cy="125"
          r="6.5"
          fill="#FFFFFF"
          stroke="#F5D3D1"
          strokeWidth="2"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        />
        <motion.circle
          cx="140"
          cy="125"
          r="6.5"
          fill="#FFFFFF"
          stroke="#F5D3D1"
          strokeWidth="2"
          animate={{ y: [-10, 0, -10] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        />

        {/* Big Beating Red Heart in central lap */}
        <motion.path
          d="M 100 154 C 84 135, 71 138, 100 119 C 129 138, 116 135, 100 154"
          fill="#FF3366"
          stroke="#FFFFFF"
          strokeWidth="2"
          animate={{ scale: [1, 1.25, 1], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 136px" }}
        />
      </motion.g>

      {/* Surrounding Sparkle Stars */}
      <motion.g
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <path d="M 40 40 L 42 45 L 47 47 L 42 49 L 40 54 L 38 49 L 33 47 L 38 45 Z" fill="#FFE066" />
        <path d="M 160 50 L 162 53 L 167 55 L 162 57 L 160 60 L 158 57 L 153 55 L 158 53 Z" fill="#FFE066" />
      </motion.g>
    </svg>
  </motion.div>
);
