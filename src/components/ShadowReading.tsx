/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Mic, Sparkles, Star, Smile, Trophy } from 'lucide-react';
import { playTTS, playCorrectSound, playLevelUpSound } from './AudioEngine';

export default function ShadowReading() {
  const [activeShadowTab, setActiveShadowTab] = useState<'dialogue' | 'action'>('dialogue');
  const [showSpeechCheck, setShowSpeechCheck] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [starCount, setStarCount] = useState(0);

  const triggerShadowSuccess = (type: string) => {
    setIsRecording(true);
    
    // Simulate interactive micro voice detection
    setTimeout(() => {
      setIsRecording(false);
      playLevelUpSound();
      setShowSpeechCheck(type);
      setStarCount(Math.floor(Math.random() * 2) + 2); // 2 or 3 stars
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in mb-12">
      {/* Intro Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#efefea]/80 border border-slate-300/40 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 shadow-sm animate-pulse">
          🎤
        </div>
        <div>
          <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-950 rounded-full">
            影子模仿特訓 Shadow Reading
          </span>
          <h2 className="text-2xl font-black text-[#5c3e16] mt-2">
            Speak Aloud! 跟著大聲念英文
          </h2>
          <p className="text-[#4a453e] text-sm mt-1 leading-relaxed">
            跟著故事裡的主角、女王還有貓咪，大聲模仿他們的奇妙驚訝、生氣與好玩聲音吧！
          </p>
        </div>
      </div>

      {/* Shadow Reading Area Card */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-amber-200 bg-gradient-to-br from-[#FCFBF7] via-white to-amber-50/30 p-6 md:p-10 text-slate-800 shadow-xl">
        {/* Decorative corner stars */}
        <div className="absolute top-0 right-0 p-4 opacity-15 text-amber-500 text-5xl pointer-events-none select-none font-sans animate-pulse">
          ✨🔮✨
        </div>

        {/* Tab Picker */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🗣️</span>
            <div>
              <h3 className="text-lg font-bold text-[#5c3e16] leading-tight">
                模仿魔鏡 Magic Mirror Check-in
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                請選取一個你最想要挑戰的說英語場景：
              </p>
            </div>
          </div>

          <div className="flex gap-2 bg-amber-50 p-1.5 rounded-2xl border border-amber-100">
            <button
              onClick={() => {
                setActiveShadowTab('dialogue');
                playCorrectSound();
              }}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeShadowTab === 'dialogue'
                  ? 'bg-amber-150 text-[#5c3e16] shadow-sm font-black'
                  : 'text-slate-400 hover:text-[#5c3e16]'
              }`}
            >
              選段一：主角高潮對話
            </button>
            <button
              onClick={() => {
                setActiveShadowTab('action');
                playCorrectSound();
              }}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeShadowTab === 'action'
                  ? 'bg-amber-150 text-[#5c3e16] shadow-sm font-black'
                  : 'text-slate-400 hover:text-[#5c3e16]'
              }`}
            >
              選段二：動物與趣味聲音
            </button>
          </div>
        </div>

        {/* Tab Content Rendering */}
        {activeShadowTab === 'dialogue' ? (
          <div className="space-y-6">
            <div className="p-4 bg-[#FCFBF7] rounded-2.5xl border border-amber-100">
              <span className="text-xs font-black text-amber-800 uppercase tracking-widest block mb-4">
                🌟 TOM & CATS DIALOGUE DRAMA:
              </span>

              {/* Dialogue Cards Stack */}
              <div className="space-y-4">
                {/* 1. Tom */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 bg-white p-4 rounded-2xl border border-amber-100 relative hover:border-amber-300 transition-all shadow-xs">
                  {/* Card Illustration */}
                  <div className="w-full sm:w-28 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-amber-50 shadow-xs relative">
                     <img
                      src="/assets/images/seq_ballroom_1781343586736.jpg"
                      alt="Tom looking into Royal Ballroom"
                      className="w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex gap-4 min-w-0">
                    <span className="text-2xl shrink-0">🧙‍♂️</span>
                    <div className="flex-1 space-y-1 min-w-0">
                      <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                        Tom (好奇發問) <Smile className="w-3.5 h-3.5 text-amber-600" />
                      </span>
                      <p className="text-xl font-black text-slate-800 tracking-wide">
                        <span className="text-indigo-600">&quot;What&apos;s going on?&quot;</span> <span className="text-slate-500 font-normal">Tom asked.</span>
                      </p>
                      <p className="text-xs text-slate-600 font-medium">
                        💡 影子朗讀提示：語氣要上揚，表示出非常好奇、想要探查究竟的感覺！
                      </p>
                    </div>
                    <button
                      onClick={() => playTTS("What's going on? Tom asked.")}
                      className="p-3 rounded-xl bg-amber-100 hover:bg-amber-150 text-[#5c3e16] transition-colors cursor-pointer self-center border border-amber-200"
                      title="聽到發音"
                    >
                      <Volume2 className="w-5 h-5 pointer-events-none" />
                    </button>
                  </div>
                </div>

                {/* 2. Cat */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 bg-white p-4 rounded-2xl border border-amber-100 relative hover:border-amber-300 transition-all shadow-xs">
                  {/* Card Illustration */}
                  <div className="w-full sm:w-28 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-amber-50 shadow-xs relative">
                    <img
                      src="/assets/images/cat_secret_whispering_1781315648228.jpg"
                      alt="Cat whispering a birthday party secret"
                      className="w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex gap-4 min-w-0">
                    <span className="text-2xl shrink-0">🐱</span>
                    <div className="flex-1 space-y-1 min-w-0">
                      <span className="text-xs font-bold text-teal-750">
                        Cat (好意分享秘密)
                      </span>
                      <p className="text-xl font-black text-slate-800 tracking-wide">
                        <span className="text-emerald-600">&quot;There&apos;s a birthday party tomorrow,&quot;</span> <span className="text-slate-500 font-normal">Cat said.</span>
                      </p>
                      <p className="text-xs text-slate-600 font-medium">
                        💡 影子朗讀提示：像在跟同伴說悄悄話，一字字驚喜而溫柔地說！
                      </p>
                    </div>
                    <button
                      onClick={() => playTTS("There's a birthday party tomorrow, Cat said.")}
                      className="p-3 rounded-xl bg-amber-100 hover:bg-amber-150 text-[#5c3e16] transition-colors cursor-pointer self-center border border-amber-200"
                      title="聽到發音"
                    >
                      <Volume2 className="w-5 h-5 pointer-events-none" />
                    </button>
                  </div>
                </div>

                {/* 3. Dirk */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 bg-white p-4 rounded-2xl border border-amber-100 relative hover:border-amber-300 transition-all shadow-xs">
                  {/* Card Illustration */}
                  <div className="w-full sm:w-28 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-amber-50 shadow-xs relative">
                     <img
                      src="/assets/images/seq_dirk_1781343624696.jpg"
                      alt="Dirk commands Tom"
                      className="w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex gap-4 min-w-0">
                    <span className="text-2xl shrink-0">😠</span>
                    <div className="flex-1 space-y-1 min-w-0">
                      <span className="text-xs font-bold text-red-700">
                        Dirk (粗魯地命令人)
                      </span>
                      <p className="text-xl font-black text-slate-800 tracking-wide">
                        <span className="text-rose-600">&quot;Come with me!&quot;</span> <span className="text-slate-500 font-normal">Dirk said.</span>
                      </p>
                      <p className="text-xs text-slate-600 font-medium">
                        💡 影子朗讀提示：聲音可以粗重有力，乾脆、直接命令！
                      </p>
                    </div>
                    <button
                      onClick={() => playTTS("Come with me! Dirk said.")}
                      className="p-3 rounded-xl bg-amber-100 hover:bg-amber-150 text-[#5c3e16] transition-colors cursor-pointer self-center border border-amber-200"
                      title="聽到發音"
                    >
                      <Volume2 className="w-5 h-5 pointer-events-none" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-[#FCFBF7] rounded-2.5xl border border-amber-100">
              <span className="text-xs font-black text-amber-800 uppercase tracking-widest block mb-4">
                👑 THE QUEEN & TOM CHRONICLES:
              </span>

              {/* Action Cards Stack */}
              <div className="space-y-4">
                {/* 1. Queen Sneezing */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 bg-white p-4 rounded-2xl border border-amber-100 relative hover:border-amber-300 transition-all shadow-xs">
                  {/* Card Illustration */}
                  <div className="w-full sm:w-28 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-amber-50 shadow-xs relative">
                    <img
                      src="/assets/images/seq_queen_1781343638059.jpg"
                      alt="The Queen sneezing Ah-choo"
                      className="w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex gap-4 min-w-0">
                    <span className="text-2xl shrink-0">🤧</span>
                    <div className="flex-1 space-y-1 min-w-0">
                      <span className="text-xs font-bold text-amber-800">
                        The Queen (大哈啾與噴嚏)
                      </span>
                      <p className="text-xl font-black text-slate-800 tracking-wide font-mono">
                        <span className="text-amber-600 animate-pulse">&quot;Ah-choo!&quot;</span> <span className="text-slate-500 font-normal font-sans">The queen sneezed.</span>
                      </p>
                      <p className="text-xs text-slate-600 font-medium">
                        💡 影子朗讀提示：大膽做出打噴嚏「哈——啾！」的動感，神氣活現！🤧
                      </p>
                    </div>
                    <button
                      onClick={() => playTTS("Ah-choo! The queen sneezed.")}
                      className="p-3 rounded-xl bg-amber-100 hover:bg-amber-150 text-[#5c3e16] transition-colors cursor-pointer self-center border border-amber-200"
                      title="聽到發音"
                    >
                      <Volume2 className="w-5 h-5 pointer-events-none" />
                    </button>
                  </div>
                </div>

                {/* 2. Queen Help request */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 bg-white p-4 rounded-2xl border border-amber-100 relative hover:border-amber-300 transition-all shadow-xs">
                  {/* Card Illustration */}
                  <div className="w-full sm:w-28 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-amber-50 shadow-xs relative">
                    <img
                      src="/assets/images/seq_queen_1781343638059.jpg"
                      alt="The Queen asking Tom for help"
                      className="w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex gap-4 min-w-0">
                    <span className="text-2xl shrink-0 font-sans">👑</span>
                    <div className="flex-1 space-y-1 min-w-0">
                      <span className="text-xs font-bold text-teal-700">
                        The Queen (誠懇地尋求拯救)
                      </span>
                      <p className="text-xl font-black text-slate-800 tracking-wide">
                        <span className="text-indigo-600">&quot;Tom, I need your help,&quot;</span> <span className="text-slate-500 font-normal">she said.</span>
                      </p>
                      <p className="text-xs text-slate-600 font-medium">
                        💡 影子朗讀提示：語氣要誠懇和重讀 need your help！
                      </p>
                    </div>
                    <button
                      onClick={() => playTTS("Tom, I need your help, she said.")}
                      className="p-3 rounded-xl bg-amber-100 hover:bg-amber-150 text-[#5c3e16] transition-colors cursor-pointer self-center border border-amber-200"
                      title="聽到發音"
                    >
                      <Volume2 className="w-5 h-5 pointer-events-none" />
                    </button>
                  </div>
                </div>

                {/* 3. Tom Shocked and Cat Anger combined */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 bg-white p-4 rounded-2xl border border-amber-100 relative hover:border-amber-300 transition-all shadow-xs">
                  {/* Card Illustration */}
                  <div className="w-full sm:w-28 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-amber-50 shadow-xs relative">
                    <img
                      src="/assets/images/seq_pocket_scratching_1781359040265.jpg"
                      alt="Cat scratches inside Tom's pocket"
                      className="w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex gap-4 min-w-0">
                    <span className="text-2xl shrink-0">😾</span>
                    <div className="flex-1 space-y-1 min-w-0">
                      <span className="text-xs font-bold text-red-700">
                        Tom &amp; Cat (驚叫與貓咪狂怒嘶喊)
                      </span>
                      <p className="text-xl font-black text-slate-800 tracking-wide">
                        <span className="text-indigo-600">&quot;A dog?&quot;</span> <span className="text-slate-500 font-normal">Tom repeated.</span> <span className="text-rose-650 text-red-500 font-extrabold italic animate-pulse">Hiss!</span>
                      </p>
                      <p className="text-xs text-slate-600 font-medium">
                        💡 影子朗讀提示：先拔高問句 A dog?，接著用力發出生氣貓咪抓狂的 Hiss！
                      </p>
                    </div>
                    <button
                      onClick={() => playTTS("A dog? Tom repeated. Hiss!")}
                      className="p-3 rounded-xl bg-amber-100 hover:bg-amber-150 text-[#5c3e16] transition-colors cursor-pointer self-center border border-amber-200"
                      title="聽到發音"
                    >
                      <Volume2 className="w-5 h-5 pointer-events-none" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recorder Box Panel with Microphone Interaction */}
        <div className="mt-8 p-6 rounded-2.5xl bg-amber-150/40 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Animated speaking audio waves inside */}
          {isRecording && (
            <div className="absolute inset-0 bg-white/95 z-20 flex items-center justify-center gap-2">
              <span className="w-2.5 h-8 bg-amber-400 rounded-full animate-bounce delay-75" />
              <span className="w-2.5 h-12 bg-amber-500 rounded-full animate-bounce delay-150" />
              <span className="w-2.5 h-6 bg-amber-400 rounded-full animate-bounce delay-300" />
              <span className="w-2.5 h-10 bg-amber-500 rounded-full animate-bounce delay-75" />
              <span className="w-2.5 h-7 bg-amber-400 rounded-full animate-bounce delay-200" />
              <span className="text-sm font-black text-amber-800 uppercase ml-4 tracking-widest animate-pulse">
                🎙️ 模仿魔鏡收音中... Listening...
              </span>
            </div>
          )}

          <div className="text-sm flex-1">
            <span className="font-extrabold text-[#5c3e16] text-base flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              請選取上述某個段落，按下右側麥克風大聲讀出！
            </span>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              完成發音後，魔法貓咪會立刻為你的扮演給出完美的英文評分與星星反饋喔。
            </p>
          </div>

          <button
            onClick={() => triggerShadowSuccess(activeShadowTab)}
            disabled={isRecording}
            className="px-6 py-4.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 font-extrabold text-white rounded-2.5xl shadow-md hover:scale-103 transition-all flex items-center gap-2 cursor-pointer self-center active:scale-95 shrink-0"
          >
            <Mic className="w-5 h-5 shrink-0" />
            <span>我讀完了！ 🎤</span>
          </button>
        </div>

        {/* Modal feedback card */}
        <AnimatePresence>
          {showSpeechCheck && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="absolute inset-0 bg-[#FFFDF9]/98 flex flex-col items-center justify-center text-center p-6 md:p-10 rounded-3xl border-4 border-amber-300 z-30 shadow-2xl"
            >
              <div className="bg-amber-100 border border-amber-200 p-2.5 rounded-3xl mb-4">
                <Trophy className="w-14 h-14 text-amber-500 animate-bounce" />
              </div>

              <div className="flex justify-center gap-1.5 mb-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${
                      i < starCount ? 'text-amber-500 fill-amber-500 animate-pulse' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>

              <h4 className="text-2xl font-black text-[#5c3e16] tracking-wide">
                Awesome Reading! 太美妙了 🏆
              </h4>
              <p className="text-slate-600 text-sm max-w-md mt-2 leading-relaxed font-semibold">
                「{starCount} 顆星大滿貫！你的高低起伏與音腔節奏把握極佳，湯姆和貓咪高興得手舞足蹈，城堡魔法值暴增！」🌟🐱
              </p>

              <button
                onClick={() => setShowSpeechCheck(null)}
                className="mt-6 px-10 py-3 bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-955 text-sm font-black rounded-2xl transition-all shadow-md cursor-pointer"
              >
                關閉評分 Close Check
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
