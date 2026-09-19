import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HEALTHCARE_THOUGHTS } from '../data/affirmations';
import { Heart, ChevronLeft, ChevronRight, X, ShieldCheck } from 'lucide-react';

interface AffirmationsModalProps {
  nightMode: boolean;
  highContrast?: boolean;
  onClose: () => void;
}

export const AffirmationsModal: React.FC<AffirmationsModalProps> = ({
  nightMode,
  highContrast = false,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = HEALTHCARE_THOUGHTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HEALTHCARE_THOUGHTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HEALTHCARE_THOUGHTS.length) % HEALTHCARE_THOUGHTS.length);
  };

  return (
    <div
      id="affirmations-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border ${
          highContrast
            ? 'bg-black border-2 border-white text-white'
            : nightMode
            ? 'bg-[#0e1628] border-slate-800 text-slate-100 shadow-indigo-950/40'
            : 'bg-white border-emerald-200 text-slate-800 shadow-xl'
        }`}
      >
        {/* Accessible Close Button */}
        <button
          id="close-affirmations-button"
          onClick={onClose}
          className={`absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-colors ${
            highContrast
              ? 'border-2 border-white bg-black text-white hover:bg-white hover:text-black'
              : nightMode
              ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'
              : 'hover:bg-emerald-50 text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Cerrar reflexiones"
        >
          <X size={20} />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`p-2.5 rounded-2xl ${
              highContrast
                ? 'border-2 border-white bg-black text-white'
                : nightMode
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            <Heart size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">Cuidado para Quien Cuida</h3>
            <p className={`text-xs ${highContrast ? 'text-white' : 'opacity-70'}`}>
              Palabras sin juicio para tus turnos más difíciles
            </p>
          </div>
        </div>

        {/* Thought Card Slider with gentle fade */}
        <div className="min-h-[190px] flex flex-col justify-center my-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col"
            >
              <p className="text-base sm:text-lg font-serif-quote italic leading-relaxed text-balance">
                "{current.quote}"
              </p>
              <div
                className={`mt-4 pt-3.5 border-t flex items-center justify-between text-xs ${
                  highContrast
                    ? 'border-white'
                    : nightMode
                    ? 'border-slate-800'
                    : 'border-slate-200'
                }`}
              >
                <span className="font-semibold opacity-90">{current.author}</span>
                <span
                  className={`px-2.5 py-1 rounded-full font-medium ${
                    highContrast
                      ? 'border border-white bg-black text-white'
                      : nightMode
                      ? 'bg-slate-800 text-emerald-300'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}
                >
                  {current.role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons - Large touch target */}
        <div
          className={`flex items-center justify-between mt-6 pt-4 border-t ${
            highContrast
              ? 'border-white'
              : nightMode
              ? 'border-slate-800'
              : 'border-slate-200'
          }`}
        >
          <button
            id="prev-thought-button"
            onClick={handlePrev}
            className={`min-h-[44px] flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
              highContrast
                ? 'border border-white bg-black text-white hover:bg-white hover:text-black'
                : nightMode
                ? 'hover:bg-slate-800 text-slate-300 bg-slate-900/80 border border-slate-800'
                : 'hover:bg-emerald-50 text-slate-700 bg-slate-100'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Anterior</span>
          </button>

          <span className={`text-xs font-semibold ${highContrast ? 'text-white' : 'opacity-60'}`}>
            {currentIndex + 1} de {HEALTHCARE_THOUGHTS.length}
          </span>

          <button
            id="next-thought-button"
            onClick={handleNext}
            className={`min-h-[44px] flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
              highContrast
                ? 'border border-white bg-black text-white hover:bg-white hover:text-black'
                : nightMode
                ? 'hover:bg-slate-800 text-slate-300 bg-slate-900/80 border border-slate-800'
                : 'hover:bg-emerald-50 text-slate-700 bg-slate-100'
            }`}
          >
            <span>Siguiente</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Security guarantee */}
        <div className="mt-5 text-center">
          <span className={`inline-flex items-center gap-1.5 text-[11px] ${highContrast ? 'text-white' : 'opacity-50'}`}>
            <ShieldCheck size={12} />
            Sin registros, sin estadísticas. Solo un abrazo para tu jornada.
          </span>
        </div>
      </motion.div>
    </div>
  );
};
