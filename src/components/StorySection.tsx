/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, HelpCircle, Check, X, Sparkles, Smile, Trophy } from 'lucide-react';
import { WordDetail } from '../types';
import { VOCABULARY_DATA, FULL_STORY_PARAGRAPHS, LITTLE_FOX_QUESTIONS } from '../data';
import { playTTS, playCorrectSound, playIncorrectSound, playLevelUpSound } from './AudioEngine';
import WordPopup from './WordPopup';

// Mapping of questions to paragraphs (0-indexed referring to LITTLE_FOX_QUESTIONS array)
const PARAGRAPH_QUESTIONS_MAP: Record<number, number[]> = {
  3: [3],    // After Paragraph 3: Question "Whose birthday party were the servants getting ready for?"
  4: [0],    // After Paragraph 4: Question "Who wanted to see Tom?"
  9: [4],    // After Paragraph 9: Question "What does Prince Eric love?"
  10: [1, 2] // After Paragraph 10: Question "Which is true?" & "What did Tom feel in his pocket?"
};

export default function StorySection() {
  const [selectedWord, setSelectedWord] = useState<WordDetail | null>(null);
  const [translatedParagraphs, setTranslatedParagraphs] = useState<Record<number, boolean>>({});
  
  // Track answered Q&A
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<Record<number, boolean>>({});

  // Toggle translation of a paragraph
  const toggleTranslation = (id: number) => {
    setTranslatedParagraphs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Helper styles for sound effects or dramatic items
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

  // Parse text and highlight vocabulary words
  const renderInteractiveEnglish = (text: string) => {
    const parts = text.split(/(\{.*?\})/g);

    return parts.map((part, index) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const wordKey = part.slice(1, -1);
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
                className="font-extrabold text-orange-500 hover:text-[#d36a3e] underline decoration-2 decoration-orange-300 hover:decoration-[#d36a3e] cursor-pointer text-base md:text-lg transition-all focus:outline-none"
              >
                {wordDetail.word}
              </button>
              <span className="text-xs font-bold text-orange-600 bg-orange-100/70 px-1 rounded ml-1 select-none">
                ({wordDetail.zh}) {wordDetail.emoji}
              </span>
            </span>
          );
        } else {
          return <span key={index} className="font-bold text-slate-800">{wordKey}</span>;
        }
      }

      // Check key words for style adjustments
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

  // Smart sentence-by-sentence splitting logic that keeps brackets and quotes matching
  const splitIntoSentences = (text: string): string[] => {
    const sentences: string[] = [];
    let current = "";
    let inBrace = false;
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      current += char;
      if (char === '{') inBrace = true;
      if (char === '}') inBrace = false;
      if (char === '"' || char === '\"') inQuotes = !inQuotes;

      if (!inBrace && (char === '.' || char === '?' || char === '!')) {
        const nextChar = text[i + 1];
        if (!nextChar || nextChar === ' ' || nextChar === '"') {
          if (nextChar === '"') {
            current += '"';
            i++;
          }
          sentences.push(current.trim());
          current = "";
        }
      }
    }
    if (current.trim()) {
      sentences.push(current.trim());
    }
    return sentences.filter(Boolean);
  };

  // Handle choice submission in Q&A
  const handleSelectOption = (qIdx: number, val: string, correct: string) => {
    setAnswers(prev => ({ ...prev, [qIdx]: val }));
    if (val === correct) {
      playCorrectSound();
      // If completed all 5 questions, play spectacular level-up cheer
      const updated = { ...answers, [qIdx]: val };
      if (Object.keys(updated).length === LITTLE_FOX_QUESTIONS.length) {
        setTimeout(() => playLevelUpSound(), 550);
      }
    } else {
      playIncorrectSound();
    }
  };

  // Toggle reveal answer hint
  const toggleHintRevealed = (qIdx: number) => {
    setShowAnswerFeedback(prev => ({ ...prev, [qIdx]: !prev[qIdx] }));
  };

  // Calculate Q&A statistics
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = LITTLE_FOX_QUESTIONS.length;
  const progressPercent = (answeredCount / totalQuestions) * 100;

  return (
    <div className="space-y-12">
      {/* Introduction Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#efefea] border border-slate-300/40 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 shadow-sm animate-bounce">
          📖
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-[#5c3e16] mt-2">
            Wizard and Cat 13: Prince Eric&#39;s Birthday
          </h2>
        </div>
      </div>

      {/* Progress Bar Widget */}
      <div className="p-5 bg-white rounded-2.5xl border border-slate-300/30 shadow-sm space-y-2">
        <div className="flex justify-between items-center text-sm font-extrabold text-[#5c3e16]">
          <span className="flex items-center gap-1.5 text-amber-700">
            👑 Q & A 挑戰學習進度 (Learning Progress):
          </span>
          <span className="bg-amber-100 text-amber-900 px-3 py-0.5 rounded-full text-xs">
            {answeredCount} / {totalQuestions} 已答對
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden p-0.5 border border-slate-200">
          <div 
            className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Story Book Card */}
      <div className="bg-white rounded-3xl border-4 border-amber-200 shadow-xl overflow-hidden animate-fade-in">
        {/* Story Board Title */}
        <div className="bg-gradient-to-r from-amber-100/60 via-[#f9f7f4] to-orange-100/40 p-6 flex items-center justify-between text-[#5c3e16] border-b-4 border-amber-150">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔮</span>
            <div>
              <h3 className="font-extrabold text-lg tracking-wide">
                Story Mode
              </h3>
            </div>
          </div>
        </div>

        {/* Paragraph List with light lines to transition between paragraphs */}
        <div className="divide-y divide-slate-200/70 p-3 md:p-6 bg-[#FCFCF9]">
          {FULL_STORY_PARAGRAPHS.map((para) => {
            const isTranslated = !!translatedParagraphs[para.id];
            const sentences = splitIntoSentences(para.en);
            const embeddedQuizzes = PARAGRAPH_QUESTIONS_MAP[para.id] || [];

            return (
              <div 
                key={para.id} 
                className="py-6 px-4 md:px-6 hover:bg-[#fdfcf0]/40 rounded-2xl transition-all duration-300 relative border border-transparent hover:border-amber-100/35 space-y-4"
              >
                {/* Paragraph Side Number Bullet */}
                <div className="absolute top-6 left-2 w-7 h-7 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs shadow-xs">
                  {para.id}
                </div>

                {/* Translate Button - ☁️ emoji under top-right */}
                <button
                  onClick={() => toggleTranslation(para.id)}
                  className={`absolute top-5 right-3 md:right-5 w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-sm z-10 ${
                    isTranslated 
                      ? 'bg-amber-100 border-amber-300 text-amber-950' 
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                  title={isTranslated ? '隱藏翻譯 Close' : '對照繁體中文 Translate'}
                >
                  <span className="text-base select-none">☁️</span>
                </button>

                <div className="pl-8 pr-8 sm:pr-12 space-y-4">
                  {/* English content sentence-by-sentence */}
                  <div className="space-y-3">
                    {sentences.map((sentence, idx) => (
                      <div 
                        key={idx} 
                        className="text-[#4a453e] text-base md:text-lg font-semibold leading-relaxed tracking-wide flex items-start gap-2.5 hover:text-slate-900 transition-colors mr-2"
                      >
                        <span className="text-[10px] mt-2 shrink-0 text-amber-500">⭐</span>
                        <p className="flex-1">{renderInteractiveEnglish(sentence)}</p>
                      </div>
                    ))}
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
                        <div className="mt-2 p-4 bg-indigo-50/50 border border-indigo-100/30 rounded-2xl text-slate-700 text-sm md:text-base font-bold leading-relaxed">
                          🙋‍♂️ 中文對照翻譯： {para.zh}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Embed Q&A questions associated with this paragraph */}
                  {embeddedQuizzes.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-dashed border-amber-200/60 space-y-4">
                      {embeddedQuizzes.map((qIdx) => {
                        const questionObj = LITTLE_FOX_QUESTIONS[qIdx];
                        const selectedVal = answers[qIdx];
                        const isHintRevealed = !!showAnswerFeedback[qIdx];
                        const isCorrect = selectedVal === questionObj.answer;

                        return (
                          <div 
                            key={qIdx} 
                            className="p-5 md:p-6 rounded-2.5xl bg-gradient-to-b from-[#fdfcf5] to-[#f8f6ee] border-2 border-amber-300/60 shadow-sm space-y-4"
                          >
                            {/* Header metadata label */}
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                                <HelpCircle className="w-3.5 h-3.5 animate-bounce" />
                                Q & A
                              </span>
                              {selectedVal && (
                                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                                  isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {isCorrect ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                  {isCorrect ? "Correct! 答對了" : "Incorrect! 答錯囉"}
                                </span>
                              )}
                            </div>

                            {/* Question sentence */}
                            <div>
                              <p className="text-slate-900 text-base md:text-lg font-black tracking-wide">
                                {questionObj.question}
                              </p>
                            </div>

                            {/* Option buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {questionObj.options.map((opt) => {
                                const isSelected = selectedVal === opt;
                                let btnStyle = "border-slate-300/70 bg-white hover:bg-slate-50 text-slate-800";
                                
                                if (isSelected) {
                                  if (opt === questionObj.answer) {
                                    btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900";
                                  } else {
                                    btnStyle = "bg-rose-100 border-rose-500 text-rose-900";
                                  }
                                }

                                return (
                                  <button
                                    key={opt}
                                    onClick={() => handleSelectOption(qIdx, opt, questionObj.answer)}
                                    className={`px-4 py-2.5 text-sm font-extrabold rounded-xl border-2 transition-all cursor-pointer text-center outline-none active:scale-97 ${btnStyle}`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Interactive Explanation & Show Answer buttons */}
                            <div className="flex gap-2.5 items-center justify-end">
                              <button
                                onClick={() => toggleHintRevealed(qIdx)}
                                className="px-3 py-1.5 text-xs font-bold text-amber-800 bg-[#f5efe2]/40 rounded-lg hover:bg-amber-100 transition-colors shadow-xs cursor-pointer border border-amber-250"
                              >
                                {isHintRevealed ? '隱藏提示 Close Answer' : '點擊顯示答案 Show Answer'}
                              </button>
                            </div>

                            {/* Hint contents section */}
                            <AnimatePresence>
                              {isHintRevealed && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="p-3 bg-amber-50 rounded-xl border border-amber-250 text-[#5c3e16] text-xs font-bold space-y-1.5"
                                >
                                  <p className="text-emerald-800">
                                    💡 正確答案 (Correct Answer)： <b className="underline uppercase">{questionObj.answer}</b>
                                  </p>
                                  {questionObj.hint && (
                                    <p className="text-slate-600 font-medium">
                                      ✨ 提示 (Reading Tip)： {questionObj.hint}
                                    </p>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Words Popup Dialog */}
      {selectedWord && (
        <WordPopup
          wordDetail={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </div>
  );
}
