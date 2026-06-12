/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create oscillator and gain node
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    // Friendly arpeggio
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08, ); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
    osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {
    console.warn("Audio Context blocked or not supported:", e);
  }
}

export function playIncorrectSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    // Low sliding pitch (boing-buzz effect)
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {
    console.warn("Audio Context blocked or not supported:", e);
  }
}

export function playMatchSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now); // A4
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.2);
  } catch (e) {
    console.warn("Audio context not ready:", e);
  }
}

export function playLevelUpSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Celestial completion chord
    const freqs = [329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // E4, G4, C5, E5, G5, C6
    
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      
      gain.gain.setValueAtTime(0.05, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + idx * 0.05);
      osc.stop(now + 0.8 + idx * 0.05);
    });
  } catch (e) {
    console.warn("Audio context failed:", e);
  }
}

export function playTTS(text: string) {
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // Friendly slow pace for grade 3
      utterance.pitch = 1.15; // Cute slightly higher pitched voice
      window.speechSynthesis.speak(utterance);
    }
  } catch (err) {
    console.warn("Speech synthesis blocked or not supported:", err);
  }
}
