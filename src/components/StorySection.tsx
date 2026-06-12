/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, BookOpen, Languages, Sparkles, Mic, HelpCircle, Star } from 'lucide-react';
import { WordDetail } from '../types';
import { VOCABULARY_DATA, FULL_STORY_PARAGRAPHS } from '../data';
import { playTTS, playCorrectSound } from './AudioEngine';
import WordPopup from './WordPopup';

export default function StorySection() {
  const [selectedWord, setSelectedWord] = useState<WordDetail | null>(null);
  const [translatedParagraphs, setTranslatedParagraphs] = useState<Record<number, boolean>>({});
  const [activeShadowTab, setActiveShadowTab] = useState<'dialogue' | 'action'>('dialogue');
  const [showSpeechCheck, setShowSpeechCheck] = useState<string | null>(null);

  // Toggle translation of a paragraph
  const toggleTranslation = (id: number) => {
    setTranslatedParagraphs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Helper to test if a word needs special emotion/action styling
  const getSpecialWordStyle = (word: string) => {
    const w = word.toLowerCase().replace(/[^a-zA-Z]/g, '');
    if (w === 'hiss') return "bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-lg border-2 border-rose-300 font-extrabold rotate-3 inline-block animate-bounce";
    if (w === 'ahchoo') return "bg-sky-100 text-sky-600 px-2 py-0.5 rounded-lg border border-sky-300 font-extrabold -rotate-3 inline-block animate-pulse";
    if (w === 'snapped') return "text-orange-600 font-bold underline decoration-wavy decoration-orange-400";
    if (w === 'fool') return "text-purple-600 font-black italic tracking-widest";
    if (w === 'uhoh') return "bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded-sm animate-bounce inline-block";
    return "";
  };

  const getSpecialEmoji = (word: string) => {
    const w = word.toLowerCase().replace(/[^a-zA-Z]/g, '');
    if (w === 'hiss') return " 😾⚡";
    if (w === 'ahchoo') return " 🤧💨";
    if (w === 'snapped') return " 😠";
    if (w === 'fool') return " 🤪";
    if (w === 'uhoh') return " 🗯️";
    return "";
  };

  // Parse paragraphs and inject interactive orange vocabulary and brackets Chinese translation
  const renderInteractiveEnglish = (text: string) => {
    // Regex splits on curly braces {Royal Ballroom}
    const parts = text.split(/(\{.*?\})/g);

    return parts.map((part, index) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const wordKey = part.slice(1, -1);
        // Find in our vocabulary database
        const wordDetail = VOCABULARY_DATA.find(
          v => v.word.toLowerCase() === wordKey.toLowerCase()
        );

        if (wordDetail) {
          return (
            <span key={index} className="inline-block mx-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWord(wordDetail);
                  playTTS(wordDetail.word);
                }}
                className="font-bold text-orange-500 hover:text-orange-600 underline decoration-2 decoration-orange-300 hover:decoration-orange-500 cursor-pointer text-base md:text-lg transition-all focus:outline-none"
              >
                {wordDetail.word}
              </button>
              <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-md ml-1 inline-block">
                ({wordDetail.zh}) {wordDetail.emoji}
              </span>
            </span>
          );
        } else {
          return <span key={index} className="font-semibold text-slate-700">{wordKey}</span>;
        }
      }

      // Check key words in the normal text to see if they need playful emojis or action styles
      const words = part.split(/(\s+)/);
      return words.map((w, wIdx) => {
        const style = getSpecialWordStyle(w);
        const emoji = getSpecialEmoji(w);
        if (style) {
          return (
            <span key={`${index}-${wIdx}`} className={`${style} mx-0.5 inline-block`}>
              {w}{emoji}
            </span>
          );
        }
        return <span key={`${index}-${wIdx}`}>{w}</span>;
      });
    });
  };

  const handleSpeakFullParagraph = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Strip curly braces for TTS clean reading
    const cleanText = text.replace(/\{/g, '').replace(/\}/g, '');
    playTTS(cleanText);
  };

  const triggerShadowSuccess = (id: string) => {
    playCorrectSound();
    setShowSpeechCheck(id);
    setTimeout(() => {
      setShowSpeechCheck(null);
    }, 3000);
  };

  return (
    <div className="space-y-12">
      {/* Introduction Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#f5efe2] border border-amber-200/80 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-100/80 flex items-center justify-center text-3xl shrink-0 shadow-sm">
          📖
        </div>
        <div>
          <span className="px-3 py-1 text-xs font-bold bg-amber-200 text-amber-900 rounded-full">
            小三可愛伴讀 Story Mode
          </span>
          <h2 className="text-2xl font-black text-[#5c3e16] mt-2">
            Wizard and Cat 13: Prince Eric's Birthday
          </h2>
          <p className="text-[#4a453e] text-sm mt-1 leading-relaxed">
            親愛的小朋友，一起來讀讀看湯姆和神奇貓咪的冒險故事吧！
            點擊<span className="text-amber-700 font-bold">橘色單字</span>可以學發音、音標與例句，
            旁邊還有<span className="text-[#3d405b] font-bold">「繁體中文翻譯」</span>按鈕可以對照偷偷看喔！✨
          </p>
        </div>
      </div>

      {/* Main Story Board */}
      <div className="bg-white rounded-3xl border-4 border-amber-200 shadow-xl overflow-hidden animate-fade-in">
        {/* Story Board Title */}
        <div className="bg-gradient-to-r from-amber-100 via-amber-200/50 to-orange-100 p-6 flex flex-col sm:flex-row justify-between items-center text-amber-950 border-b-4 border-amber-200 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔮</span>
            <div>
              <h3 className="font-extrabold text-xl tracking-wide">
                聽故事學英文 Read Section
              </h3>
              <p className="text-xs text-amber-900 font-medium opacity-80">
                點擊橘色字會有發音跟例句喔！
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              // Read all clean text of paragraph 1 to 10
              const fullText = FULL_STORY_PARAGRAPHS.map(p => p.en.replace(/\{/g, '').replace(/\}/g, '')).join(' ');
              playTTS(fullText.slice(0, 300) + "..."); // Just standard sample
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-orange-600 hover:bg-orange-50 active:scale-95 text-sm font-bold rounded-2xl shadow-sm transition-all cursor-pointer border border-amber-105"
          >
            <Volume2 className="w-4 h-4" />
            <span>朗讀全部故事 (前半段)</span>
          </button>
        </div>

        {/* Paragraph List */}
        <div className="divide-y divide-amber-100/40 p-2 md:p-6 bg-[#FCFCF9]">
          {FULL_STORY_PARAGRAPHS.map((para, index) => {
            const isTranslated = !!translatedParagraphs[para.id];
            return (
              <div 
                key={para.id} 
                className="py-6 px-4 hover:bg-[#fdfcf0]/50 rounded-2xl transition-all duration-300 group relative border border-transparent hover:border-amber-100/55"
              >
                {/* Paragraph number banner */}
                <div className="absolute top-6 -left-2 w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shadow-xs">
                  {para.id}
                </div>

                <div className="pl-6 space-y-4">
                  {/* English content */}
                  <div className="text-[#4a453e] text-base md:text-lg font-medium leading-relaxed tracking-wide">
                    {renderInteractiveEnglish(para.en)}
                  </div>

                  {/* Actions Row */}
                  <div className="flex gap-2.5 pt-2">
                    {/* Read Paragraph button */}
                    <button
                      onClick={(e) => handleSpeakFullParagraph(para.en, e)}
                      className="p-1 px-3 text-xs font-semibold text-amber-800 hover:text-[#e07a5f] bg-[#f5efe2]/60 hover:bg-amber-100 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Read this paragraph"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>聽朗讀</span>
                    </button>

                    {/* Translate toggle button */}
                    <button
                      onClick={() => toggleTranslation(para.id)}
                      className={`p-1 px-3 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                        isTranslated 
                          ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                          : 'bg-[#f5efe2]/60 text-amber-800 text-[#4a453e] hover:bg-amber-100 hover:text-amber-900'
                      }`}
                    >
                      <Languages className="w-3.5 h-3.5" />
                      <span>{isTranslated ? '隱藏翻譯' : '翻譯成繁體中文'}</span>
                    </button>
                  </div>

                  {/* Translated content with animation */}
                  <AnimatePresence>
                    {isTranslated && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-4 bg-indigo-50/50 border border-indigo-100/50 rounded-2xl text-slate-600 text-sm md:text-base font-semibold leading-relaxed">
                          🧑‍🏫 中文對照： {para.zh}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shadow Reading Section */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-amber-500 bg-[#2b2723] p-6 md:p-8 text-[#fdfcf0] shadow-xl">
        {/* Background stars */}
        <div className="absolute top-0 right-0 p-3 opacity-20 text-amber-200 text-6xl pointer-events-none select-none font-sans animate-pulse">
          ✨🔮✨
        </div>

        {/* Heading */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-2xl shadow-sm shadow-amber-500/30">
              🎤
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Shadow Reading 影子模仿朗讀
              </h3>
              <p className="text-xs text-amber-200 font-medium">
                練習大聲說英文！模仿驚訝、生氣與好玩聲音
              </p>
            </div>
          </div>

          {/* Quick Tab Pick */}
          <div className="flex gap-2 bg-[#1c1a17] p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveShadowTab('dialogue')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeShadowTab === 'dialogue' 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'text-amber-200/60 hover:text-white'
              }`}
            >
              選段一：角色對話
            </button>
            <button
              onClick={() => setActiveShadowTab('action')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeShadowTab === 'action' 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'text-amber-200/60 hover:text-white'
              }`}
            >
              選段二：趣味聲音
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeShadowTab === 'dialogue' ? (
          <div className="space-y-6">
            <div className="p-4 bg-[#1c1a17]/50 rounded-2.5xl border border-amber-500/30">
              <span className="text-xs font-bold text-amber-200 tracking-wider">🌟 聽一聽、大聲模仿</span>
              
              {/* Dialogue Script */}
              <div className="mt-4 space-y-4">
                {/* Line 1 */}
                <div className="flex items-start gap-3 bg-[#13110f]/60 p-3 rounded-2xl relative">
                  <span className="text-2xl mt-1 shrink-0">🧙‍♂️</span>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-amber-300">Tom (好奇發問)</span>
                    <p className="text-lg font-bold text-white leading-snug">
                      &quot;What's going on?&quot;
                    </p>
                    <p className="text-xs text-amber-200/60 mt-1">💡 影子朗讀提示：聲音往上揚，呈現出好奇、大大的疑問！🗣️</p>
                  </div>
                  <button 
                    onClick={() => playTTS("What's going on?")}
                    className="p-2.5 rounded-xl bg-[#24211e] hover:bg-[#34302d] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer self-center"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Line 2 */}
                <div className="flex items-start gap-3 bg-[#13110f]/60 p-3 rounded-2xl relative">
                  <span className="text-2xl mt-1 shrink-0">🐱</span>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-teal-300">Cat (分享秘密)</span>
                    <p className="text-lg font-bold text-white leading-snug">
                      &quot;There's a birthday party tomorrow.&quot;
                    </p>
                    <p className="text-xs text-amber-200/60 mt-1">💡 影子朗讀提示：像在跟同伴說悄悄話，速度平穩、放輕聲調喔！🤫</p>
                  </div>
                  <button 
                    onClick={() => playTTS("There's a birthday party tomorrow.")}
                    className="p-2.5 rounded-xl bg-[#24211e] hover:bg-[#34302d] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer self-center"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Line 3 */}
                <div className="flex items-start gap-3 bg-[#13110f]/60 p-3 rounded-2xl relative">
                  <span className="text-2xl mt-1 shrink-0">😠</span>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-rose-400">Dirk (大聲命令)</span>
                    <p className="text-lg font-bold text-white leading-snug">
                      &quot;Come with me!&quot;
                    </p>
                    <p className="text-xs text-amber-200/60 mt-1">💡 影子朗讀提示：大聲、用力、命令的口氣粗魯地說出來！💨</p>
                  </div>
                  <button 
                    onClick={() => playTTS("Come with me!")}
                    className="p-2.5 rounded-xl bg-[#24211e] hover:bg-[#34302d] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer self-center"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Micro Interaction Recorder Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2.5xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-sm">
                <span className="font-bold text-amber-300 block">🎤 大聲念一遍挑戰</span>
                讀完了嗎？按下麥克風「大聲念出這三行」，讓魔法貓咪給你評分！
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerShadowSuccess('dialogue')}
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  <span>我念完了！</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-[#1c1a17]/50 rounded-2.5xl border border-amber-500/30">
              <span className="text-xs font-bold text-amber-200 tracking-wider">🤧 狀聲詞超逗趣模仿</span>

              {/* Action Script */}
              <div className="mt-4 space-y-4">
                {/* Line 1 */}
                <div className="flex items-start gap-3 bg-[#13110f]/60 p-3 rounded-2xl relative">
                  <span className="text-2xl mt-1 shrink-0">👑</span>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-yellow-300">The Queen (大哈啾)</span>
                    <p className="text-lg font-bold text-white leading-snug">
                      &quot;Ah-choo!&quot; <span className="text-sm text-sky-200">(The queen sneezed.)</span>
                    </p>
                    <p className="text-xs text-amber-200/60 mt-1">💡 影子朗讀提示：真誠大聲地表演哈啾打噴嚏，全班最愛模仿！🤧</p>
                  </div>
                  <button 
                    onClick={() => playTTS("Ah-choo! The queen sneezed.")}
                    className="p-2.5 rounded-xl bg-[#24211e] hover:bg-[#34302d] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer self-center"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Line 2 */}
                <div className="flex items-start gap-3 bg-[#13110f]/60 p-3 rounded-2xl relative">
                  <span className="text-2xl mt-1 shrink-0">🤵</span>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-orange-300">Tom (不可置信)</span>
                    <p className="text-lg font-bold text-white leading-snug">
                      &quot;A dog?&quot; <span className="text-sm text-amber-250">(Tom repeated.)</span>
                    </p>
                    <p className="text-xs text-amber-200/60 mt-1">💡 影子朗讀提示：尾音無限拉高，表現出十分驚訝和不安！🐶❓</p>
                  </div>
                  <button 
                    onClick={() => playTTS("A dog? Tom repeated")}
                    className="p-2.5 rounded-xl bg-[#24211e] hover:bg-[#34302d] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer self-center"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Line 3 */}
                <div className="flex items-start gap-3 bg-[#13110f]/60 p-3 rounded-2xl relative">
                  <span className="text-2xl mt-1 shrink-0">🐈</span>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-rose-300">Cat (瘋狂生氣哈氣)</span>
                    <p className="text-lg font-black tracking-widest text-rose-450 leading-snug">
                      Hiss!
                    </p>
                    <p className="text-xs text-amber-200/60 mt-1">💡 影子朗讀提示：牙齒咬合，發出貓咪狂怒嘶吼警告的「嘶——」聲音！😼💨</p>
                  </div>
                  <button 
                    onClick={() => playTTS("Hiss")}
                    className="p-2.5 rounded-xl bg-[#24211e] hover:bg-[#34302d] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer self-center"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Micro Interaction Recorder Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2.5xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-sm">
                <span className="font-bold text-rose-300 block">🐈 戲劇效果聲音挑戰</span>
                大聲模仿女王打噴嚏和生氣哈氣吧，演得越逼真魔法值越高！
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerShadowSuccess('action')}
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  <span>我念完了！</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback popup with AnimatePresence */}
        <AnimatePresence>
          {showSpeechCheck && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="absolute inset-0 bg-[#2b2723]/95 flex flex-col items-center justify-center text-center p-6 rounded-2.5xl border border-amber-300"
            >
              <div className="text-5xl animate-bounce mb-3">⭐⭐⭐</div>
              <h4 className="text-2xl font-black text-amber-300">Fantastic Reading! 🌟</h4>
              <p className="text-amber-100 max-w-sm text-sm mt-1">
                「太棒了！你的語氣與高低起伏分明，貓咪聽了高興得翻滾打滾！」🐾✨
              </p>
              <button 
                onClick={() => setShowSpeechCheck(null)} 
                className="mt-4 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                關閉 Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global Word Details Popup Modal */}
      {selectedWord && (
        <WordPopup
          wordDetail={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </div>
  );
}
