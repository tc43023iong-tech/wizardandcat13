/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Play, RotateCcw, Award, Flame, User, Users, Sparkles } from 'lucide-react';
import { WordDetail } from '../types';
import { VOCABULARY_DATA } from '../data';
import { playCorrectSound, playIncorrectSound, playMatchSound, playLevelUpSound, playTTS } from './AudioEngine';

// Words excluded specifically for public class efficiency
const WORDS_TO_EXCLUDE = [
  'streamers', 'appeared', 'blew', 'wriggled', 'majesty', 
  'hung', 'was still', 'repeated', 'bowed', 'pulled out', 
  'peeked', 'heard', 'hurried', 'ceiling', 'at once',
  'thought', 'handkerchief', 'throne', 'snapped', 'hiss'
];

const FILTERED_VOCABULARY_DATA = VOCABULARY_DATA.filter(
  vocab => !WORDS_TO_EXCLUDE.includes(vocab.word.toLowerCase())
);
import WordPopup from './WordPopup';

interface CardItem {
  id: string; // "word_id-en" or "word_id-zh"
  wordId: string;
  text: string;
  type: 'en' | 'zh';
  isMatched: boolean;
}

const SEQUENCING_CARDS = [
  {
    id: "seq_ballroom",
    order: 1,
    image: "/assets/images/seq_ballroom_1781343586736.jpg",
    narrative: "Tom looked inside the Royal Ballroom. Servants were putting flowers on the tables.",
    hint: "派對佈置：僕人在皇家宴會廳裡擺放漂亮的鮮花與裝飾彩帶。"
  },
  {
    id: "seq_dirk",
    order: 2,
    image: "/assets/images/seq_dirk_1781343624696.jpg",
    narrative: "Dirk snapped: 'The queen wants to see you at once. Come with me!'",
    hint: "傳達命令：脾氣不好的德克突然冒出來，命令湯姆去見女王陛下。"
  },
  {
    id: "seq_queen",
    order: 3,
    image: "/assets/images/seq_queen_1781343638059.jpg",
    narrative: "The queen sneezed 'Ah-choo!' and told Tom about a special gift.",
    hint: "女王哈啾：女王感冒打了好大的噴嚏，告訴湯姆她需要生日禮物幫忙。"
  },
  {
    id: "seq_pocket",
    order: 4,
    image: "/assets/images/seq_pocket_1781343649071.jpg",
    narrative: "Cat hissed and scratched with sharp claws inside Tom's pocket.",
    hint: "貓咪吃醋：聽到王子想要買狗當寵物，口袋底下的貓咪生氣極了！"
  }
];

export default function WordReview() {
  const [selectedWord, setSelectedWord] = useState<WordDetail | null>(null);
  const [gameMode, setGameMode] = useState<'single' | 'duel'>('single');
  const [activeTab, setActiveTab ] = useState<'list' | 'match'>('list');

  // Sequencing Challenge states
  const [seqCards, setSeqCards] = useState(() => {
    return [...SEQUENCING_CARDS].sort(() => 0.5 - Math.random());
  });
  const [seqAssignments, setSeqAssignments] = useState<Record<string, number | null>>({
    seq_ballroom: null,
    seq_dirk: null,
    seq_queen: null,
    seq_pocket: null
  });
  const [seqStatus, setSeqStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const handleShuffleSeq = () => {
    setSeqCards([...SEQUENCING_CARDS].sort(() => 0.5 - Math.random()));
    setSeqAssignments({
      seq_ballroom: null,
      seq_dirk: null,
      seq_queen: null,
      seq_pocket: null
    });
    setSeqStatus('idle');
    playCorrectSound();
  };

  const handleAssignStep = (cardId: string, stepNum: number) => {
    setSeqAssignments(prev => {
      const updated = { ...prev };
      // If another card already has this step, clear it first to avoid duplicates
      for (const [cid, sNum] of Object.entries(updated)) {
        if (sNum === stepNum) {
          updated[cid] = null;
        }
      }
      updated[cardId] = stepNum;
      return updated;
    });
    setSeqStatus('idle');
  };

  const handleCheckSeqOrder = () => {
    // Check if the assignments are correct: Ballroom=1, Dirk=2, Queen=3, Pocket=4
    const isCorrect = 
      seqAssignments.seq_ballroom === 1 &&
      seqAssignments.seq_dirk === 2 &&
      seqAssignments.seq_queen === 3 &&
      seqAssignments.seq_pocket === 4;

    if (isCorrect) {
      setSeqStatus('correct');
      playLevelUpSound();
    } else {
      setSeqStatus('incorrect');
      playIncorrectSound();
    }
  };

  // Duel player states
  const [p1Cards, setP1Cards] = useState<CardItem[]>([]);
  const [p2Cards, setP2Cards] = useState<CardItem[]>([]);
  const [p1Selected, setP1Selected] = useState<CardItem | null>(null);
  const [p2Selected, setP2Selected] = useState<CardItem | null>(null);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [duelEnded, setDuelEnded] = useState(false);

  // Single player game states
  const [singleCards, setSingleCards] = useState<CardItem[]>([]);
  const [singleSelected, setSingleSelected] = useState<CardItem | null>(null);
  const [singleMatches, setSingleMatches] = useState(0);
  const [isSingleWon, setIsSingleWon] = useState(false);
  const [singleTimer, setSingleTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Stop watch for single player
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setSingleTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  // Generate shuffled cards from 4 random vocabulary words
  const generateGameCards = (pairsNum: number = 4): CardItem[] => {
    // Select random words from vocabulary
    const shuffledVocab = [...FILTERED_VOCABULARY_DATA].sort(() => 0.5 - Math.random());
    const selectedWords = shuffledVocab.slice(0, pairsNum);

    let deck: CardItem[] = [];
    selectedWords.forEach((word) => {
      deck.push({
        id: `${word.id}-en`,
        wordId: word.id,
        text: word.word,
        type: 'en',
        isMatched: false
      });
      deck.push({
        id: `${word.id}-zh`,
        wordId: word.id,
        text: word.zh,
        type: 'zh',
        isMatched: false
      });
    });

    // Shuffle deck
    return deck.sort(() => 0.5 - Math.random());
  };

  // Start single match game
  const startSingleGame = () => {
    setSingleCards(generateGameCards(6)); // 12 cards for single player (6 pairs)
    setSingleSelected(null);
    setSingleMatches(0);
    setIsSingleWon(false);
    setSingleTimer(0);
    setIsTimerActive(true);
    playCorrectSound();
  };

  // Start dual player game
  const startDuelGame = () => {
    setP1Cards(generateGameCards(4)); // 8 cards each
    setP2Cards(generateGameCards(4));
    setP1Selected(null);
    setP2Selected(null);
    setP1Score(0);
    setP2Score(0);
    setDuelEnded(false);
    playCorrectSound();
  };

  // Handle single player card selection
  const handleSingleCardSelect = (card: CardItem) => {
    if (card.isMatched) return;
    if (singleSelected && singleSelected.id === card.id) return; // Ignore clicking same card

    if (!singleSelected) {
      // First card selection
      setSingleSelected(card);
      playMatchSound();
    } else {
      // Second selection, check match
      const first = singleSelected;
      if (first.wordId === card.wordId && first.type !== card.type) {
        // MATCH!
        setSingleCards(prev => prev.map(c => {
          if (c.wordId === card.wordId) {
            return { ...c, isMatched: true };
          }
          return c;
        }));
        playCorrectSound();
        setSingleMatches(prev => {
          const nextVal = prev + 1;
          if (nextVal === 6) { // Won! (6 pairs)
            setIsSingleWon(true);
            setIsTimerActive(false);
            playLevelUpSound();
          }
          return nextVal;
        });
        setSingleSelected(null);
      } else {
        // NO MATCH -> simple shock shake
        playIncorrectSound();
        setSingleSelected(card); // Highlight new selection instead of blocking
      }
    }
  };

  // Handle Player 1 card selection in duel
  const handleP1Select = (card: CardItem) => {
    if (card.isMatched || duelEnded) return;
    if (p1Selected && p1Selected.id === card.id) return;

    if (!p1Selected) {
      setP1Selected(card);
      playMatchSound();
    } else {
      const first = p1Selected;
      if (first.wordId === card.wordId && first.type !== card.type) {
        // Match!
        setP1Cards(prev => prev.map(c => c.wordId === card.wordId ? { ...c, isMatched: true } : c));
        setP1Score(prev => prev + 10);
        playCorrectSound();
        setP1Selected(null);
      } else {
        playIncorrectSound();
        setP1Selected(card);
      }
    }
  };

  // Handle Player 2 card selection in duel
  const handleP2Select = (card: CardItem) => {
    if (card.isMatched || duelEnded) return;
    if (p2Selected && p2Selected.id === card.id) return;

    if (!p2Selected) {
      setP2Selected(card);
      playMatchSound();
    } else {
      const first = p2Selected;
      if (first.wordId === card.wordId && first.type !== card.type) {
        // Match!
        setP2Cards(prev => prev.map(c => c.wordId === card.wordId ? { ...c, isMatched: true } : c));
        setP2Score(prev => prev + 10);
        playCorrectSound();
        setP2Selected(null);
      } else {
        playIncorrectSound();
        setP2Selected(card);
      }
    }
  };

  // Monitor duel finish
  useEffect(() => {
    if (p1Cards.length > 0 && p1Cards.every(c => c.isMatched) && p2Cards.length > 0 && p2Cards.every(c => c.isMatched)) {
      setDuelEnded(true);
      playLevelUpSound();
    }
  }, [p1Cards, p2Cards]);

  return (
    <div className="space-y-12">
      {/* Intro header */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#f5efe2]/70 border border-amber-100 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 shadow-sm animate-pulse">
          💡
        </div>
        <div>
          <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-900 rounded-full">
            單字學習 & 趣味對決 Deck & Match
          </span>
        </div>
      </div>

      {/* 🧩 故事排序大關卡 Story Sequencing Challenge */}
      <div className="bg-white rounded-3xl border-4 border-amber-200 p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-100 pb-4">
          <div>
            <h3 className="text-xl font-black text-[#5c3e16] flex items-center gap-2">
              <span className="text-2xl">🧩</span> 故事繪本排序大關卡 Story Sequencing
            </h3>
          </div>
          <button
            onClick={handleShuffleSeq}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>🔄 隨機亂序 Shuffle</span>
          </button>
        </div>

        {/* Table/List Headers (Visible only on medium/larger screens) */}
        <div className="hidden md:grid grid-cols-12 gap-6 px-6 py-2 bg-[#fcfbf7] border border-amber-100 rounded-xl text-xs font-black text-amber-900 uppercase tracking-widest text-center">
          <div className="col-span-4 lg:col-span-4 text-left">🎨 故事插圖 Story Scene Image</div>
          <div className="col-span-5 lg:col-span-5 text-left">📝 故事對白 Narrative Details</div>
          <div className="col-span-3 lg:col-span-3">🔢 故事步驟選擇 Select Step</div>
        </div>

        {/* 4 Rows List */}
        <div className="flex flex-col gap-5">
          {seqCards.map((card) => {
            const currentStep = seqAssignments[card.id];

            return (
              <div
                key={card.id}
                className="bg-[#FCFCF9] border-2 border-amber-150/60 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:grid md:grid-cols-12 gap-6 items-center relative overflow-hidden"
              >
                {/* Visual Accent for Step status */}
                <div className="absolute top-0 left-0 w-2 h-full bg-amber-200" />

                {/* Column 1: Image (列一：圖片) */}
                <div className="col-span-12 md:col-span-4 lg:col-span-4 w-full">
                  <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 shadow-xs relative">
                    <img
                      src={card.image}
                      alt="Story scene picture"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Column 2: Text (列二：文字) */}
                <div className="col-span-12 md:col-span-5 lg:col-span-5 w-full">
                  <p className="text-sm font-bold text-slate-800 leading-relaxed bg-white p-4 rounded-2xl border border-dashed border-slate-200 shadow-2xs">
                    {card.narrative}
                  </p>
                </div>

                {/* Column 3: Select Step (列三：Select Step) */}
                <div className="col-span-12 md:col-span-3 lg:col-span-3 w-full flex flex-col gap-3 justify-center bg-amber-50/10 p-4 rounded-2xl border border-amber-150/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-800 uppercase tracking-widest">
                      Assign Order
                    </span>
                    {currentStep !== null ? (
                      <span className="bg-[#e07a5f] text-white font-black text-xs px-2.5 py-1 rounded-full animate-pulse shadow-xs">
                        Step {currentStep}
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-400 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-slate-200">
                        Pending
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((stepNum) => {
                      const isSelected = currentStep === stepNum;
                      return (
                        <button
                          key={stepNum}
                          onClick={() => handleAssignStep(card.id, stepNum)}
                          className={`py-2.5 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#e07a5f] border-[#ca6347] text-white shadow-sm scale-110'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          {stepNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback Alert Panels */}
        <AnimatePresence mode="wait">
          {seqStatus === 'correct' && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-5 rounded-2.5xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-center gap-4 shadow-sm"
            >
              <span className="text-4xl animate-bounce">🎉🎓😻</span>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-black text-[#2b4c3f] text-base">排序大功告成！ 完美過關！</h4>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  太厲害了！你把「僕人舞廳佈置 ⟶ 德克叫人 ⟶ 覲見女王打噴嚏 ⟶ 聽到寵物小狗貓咪哈氣抓手」的生日故事邏輯理得清清楚楚！
                </p>
              </div>
              <button
                onClick={handleShuffleSeq}
                className="px-4 py-2 bg-[#81b29a] hover:bg-[#6c9b83] text-white text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer shadow-xs active:scale-95 transition-all"
              >
                打亂再玩一次 Play Again 🔄
              </button>
            </motion.div>
          )}

          {seqStatus === 'incorrect' && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-5 rounded-2.5xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡😾</span>
                <div className="flex-1">
                  <h4 className="font-extrabold text-[#7c2d12] text-sm md:text-base">順序不太對喔，再看一眼情節喔！</h4>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">
                    這 4 張圖片跟情節發展不一致。點擊下方黃色「顯示閱讀小線索」聽聽提示吧！
                  </p>
                </div>
              </div>

              {/* Collapsed Reading Hint */}
              <div className="bg-[#fcf7f6] p-4 rounded-xl border border-rose-150 text-xs font-bold text-slate-600 space-y-1.5">
                <span className="text-amber-800 uppercase block mb-0.5">💡 故事閱讀小線索 (Story Clue)：</span>
                <p>
                  1. 湯姆先是在皇家宴會廳裡，好奇看著僕人們擺放鮮花和彩帶準備明天 Eric 王子的生日會。
                </p>
                <p>
                  2. 突然德克跳出來，兇巴巴地叫湯姆立刻前去覲見大廳，說女王陛下想馬上見他。
                </p>
                <p>
                  3. 湯姆進到王座廳，女王感冒打了好大的噴嚏，擤完鼻子告訴湯姆她需要一個特別的生日禮物。
                </p>
                <p>
                  4. 高貴的女王說她想弄一隻小狗寵物，口袋底下的貓咪聽了發出生氣的嘶叫，用爪子抓湯姆。
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action checks Row */}
        {seqStatus !== 'correct' && (
          <div className="flex justify-center pt-2">
            <button
              onClick={handleCheckSeqOrder}
              disabled={Object.values(seqAssignments).some((v) => v === null)}
              className="px-10 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-[#e9be88] disabled:from-slate-100 disabled:to-slate-200 text-[#2b2723] disabled:text-slate-400 font-black text-sm hover:scale-103 active:scale-97 transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:cursor-not-allowed"
            >
              <span>🔍 檢查排列順序 Check My Order</span>
            </button>
          </div>
        )}
      </div>

      {/* Mode selectors */}
      <div className="flex border-b-2 border-amber-100/70 gap-4">
        <button
          onClick={() => setActiveTab('list')}
          className={`pb-4 px-6 font-bold text-lg border-b-4 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'list' 
              ? 'border-[#e07a5f] text-[#e07a5f] scale-105' 
              : 'border-transparent text-amber-700/65 hover:text-amber-950'
          }`}
        >
          📖 Useful Words
        </button>
        <button
          onClick={() => {
            setActiveTab('match');
            if (gameMode === 'single') startSingleGame();
            else startDuelGame();
          }}
          className={`pb-4 px-6 font-bold text-lg border-b-4 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'match' 
              ? 'border-[#81b29a] text-[#81b29a] scale-105' 
              : 'border-transparent text-amber-700/65 hover:text-amber-950'
          }`}
        >
          ⚔️ 趣味對碰消消樂
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'list' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {FILTERED_VOCABULARY_DATA.map((vocab) => {
            return (
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.2 }}
                key={vocab.id}
                onClick={() => {
                  setSelectedWord(vocab);
                  playTTS(vocab.word);
                }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-[#FCFCF9] border-3 border-amber-100 p-6 shadow-md hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between min-h-[160px]"
              >
                {/* Top ribbon */}
                <div className="absolute top-0 right-0 w-16 h-1 bg-gradient-to-r from-[#e07a5f] to-amber-300" />
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl" role="img">{vocab.emoji}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTTS(vocab.word);
                      }}
                      className="p-1 px-2.5 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-105 active:scale-90 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>發音</span>
                    </button>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#4a453e] tracking-tight group-hover:text-[#e07a5f] transition-colors">
                    {vocab.word}
                  </h3>
                  
                  <span className="inline-block mt-1 font-mono text-xs font-bold text-amber-800/60">
                    {vocab.ipa}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-500/10 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[#5c3e16]">
                    {vocab.zh}
                  </span>
                  <span className="text-xs text-amber-500 font-bold group-hover:underline flex items-center gap-1">
                    <span>學更多</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Match Blast Game Area */
        <div className="space-y-8 animate-fade-in">
          {/* Game center bar switcher */}
          <div className="bg-[#f5efe2]/50 p-3 rounded-2.5xl flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-amber-100">
            <span className="text-sm font-bold text-amber-805">
              🎮 請選擇競賽模式：
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setGameMode('single');
                  startSingleGame();
                }}
                className={`py-2 px-5 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  gameMode === 'single'
                    ? 'bg-[#e07a5f] text-white shadow-md shadow-amber-500/10 scale-105'
                    : 'bg-white text-[#4a453e] hover:bg-amber-50 border border-amber-100'
                }`}
              >
                <User className="w-4 h-4" />
                <span>👥 單人闖關關卡</span>
              </button>
              <button
                onClick={() => {
                  setGameMode('duel');
                  startDuelGame();
                }}
                className={`py-2 px-5 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  gameMode === 'duel'
                    ? 'bg-[#3d405b] text-white shadow-md shadow-indigo-250/10 scale-105'
                    : 'bg-white text-[#4a453e] hover:bg-amber-50 border border-amber-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>⚔️ 雙人拼手速對決</span>
              </button>
            </div>
            <button
              onClick={() => {
                if (gameMode === 'single') startSingleGame();
                else startDuelGame();
              }}
              className="py-2 px-4 bg-[#3d455b] hover:bg-[#2f3546] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重新洗牌</span>
            </button>
          </div>

          {/* Interactive view container */}
          {gameMode === 'single' ? (
            /* Single player screen */
            <div className="bg-white rounded-3xl border-4 border-amber-250 p-6 md:p-8 shadow-lg max-w-4xl mx-auto space-y-6">
              <div className="flex justify-between items-center bg-[#fdfcf0] rounded-2xl p-4 border border-amber-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-bounce">🏆</span>
                  <div>
                    <h3 className="font-bold text-[#5c3e16]">單人極速過挑戰</h3>
                    <p className="text-xs text-[#e07a5f] font-bold">
                      兩兩配對。比比看誰能以最少時間配對成功 12 張牌！
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-center">
                    <span className="text-xs text-amber-700 font-semibold block uppercase">已成功</span>
                    <span className="text-xl font-black text-[#e07a5f]">{singleMatches}/6 首</span>
                  </div>
                  <div className="w-px h-8 bg-amber-200/40 my-auto" />
                  <div className="text-center">
                    <span className="text-xs text-amber-700 font-semibold block uppercase">倒計時</span>
                    <span className="text-xl font-black font-mono text-amber-900">{singleTimer}s</span>
                  </div>
                </div>
              </div>

              {/* Grid cards */}
              {!isSingleWon ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-4">
                  {singleCards.map((card) => {
                    const isSelected = singleSelected?.id === card.id;
                    const isMatched = card.isMatched;

                    return (
                      <motion.button
                        layout
                        key={card.id}
                        disabled={isMatched}
                        onClick={() => handleSingleCardSelect(card)}
                        whileTap={{ scale: 0.95 }}
                        className={`min-h-[100px] h-28 rounded-2xl border-3 p-4 flex items-center justify-center text-center font-extrabold text-sm md:text-base leading-snug tracking-wide transition-all ${
                          isMatched
                            ? 'bg-[#f0f7f4] border-[#81b29a] text-[#2b4c3f] line-through opacity-40'
                            : isSelected
                            ? 'bg-[#e07a5f] border-[#ca6347] text-white scale-102 ring-4 ring-[#faede6]'
                            : 'bg-[#FCFCF9] border-amber-100 hover:border-amber-300 text-[#4a453e] shadow-sm cursor-pointer'
                        }`}
                      >
                        {card.text}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                /* Win panel */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-3xl bg-[#f0f7f4] border-3 border-[#81b29a] text-center space-y-4 max-w-md mx-auto text-[#2b4c3f]"
                >
                  <span className="text-6xl animate-bounce block">🎉</span>
                  <h4 className="text-2xl font-black text-[#2b4c3f]">闖關成功！ You Won!</h4>
                  <p className="text-sm text-[#4a453e]">
                    好厲害！你用了 <span className="font-extrabold text-[#e07a5f]">{singleTimer} 秒</span> 就將 6 組重要單詞配對完畢！
                  </p>
                  <button
                    onClick={startSingleGame}
                    className="px-6 py-2.5 bg-[#81b29a] hover:bg-[#6c9b83] text-white font-bold rounded-2xl active:scale-95 transition-all cursor-pointer"
                  >
                    再玩一次 Play Again
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            /* Dual Multiplayer split screen */
            <div className="bg-[#2b2723] rounded-3xl p-4 md:p-8 border-4 border-amber-205 shadow-xl space-y-6 text-[#fdfcf0]">
              <div className="text-center max-w-sm mx-auto">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-200 rounded-full font-bold text-xs border border-amber-500/35">
                  智慧黑板/雙人對抗模式 👥
                </span>
                <p className="text-xs text-amber-250 mt-1">
                  兩位玩家分別位於兩側，點選各自格子裡的單詞和傳統中文意思，看誰先全部連對！
                </p>
              </div>

              {!duelEnded ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                  {/* Left half: Player 1 (Red) */}
                  <div className="p-4 rounded-3xl bg-[#e07a5f]/15 border border-[#e07a5f]/25 space-y-4">
                    <div className="flex justify-between items-center border-b border-[#e07a5f]/20 pb-2">
                      <span className="text-sm font-bold text-[#e07a5f] flex items-center gap-1.5">
                        <span className="text-lg">🔴</span> Player 1 (魔法紅)
                      </span>
                      <span className="font-black text-[#e07a5f]/95">Score: {p1Score}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {p1Cards.map((card) => {
                        const isSelected = p1Selected?.id === card.id;
                        const isMatched = card.isMatched;

                        return (
                          <motion.button
                            disabled={isMatched}
                            onClick={() => handleP1Select(card)}
                            key={card.id}
                            className={`min-h-[85px] p-3 rounded-xl border-2 text-center text-xs sm:text-sm font-extrabold transition-all leading-snug ${
                              isMatched
                                ? 'bg-[#f0f7f4]/15 border-[#81b29a]/20 text-[#81b29a]/45 opacity-40 line-through'
                                : isSelected
                                ? 'bg-[#e07a5f] border-[#ca6347] text-white ring-4 ring-[#e07a5f]/30 scale-98'
                                : 'bg-[#34302d] border-[#4a453e] hover:border-[#e07a5f] hover:bg-[#3d3835] text-amber-100 cursor-pointer'
                            }`}
                          >
                            {card.text}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right half: Player 2 (Green) */}
                  <div className="p-4 rounded-3xl bg-[#81b29a]/15 border border-[#81b29a]/25 space-y-4">
                    <div className="flex justify-between items-center border-b border-[#81b29a]/20 pb-2">
                      <span className="text-sm font-bold text-[#81b29a] flex items-center gap-1.5">
                        <span className="text-lg">🏕️</span> Player 2 (奇幻綠)
                      </span>
                      <span className="font-black text-[#81b29a]/95">Score: {p2Score}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {p2Cards.map((card) => {
                        const isSelected = p2Selected?.id === card.id;
                        const isMatched = card.isMatched;

                        return (
                          <motion.button
                            disabled={isMatched}
                            onClick={() => handleP2Select(card)}
                            key={card.id}
                            className={`min-h-[85px] p-3 rounded-xl border-2 text-center text-xs sm:text-sm font-extrabold transition-all leading-snug ${
                              isMatched
                                ? 'bg-[#f0f7f4]/15 border-[#81b29a]/20 text-[#81b29a]/40 opacity-40 line-through'
                                : isSelected
                                ? 'bg-[#81b29a] border-[#6c9b83] text-white ring-4 ring-[#81b29a]/30 scale-98'
                                : 'bg-[#34302d] border-[#4a453e] hover:border-[#81b29a] hover:bg-[#3d3835] text-amber-100 cursor-pointer'
                            }`}
                          >
                            {card.text}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Duel End statistics */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#34302d] p-8 rounded-3xl border border-white/10 text-white text-center space-y-6 max-w-sm mx-auto animate-fade-in"
                >
                  <Sparkles className="w-16 h-16 text-amber-400 mx-auto animate-pulse" />
                  <div>
                    <h4 className="text-2xl font-black tracking-wide text-amber-200">🏆 對決終了！ Game Over</h4>
                    <p className="text-xs text-amber-200/60 mt-1">兩人都完美完成了消消樂！</p>
                  </div>

                  <div className="space-y-2 max-w-xs mx-auto text-left">
                    <div className="flex justify-between p-2 rounded-xl bg-[#23201e]">
                      <span className="text-[#e07a5f] font-bold">Player 1 score:</span>
                      <span className="font-extrabold">{p1Score}pts</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-xl bg-[#23201e]">
                      <span className="text-[#81b29a] font-bold">Player 2 score:</span>
                      <span className="font-extrabold">{p2Score}pts</span>
                    </div>
                  </div>

                  {p1Score === p2Score ? (
                    <div className="text-lg font-bold text-amber-300">雙方平分秋色！ 🤝 平手！</div>
                  ) : p1Score > p2Score ? (
                    <div className="text-lg font-extrabold text-[#e07a5f]">🎉 Player 1 獲勝！ 🔴🏆</div>
                  ) : (
                    <div className="text-lg font-extrabold text-[#81b29a]">🎉 Player 2 獲勝！ 🏕️🏆</div>
                  )}

                  <button
                    onClick={startDuelGame}
                    className="w-full py-2.5 bg-[#3d405b] hover:bg-[#2f3146] text-white font-bold rounded-2xl active:scale-95 transition-all cursor-pointer"
                  >
                    再次對碰 Replay Duel
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      )}

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
