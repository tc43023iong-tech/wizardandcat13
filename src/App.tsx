/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Gamepad2, 
  HelpCircle, 
  Flame, 
  CheckSquare, 
  Mic,
  Gift
} from 'lucide-react';

// Subcomponents
import StorySection from './components/StorySection';
import WordReview from './components/WordReview';
import ShadowReading from './components/ShadowReading';
import UsefulSentences from './components/UsefulSentences';
import LadderClimb from './components/LadderClimb';
import Worksheet from './components/Worksheet';

type ActiveTab = 'story' | 'review' | 'shadow' | 'sentences' | 'ladder' | 'worksheet';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('story');

  const tabsConfig = [
    { id: 'story', label: '📖 故事朗讀', subtitle: '故事與單詞點讀', color: 'bg-[#e07a5f] text-white border-[#f4f1de]' },
    { id: 'review', label: '📚 單詞複習', subtitle: '字詞卡與雙人配對', color: 'bg-[#f2cc8f] text-[#4a453e] border-[#f4f1de]' },
    { id: 'shadow', label: '🎤 影子跟讀', subtitle: '角色扮演模仿特訓', color: 'bg-amber-500 text-white border-amber-300' },
    { id: 'sentences', label: '🗣️ 實用佳句', subtitle: '生活句型繪本選擇', color: 'bg-[#3d405b] text-white border-[#4f5376]' },
    { id: 'ladder', label: '🧗 爬爬梯大賽', subtitle: '大黑板多重對戰軌道', color: 'bg-[#df7a5f] text-white border-[#ca6347]' },
    { id: 'worksheet', label: '📝 新課堂練習', subtitle: '兒童數位學習單', color: 'bg-[#9a7b56] text-white border-[#846540]' },
  ];

  return (
    <div className="min-h-screen text-[#4a453e] pb-16 transition-colors duration-500">
      
      {/* Top Cute Header */}
      <header className="bg-gradient-to-b from-amber-150/30 via-amber-500/5 to-transparent pt-10 pb-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Title & Brand */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative">
              <span className="text-6xl select-none filter drop-shadow">🧙‍♂️</span>
              <motion.span 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute -top-1 -right-2 text-3xl select-none"
              >
                🐱
              </motion.span>
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 bg-[#e9be88] text-amber-950 font-black text-[11px] rounded-full uppercase tracking-widest shadow-xs">
                  Wizard and Cat 13
                </span>
                <span className="text-sm">✨</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#5c3e16] tracking-tight mt-1 flex items-center gap-2 justify-center md:justify-start">
                <span>Prince Eric's Birthday</span>
                <span className="text-[#e07a5f]">🎂</span>
              </h1>
            </div>
          </div>

          {/* Quick Stats or Magic Energy Badge */}
          <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-amber-150 shadow-sm">
            <span className="text-3xl animate-pulse">✨</span>
            <div className="text-left">
              <span className="text-[10px] font-black text-amber-700 block tracking-widest uppercase">
                MAGIC READING HUB
              </span>
              <span className="text-sm font-bold text-amber-900">
                第三冊 ∙ 第13章生日會
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Navigation Tabs (Grade 3 Kids Styled Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {tabsConfig.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as ActiveTab);
                }}
                className={`relative flex flex-col justify-between p-4.5 h-28 rounded-3xl border-3 text-left transition-all overflow-hidden ${
                  isActive
                    ? `${tab.color} scale-102 shadow-lg ring-3 ring-amber-50`
                    : 'bg-white border-amber-150 text-[#4a453e] hover:bg-[#faf9f4]'
                } cursor-pointer`}
              >
                {/* Visual ripple backdrop overlay when active */}
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 pointer-events-none animate-pulse" />
                )}

                <span className="font-extrabold text-sm sm:text-base leading-snug">
                  {tab.label}
                </span>

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold opacity-75 block uppercase leading-none truncate">
                    {tab.subtitle}
                  </span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isActive ? 'GO! ✨' : 'ENTER'}
                    </span>
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Workspace Display Area */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {activeTab === 'story' && <StorySection />}
              {activeTab === 'review' && <WordReview />}
              {activeTab === 'shadow' && <ShadowReading />}
              {activeTab === 'sentences' && <UsefulSentences />}
              {activeTab === 'ladder' && <LadderClimb />}
              {activeTab === 'worksheet' && <Worksheet />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Decorative Interactive Footer */}
      <footer className="mt-20 border-t border-slate-200/50 pt-10 text-center text-xs text-slate-400 bg-slate-50/50 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 text-xl select-none text-slate-300">
            <span>🧙‍♂️</span>
            <span>🐱</span>
            <span>👑</span>
            <span>🎪</span>
            <span>🎂</span>
            <span>🐶</span>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-slate-500 text-sm">
              Wizard and Cat 13: Prince Eric's Birthday Story Wonderland
            </p>
            <p className="font-medium text-[11px] text-slate-400">
              Made with high durability cloud persistence principles and playful game loops. 
              Designed for Grade 3 Elementary classrooms on smart whiteboards.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
