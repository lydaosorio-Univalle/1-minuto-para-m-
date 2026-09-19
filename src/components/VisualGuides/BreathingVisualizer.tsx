import React from 'react';
import { motion } from 'motion/react';

interface BreathingVisualizerProps {
  phaseGuidance?: 'inhale' | 'exhale' | 'hold' | 'steady';
  secondsLeftInPhase: number;
  totalPhaseDuration: number;
  nightMode?: boolean;
  highContrast?: boolean;
}

export const BreathingVisualizer: React.FC<BreathingVisualizerProps> = ({
  phaseGuidance = 'inhale',
  secondsLeftInPhase,
  totalPhaseDuration = 4,
  nightMode = true,
  highContrast = false,
}) => {
  // Smooth, non-jarring scale transitions to prevent dizziness
  const getScale = () => {
    switch (phaseGuidance) {
      case 'inhale':
        return 1.25;
      case 'hold':
        return 1.23;
      case 'exhale':
        return 0.88;
      case 'steady':
      default:
        return 1.0;
    }
  };

  const getLabel = () => {
    switch (phaseGuidance) {
      case 'inhale':
        return 'Inhalando suave';
      case 'hold':
        return 'Sosteniendo en calma';
      case 'exhale':
        return 'Exhalando y vaciando';
      case 'steady':
      default:
        return 'Respiración reposada';
    }
  };

  const animDuration = Math.max(1, totalPhaseDuration);

  return (
    <div className="relative flex flex-col items-center justify-center h-64 w-64 md:h-72 md:w-72 mx-auto select-none">
      {/* Ambient outer wave pulse in soft sage/lavender */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: highContrast ? [0.2, 0.4, 0.2] : [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute inset-0 rounded-full blur-2xl ${
          nightMode ? 'bg-emerald-500/15' : 'bg-teal-500/20'
        }`}
      />

      {/* Ripple ring 1 - Sage / Lavender calming tone */}
      <motion.div
        animate={{
          scale: getScale(),
          opacity: phaseGuidance === 'hold' ? 0.6 : 0.35,
        }}
        transition={{
          duration: animDuration,
          ease: 'easeInOut',
        }}
        className={`absolute inset-4 rounded-full border-2 border-dashed ${
          highContrast
            ? 'border-white'
            : nightMode
            ? 'border-indigo-300/40'
            : 'border-emerald-600/40'
        }`}
      />

      {/* Main expanding/contracting orb with cool tones */}
      <motion.div
        animate={{
          scale: getScale(),
        }}
        transition={{
          duration: animDuration,
          ease: 'easeInOut',
        }}
        className={`relative flex flex-col items-center justify-center w-44 h-44 rounded-full shadow-2xl transition-colors duration-700 ${
          highContrast
            ? 'bg-slate-900 border-4 border-emerald-400 text-white'
            : nightMode
            ? 'bg-gradient-to-br from-indigo-950/70 via-slate-900 to-emerald-950/60 border-2 border-emerald-400/30 text-emerald-100 shadow-emerald-950/30'
            : 'bg-gradient-to-br from-[#e8f0eb] via-emerald-50/80 to-indigo-50/70 border-2 border-emerald-300 text-emerald-950 shadow-emerald-900/10'
        }`}
      >
        {/* Soft glowing inner nucleus in soft lavender or sage */}
        <motion.div
          animate={{
            scale: [0.95, 1.1, 0.95],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`w-20 h-20 rounded-full blur-md ${
            highContrast
              ? 'bg-emerald-400/30'
              : nightMode
              ? 'bg-indigo-400/25'
              : 'bg-emerald-300/40'
          }`}
        />

        {/* Central guidance text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
          <span
            className={`text-xs font-semibold tracking-wider uppercase ${
              highContrast ? 'text-white' : 'opacity-85'
            }`}
          >
            {getLabel()}
          </span>
          <span className="text-3xl font-bold mt-1.5 tabular-nums">
            {secondsLeftInPhase}s
          </span>
          <span className="text-[11px] font-medium opacity-70 mt-0.5">
            de {totalPhaseDuration}s
          </span>
        </div>
      </motion.div>

      {/* Rhythmic breathing prompt below */}
      <motion.div
        key={phaseGuidance}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`mt-4 text-xs tracking-wide text-center font-medium ${
          highContrast ? 'text-white' : 'opacity-80'
        }`}
      >
        {phaseGuidance === 'inhale' && 'Inhala profundo llenando el abdomen (4s)'}
        {phaseGuidance === 'hold' && 'Pausa serena... afloja la mandíbula (7s)'}
        {phaseGuidance === 'exhale' && 'Exhala largo... deja ir la prisa (8s)'}
        {phaseGuidance === 'steady' && 'Respira a tu ritmo natural en calma'}
      </motion.div>
    </div>
  );
};
