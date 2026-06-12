/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, X, Sparkles } from 'lucide-react';
import { WordDetail } from '../types';
import { playTTS } from './AudioEngine';

interface WordPopupProps {
  wordDetail: WordDetail | null;
  onClose: () => void;
}

export default function WordPopup({ wordDetail, onClose }: WordPopupProps) {
  if (!wordDetail) return null;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTTS(wordDetail.word);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md overflow-hidden bg-white rounded-3xl shadow-2xl border-4 border-amber-200 animate-fade-in"
        >
          {/* Header Theme Color */}
          <div className="bg-gradient-to-r from-amber-400 to-[#e07a5f] p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 animate-pulse" />
              <span className="font-bold tracking-wider text-lg">Magical Spell Word ✨</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Word & Pronounce */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-3xl font-extrabold text-[#e07a5f] tracking-tight flex items-center gap-2">
                  {wordDetail.word}
                  <span className="text-2xl">{wordDetail.emoji}</span>
                </h3>
                <span className="inline-block px-3 py-1 mt-1 font-mono text-sm font-semibold text-amber-700 bg-amber-50 rounded-full">
                  {wordDetail.ipa}
                </span>
              </div>
              <button
                onClick={handleSpeak}
                className="p-4 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 active:scale-95 transition-all shadow-md shadow-amber-50 flex items-center justify-center cursor-pointer"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            {/* Chinese Meaning */}
            <div className="mb-5 p-4 rounded-2.5xl bg-[#f5efe2]/60 border border-amber-150">
              <div className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">
                華語意思 Meaning
              </div>
              <div className="text-xl font-bold text-[#5c3e16]">
                {wordDetail.zh}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#4a453e]">
                💡 {wordDetail.explanation}
              </p>
            </div>

            {/* Example sentence */}
            <div className="p-4 rounded-2.5xl bg-[#FCFCF9] border border-amber-100/70">
              <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1 flex items-center justify-between">
                <span>故事例句 Example</span>
                <button
                  onClick={() => playTTS(wordDetail.en_example)}
                  className="p-1 text-amber-600 hover:text-[#e07a5f] transition-colors"
                  title="Speak example sentence"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-base font-semibold text-[#4a453e] leading-snug">
                {wordDetail.en_example}
              </p>
              <p className="mt-1.5 text-sm text-[#4a453e]/80 font-medium">
                👉 {wordDetail.zh_example}
              </p>
            </div>
          </div>

          {/* Footer banner */}
          <div className="bg-[#fdfcf0] px-6 py-4 flex justify-end border-t border-amber-100/50">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#e07a5f] hover:bg-[#ca6347] active:scale-95 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer"
            >
              我知道了 OK!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
