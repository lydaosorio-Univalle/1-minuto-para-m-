import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MicroSession, MicroPhase } from '../types';
import { BreathingVisualizer } from './VisualGuides/BreathingVisualizer';
import { StretchVisualizer } from './VisualGuides/StretchVisualizer';
import { playChime, playBreathCue, playCompletionChime } from '../utils/audio';
import { Volume2, VolumeX, Pause, Play, X, HeartHandshake } from 'lucide-react';

interface SessionActiveProps {
  session: MicroSession;
  nightMode: boolean;
  highContrast?: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onComplete: () => void;
  onExit: () => void;
}

export const SessionActive: React.FC<SessionActiveProps> = ({
  session,
  nightMode,
  highContrast = false,
  soundEnabled,
  onToggleSound,
  onComplete,
  onExit,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const soundRef = useRef(soundEnabled);
  soundRef.current = soundEnabled;

  const totalSecondsLeft = Math.max(0, 60 - elapsedSeconds);

  // Compute current phase and seconds left in current phase purely and deterministically
  let accumulated = 0;
  let currentPhaseIndex = 0;
  let phaseSecondsLeft = session.phases[0]?.duration || 15;

  for (let i = 0; i < session.phases.length; i++) {
    const phaseDur = session.phases[i].duration;
    if (elapsedSeconds < accumulated + phaseDur || i === session.phases.length - 1) {
      currentPhaseIndex = i;
      phaseSecondsLeft = Math.max(1, accumulated + phaseDur - elapsedSeconds);
      break;
    }
    accumulated += phaseDur;
  }

  const currentPhase: MicroPhase = session.phases[currentPhaseIndex] || session.phases[0];

  // Initial chime on mount
  useEffect(() => {
    playChime(soundRef.current);
  }, []);

  // Main timer
  useEffect(() => {
    if (isPaused || elapsedSeconds >= 60) return;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, elapsedSeconds]);

  // Sound cue on phase transition
  const prevPhaseIndexRef = useRef(0);
  useEffect(() => {
    if (currentPhaseIndex !== prevPhaseIndexRef.current && currentPhaseIndex > 0) {
      prevPhaseIndexRef.current = currentPhaseIndex;
      const phase = session.phases[currentPhaseIndex];
      if (phase?.breathGuidance) {
        playBreathCue(phase.breathGuidance, soundRef.current);
      } else {
        playChime(soundRef.current);
      }
    }
  }, [currentPhaseIndex, session.phases]);

  // Completion trigger: safe inside useEffect
  const completedRef = useRef(false);
  useEffect(() => {
    if (elapsedSeconds >= 60 && !completedRef.current) {
      completedRef.current = true;
      playCompletionChime(soundRef.current);
      onComplete();
    }
  }, [elapsedSeconds, onComplete]);

  // Progress percentage (60s total)
  const progressPercent = ((60 - totalSecondsLeft) / 60) * 100;
  const circumference = 2 * Math.PI * 46; // r = 46 for 100x100 circle
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div
      id="session-active-screen"
      className={`min-h-screen w-full flex flex-col justify-between p-4 sm:p-6 transition-colors duration-700 select-none ${
        highContrast
          ? 'bg-black text-white'
          : nightMode
          ? 'bg-gradient-to-b from-[#090e1a] via-[#0d1527] to-[#0a1020] text-slate-100'
          : 'bg-gradient-to-b from-[#eef4f1] via-[#f4f7f6] to-[#e8edf2] text-slate-800'
      }`}
    >
      {/* Top Header Controls */}
      <header className="w-full max-w-2xl mx-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              highContrast
                ? 'border-2 border-white bg-black text-white'
                : nightMode
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}
          >
            {session.tag}
          </span>
          <span className={`text-xs ${highContrast ? 'text-white' : 'opacity-70 font-medium'}`}>
            {session.targetArea === 'respiracion'
              ? currentPhaseIndex < 9
                ? `Ciclo ${Math.floor(currentPhaseIndex / 3) + 1} de 3`
                : 'Cierre en calma'
              : `Fase ${currentPhaseIndex + 1} de ${session.phases.length}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound toggle */}
          <button
            id="toggle-sound-active"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Silenciar sonidos suaves' : 'Activar campana y respiración sonora'}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-colors ${
              highContrast
                ? 'border-2 border-white bg-black text-white'
                : nightMode
                ? 'hover:bg-slate-800/80 text-slate-300 bg-slate-900/60 border border-slate-800'
                : 'hover:bg-slate-200/80 text-slate-700 bg-white/80 border border-slate-200'
            }`}
            title={soundEnabled ? 'Silenciar' : 'Activar sonido suave'}
          >
            {soundEnabled ? (
              <Volume2 size={20} className={nightMode ? 'text-emerald-300' : 'text-emerald-700'} />
            ) : (
              <VolumeX size={20} />
            )}
          </button>

          {/* Pause / Play */}
          <button
            id="toggle-pause-active"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Reanudar minuto' : 'Pausar minuto'}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-colors ${
              highContrast
                ? 'border-2 border-white bg-black text-white'
                : nightMode
                ? 'hover:bg-slate-800/80 text-slate-300 bg-slate-900/60 border border-slate-800'
                : 'hover:bg-slate-200/80 text-slate-700 bg-white/80 border border-slate-200'
            }`}
            title={isPaused ? 'Reanudar' : 'Pausar'}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>

          {/* Instant Exit for Code Blue / Urgent Calls */}
          <button
            id="exit-to-shift-button"
            onClick={onExit}
            className={`min-h-[44px] flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border transition-colors ${
              highContrast
                ? 'border-2 border-white bg-black text-white hover:bg-white hover:text-black'
                : nightMode
                ? 'border-slate-800 bg-slate-900/90 text-slate-300 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-800/50'
                : 'border-slate-300 bg-white/90 text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
            }`}
            title="Salida inmediata si te llaman a piso o urgencias"
          >
            <X size={16} />
            <span>Volver a guardia</span>
          </button>
        </div>
      </header>

      {/* Main Sanctuary Stage */}
      <main className="w-full max-w-xl mx-auto my-auto flex flex-col items-center text-center px-4">
        {/* Total Time Badge with circular progress indicator */}
        <div className="relative w-28 h-28 my-2 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="transparent"
              stroke={
                highContrast
                  ? 'rgba(255, 255, 255, 0.2)'
                  : nightMode
                  ? 'rgba(30, 47, 80, 0.5)'
                  : 'rgba(203, 213, 225, 0.7)'
              }
              strokeWidth="5"
            />
            {/* Animated progress ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="transparent"
              stroke={
                highContrast
                  ? '#34d399'
                  : nightMode
                  ? '#93c5aa' // Sage green
                  : '#2d6a4f' // Deep sage
              }
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: 'linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold tracking-tight tabular-nums">
              {totalSecondsLeft}
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold opacity-70">
              segundos
            </span>
          </div>
        </div>

        {/* Phase Guidance Card */}
        <div className="w-full mt-2 mb-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-balance">
                {currentPhase.instruction}
              </h2>
              <p
                className={`text-sm sm:text-base mt-2 max-w-md font-medium leading-relaxed ${
                  highContrast
                    ? 'text-white'
                    : nightMode
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                {currentPhase.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animated Visualizer */}
        <div className="w-full py-1">
          {session.targetArea === 'respiracion' ? (
            <BreathingVisualizer
              phaseGuidance={currentPhase.breathGuidance}
              secondsLeftInPhase={phaseSecondsLeft}
              totalPhaseDuration={currentPhase.duration}
              nightMode={nightMode}
              highContrast={highContrast}
            />
          ) : (
            <StretchVisualizer
              visualCue={currentPhase.visualCue}
              nightMode={nightMode}
              highContrast={highContrast}
            />
          )}
        </div>

        {/* Compassionate hospital worker affirmation */}
        <div
          className={`mt-4 px-4 py-3.5 rounded-2xl max-w-md w-full border backdrop-blur-sm transition-all ${
            highContrast
              ? 'bg-black border-2 border-white text-white'
              : nightMode
              ? 'bg-slate-900/70 border-slate-800 text-indigo-200/90'
              : 'bg-white/90 border-emerald-200/70 text-emerald-950 shadow-sm'
          }`}
        >
          <div className="flex items-start gap-2.5 text-left">
            <HeartHandshake
              size={18}
              className={`shrink-0 mt-0.5 ${
                highContrast
                  ? 'text-white'
                  : nightMode
                  ? 'text-indigo-300'
                  : 'text-emerald-700'
              }`}
            />
            <p className="text-xs sm:text-sm italic font-serif-quote leading-snug">
              "{session.careMessage}"
            </p>
          </div>
        </div>
      </main>

      {/* Footer reassurance: zero data, zero judgment */}
      <footer className="w-full max-w-xl mx-auto text-center pb-2">
        <p className={`text-[11px] tracking-wide ${highContrast ? 'text-white' : 'opacity-60'}`}>
          60 segundos dedicados solo a ti • Nadie te evalúa ni te registra aquí
        </p>
      </footer>
    </div>
  );
};
