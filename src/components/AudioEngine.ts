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
    
    // Cozy musical chime sequence using sweet triangle and sine waves
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Bright ascending arpeggio)
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      
      // Beautiful fast decay for clockwork bells
      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.28);
    });
  } catch (e) {
    console.warn("Audio Context blocked or not supported:", e);
  }
}

export function playIncorrectSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Play a friendly cartoonish "wah-wah" slide using a soft triangle wave
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.setValueAtTime(320, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.32);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.35);
    
    // Delicate soft secondary bounce for "bloop-bloop" effect
    const bounceOsc = ctx.createOscillator();
    const bounceGain = ctx.createGain();
    
    bounceOsc.type = 'sine';
    bounceOsc.frequency.setValueAtTime(180, now + 0.12);
    bounceOsc.frequency.exponentialRampToValueAtTime(120, now + 0.35);
    
    bounceGain.gain.setValueAtTime(0, now + 0.12);
    bounceGain.gain.linearRampToValueAtTime(0.08, now + 0.15);
    bounceGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    bounceOsc.connect(bounceGain);
    bounceGain.connect(ctx.destination);
    
    bounceOsc.start(now + 0.12);
    bounceOsc.stop(now + 0.35);
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
