/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, AlertCircle, Check, ArrowRight } from 'lucide-react';
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
      <div className="p-6 md:p-8 rounded-3xl bg-[#efefea] border border-slate-300/40 flex flex-col md:flex-row items-center gap-6 animate-fade-in animate-duration-500">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 shadow-sm animate-pulse">
          🗣️
        </div>
        <div>
          <span className="px-3 py-1 text-xs font-bold bg-amber-250 text-amber-950 rounded-full">
            超實用句型 Useful Sentences
          </span>
          <h2 className="text-2xl font-black text-[#5c3e16] mt-2">
            Useful Sentences 生活魔法句
          </h2>
          <p className="text-[#4a453e] text-sm mt-1 leading-relaxed font-semibold">
            故事裡有很多非常實用的句子，不僅湯姆和女王會用到，你在學校、在家裡也天天都可以對朋友說喔！
            點擊卡片聽音檔和日常生活例子，然後完成好玩的 <b>6 題繪本情境測驗</b>，看著可愛的小動物插畫選正確的魔法咒語吧！
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
              className="relative overflow-hidden cursor-pointer rounded-3xl border-3 border-amber-150 hover:border-amber-300 bg-white p-6 shadow-md hover:shadow-lg transition-all"
            >
              {/* Highlight bar header */}
              <div className="absolute top-0 right-0 w-24 h-1.5 bg-gradient-to-r from-amber-400 to-[#e9be88]" />
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                  句型 {item.id}
                </span>
                <button
                  onClick={(e) => handleSpeak(item.sentence, e)}
                  className="p-2.5 rounded-xl bg-amber-100/50 hover:bg-amber-100 text-amber-950 active:scale-90 transition-all cursor-pointer"
                  title="播放聲音"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Illustration Frame */}
              {item.image && (
                <div className="mb-4 aspect-video overflow-hidden rounded-2xl border-2 border-amber-100 bg-amber-50 shadow-xs relative">
                  <img
                    src={item.image}
                    alt={item.sentence}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle decorative bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Big bold quote */}
              <h3 className="text-xl md:text-2xl font-black text-[#2b2723] leading-snug tracking-tight">
                🗣️ &quot;{item.sentence}&quot;
              </h3>
              
              <h4 className="mt-1.5 text-base font-extrabold text-[#603e13]">
                👉 {item.zh}
              </h4>

              <p className="mt-3 text-xs leading-relaxed text-slate-700 font-bold bg-[#fcf9f2] p-3 rounded-xl border border-amber-150/50">
                {item.context}
              </p>

              {/* Examples section */}
              <div className="mt-4 pt-4 border-t border-amber-100/20 space-y-2 text-xs">
                <p className="font-extrabold text-[#5c3e16] uppercase tracking-widest block mb-1">🏫 學校 & 日常生活怎麼用：</p>
                {item.examples.map((ex, exIdx) => {
                  return (
                    <div key={exIdx} className="bg-slate-50 p-2.5 rounded-xl text-[#4a453e] font-semibold leading-relaxed border border-slate-200">
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
      <div className="bg-white rounded-3xl border-4 border-[#e9be88] p-6 md:p-10 shadow-lg space-y-8">
        
        <div className="border-b border-amber-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="px-3 py-1 bg-amber-100 text-amber-950 rounded-full font-extrabold text-xs">
              情境繪本選擇題 Play Quiz
            </span>
            <p className="text-xs text-[#5c3e16] font-bold mt-1">
              Look at the picture book and help the friends choose the correct words!
            </p>
          </div>
          <span className="text-sm font-black text-amber-700 bg-amber-100/50 px-3 py-1 rounded-full font-mono">
            答對題數 Score: {quizScore} / {USEFUL_SENTENCES_QUIZ.length}
          </span>
        </div>

        {/* Dynamic Image and Question Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Picture Book Illustration Frame */}
          {currentQuiz.image && (
            <div className="w-full lg:w-[320px] shrink-0 bg-white p-3 rounded-2.5xl border-3 border-amber-150 shadow-md">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 border border-slate-200">
                <img
                  src={currentQuiz.image}
                  alt="Banana picture book style illustration"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

          {/* Question Text & Choice Options */}
          <div className="flex-1 space-y-6">
            <div className="p-6 rounded-2.5xl bg-[#fbf9f4] border-2 border-amber-150 relative">
              <Sparkles className="w-10 h-10 text-amber-400/20 absolute right-4 bottom-4 animate-pulse pointer-events-none" />
              <h4 className="text-base md:text-lg font-bold text-slate-800 leading-relaxed">
                <span className="text-amber-700 font-extrabold mr-1">Question {quizIndex + 1}:</span>
                <span className="text-[#2b2723] font-black">{currentQuiz.question}</span>
              </h4>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentQuiz.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === currentQuiz.answer;

                let btnStyle = "bg-white border-slate-350 text-slate-800 hover:bg-[#fafaf6] hover:border-amber-300";
                let prefix = "⭐";

                if (isAnswered) {
                  if (isCorrectOption) {
                    btnStyle = "bg-[#81b29a] border-[#6c9b83] text-white shadow-md";
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
                    className={`p-4 rounded-2.5xl border-3 font-black text-sm md:text-base transition-all text-center flex flex-col items-center justify-center gap-2 h-28 ${btnStyle} ${!isAnswered ? 'cursor-pointer active:scale-95' : ''}`}
                  >
                    <span className="text-base">{prefix}</span>
                    <span className="font-sans font-bold leading-tight">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feedback Banner */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2.5xl border flex items-start gap-3 text-xs sm:text-sm font-bold leading-relaxed ${
                isCorrect 
                  ? 'bg-emerald-50 border-emerald-300/60 text-emerald-950' 
                  : 'bg-rose-50 border-rose-300/60 text-rose-950'
              }`}
            >
              {isCorrect ? (
                <>
                  <Check className="w-5 h-5 shrink-0 mt-0.5 text-emerald-700" />
                  <div>
                    <span className="font-extrabold text-emerald-800 text-sm block mb-0.5">🎖️ Splendid Work! 答對了！</span> 
                    這句句子的確是 &quot;{currentQuiz.answer}&quot;！你成功掌握了城堡和生活中的溝通魔咒！✨
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-700" />
                  <div>
                    <span className="font-extrabold text-rose-800 text-sm block mb-0.5">💡 Try again next time! 再想一想喔！</span> 
                    再看看情境內容，正確的求助、命令、或是探查問句是哪一個呢？可以點選上方的複習卡片對抗喔！
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
                className="px-6 py-3 bg-[#e9be88] hover:bg-amber-300 text-[#2b2723] font-black text-sm rounded-2xl flex items-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer border border-[#cfa56f]/30"
              >
                <span>下一題 Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-xs text-amber-950 font-black">🎉 Congratulations! 恭喜完成了全部 6 題！</span>
                <button
                  onClick={handleResetQuiz}
                  className="px-5 py-2.5 bg-[#2b2723] hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow"
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
