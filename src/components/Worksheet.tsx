/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, RefreshCw, Star, Trophy } from 'lucide-react';
import { WORKSHEET_DATA } from '../data';
import { playCorrectSound, playIncorrectSound, playLevelUpSound } from './AudioEngine';

function highlightBilingual(text: string): React.ReactNode {
  if (!text) return "";
  const regex = /\b((?:[A-Z][a-zA-Z'\-]*\s+)?[A-Z][a-zA-Z'\-]*|[a-zA-Z'\-]+)\s*(\([\u4e00-\u9fa50-9a-zA-Z\s,，.。!！?？、/\\：:——]+?\))/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      elements.push(text.substring(lastIndex, matchIndex));
    }
    const englishPart = match[1];
    const chinesePart = match[2];
    elements.push(
      <span key={matchIndex} className="bg-yellow-200 text-slate-950 font-extrabold px-1.5 py-0.5 rounded border-b-2 border-yellow-400 shadow-3xs inline-block mx-0.5">
        {englishPart} {chinesePart}
      </span>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }
  return <>{elements}</>;
}

export default function Worksheet() {
  const [mcAnswers, setMcAnswers] = useState<Record<number, string>>({});
  const [tfAnswers, setTfAnswers] = useState<Record<number, string>>({});
  const [shortAnswer, setShortAnswer] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleMcSelect = (qId: number, optionsVal: string) => {
    setMcAnswers(prev => ({ ...prev, [qId]: optionsVal }));
    
    const qObj = WORKSHEET_DATA.multipleChoice.find(q => q.id === qId);
    if (qObj) {
      if (optionsVal === qObj.answer) {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
    }
  };

  const handleTfSelect = (qId: number, value: string) => {
    setTfAnswers(prev => ({ ...prev, [qId]: value }));

    const qObj = WORKSHEET_DATA.trueFalse.find(q => q.id === qId);
    if (qObj) {
      if (value === qObj.answer) {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
    }
  };

  const handleShortSelect = (value: string) => {
    setShortAnswer(value);
    if (value === WORKSHEET_DATA.shortAnswer.answer) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const calculateStars = () => {
    let correctCount = 0;
    WORKSHEET_DATA.multipleChoice.forEach(q => {
      if (mcAnswers[q.id] === q.answer) correctCount += 1;
    });
    WORKSHEET_DATA.trueFalse.forEach(q => {
      if (tfAnswers[q.id] === q.answer) correctCount += 1;
    });
    if (shortAnswer === WORKSHEET_DATA.shortAnswer.answer) correctCount += 1;
    
    if (correctCount === 5) return 3; // 3 Stars
    if (correctCount >= 3) return 2; // 2 Stars
    return 1; // 1 Star
  };

  const getCorrectCount = () => {
    let count = 0;
    WORKSHEET_DATA.multipleChoice.forEach(q => {
      if (mcAnswers[q.id] === q.answer) count += 1;
    });
    WORKSHEET_DATA.trueFalse.forEach(q => {
      if (tfAnswers[q.id] === q.answer) count += 1;
    });
    if (shortAnswer === WORKSHEET_DATA.shortAnswer.answer) count += 1;
    return count;
  };

  const handleSubmit = () => {
    // Ensure they have attempted all questions
    const mcCompleted = Object.keys(mcAnswers).length === WORKSHEET_DATA.multipleChoice.length;
    const tfCompleted = Object.keys(tfAnswers).length === WORKSHEET_DATA.trueFalse.length;
    const shortCompleted = shortAnswer !== null;

    if (!mcCompleted || !tfCompleted || !shortCompleted) {
      playIncorrectSound();
      alert("還有題目沒有作答哦！請先答完所有挑戰問題！✍️");
      return;
    }

    playLevelUpSound();
    setShowReport(true);
  };

  const handleReset = () => {
    setMcAnswers({});
    setTfAnswers({});
    setShortAnswer(null);
    setShowReport(false);
    playCorrectSound();
  };

  const starsEarned = calculateStars();
  const correctNum = getCorrectCount();

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Intro Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#efefea] border border-slate-300/40 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 shadow-sm animate-pulse">
          📝
        </div>
        <div>
          <span className="px-3 py-1 text-xs font-bold bg-amber-250 text-amber-950 rounded-full">
            課後複習 Worksheet
          </span>
          <h2 className="text-2xl font-black text-[#5c3e16] mt-2">
            Class Worksheet 課堂學習單
          </h2>
        </div>
      </div>

      {/* Worksheet Scroll Paper */}
      <div className="bg-[#FCFCF9] rounded-3xl border-3 border-amber-800/20 shadow-xl overflow-hidden relative">
        {/* Background blue notebook lines decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(226,232,240,0.4)_1px,transparent_1px)] [background-size:100%_28px] pointer-events-none mt-16" />

        {/* Paper Header */}
        <div className="bg-gradient-to-r from-amber-200 to-[#e9be88] p-6 text-[#5c3e16] border-b-4 border-amber-300 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-[#5c3e16]" />
            <div>
              <h3 className="text-xl font-extrabold tracking-wide">
                Wizard &amp; Cat 課堂學習單
              </h3>
              <p className="text-xs font-bold text-amber-950/75">
                School adventure reading comprehension task
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-[#2b2723] hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>重新填寫 Replay</span>
          </button>
        </div>

        {/* Paper Body */}
        <div className="p-6 md:p-8 space-y-10 relative z-10">
          
          {/* Section 1: Multiple Choice */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-[#5c3e16] border-b-2 border-amber-200/50 pb-2 flex items-center gap-2 select-none">
              <span className="px-3 py-0.5 bg-amber-100 text-amber-955 text-xs font-bold rounded-lg">Part I</span>
              <span>Multiple Choice 單選選擇題</span>
            </h4>

            {WORKSHEET_DATA.multipleChoice.map((q) => {
              const currentChoice = mcAnswers[q.id];

              return (
                <div key={q.id} className="p-5 bg-white/70 rounded-2xl border border-slate-200/60 shadow-xs space-y-4">
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 font-bold font-mono text-xs rounded-md mt-1">Q{q.id}</span>
                    <div>
                      <h5 className="font-extrabold text-base text-[#2b2723] leading-snug">
                        {highlightBilingual(q.question)} {q.emoji}
                      </h5>
                    </div>
                  </div>

                  {/* Options render */}
                  <div className="grid grid-cols-1 gap-2.5 pl-9">
                    {q.options.map((opt) => {
                      const isSelected = currentChoice === opt;
                      const isCorrectAnswer = opt === q.answer;

                      let itemStyle = "border-slate-200 bg-white hover:bg-slate-50/50 text-slate-700";
                      if (currentChoice) {
                        if (isCorrectAnswer) {
                          itemStyle = "border-emerald-300 bg-emerald-50/60 text-emerald-900 font-extrabold";
                        } else if (isSelected) {
                          itemStyle = "border-rose-300 bg-rose-50/60 text-rose-900 font-extrabold";
                        } else {
                          itemStyle = "border-slate-100 opacity-60 text-slate-400";
                        }
                      }

                      return (
                        <button
                          key={opt}
                          disabled={!!currentChoice}
                          onClick={() => handleMcSelect(q.id, opt)}
                          className={`p-3.5 rounded-xl border-2 text-left font-bold text-sm transition-all ${itemStyle} ${!currentChoice ? 'cursor-pointer' : ''}`}
                        >
                          {highlightBilingual(opt)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section 2: True or False */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-[#5c3e16] border-b-2 border-amber-200/50 pb-2 flex items-center gap-2 select-none">
              <span className="px-3 py-0.5 bg-amber-100 text-amber-955 text-xs font-bold rounded-lg">Part II</span>
              <span>True or False 是非問答題</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WORKSHEET_DATA.trueFalse.map((q) => {
                const currentChoice = tfAnswers[q.id];

                return (
                  <div key={q.id} className="p-5 bg-white/70 rounded-2xl border border-slate-200/60 shadow-xs space-y-4">
                    <div className="flex items-start gap-2.5">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 font-bold font-mono text-xs rounded-md mt-1">TF{q.id}</span>
                      <div>
                        <h5 className="font-extrabold text-base text-[#2b2723] leading-snug">
                          {highlightBilingual(q.question)} {q.emoji}
                        </h5>
                      </div>
                    </div>

                    {/* True & False Buttons */}
                    <div className="flex gap-4 pl-9">
                      {["True", "False"].map((choice) => {
                        const isSelected = currentChoice === choice;
                        const isCorrectAnswer = choice === q.answer;

                        let btnStyle = "border-slate-200 hover:border-slate-350 bg-white text-slate-700";
                        if (currentChoice) {
                          if (isCorrectAnswer) {
                            btnStyle = "border-emerald-400 bg-emerald-50 text-emerald-900";
                          } else if (isSelected) {
                            btnStyle = "border-rose-400 bg-rose-50 text-rose-900";
                          } else {
                            btnStyle = "border-slate-100 opacity-65 text-slate-300";
                          }
                        }

                        return (
                          <button
                            key={choice}
                            disabled={!!currentChoice}
                            onClick={() => handleTfSelect(q.id, choice)}
                            className={`flex-1 py-3 font-extrabold rounded-xl border-2 text-sm transition-all ${btnStyle} ${!currentChoice ? 'cursor-pointer active:scale-95' : ''}`}
                          >
                            {choice === 'True' ? '👍 True' : '👎 False'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Short Answer Yes/No */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-[#5c3e16] border-b-2 border-amber-200/50 pb-2 flex items-center gap-2 select-none">
              <span className="px-3 py-0.5 bg-amber-100 text-amber-955 text-xs font-bold rounded-lg">Part III</span>
              <span>Short QA 問題回顧</span>
            </h4>

            <div className="p-5 bg-white/70 rounded-2xl border border-slate-200/60 shadow-xs space-y-4">
              <div className="flex items-start gap-2.5">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 font-bold font-mono text-xs rounded-md mt-1">QA3</span>
                <div>
                  <h5 className="font-extrabold text-base text-[#2b2723] leading-snug">
                    {highlightBilingual(WORKSHEET_DATA.shortAnswer.question)} {WORKSHEET_DATA.shortAnswer.emoji}
                  </h5>
                </div>
              </div>

              {/* Yes & No Buttons Selection */}
              <div className="flex gap-4 pl-9 max-w-md">
                {WORKSHEET_DATA.shortAnswer.options.map((choice) => {
                  const isSelected = shortAnswer === choice;
                  const isCorrectAnswer = choice === WORKSHEET_DATA.shortAnswer.answer;

                  let btnStyle = "border-slate-200 hover:border-slate-350 bg-white text-slate-700";
                  if (shortAnswer) {
                    if (isCorrectAnswer) {
                      btnStyle = "border-emerald-400 bg-emerald-50 text-emerald-900";
                    } else if (isSelected) {
                      btnStyle = "border-rose-400 bg-rose-50 text-rose-900";
                    } else {
                      btnStyle = "border-slate-100 opacity-65 text-slate-300";
                    }
                  }

                  return (
                    <button
                      key={choice}
                      disabled={shortAnswer !== null}
                      onClick={() => handleShortSelect(choice)}
                      className={`flex-1 py-3 font-extrabold rounded-xl border-2 text-sm transition-all ${btnStyle} ${shortAnswer === null ? 'cursor-pointer active:scale-95' : ''}`}
                    >
                      {highlightBilingual(choice)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Submit Button */}
          <div className="pt-6 border-t border-slate-200 flex flex-col items-center gap-3">
            <button
              onClick={handleSubmit}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-[#e9be88] text-[#2b2723] font-black text-sm hover:scale-103 active:scale-97 transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <ClipboardCheck className="w-5 h-5 animate-pulse" />
              <span>提交學習報告 Submit Worksheet</span>
            </button>
            <p className="text-xs font-semibold text-slate-400">
              請作答完全部問題，即可獲得你應得的故事證章！🌸
            </p>
          </div>
        </div>
      </div>

      {/* Achievement Stars Certificate Modal */}
      <AnimatePresence>
        {showReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.85, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              className="bg-white rounded-3xl border-8 border-[#e9be88] max-w-lg w-full p-6 md:p-8 shadow-2xl relative overflow-hidden text-center space-y-6"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-450 rotate-45 translate-x-12 -translate-y-12 pointer-events-none opacity-20" />
              
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
              
              <div>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 font-black text-xs rounded-full tracking-widest">
                  🧙‍♂️ 魔法閱讀證書 Character Badge 🧙‍♂️
                </span>
                <h4 className="text-2xl font-black text-slate-800 mt-2">
                  課堂挑戰圓滿通關！
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Congratulations on completing the reading task!
                </p>
              </div>

              {/* Stars display */}
              <div className="bg-[#fcfbf7] p-5 rounded-2.5xl max-w-xs mx-auto border border-amber-150/50 space-y-2">
                <span className="text-xs font-extrabold text-amber-900 block uppercase tracking-wider">
                  你獲得的星等榮譽 (Stars Earned)
                </span>
                <div className="flex justify-center gap-2 py-1">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-10 h-10 ${
                        idx < starsEarned 
                          ? 'text-yellow-400 fill-yellow-400 animate-pulse' 
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Assessment message (purely star value based, no points) */}
              <p className="text-sm font-semibold text-slate-600 px-2 leading-relaxed">
                {starsEarned === 3
                  ? "「太驚人了！你獲得了三顆星大滿貫肯定！你把艾瑞克王子的生日、裝飾物以及魔法小貓咪對討厭小狗的哈氣特徵記得一清二楚！貓咪都高興得跳進你的懷裡了呢！」😻🎓" 
                  : "「非常棒！你順利通過了所有的單詞對錯考究，點擊重新填寫、再次熟讀可以爭取圓滿的三顆星黃金徽章喔！我們一起加油！」✨👏"}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-sm rounded-xl transition-all cursor-pointer"
                >
                  再跑一次 Try Again
                </button>
                <button
                  onClick={() => setShowReport(false)}
                  className="flex-1 py-3 bg-[#2b2723] hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl transition-all active:scale-95 cursor-pointer shadow"
                >
                  大功告成 Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
