/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WordDetail {
  id: string;
  word: string;
  ipa: string;
  zh: string;
  emoji: string;
  explanation: string;
  en_example: string;
  zh_example: string;
}

export interface QuizQuestion {
  question: string;
  zh_translation?: string;
  options: string[];
  answer: string;
  hint?: string;
}

export interface LadderQuestion {
  zh_question: string; // The query in Chinese, e.g. "皇家宴會廳"
  options: string[];    // Options in English, e.g. ["Royal Ballroom", "Pocket", "Ceiling", "Servants"]
  answer: string;       // Correct option, e.g. "Royal Ballroom"
  emoji: string;        // Emoji for support
}

export interface PlayerStatus {
  id: number;
  name: string;
  emoji: string;
  color: string;
  currentFloor: number; // 0 to 10
  currentQuestionIndex: number;
  completed: boolean;
  score: number;
}
