/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Award, Crown, RotateCcw, Volume2, User, Users, Play, ShieldAlert } from 'lucide-react';
import { PlayerStatus } from '../types';
import { LADDER_QUESTIONS_BANK } from '../data';
import { playCorrectSound, playIncorrectSound, playLevelUpSound, playTTS } from './AudioEngine';

export default function LadderClimb() {
  const [playerMode, setPlayerMode] = useState<1 | 2 | 3 | 4>(2); // Default to 2 players competition!
  const [players, setPlayers] = useState<PlayerStatus[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showRanks, setShowRanks] = useState(false);
  
  // Shake feedback states per player (id-keyed)
  const [shakePlayerId, setShakePlayerId] = useState<number | null>(null);

  // Initialize players based on selected mode
  const initializePlayers = (mode: 1 | 2 | 3 | 4) => {
    const avatarsPreset = [
      { name: "Tom 湯姆", emoji: "🧙‍♂️", color: "from-amber-400 to-orange-500 text-orange-600 bg-amber-50 border-amber-300" },
      { name: "Cat 貓咪", emoji: "🐱", color: "from-sky-400 to-indigo-500 text-indigo-600 bg-sky-50 border-sky-300" },
      { name: "Queen 女王", emoji: "👑", color: "from-emerald-400 to-teal-500 text-teal-600 bg-emerald-50 border-emerald-300" },
      { name: "Dirk 德克", emoji: "😠", color: "from-fuchsia-400 to-purple-500 text-purple-600 bg-fuchsia-50 border-fuchsia-300" }
    ];

    const initial: PlayerStatus[] = [];
    for (let i = 0; i < mode; i++) {
      initial.push({
        id: i + 1,
        name: avatarsPreset[i].name,
        emoji: avatarsPreset[i].emoji,
        color: avatarsPreset[i].color,
        currentFloor: 0,
        currentQuestionIndex: 0,
        completed: false,
        score: 0
      });
    }
    setPlayers(initial);
    setGameStarted(true);
    setShowRanks(false);
    setShakePlayerId(null);
    playLevelUpSound();
  };

  // Trigger init on starting
  useEffect(() => {
    initializePlayers(playerMode);
  }, [playerMode]);

  const handlePlayerAnswer = (playerId: number, option: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player || player.completed) return;

    const currentQuiz = LADDER_QUESTIONS_BANK[player.currentQuestionIndex];
    const isCorrect = option === currentQuiz.answer;

    if (isCorrect) {
      playCorrectSound();
      
      setPlayers(prev => prev.map(p => {
        if (p.id === playerId) {
          const nextFloor = p.currentFloor + 1;
          const finished = nextFloor >= 10;
          
          if (finished) {
            playLevelUpSound();
          }

          return {
            ...p,
            currentFloor: Math.min(nextFloor, 10),
            // Move index forward, wrapping just in case, but cap at 9
            currentQuestionIndex: Math.min(p.currentQuestionIndex + 1, 9),
            completed: finished,
            score: p.score + 10
          };
        }
        return p;
      }));
    } else {
      // Wrong answer
      playIncorrectSound();
      // Cause shaking feedback
      setShakePlayerId(playerId);
      setTimeout(() => {
        setShakePlayerId(null);
      }, 505);
    }
  };

  // Monitor if all active players finished
  useEffect(() => {
    if (players.length > 0 && players.every(p => p.completed)) {
      setShowRanks(true);
    }
  }, [players]);

  // Restart active mode
  const handleReset = () => {
    initializePlayers(playerMode);
  };

  return (
    <div className="space-y-12">
      {/* Intro Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#f5efe2]/70 border border-amber-100 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 shadow-sm">
          🧗
        </div>
        <div>
          <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-900 rounded-full">
            攀爬天梯競速 Game Center
          </span>
          <h2 className="text-2xl font-black text-[#5c3e16] mt-2">
            仙境城堡爬爬梯對決 (中選英挑戰)
          </h2>
        </div>
      </div>

      {/* Mode Control Area */}
      <div className="bg-[#f5efe2]/50 p-4 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 border border-amber-100/70">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#4a453e]/80">🎮 模式切換 Mode:</span>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((num) => {
              const label = num === 1 ? "👤 單人挑戰" : `${num} 人同步對決`;
              return (
                <button
                  key={num}
                  onClick={() => {
                    setPlayerMode(num as any);
                    initializePlayers(num as any);
                  }}
                  className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                    playerMode === num
                      ? 'bg-[#81b29a] text-white shadow-md'
                      : 'bg-[#FCFCF9] text-[#4a453e] hover:bg-amber-50/20 border border-amber-100'
                  }`}
                >
                  {num === 1 ? "👤 單人挑戰" : `${num} 人攀爬`}
                </button>
              );
            })}
          </div>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-[#3d405b] hover:bg-[#2f3146] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>重新開局 Replay</span>
        </button>
      </div>

      {/* Game Stage rendering */}
      {playerMode === 1 ? (
        /* ==================== SINGLE PLAYER MODE GOLDEN LAYOUT ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          
          {/* Left Panel: Vertical Wooden Ladder */}
          <div className="bg-[#f5efe2]/30 rounded-3xl border-4 border-amber-200 p-6 flex flex-col items-center">
            <h3 className="text-sm font-extrabold text-[#5c3e16] mb-4 tracking-wider flex items-center gap-1.5">
              <span>🪜 攀爬天梯木梯</span>
              <span className="text-amber-800">Floor 0 ~ 10</span>
            </h3>Custom style

            {/* Solid Wooden Ladder */}
            <div className="relative w-28 flex flex-col-reverse justify-between bg-[#4a453e]/15 rounded-2xl p-2 h-[480px] border-l-4 border-r-4 border-[#5c3e16]">
              
              {/* Wooden planks across the ladder */}
              {[...Array(11)].map((_, floorIdx) => {
                const isSelected = players[0]?.currentFloor === floorIdx;
                return (
                  <div 
                    key={floorIdx}
                    className="relative flex items-center justify-center p-1 border-b-2 border-[#5c3e16]/20 h-10"
                  >
                    {/* Planks labels */}
                    <span className="absolute left-1 text-[9px] font-bold font-mono text-[#5c3e16] opacity-60">F{floorIdx}</span>
                    
                    {/* Golden destination crown label */}
                    {floorIdx === 10 && (
                      <span className="absolute -top-6 text-xl">👑</span>
                    )}

                    {/* Rendering the active player token nicely bouncing on the current wood plank */}
                    {isSelected && (
                      <motion.div
                        layoutId="p1-vertical-token"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute z-10 w-12 h-12 rounded-full bg-white shadow-md border-3 border-amber-400 flex items-center justify-center text-2xl"
                      >
                        {players[0]?.emoji}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Active Questions & Achievements */}
          <div className="lg:col-span-2 bg-[#FCFCF9] rounded-3xl border-4 border-amber-250 p-6 md:p-8 shadow-md flex flex-col justify-between">
            {players[0] && (
              <div className="space-y-6">
                {/* Active question header info */}
                <div className="flex justify-between items-center border-b border-amber-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#e07a5f] block">PLAYER PROFILE: TOM</span>
                    <span className="text-xl font-black text-[#4a453e] flex items-center gap-1">
                      <span>{players[0].name}</span>
                      <span>{players[0].emoji}</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#4a453e]/60 font-bold block">作答進度</span>
                    <span className="text-lg font-black text-[#e07a5f] font-mono">
                      {players[0].currentFloor}/10 題
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-amber-100/40 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-[#81b29a] rounded-full transition-all duration-300"
                    style={{ width: `${players[0].currentFloor * 10}%` }}
                  />
                </div>

                {/* Actual Question */}
                {!players[0].completed ? (
                  <div className="space-y-6 pt-4">
                    <div className="p-6 bg-[#f5efe2]/40 border border-amber-100/50 rounded-2.5xl space-y-2">
                      <span className="text-xs font-bold text-[#4a453e]/60 tracking-wider">根據說明，請選出對應的英文單詞：</span>
                      <h4 className="text-2xl font-black text-[#4a453e] leading-snug">
                        🙋‍♂️ 請問：{LADDER_QUESTIONS_BANK[players[0].currentQuestionIndex].zh_question}
                      </h4>
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {LADDER_QUESTIONS_BANK[players[0].currentQuestionIndex].options.map((option, choiceIdx) => {
                        return (
                          <motion.button
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            key={choiceIdx}
                            onClick={() => handlePlayerAnswer(players[0].id, option)}
                            className="p-5 rounded-2.5xl border-3 border-amber-100 hover:border-[#81b29a] font-bold text-[#4a453e] text-lg hover:bg-[#81b29a]/10 cursor-pointer text-left transition-all flex items-center justify-between"
                          >
                            <span>{option}</span>
                            <span className="text-xs text-amber-900/60 font-bold font-mono">Option {choiceIdx + 1}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Crown completion slide */
                  <div className="py-12 text-center space-y-4">
                    <span className="text-7xl animate-bounce block">🏆✨👑</span>
                    <h4 className="text-3xl font-black text-[#e07a5f]">恭喜你到底終點！</h4>
                    <p className="text-[#4a453e] max-w-sm mx-auto text-sm">
                      你成功回答了所有 10 個生詞問題，踩著木天梯攀登到了城堡的頂端！太優秀了！
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-[#81b29a] hover:bg-[#6c9b83] text-white font-bold rounded-2xl active:scale-95 transition-all cursor-pointer"
                    >
                      重新挑戰 Restart
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ==================== MULTIPLAYER COMPETITION MODE ==================== */
        <div className="space-y-8">
          
          {/* Horizontal 16:9 Celestial Indigo Racetrack Canvas */}
          <div className="relative overflow-hidden bg-[#0A1024] rounded-3xl border-4 border-indigo-500/50 p-6 min-h-[300px] shadow-2xl flex flex-col justify-between">
            {/* Ambient Star dots */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {/* Heading label */}
            <div className="relative z-10 flex justify-between items-center text-indigo-200 border-b border-indigo-500/20 pb-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>16:9 Cosmic Sky Arena 仙境對決飛行跑道</span>
              </span>
              <div className="flex gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1">🌲 起點 Forest</span>
                <span>→</span>
                <span className="flex items-center gap-1">🏰 終點 F10 Castle</span>
              </div>
            </div>

            {/* Runways tracks */}
            <div className="relative z-10 space-y-6 py-4 flex-1 flex flex-col justify-around">
              {players.map((p) => {
                const percent = (p.currentFloor / 10) * 100;
                return (
                  <div key={p.id} className="relative flex items-center h-12 w-full bg-slate-900/40 rounded-full p-1 border border-white/5 shadow-inner">
                    {/* Runway label */}
                    <span className="absolute -top-5 left-2 text-[10px] font-bold text-slate-400">
                      Lane {p.id}: {p.name}
                    </span>

                    {/* Step marks along the runway */}
                    <div className="absolute inset-0 flex justify-between px-10 items-center pointer-events-none">
                      {[...Array(11)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`w-1.5 h-1.5 rounded-full ${index <= p.currentFloor ? 'bg-amber-400' : 'bg-slate-700'}`} />
                          <span className="text-[8px] text-slate-500 font-mono mt-0.5">F{index}</span>
                        </div>
                      ))}
                    </div>

                    {/* Character avatar sliding wrapper */}
                    <motion.div
                      animate={{ 
                        left: `calc(${percent}% - 22px)`
                      }}
                      transition={{ type: "spring", damping: 18, stiffness: 200 }}
                      className="absolute z-10 flex flex-col items-center justify-center pointer-events-none"
                      style={{ left: "0%" }}
                    >
                      {/* Character card */}
                      <div className="relative flex items-center gap-1.5 bg-slate-800 border-2 border-indigo-400 text-white px-2 py-1 rounded-xl shadow-lg">
                        <span className="text-lg">{p.emoji}</span>
                        <span className="text-[9px] font-black">{p.name.split(' ')[0]}</span>
                        
                        {/* Crown display when completed */}
                        {p.completed && (
                          <span className="absolute -top-3 -right-2 text-base text-yellow-400 drop-shadow-md animate-bounce">👑</span>
                        )}
                      </div>
                    </motion.div>

                    {/* Golden castle marker on the extremely right edge */}
                    <div className="absolute right-1 text-2xl select-none" title="Castle Destination">
                      🏰
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Side-by-Side Questions Grid (1x2, 1x3, 1x4 parallel grids) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {players.map((p) => {
              const quiz = LADDER_QUESTIONS_BANK[p.currentQuestionIndex];
              const isShaking = shakePlayerId === p.id;

              return (
                <motion.div
                  key={p.id}
                  animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className={`rounded-3xl border-3 bg-white p-5 shadow-lg flex flex-col justify-between min-h-[360px] ${
                    p.completed
                      ? 'border-emerald-300 bg-emerald-50/10 opacity-70'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Participant card Header */}
                  <div className="border-b border-slate-100 pb-3 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 tracking-wider">答題盤 P{p.id}</span>
                      <span className="text-xs font-bold text-indigo-500 font-mono">Floor {p.currentFloor} / 10</span>
                    </div>
                    
                    <h4 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5 mt-1">
                      <span className="text-lg">{p.emoji}</span>
                      <span>{p.name}</span>
                    </h4>
                  </div>

                  {/* Question Box */}
                  {!p.completed ? (
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      {/* Query in Chinese */}
                      <div className="p-3 bg-slate-50 border border-slate-100/60 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase mb-0.5">中文題目:</span>
                        <p className="text-base font-black text-slate-800 leading-snug">
                          {quiz.zh_question}
                        </p>
                      </div>

                      {/* Options stack vertically inside columns */}
                      <div className="space-y-2">
                        {quiz.options.map((option, oIdx) => {
                          return (
                            <button
                              key={oIdx}
                              onClick={() => handlePlayerAnswer(p.id, option)}
                              className="w-full text-left py-2.5 px-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/5 font-extrabold text-xs sm:text-sm text-slate-700 active:scale-95 transition-all flex items-center justify-between cursor-pointer"
                            >
                              <span>{option}</span>
                              <span className="text-[10px] text-slate-300 font-mono">#{oIdx + 1}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Completes status card */
                    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-3">
                      <Crown className="w-12 h-12 text-yellow-500 animate-bounce" />
                      <div>
                        <h5 className="font-extrabold text-emerald-600 text-sm">Completed! Finished!</h5>
                        <p className="text-[11px] text-slate-500 mt-1">
                          湯姆在天空城堡頂端歡呼，等待其他人爬完喔！👑
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Symmetrical Rank Board Backdrop Overlay Modal */}
          <AnimatePresence>
            {showRanks && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 30 }}
                  className="w-full max-w-md bg-white rounded-3xl border-4 border-amber-400 shadow-2xl p-6 md:p-8 space-y-6"
                >
                  <div className="text-center space-y-2">
                    <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
                    <h3 className="text-2xl font-black text-slate-800">🎉 天梯榮譽榜 Ranks</h3>
                    <p className="text-xs text-slate-400">所有勇士都順利翻越山嶺抵達城堡！</p>
                  </div>

                  {/* Sorted Rank List */}
                  <div className="space-y-3">
                    {[...players]
                      .sort((a, b) => b.score - a.score || a.id - b.id)
                      .map((p, index) => {
                        const medals = ["🏆 第一名", "🥈 第二名", "🥉 第三名", "🏅 第四名"];
                        return (
                          <div 
                            key={p.id}
                            className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-indigo-600">{medals[index]}</span>
                              <span className="text-2xl">{p.emoji}</span>
                              <span className="font-extrabold text-slate-700">{p.name}</span>
                            </div>
                            <span className="font-black text-amber-500 text-sm">{p.score} pts</span>
                          </div>
                        );
                      })}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => initializePlayers(playerMode)}
                      className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-extrabold rounded-2xl shadow-md cursor-pointer text-center text-sm active:scale-95 transition-all"
                    >
                      重新開局 Replay
                    </button>
                    <button
                      onClick={() => setShowRanks(false)}
                      className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm rounded-2xl cursor-pointer active:scale-95 transition-all"
                    >
                      關閉 Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
