// Web Audio API Synthesizer for gentle, soothing cues without external audio files
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Plays a warm Tibetan meditation bowl / gentle chime
 */
export function playChime(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.2, now);
    master.connect(ctx.destination);

    // Fundamental and soft harmonic partials
    const partials = [
      { freq: 432, gain: 0.25, decay: 2.8 },
      { freq: 864, gain: 0.08, decay: 2.0 },
      { freq: 1296, gain: 0.03, decay: 1.4 },
    ];

    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(gain, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(master);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch {
    // Graceful fallback if Web Audio is restricted
  }
}

/**
 * Soft guidance tone for breath shifts
 */
export function playBreathCue(
  type: 'inhale' | 'exhale' | 'hold' | 'steady',
  enabled: boolean = true
) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';

    if (type === 'inhale') {
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 2.5);
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.08, now + 1.2);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
    } else if (type === 'exhale') {
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(196, now + 3.5);
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.08, now + 1.5);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
    } else {
      // hold or steady
      osc.frequency.setValueAtTime(261.6, now); // Middle C
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.04, now + 0.8);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
    }

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 4);
  } catch {
    // Ignore audio error
  }
}

/**
 * Two-tone soothing completion chime
 */
export function playCompletionChime(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { freq: 392, time: 0, decay: 2.2 },     // G4
      { freq: 523.25, time: 0.4, decay: 3.0 }, // C5
    ];

    notes.forEach(({ freq, time, decay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.linearRampToValueAtTime(0.12, now + time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + decay);
    });
  } catch {
    // Ignore
  }
}
