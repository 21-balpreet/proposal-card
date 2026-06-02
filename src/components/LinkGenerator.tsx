/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, Check, Heart, User, Sparkle, Link as LinkIcon, Share2 } from 'lucide-react';
import { ThemeType } from '../types';

interface LinkGeneratorProps {
  onSelfPreview: (from: string, to: string, theme: ThemeType) => void;
}

export const LinkGenerator: React.FC<LinkGeneratorProps> = ({ onSelfPreview }) => {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [theme, setTheme] = useState<ThemeType>('pink');
  const [copied, setCopied] = useState<boolean>(false);
  const [generatedUrl, setGeneratedUrl] = useState<string>('');

  const themes: { id: ThemeType; name: string; color: string; label: string }[] = [
    { id: 'pink', name: 'Sweet Pink', color: 'bg-pink-400 border-pink-500 text-pink-500', label: '🌸' },
    { id: 'lavender', name: 'Lavender Cloud', color: 'bg-purple-300 border-purple-400 text-purple-600', label: '🔮' },
    { id: 'peach', name: 'Cozy Peach', color: 'bg-orange-300 border-orange-400 text-orange-600', label: '🍑' },
    { id: 'mint', name: 'Mint Choco', color: 'bg-emerald-300 border-emerald-400 text-emerald-600', label: '🌿' },
    { id: 'galaxy', name: 'Cosmic Dream', color: 'bg-blue-400 border-blue-500 text-blue-600', label: '✨' },
    { id: 'dark', name: 'Midnight Dark', color: 'bg-zinc-800 border-zinc-950 text-zinc-950', label: '🌙' },
  ];

  useEffect(() => {
    // Dynamically calculate origin
    const baseUrl = window.location.origin + window.location.pathname;
    if (from.trim() && to.trim()) {
      const qParams = new URLSearchParams();
      qParams.set('from', from.trim());
      qParams.set('to', to.trim());
      qParams.set('theme', theme);
      setGeneratedUrl(`${baseUrl}?${qParams.toString()}`);
    } else {
      setGeneratedUrl('');
    }
  }, [from, to, theme]);

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePreview = () => {
    if (from.trim() && to.trim()) {
      onSelfPreview(from.trim(), to.trim(), theme);
    }
  };

  return (
    <motion.div
      id="link-generator"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white/90 backdrop-blur-md border border-pink-100 rounded-3xl p-6 md:p-8 shadow-xl relative z-10"
    >
      {/* Decorative stars */}
      <div className="absolute top-4 left-4 text-pink-300 animate-pulse">
        <Sparkle className="w-5 h-5 fill-pink-100" />
      </div>
      <div className="absolute bottom-6 right-6 text-pink-300 animate-bounce">
        <Heart className="w-5 h-5 fill-pink-150" />
      </div>

      <div className="text-center mb-6">
        <span className="bg-pink-100/60 text-pink-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          🌸 Valentine Link Creator 🌸
        </span>
        <h2 className="font-sans font-bold text-2xl text-gray-800 tracking-tight mt-3">
          Create proposal card!
        </h2>
        <p className="text-gray-500 text-xs mt-1">
          Generate an incredibly sweet, interactive Valentine proposal webpage.
        </p>
      </div>

      <div className="space-y-4">
        {/* Your Name */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <User className="w-3 h-3 text-pink-400" />
            Your name (from)
          </label>
          <input
            type="text"
            placeholder="e.g. Mannik"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full bg-pink-50/40 hover:bg-pink-50 border border-pink-100 rounded-2xl px-4 py-3 outline-none text-gray-700 font-sans text-sm focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all font-medium"
          />
        </div>

        {/* Partners Name */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Heart className="w-3 h-3 text-pink-400" />
            Their name (to)
          </label>
          <input
            type="text"
            placeholder="e.g. Angela"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full bg-pink-50/40 hover:bg-pink-50 border border-pink-100 rounded-2xl px-4 py-3 outline-none text-gray-700 font-sans text-sm focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all font-medium"
          />
        </div>

        {/* Theme select */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-pink-400" />
            Choose color theme
          </label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  title={t.name}
                  className={`relative flex flex-col items-center justify-center py-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-pink-500 border-pink-500 text-white scale-105 shadow-md shadow-pink-100'
                      : 'bg-white border-gray-100 hover:border-pink-200 text-gray-500 text-xs'
                  }`}
                >
                  <span className="text-lg leading-none">{t.label}</span>
                  <span className={`text-[9px] mt-1 font-semibold leading-none ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                    {t.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* URL Output box */}
        <AnimatePresence>
          {generatedUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <label className="block text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                <LinkIcon className="w-3 h-3 text-pink-400" />
                Your shareable link
              </label>

              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 select-all overflow-x-auto whitespace-nowrap text-xs text-gray-600 font-mono scrollbar-thin">
                  {generatedUrl}
                </div>
                <button
                  onClick={handleCopy}
                  className={`p-3 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100'
                      : 'bg-pink-500 text-white hover:bg-pink-600 shadow-md shadow-pink-100'
                  }`}
                  title="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  onClick={handlePreview}
                  className="w-full py-2.5 rounded-xl border border-pink-200 bg-pink-50/50 hover:bg-pink-100/50 text-pink-600 font-sans font-semibold text-xs tracking-tight transition-all cursor-pointer active:scale-98"
                >
                  Preview proposal
                </button>
                <button
                  onClick={handleCopy}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 font-sans font-semibold text-xs tracking-tight transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-1.5 shadow-md shadow-pink-100"
                >
                  <Share2 className="w-3 h-3" />
                  Copy & Send!
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!generatedUrl && (
          <div className="bg-pink-50/40 border border-dashed border-pink-150 rounded-2xl p-4 text-center text-gray-400 text-xs">
            ✨ Enter names above to see your customized Link! ✨
          </div>
        )}
      </div>
    </motion.div>
  );
};
