/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, AlertCircle, HelpCircle, Check, ArrowRight } from 'lucide-react';
import { USEFUL_SENTENCES, USEFUL_SENTENCES_QUIZ } from '../data';
import { playCorrectSound, playIncorrectSound, playTTS } from './AudioEngine';

export default function UsefulSentences() {
  const [activeSentenceId, setActiveSentenceId] = useState<number | null>(null);
  
  // Quiz states
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const currentQuiz = USEFUL_SENTENCES_QUIZ[quizIndex];

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playTTS(text);
  };

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrectAns = option === currentQuiz.answer;
    setIsCorrect(isCorrectAns);

    if (isCorrectAns) {
      playCorrectSound();
      setQuizScore(prev => prev + 1);
    } else {
      playIncorrectSound();
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex < USEFUL_SENTENCES_QUIZ.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      playCorrectSound();
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setQuizScore(0);
    playCorrectSound();
  };

  return (
    <div className="space-y-12">
      {/* Intro Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#f5efe2]/70 border border-amber-100 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 shadow-sm">
          🗣️
        </div>
        <div>
          <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-900 rounded-full">
            超實用句型 Useful Sentences
          </span>
          <h2 className="text-2xl font-black text-[#5c3e16] mt-2">
            Let&#39;s learn useful sentences! 一起學超常用魔法句
          </h2>
          <p className="text-[#4a453e] text-sm mt-1 leading-relaxed">
            故事裡有很多非常實用的句子，不僅湯姆和女王會用到，你在學校、在家裡也天天都可以對朋友用哦！
            點擊下面綠色小卡片卡來聽發音與看生活例子，然後完成好玩的情境對聯吧！
          </p>
        </div>
      </div>

      {/* The 3 Core Sentence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {USEFUL_SENTENCES.map((item) => {
          const isActive = activeSentenceId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveSentenceId(isActive ? null : item.id);
                playTTS(item.sentence);
              }}
              className="relative overflow-hidden cursor-pointer rounded-3xl border-3 border-amber-100 hover:border-amber-300 bg-[#FCFCF9] p-6 shadow-md hover:shadow-xl transition-all"
            >
              {/* Highlight badge tag */}
              <div className="absolute top-0 right-0 w-24 h-1.5 bg-gradient-to-r from-[#e07a5f] to-amber-300" />
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-[#e07a5f] bg-[#faede6] px-3 py-1 rounded-full">
                  句型 {item.id}
                </span>
                <button
                  onClick={(e) => handleSpeak(item.sentence, e)}
                  className="p-2.5 rounded-xl bg-[#faede6] hover:bg-[#f5d9cc] text-[#e07a5f] active:scale-90 transition-all cursor-pointer"
                  title="Speak"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Big bold quote */}
              <h3 className="text-xl md:text-2xl font-black text-[#4a453e] leading-snug tracking-tight">
                🗣️ &quot;{item.sentence}&quot;
              </h3>
              
              <h4 className="mt-1.5 text-base font-extrabold text-[#5c3e16]">
                👉 {item.zh}
              </h4>

              <p className="mt-3 text-xs leading-relaxed text-amber-900/60 font-medium">
                {item.context}
              </p>

              {/* Examples section */}
              <div className="mt-4 pt-4 border-t border-amber-100/20 space-y-2 text-xs">
                <p className="font-bold text-[#5c3e16]/60 uppercase tracking-widest">🏫 學校 & 日常生活怎麼用：</p>
                {item.examples.map((ex, exIdx) => {
                  return (
                    <div key={exIdx} className="bg-[#f5efe2]/30 p-2.5 rounded-xl text-[#4a453e] font-semibold leading-relaxed border border-amber-100/40">
                      💡 {ex}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Situational Quiz Board */}
      <div className="bg-white rounded-3xl border-4 border-amber-250 p-6 md:p-10 shadow-lg space-y-6">
        
        <div className="border-b border-amber-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="px-3 py-1 bg-[#faede6] text-[#e07a5f] rounded-full font-bold text-xs">
              情境聯想測驗 Situations Quiz
            </span>
            <p className="text-xs text-amber-805/60 mt-1">選出最適合該生活場景的一句話！</p>
          </div>
          <span className="text-sm font-black text-[#e07a5f] font-mono">
            答對進度: {quizScore} / {USEFUL_SENTENCES_QUIZ.length}
          </span>
        </div>

        {/* Question Area */}
        <div className="p-6 md:p-8 rounded-2.5xl bg-[#f5efe2]/40 border border-amber-100 mt-4 relative">
          <Sparkles className="w-12 h-12 text-amber-500/15 absolute right-4 bottom-4 animate-pulse pointer-events-none" />
          <h4 className="text-lg md:text-xl font-bold text-[#4a453e] leading-relaxed">
            🙋‍♂️ 情境 {quizIndex + 1}: <br />
            <span className="text-[#5c3e16] font-black tracking-tight">{currentQuiz.situation}</span>
          </h4>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentQuiz.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === currentQuiz.answer;

            let btnStyle = "bg-[#FCFCF9] border-amber-100 text-[#4a453e] hover:border-amber-300";
            let prefix = "⭐";

            if (isAnswered) {
              if (isCorrectOption) {
                btnStyle = "bg-[#81b29a] border-[#6c9b83] text-white shadow-md scale-99";
                prefix = "✅";
              } else if (isSelected) {
                btnStyle = "bg-[#e07a5f] border-[#ca6347] text-white shadow-sm opacity-90 scale-95";
                prefix = "❌";
              } else {
                btnStyle = "bg-[#FCFCF9]/40 border-amber-50 text-amber-700/40 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleAnswer(option)}
                className={`p-4 rounded-2xl border-3 font-extrabold text-sm md:text-base transition-all text-center flex flex-col items-center justify-center gap-1.5 h-28 ${btnStyle} ${!isAnswered ? 'cursor-pointer active:scale-95' : ''}`}
              >
                <span className="text-lg">{prefix}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Banner */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2.5xl border flex items-start gap-2 text-xs sm:text-sm font-semibold ${
                isCorrect 
                  ? 'bg-[#f0f7f4] border-[#81b29a]/20 text-[#2b4c3f]' 
                  : 'bg-[#faede6] border-[#e07a5f]/20 text-[#8f3a25]'
              }`}
            >
              {isCorrect ? (
                <>
                  <Check className="w-5 h-5 shrink-0 mt-0.5 text-[#2b4c3f]" />
                  <div>
                    <span className="font-bold">非常優秀！大家都要聽你的話了！</span> 
                    這句句子的確是 &quot;{currentQuiz.answer}&quot;！你成功掌握了城堡和生活中的溝通魔咒！✨
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#e07a5f]" />
                  <div>
                    <span className="font-bold">咦、好像再想想看？</span> 
                    再看看情境內容，正確的求助、命令、或是探查問句是哪一個呢？可以點選旁邊的複習卡片對比喔！
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forward Action Buttons */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            {quizIndex < USEFUL_SENTENCES_QUIZ.length - 1 ? (
              <button
                onClick={handleNextQuiz}
                className="px-6 py-2.5 bg-[#81b29a] hover:bg-[#6c9b83] text-white font-extrabold text-sm rounded-xl flex items-center gap-2 active:scale-95 transition-all shadow-md shadow-[#81b29a]/10 cursor-pointer"
              >
                <span>下一題 Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-xs text-amber-705 font-bold">🎉 完成所有特訓！</span>
                <button
                  onClick={handleResetQuiz}
                  className="px-5 py-2 bg-[#3d405b] hover:bg-[#2f3146] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  重來一次 Replay
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
