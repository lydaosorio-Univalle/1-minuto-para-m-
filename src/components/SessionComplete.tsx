import React from 'react';
import { motion } from 'motion/react';
import { MicroSession } from '../types';
import { Sparkles, RotateCcw, ArrowRight, Heart, ShieldCheck } from 'lucide-react';

interface SessionCompleteProps {
  session: MicroSession;
  nightMode: boolean;
  highContrast?: boolean;
  onRepeatOrNew: () => void;
  onFinish: () => void;
  onOpenAffirmations: () => void;
}

export const SessionComplete: React.FC<SessionCompleteProps> = ({
  session,
  nightMode,
  highContrast = false,
  onRepeatOrNew,
  onFinish,
  onOpenAffirmations,
}) => {
  return (
    <div
      id="session-complete-screen"
      className={`min-h-screen w-full flex flex-col justify-between items-center p-6 sm:p-8 transition-colors duration-700 select-none ${
        highContrast
          ? 'bg-black text-white'
          : nightMode
          ? 'bg-gradient-to-b from-[#090e1a] via-[#0d1527] to-[#0a1020] text-slate-100'
          : 'bg-gradient-to-b from-[#eef4f1] via-[#f4f7f6] to-[#e8edf2] text-slate-800'
      }`}
    >
      <div className="w-full max-w-lg mx-auto my-auto flex flex-col items-center text-center">
        {/* Luminous gentle badge in sage / lavender */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-xl ${
            highContrast
              ? 'border-2 border-white bg-black text-white'
              : nightMode
              ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
              : 'bg-emerald-100 border border-emerald-200 text-emerald-800'
          }`}
        >
          <Sparkles size={34} className="animate-gentle-pulse" />
        </motion.div>

        {/* Completion Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight"
        >
          Minuto cumplido.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`text-base sm:text-lg mt-3 max-w-md font-medium ${
            highContrast ? 'text-white' : nightMode ? 'text-indigo-200' : 'text-emerald-950'
          }`}
        >
          {session.postMessage}
        </motion.p>

        {/* Compassionate hospital context message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={`mt-6 p-5 rounded-2xl border text-left leading-relaxed ${
            highContrast
              ? 'bg-black border-2 border-white text-white'
              : nightMode
              ? 'bg-slate-900/70 border-slate-800 text-slate-300'
              : 'bg-white/95 border-emerald-200/70 text-slate-700 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 font-semibold text-xs tracking-wider uppercase opacity-85">
            <Heart
              size={14}
              className={highContrast ? 'text-white' : nightMode ? 'text-emerald-400' : 'text-emerald-700'}
            />
            <span>Cuidado para quien cuida</span>
          </div>
          <p className="text-sm font-serif-quote italic text-balance">
            "No se puede llenar la copa de los demás con una jarra vacía. Cada minuto que te regalas en medio de una UCI, urgencias o quirófano es un acto de respeto hacia tu vocación y tu humanidad."
          </p>
        </motion.div>

        {/* Accessible, large Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 w-full flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          {/* Repeat or Choose another zone */}
          <button
            id="another-minute-button"
            onClick={onRepeatOrNew}
            className={`w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
              highContrast
                ? 'border-2 border-white bg-white text-black hover:bg-black hover:text-white'
                : nightMode
                ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 hover:shadow-emerald-500/20'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white hover:shadow-emerald-700/20'
            }`}
          >
            <RotateCcw size={17} />
            <span>Tomar otro minuto</span>
          </button>

          {/* Return to Shift */}
          <button
            id="return-to-shift-button"
            onClick={onFinish}
            className={`w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
              highContrast
                ? 'border-2 border-white bg-black text-white hover:bg-white hover:text-black'
                : nightMode
                ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Volver a mi turno</span>
            <ArrowRight size={17} />
          </button>
        </motion.div>

        {/* Read solidarity thoughts link */}
        <button
          id="read-thoughts-from-complete"
          onClick={onOpenAffirmations}
          className={`mt-6 text-xs underline underline-offset-4 font-semibold min-h-[44px] inline-flex items-center ${
            highContrast ? 'text-white' : 'opacity-80 hover:opacity-100 transition-opacity'
          }`}
        >
          Leer palabras de aliento para el personal sanitario
        </button>
      </div>

      {/* Zero telemetry guarantee */}
      <footer className="w-full text-center pt-4">
        <div className={`inline-flex items-center gap-1.5 text-xs ${highContrast ? 'text-white' : 'opacity-60'}`}>
          <ShieldCheck size={14} />
          <span>Ningún dato tuyo se registra. Privacidad médica total.</span>
        </div>
      </footer>
    </div>
  );
};
