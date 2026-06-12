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
            點擊<b>綠色喇叭</b>聽正確發音，然後按<b>麥克風跟讀挑戰</b>，領取滿分星星加冕囉！
          </p>
        </div>
      </div>

      {/* Shadow Reading Area Card */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-[#e9be88] bg-[#2b2723] p-6 md:p-10 text-[#fdfcf0] shadow-xl">
        {/* Decorative corner stars */}
        <div className="absolute top-0 right-0 p-4 opacity-25 text-amber-200 text-5xl pointer-events-none select-none font-sans animate-pulse">
          ✨🔮✨
        </div>

        {/* Tab Picker */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🗣️</span>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                模仿魔鏡 Magic Mirror Check-in
              </h3>
              <p className="text-xs text-[#ebd7bf]/70 mt-0.5">
                請選取一個你最想要挑戰的說英語場景：
              </p>
            </div>
          </div>

          <div className="flex gap-2 bg-[#1c1a17] p-1.5 rounded-2xl border border-white/5">
            <button
              onClick={() => {
                setActiveShadowTab('dialogue');
                playCorrectSound();
              }}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeShadowTab === 'dialogue'
                  ? 'bg-[#e9be88] text-[#2b2723] shadow-md'
                  : 'text-amber-200/60 hover:text-white'
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
                  ? 'bg-[#e9be88] text-[#2b2723] shadow-md'
                  : 'text-amber-200/60 hover:text-white'
              }`}
            >
              選段二：動物與趣味聲音
            </button>
          </div>
        </div>

        {/* Tab Content Rendering */}
        {activeShadowTab === 'dialogue' ? (
          <div className="space-y-6">
            <div className="p-4 bg-[#1c1a17]/50 rounded-2.5xl border border-amber-500/10">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-4">
                🌟 TOM & CATS DIALOGUE DRAMA:
              </span>

              {/* Dialogue Cards Stack */}
              <div className="space-y-4">
                {/* 1. Tom */}
                <div className="flex items-start gap-4 bg-[#13110f]/60 p-4 rounded-2xl border border-white/5 relative hover:border-amber-300/20 transition-all">
                  <span className="text-2xl shrink-0">🧙‍♂️</span>
                  <div className="flex-1 space-y-1">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                      Tom (好奇發問) <Smile className="w-3.5 h-3.5" />
                    </span>
                    <p className="text-xl font-black text-white tracking-wide">
                      &quot;What&#39;s going on?&quot;
                    </p>
                    <p className="text-xs text-amber-100/60 font-medium">
                      💡 影子朗讀提示：語氣要上揚，表示出非常好奇、想要探查究竟的感覺！
                    </p>
                  </div>
                  <button
                    onClick={() => playTTS("What's going on?")}
                    className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer self-center border border-amber-500/20"
                    title="聽到發音"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* 2. Cat */}
                <div className="flex items-start gap-4 bg-[#13110f]/60 p-4 rounded-2xl border border-white/5 relative hover:border-amber-300/20 transition-all">
                  <span className="text-2xl shrink-0">🐱</span>
                  <div className="flex-1 space-y-1">
                    <span className="text-xs font-bold text-teal-300">
                      Cat (好意分享秘密)
                    </span>
                    <p className="text-xl font-black text-white tracking-wide">
                      &quot;There&#39;s a birthday party tomorrow.&quot;
                    </p>
                    <p className="text-xs text-amber-100/60 font-medium">
                      💡 影子朗讀提示：像在跟同伴說悄悄話，放輕音量、一字字驚喜地分享！
                    </p>
                  </div>
                  <button
                    onClick={() => playTTS("There's a birthday party tomorrow.")}
                    className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer self-center border border-amber-500/20"
                    title="聽到發音"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* 3. Dirk */}
                <div className="flex items-start gap-4 bg-[#13110f]/60 p-4 rounded-2xl border border-white/5 relative hover:border-amber-300/20 transition-all">
                  <span className="text-2xl shrink-0">😠</span>
                  <div className="flex-1 space-y-1">
                    <span className="text-xs font-bold text-rose-350">
                      Dirk (粗魯地命令人)
                    </span>
                    <p className="text-xl font-black text-white tracking-wide">
                      &quot;Come with me!&quot;
                    </p>
                    <p className="text-xs text-amber-100/60 font-medium">
                      💡 影子朗讀提示：聲音可以粗狂生氣一點，乾脆、有力、大聲命令！
                    </p>
                  </div>
                  <button
                    onClick={() => playTTS("Come with me!")}
                    className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer self-center border border-amber-500/20"
                    title="聽到發音"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-[#1c1a17]/50 rounded-2.5xl border border-amber-500/10">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-4">
                🤧 STAGE SOUNDS & DRAMATIC VOICES:
              </span>

              {/* Action Cards Stack */}
              <div className="space-y-4">
                {/* 1. Queen Sneezing */}
                <div className="flex items-start gap-4 bg-[#13110f]/60 p-4 rounded-2xl border border-white/5 relative hover:border-amber-300/20 transition-all">
                  <span className="text-2xl shrink-0">👑</span>
                  <div className="flex-1 space-y-1">
                    <span className="text-xs font-bold text-[#ebbe68]">
                      The Queen (哈啾大喷嚏)
                    </span>
                    <p className="text-xl font-black text-white tracking-wide font-mono">
                      &quot;Ah-choo!&quot;
                    </p>
                    <p className="text-xs text-amber-100/60 font-medium">
                      💡 影子朗讀提示：大膽做出打噴嚏「哈——啾！」的動感，全班都愛演！🤧
                    </p>
                  </div>
                  <button
                    onClick={() => playTTS("Ah-choo!")}
                    className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer self-center border border-amber-500/20"
                    title="聽到發音"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* 2. Tom Surprised */}
                <div className="flex items-start gap-4 bg-[#13110f]/60 p-4 rounded-2xl border border-white/5 relative hover:border-amber-300/20 transition-all">
                  <span className="text-2xl shrink-0">🤵</span>
                  <div className="flex-1 space-y-1">
                    <span className="text-xs font-bold text-sky-305">
                      Tom (不可置信、嚇一大跳)
                    </span>
                    <p className="text-xl font-black text-white tracking-wide">
                      &quot;A dog?&quot;
                    </p>
                    <p className="text-xs text-amber-100/60 font-medium">
                      💡 影子朗讀提示：重複說這句時，尾部拔高，做出滿臉問號驚呆表情！🤷‍♂️
                    </p>
                  </div>
                  <button
                    onClick={() => playTTS("A dog?")}
                    className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer self-center border border-amber-500/20"
                    title="聽到發音"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* 3. Cat Anger */}
                <div className="flex items-start gap-4 bg-[#13110f]/60 p-4 rounded-2xl border border-white/5 relative hover:border-amber-300/20 transition-all">
                  <span className="text-2xl shrink-0">😾</span>
                  <div className="flex-1 space-y-1">
                    <span className="text-xs font-bold text-rose-350">
                      Cat (狂怒警告嘶喊)
                    </span>
                    <p className="text-xl font-black text-rose-400 tracking-widest font-mono animate-pulse">
                      &quot;Hiss!&quot;
                    </p>
                    <p className="text-xs text-amber-100/60 font-medium">
                      💡 影子朗讀提示：牙齒咬合發出貓咪抓狂的「嘶——」警告！生動有趣！
                    </p>
                  </div>
                  <button
                    onClick={() => playTTS("Hiss!")}
                    className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer self-center border border-amber-500/20"
                    title="聽到發音"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recorder Box Panel with Microphone Interaction */}
        <div className="mt-8 p-6 rounded-2.5xl bg-amber-500/5 border border-[#e9be88]/20 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Animated speaking audio waves inside */}
          {isRecording && (
            <div className="absolute inset-0 bg-[#352f29]/80 z-20 flex items-center justify-center gap-2">
              <span className="w-2.5 h-8 bg-amber-400 rounded-full animate-bounce delay-75" />
              <span className="w-2.5 h-12 bg-amber-500 rounded-full animate-bounce delay-150" />
              <span className="w-2.5 h-6 bg-amber-350 rounded-full animate-bounce delay-300" />
              <span className="w-2.5 h-10 bg-amber-450 rounded-full animate-bounce delay-75" />
              <span className="w-2.5 h-7 bg-amber-400 rounded-full animate-bounce delay-200" />
              <span className="text-sm font-bold text-amber-200 uppercase ml-4 tracking-widest animate-pulse">
                🎙️ 模仿魔鏡收音中... Listening...
              </span>
            </div>
          )}

          <div className="text-sm flex-1">
            <span className="font-extrabold text-[#e9be88] text-base flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              請選取上述某個段落，按下右側麥克風大聲讀出！
            </span>
            <p className="text-xs text-amber-100/60 leading-relaxed font-semibold">
              完成發音後，魔法貓咪會立刻為你的扮演給出完美的英文評分與星星反饋喔。
            </p>
          </div>

          <button
            onClick={() => triggerShadowSuccess(activeShadowTab)}
            disabled={isRecording}
            className="px-6 py-4.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 font-black text-white rounded-2.5xl shadow-xl hover:scale-103 transition-all flex items-center gap-2 cursor-pointer self-center border border-emerald-400/20 active:scale-95 shrink-0"
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
              className="absolute inset-0 bg-[#2b2723]/98 flex flex-col items-center justify-center text-center p-6 md:p-10 rounded-3xl border-4 border-amber-400 z-30"
            >
              <div className="bg-amber-500/10 border border-amber-400/30 p-1.5 rounded-3xl mb-4">
                <Trophy className="w-14 h-14 text-yellow-400 animate-bounce" />
              </div>

              <div className="flex justify-center gap-1.5 mb-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${
                      i < starCount ? 'text-yellow-400 fill-yellow-400 animate-pulse' : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>

              <h4 className="text-2xl font-black text-white tracking-wide">
                Awesome Reading! 太美妙了 🏆
              </h4>
              <p className="text-amber-100/80 text-sm max-w-md mt-2 leading-relaxed font-semibold">
                「{starCount} 顆星大滿貫！你的高低起伏與音腔節奏把握極佳，湯姆和貓咪高興得手舞足蹈，城堡魔法值暴增！」🌟🐱
              </p>

              <button
                onClick={() => setShowSpeechCheck(null)}
                className="mt-6 px-10 py-3 bg-[#e9be88] hover:bg-amber-300 active:scale-95 text-[#2b2723] text-sm font-extrabold rounded-2xl transition-all shadow-md cursor-pointer"
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
