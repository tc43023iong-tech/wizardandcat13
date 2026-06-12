/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, HelpCircle, Eye } from 'lucide-react';
import { WordDetail } from '../types';
import { VOCABULARY_DATA, LITTLE_FOX_QUESTIONS } from '../data';
import { playCorrectSound, playIncorrectSound, playTTS } from './AudioEngine';
import WordPopup from './WordPopup';

export default function FoxQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<WordDetail | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answersStatus, setAnswersStatus] = useState<boolean[]>([]); // Keep success states
  const [showDirectAnswer, setShowDirectAnswer] = useState(false);

  const currentQuestion = LITTLE_FOX_QUESTIONS[currentIndex];

  // Helper to parse question with orange clickable words
  const renderInteractiveText = (text: string) => {
    // List of keys we want to make interactive in the Q&A text itself
    const clickableInQuiz = [
      { key: "pocket", wordId: "6" },
      { key: "pocket?", wordId: "6" },
      { key: "hissed", wordId: "17" },
      { key: "claws?", wordId: "18" },
      { key: "claws", wordId: "18" },
      { key: "servants", wordId: "4" },
      { key: "animals?", wordId: "15" },
      { key: "queen", wordId: "15" }
    ];

    const tokens = text.split(/(\s+)/);
    return tokens.map((token, idx) => {
      const match = clickableInQuiz.find(c => token.toLowerCase().includes(c.key));
      if (match) {
        const detail = VOCABULARY_DATA.find(v => v.id === match.wordId);
        if (detail) {
          return (
            <span key={idx} className="inline-block mx-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWord(detail);
                  playTTS(detail.word);
                }}
                className="font-bold text-orange-500 hover:text-orange-600 underline decoration-2 decoration-orange-300 transition-all focus:outline-none cursor-pointer"
              >
                {token.replace(/[?.,]/g, '')}
              </button>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-1 py-0.5 rounded-md ml-0.5">
                ({detail.zh}) {detail.emoji}
              </span>
              {token.endsWith('?') ? '?' : ''}
            </span>
          );
        }
      }
      return <span key={idx}>{token}</span>;
    });
  };

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isAnsCorrect = option === currentQuestion.answer;
    setIsCorrect(isAnsCorrect);

    if (isAnsCorrect) {
      playCorrectSound();
      setAnswersStatus(prev => {
        const next = [...prev];
        next[currentIndex] = true;
        return next;
      });
    } else {
      playIncorrectSound();
      setAnswersStatus(prev => {
        const next = [...prev];
        next[currentIndex] = false;
        return next;
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < LITTLE_FOX_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setShowDirectAnswer(false);
      playCorrectSound();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setAnswersStatus([]);
    setShowDirectAnswer(false);
    playCorrectSound();
  };

  const handleToggleShowAnswer = () => {
    setShowDirectAnswer(prev => !prev);
    playTTS(currentQuestion.answer);
  };

  // Progress metrics
  const totalQuestions = LITTLE_FOX_QUESTIONS.length;
  const progressPercent = ((currentIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100;
  const correctCount = answersStatus.filter(Boolean).length;

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
      {/* Dynamic Progress Bar */}
      <div className="bg-[#FCFCF9] rounded-2xl p-4 shadow-sm border border-amber-100">
        <div className="flex justify-between items-center text-xs font-bold text-amber-800 mb-2">
          <span>冒險問答進度 Question {currentIndex + 1} of {totalQuestions}</span>
          <span>答對數: {correctCount} / {totalQuestions}</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="relative w-full h-4 bg-amber-100/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 80 }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-[#e07a5f] rounded-full"
          />
        </div>
      </div>

      {/* Main Question Card Board */}
      <div className="relative overflow-hidden bg-white rounded-3xl border-4 border-amber-200 shadow-xl p-6 md:p-10 space-y-8">
        
        {/* Corner icon */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-2xl font-bold border border-amber-200">
          🦊
        </div>

        {/* Question Panel */}
        <div className="space-y-4">
          <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-bold text-xs">
            LITTLE FOX CHALLENGE ✨
          </span>
          
          {/* 🤔 English Question on Top (Bold Large font) */}
          <h3 className="text-2xl md:text-3xl font-black text-[#5c3e16] tracking-tight leading-snug">
            🤔 {renderInteractiveText(currentQuestion.question)}
          </h3>

          <div className="p-3.5 bg-[#f5efe2]/55 border border-amber-105 rounded-2xl text-sm font-semibold text-amber-900 flex items-center gap-2">
            <span>🗣️ 中文譯意：</span>
            <span>{currentQuestion.zh_translation}</span>
          </div>
        </div>

        {/* Options Stack */}
        <div className="space-y-3.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === currentQuestion.answer;
            
            let btnStyle = "bg-[#FCFCF9] border-amber-100/80 text-[#4a453e] hover:border-amber-300 hover:bg-white";
            let iconElement = null;

            if (isAnswered) {
              if (isCorrectOption) {
                btnStyle = "bg-[#f0f7f4] border-[#81b29a] text-[#2b4c3f] ring-2 ring-[#e6f2ec]";
                iconElement = <CheckCircle2 className="w-5 h-5 text-emerald-650 shrink-0" />;
              } else if (isSelected) {
                btnStyle = "bg-[#fcf5f2] border-[#e07a5f] text-[#5c2a1e] ring-2 ring-[#faede6]";
                iconElement = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
              } else {
                btnStyle = "bg-[#FCFCF9]/50 border-amber-50 text-slate-300 opacity-60";
              }
            } else if (showDirectAnswer && isCorrectOption) {
              // Direct answer preview highlighter
              btnStyle = "bg-amber-50 border-amber-300 text-amber-900 animate-pulse ring-2 ring-amber-100";
              iconElement = <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />;
            }

            return (
              <motion.button
                key={idx}
                disabled={isAnswered}
                whileHover={!isAnswered ? { scale: 1.015, x: 4 } : {}}
                whileTap={!isAnswered ? { scale: 0.99 } : {}}
                onClick={() => handleOptionClick(option)}
                className={`w-full p-5 rounded-2.5xl border-3 text-left font-extrabold text-base md:text-lg flex items-center justify-between transition-all gap-4 ${btnStyle} ${!isAnswered ? 'cursor-pointer' : ''}`}
              >
                <span>{option}</span>
                {iconElement}
              </motion.button>
            );
          })}
        </div>

        {/* Hint Banner (Shows after they fail or when requested) */}
        {isAnswered && !isCorrect && (
          <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl text-xs sm:text-sm text-rose-700 font-semibold leading-relaxed flex items-start gap-2">
            <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">魔法提示：</span>
              {currentQuestion.hint}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-amber-100">
          
          {/* Direct Answer reveal support */}
          <button
            onClick={handleToggleShowAnswer}
            disabled={isAnswered}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isAnswered 
                ? 'text-slate-300 border border-amber-100 bg-slate-50 cursor-not-allowed' 
                : showDirectAnswer
                ? 'bg-amber-100 text-amber-700 border border-amber-300'
                : 'text-amber-80 * 10 text-[#4a453e] hover:text-amber-900 bg-[#f5efe2]/70 hover:bg-amber-150 border border-amber-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{showDirectAnswer ? '隱藏提示答案' : '💡 點擊顯示/播放正確答案'}</span>
          </button>

          {/* Next / Result controller */}
          {isAnswered ? (
            currentIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-[#e07a5f] hover:bg-[#ca6347] active:scale-95 text-white font-extrabold rounded-2xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>下一題 Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              /* All questions answered banner */
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-bold block">闖關終了！</span>
                  <span className="text-sm font-bold text-emerald-600">答對 {correctCount} / {totalQuestions} 題</span>
                </div>
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-2.5 bg-[#3d405b] hover:bg-[#2f3146] text-white font-bold rounded-2xl active:scale-95 shadow-md transition-colors cursor-pointer"
                >
                  重來一次 Restart
                </button>
              </motion.div>
            )
          ) : null}
        </div>
      </div>

      {/* Popup Word Detail Modal */}
      {selectedWord && (
        <WordPopup
          wordDetail={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </div>
  );
}
