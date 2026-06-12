/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, Sparkles, AlertCircle, RefreshCw, CheckCircle, Award } from 'lucide-react';
import { WORKSHEET_DATA } from '../data';
import { playCorrectSound, playIncorrectSound, playLevelUpSound, playTTS } from './AudioEngine';

export default function Worksheet() {
  const [mcAnswers, setMcAnswers] = useState<Record<number, string>>({});
  const [tfAnswers, setTfAnswers] = useState<Record<number, string>>({});
  const [shortAnswer, setShortAnswer] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleMcSelect = (qId: number, optionsVal: string) => {
    setMcAnswers(prev => ({ ...prev, [qId]: optionsVal }));
    
    // Check correctness instantly
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

  const calculateScore = () => {
    let score = 0;
    WORKSHEET_DATA.multipleChoice.forEach(q => {
      if (mcAnswers[q.id] === q.answer) score += 20;
    });
    WORKSHEET_DATA.trueFalse.forEach(q => {
      if (tfAnswers[q.id] === q.answer) score += 20;
    });
    if (shortAnswer === WORKSHEET_DATA.shortAnswer.answer) score += 20;
    return score;
  };

  const handleSubmit = () => {
    // Ensure they have attempted all questions
    const mcCompleted = Object.keys(mcAnswers).length === WORKSHEET_DATA.multipleChoice.length;
    const tfCompleted = Object.keys(tfAnswers).length === WORKSHEET_DATA.trueFalse.length;
    const shortCompleted = shortAnswer !== null;

    if (!mcCompleted || !tfCompleted || !shortCompleted) {
      playIncorrectSound();
      alert("還有題目沒有作答哦！請先填寫完所有冒險問題！✍️");
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

  const totalPossible = 100;
  const earnedScore = calculateScore();

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Intro Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-pink-400/10 via-fuchsia-400/15 to-indigo-400/10 border border-pink-100 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-3xl shrink-0 shadow-sm">
          📝
        </div>
        <div>
          <span className="px-3 py-1 text-xs font-bold bg-pink-100 text-pink-700 rounded-full">
            課後複習 Worksheet
          </span>
          <h2 className="text-2xl font-black text-slate-800 mt-2">
            Class Worksheet 課後挑戰學習單
          </h2>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            恭喜你讀完了湯姆和貓咪的大冒險！讓我們像在英文課上一樣，完成這份有趣的數位課堂學習單吧。
            全部寫完後可以按下<b>「提交學習報告」</b>，領取精美的三顆星魔法獎章喔！
          </p>
        </div>
      </div>

      {/* Worksheet Scroll Paper */}
      <div className="bg-[#FCFCF9] rounded-3xl border-3 border-amber-800/20 shadow-xl overflow-hidden relative">
        {/* Background blue notebook lines decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(226,232,240,0.4)_1px,transparent_1px)] [background-size:100%_28px] pointer-events-none mt-16" />

        {/* Paper Header */}
        <div className="bg-gradient-to-r from-orange-450 to-pink-500 p-6 text-white border-b-4 border-orange-500 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-extrabold tracking-wide">
                Wizard & Cat 課程學習單
              </h3>
              <p className="text-xs font-medium text-pink-100">
                School adventure reading comprehension task
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>重新填寫</span>
          </button>
        </div>

        {/* Paper Body */}
        <div className="p-6 md:p-8 space-y-10 relative z-10">
          
          {/* Section 1: Multiple Choice */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-slate-800 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-orange-150 text-orange-700 text-xs rounded-lg">Part I</span>
              <span>Multiple Choice (選擇題) - 每題20分</span>
            </h4>

            {WORKSHEET_DATA.multipleChoice.map((q) => {
              const currentChoice = mcAnswers[q.id];
              const answeredCorrectly = currentChoice === q.answer;

              return (
                <div key={q.id} className="p-5 bg-white/60 rounded-2xl border border-slate-200/60 shadow-xs space-y-4">
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 font-bold font-mono text-xs rounded-md mt-1">Q{q.id}</span>
                    <div>
                      <h5 className="font-extrabold text-base text-slate-800 leading-snug">
                        {q.question} {q.emoji}
                      </h5>
                      <span className="text-xs font-semibold text-slate-400">💡 中文翻譯: {q.zh_question}</span>
                    </div>
                  </div>

                  {/* Options render */}
                  <div className="grid grid-cols-1 gap-2.5 pl-9">
                    {q.options.map((opt) => {
                      const isSelected = currentChoice === opt;
                      const isCorrectAnswer = opt === q.answer;

                      let itemStyle = "border-slate-200 bg-white/80 hover:bg-slate-50/20 text-slate-700";
                      if (currentChoice) {
                        if (isCorrectAnswer) {
                          itemStyle = "border-emerald-300 bg-emerald-50/50 text-emerald-800 ring-1 ring-emerald-110";
                        } else if (isSelected) {
                          itemStyle = "border-rose-300 bg-rose-50/50 text-rose-800 ring-1 ring-rose-110";
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
                          {opt}
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
            <h4 className="text-lg font-black text-slate-800 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-pink-150 text-pink-700 text-xs rounded-lg">Part II</span>
              <span>True or False (是非對錯題) - 每題20分</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WORKSHEET_DATA.trueFalse.map((q, idx) => {
                const currentChoice = tfAnswers[q.id];
                const answeredCorrectly = currentChoice === q.answer;

                return (
                  <div key={q.id} className="p-5 bg-white/60 rounded-2xl border border-slate-200/60 shadow-xs space-y-4">
                    <div className="flex items-start gap-2.5">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 font-bold font-mono text-xs rounded-md mt-1">TF{q.id}</span>
                      <div>
                        <h5 className="font-extrabold text-base text-slate-800 leading-snug">
                          {q.question} {q.emoji}
                        </h5>
                        <span className="text-xs font-semibold text-slate-400">💡 中文翻譯: {q.zh_question}</span>
                      </div>
                    </div>

                    {/* True & False Buttons Symmetrical */}
                    <div className="flex gap-4 pl-9">
                      {["True", "False"].map((choice) => {
                        const isSelected = currentChoice === choice;
                        const isCorrectAnswer = choice === q.answer;

                        let btnStyle = "border-slate-200 hover:border-slate-350 bg-white/80 text-slate-705";
                        if (currentChoice) {
                          if (isCorrectAnswer) {
                            btnStyle = "border-emerald-400 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-100";
                          } else if (isSelected) {
                            btnStyle = "border-rose-400 bg-rose-50 text-rose-805 ring-2 ring-rose-100";
                          } else {
                            btnStyle = "border-slate-100 opacity-65 text-slate-300";
                          }
                        }

                        return (
                          <button
                            key={choice}
                            disabled={!!currentChoice}
                            onClick={() => handleTfSelect(q.id, choice)}
                            className={`flex-1 py-2.5 font-black rounded-lg border-2 text-sm transition-all ${btnStyle} ${!currentChoice ? 'cursor-pointer active:scale-95' : ''}`}
                          >
                            {choice === 'True' ? '✔️ True (是)' : '❌ False (否)'}
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
            <h4 className="text-lg font-black text-slate-800 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-150 text-indigo-700 text-xs rounded-lg">Part III</span>
              <span>Short QA (問題回顧) - 每題20分</span>
            </h4>

            <div className="p-5 bg-white/60 rounded-2xl border border-slate-200/60 shadow-xs space-y-4">
              <div className="flex items-start gap-2.5">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 font-bold font-mono text-xs rounded-md mt-1">Q3</span>
                <div>
                  <h5 className="font-extrabold text-base text-slate-800 leading-snug">
                    {WORKSHEET_DATA.shortAnswer.question} {WORKSHEET_DATA.shortAnswer.emoji}
                  </h5>
                  <span className="text-xs font-semibold text-slate-400">💡 中文翻譯: {WORKSHEET_DATA.shortAnswer.zh_question}</span>
                </div>
              </div>

              {/* Yes & No Buttons Selection */}
              <div className="flex gap-4 pl-9 max-w-sm">
                {WORKSHEET_DATA.shortAnswer.options.map((choice) => {
                  const isSelected = shortAnswer === choice;
                  const isCorrectAnswer = choice === WORKSHEET_DATA.shortAnswer.answer;

                  let btnStyle = "border-slate-200 hover:border-slate-350 bg-white/80 text-slate-705";
                  if (shortAnswer) {
                    if (isCorrectAnswer) {
                      btnStyle = "border-emerald-400 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-100";
                    } else if (isSelected) {
                      btnStyle = "border-rose-400 bg-rose-50 text-rose-805 ring-2 ring-rose-100";
                    } else {
                      btnStyle = "border-slate-100 opacity-65 text-slate-300";
                    }
                  }

                  return (
                    <button
                      key={choice}
                      disabled={shortAnswer !== null}
                      onClick={() => handleShortSelect(choice)}
                      className={`flex-1 py-2.5 font-black rounded-lg border-2 text-sm transition-all ${btnStyle} ${shortAnswer === null ? 'cursor-pointer active:scale-95' : ''}`}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Submit Button */}
          <div className="pt-6 border-t border-slate-250 flex flex-col items-center gap-4">
            <button
              onClick={handleSubmit}
              className="px-10 py-4 rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 text-white font-extrabold text-lg shadow-xl shadow-pink-100 hover:scale-103 active:scale-97 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ClipboardCheck className="w-5 h-5 animate-pulse" />
              <span>提交學習報告 Submit Worksheet</span>
            </button>
            <p className="text-xs font-semibold text-slate-400">
              *請作答完全部 5 題後再點擊提交哦！
            </p>
          </div>
        </div>
      </div>

      {/* Symmetrical Certificate Modal popup */}
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
              className="bg-white rounded-3xl border-8 border-yellow-400 max-w-lg w-full p-6 md:p-8 shadow-2xl relative overflow-hidden text-center space-y-6"
            >
              {/* Back ribbons */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 rotate-45 translate-x-12 -translate-y-12 pointer-events-none opacity-30" />
              
              <Award className="w-20 h-20 text-yellow-500 mx-auto animate-bounce drop-shadow" />
              
              <div>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 font-black text-xs rounded-full uppercase tracking-widest">
                  🧙‍♂️ 魔法閱讀證書 🧙‍♂️
                </span>
                <h4 className="text-2xl font-black text-slate-800 mt-2">
                  學習單圓滿完成！
                </h4>
                <p className="text-xs text-slate-400">
                  Congratulations on finishing Wizard and Cat learning task!
                </p>
              </div>

              {/* Score ring */}
              <div className="bg-yellow-50 p-4 rounded-2xl max-w-xs mx-auto border border-yellow-100">
                <span className="text-xs font-semibold text-amber-800 block uppercase tracking-wider">
                  本次冒險榮譽魔法得分
                </span>
                <span className="text-4xl font-black text-orange-500 font-mono block mt-1">
                  {earnedScore} / {totalPossible} 分!
                </span>
                <div className="flex justify-center gap-1 mt-2 text-xl text-yellow-500">
                  {earnedScore >= 60 ? "⭐" : ""}
                  {earnedScore >= 80 ? "⭐" : ""}
                  {earnedScore === 100 ? "⭐" : ""}
                </div>
              </div>

              {/* Assessment reviews */}
              <p className="text-sm font-medium text-slate-600 px-4 leading-relaxed">
                {earnedScore === 100 
                  ? "「太厲害了！你獲得了 100 分滿分！你對艾瑞克王子的派對、僕人的準備，以及貓咪的心思都瞭若指掌！貓咪高興得呼嚕呼嚕地黏在你腳邊撒嬌呢！」😻🎓" 
                  : earnedScore >= 60 
                  ? "「好棒！你順利通過了學習大挑戰！如果有些不小心的粗心，可以點選重新填寫、大膽再戰一次，去奪取滿分 100 分獎章哦！」✨" 
                  : "「加油！再重讀一次故事，橘色字體的點擊例句會給你極大的答案魔術指引！加油，你一定可以通關的！」✊"}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-sm rounded-xl transition-all cursor-pointer"
                >
                  再考一次 Retry
                </button>
                <button
                  onClick={() => setShowReport(false)}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-extrabold text-sm rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
                >
                  大功告成 Done!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
