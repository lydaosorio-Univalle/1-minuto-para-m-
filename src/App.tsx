/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MICRO_SESSIONS } from './data/sessions';
import { MicroSession, AppView } from './types';
import { SessionActive } from './components/SessionActive';
import { SessionComplete } from './components/SessionComplete';
import { AffirmationsModal } from './components/AffirmationsModal';
import {
  HeartPulse,
  Activity,
  ShieldOff,
  Hand,
  EyeOff,
  Sparkles,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Clock,
  ShieldCheck,
  HeartHandshake,
  MessageSquareHeart,
  Contrast,
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedSession, setSelectedSession] = useState<MicroSession>(MICRO_SESSIONS[0]);
  // Dark mode by default for healthcare workers in monitor rooms or artificial/dim light
  const [nightMode, setNightMode] = useState(true);
  // High contrast mode optional for enhanced accessibility
  const [highContrast, setHighContrast] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showAffirmations, setShowAffirmations] = useState(false);

  // Map icon strings to Lucide components
  const getSessionIcon = (iconName: string, className?: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className={className} size={22} />;
      case 'HeartPulse':
        return <HeartPulse className={className} size={22} />;
      case 'ShieldOff':
        return <ShieldOff className={className} size={22} />;
      case 'Hand':
        return <Hand className={className} size={22} />;
      case 'EyeOff':
        return <EyeOff className={className} size={22} />;
      case 'Sparkles':
      default:
        return <Sparkles className={className} size={22} />;
    }
  };

  // Immediate start for the big central button
  const handleStartQuickMinute = () => {
    setCurrentView('session');
  };

  const handleSelectAndStart = (session: MicroSession) => {
    setSelectedSession(session);
    setCurrentView('session');
  };

  const handleSessionComplete = () => {
    setCurrentView('completed');
  };

  const handleReturnHome = () => {
    setCurrentView('home');
  };

  // Render Active Session View
  if (currentView === 'session') {
    return (
      <SessionActive
        session={selectedSession}
        nightMode={nightMode}
        highContrast={highContrast}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onComplete={handleSessionComplete}
        onExit={handleReturnHome}
      />
    );
  }

  // Render Completed Session View
  if (currentView === 'completed') {
    return (
      <SessionComplete
        session={selectedSession}
        nightMode={nightMode}
        highContrast={highContrast}
        onRepeatOrNew={() => setCurrentView('home')}
        onFinish={handleReturnHome}
        onOpenAffirmations={() => setShowAffirmations(true)}
      />
    );
  }

  // Render Main Home Screen with cool calming tones and smooth transitions
  return (
    <div
      id="main-home-container"
      className={`min-h-screen w-full transition-colors duration-700 flex flex-col justify-between select-none ${
        highContrast
          ? 'bg-black text-white'
          : nightMode
          ? 'bg-gradient-to-b from-[#080d1a] via-[#0d1629] to-[#090f1e] text-slate-100'
          : 'bg-gradient-to-b from-[#edf4f1] via-[#f5f8f7] to-[#eaf0ee] text-slate-800'
      }`}
    >
      {/* Top Navigation Bar */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${
              highContrast
                ? 'border-2 border-white bg-black text-white'
                : nightMode
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                : 'bg-emerald-700 text-white shadow-emerald-700/20'
            }`}
          >
            <Clock size={22} />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight leading-none">
              1 Minuto Para Mí
            </h1>
            <p
              className={`text-xs mt-0.5 ${
                highContrast ? 'text-white' : 'opacity-70 text-emerald-300/80 dark:text-emerald-300/70'
              }`}
            >
              Cuidado para el personal de salud
            </p>
          </div>
        </div>

        {/* Controls: Night Mode, High Contrast & Sound */}
        <div className="flex items-center gap-2">
          {/* High Contrast Toggle */}
          <button
            id="toggle-contrast-button"
            onClick={() => setHighContrast(!highContrast)}
            aria-label={highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'}
            className={`min-h-[44px] min-w-[44px] p-2 rounded-full text-xs font-semibold flex items-center justify-center border transition-all ${
              highContrast
                ? 'bg-white text-black border-2 border-white'
                : nightMode
                ? 'bg-slate-900/80 text-slate-300 border-slate-800 hover:text-white'
                : 'bg-white/80 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Modo alto contraste para máxima legibilidad"
          >
            <Contrast size={18} />
          </button>

          {/* Night Mode Toggle */}
          <button
            id="toggle-night-mode-button"
            onClick={() => setNightMode(!nightMode)}
            aria-label={nightMode ? 'Activar modo día' : 'Activar modo oscuro'}
            className={`min-h-[44px] px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              highContrast
                ? 'bg-black text-white border-2 border-white'
                : nightMode
                ? 'bg-slate-900/80 text-indigo-200 border-slate-800 hover:bg-slate-850'
                : 'bg-white/80 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Ideal para guardias nocturnas y salas oscuras de monitor"
          >
            {nightMode ? <Sun size={16} className="text-indigo-300" /> : <Moon size={16} />}
            <span className="hidden sm:inline">
              {nightMode ? 'Modo oscuro' : 'Modo suave'}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            id="toggle-sound-button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? 'Silenciar campanilla' : 'Activar campanilla'}
            className={`min-h-[44px] min-w-[44px] p-2 rounded-full border flex items-center justify-center transition-all ${
              highContrast
                ? 'bg-black text-white border-2 border-white'
                : nightMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title={soundEnabled ? 'Sonido activado' : 'Modo silencio'}
          >
            {soundEnabled ? (
              <Volume2
                size={18}
                className={nightMode ? 'text-emerald-300' : 'text-emerald-700'}
              />
            ) : (
              <VolumeX size={18} />
            )}
          </button>

          {/* Solidarity words modal button */}
          <button
            id="open-affirmations-button"
            onClick={() => setShowAffirmations(true)}
            className={`min-h-[44px] min-w-[44px] p-2 rounded-full border flex items-center justify-center transition-all ${
              highContrast
                ? 'bg-black text-white border-2 border-white'
                : nightMode
                ? 'bg-slate-900/80 border-slate-800 text-indigo-300 hover:bg-slate-800'
                : 'bg-white/80 border-slate-200 text-emerald-800 hover:bg-slate-100'
            }`}
            title="Palabras de aliento sin juicio para personal sanitario"
          >
            <MessageSquareHeart size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-4 flex flex-col items-center">
        {/* Empathetic Hospital Context Badge in Sage & Lavender */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 border ${
            highContrast
              ? 'border border-white bg-black text-white'
              : nightMode
              ? 'bg-slate-900/90 border-slate-800 text-emerald-300'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}
        >
          <HeartHandshake
            size={15}
            className={nightMode ? 'text-emerald-400' : 'text-emerald-700'}
          />
          <span>UCI • Urgencias • Quirófano • Turno de piso</span>
        </motion.div>

        {/* Central One-Touch Hero Button with soft breathe animation */}
        <div className="w-full flex flex-col items-center text-center my-3 sm:my-5">
          <div className="relative flex items-center justify-center">
            {/* Ambient Pulsing Glow behind the button (calm cool tones) */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute -inset-5 rounded-full blur-2xl ${
                nightMode ? 'bg-emerald-600/15' : 'bg-teal-500/20'
              }`}
            />

            {/* The Main 1-Minute Action Button */}
            <motion.button
              id="start-one-minute-hero-button"
              onClick={handleStartQuickMinute}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-full flex flex-col items-center justify-center p-6 text-center shadow-2xl transition-all ${
                highContrast
                  ? 'border-4 border-white bg-black text-white hover:bg-white hover:text-black'
                  : nightMode
                  ? 'bg-gradient-to-b from-[#142338] via-[#0f1b2d] to-[#0a121f] border-2 border-emerald-400/40 text-emerald-100 shadow-emerald-950/40 hover:border-emerald-300'
                  : 'bg-gradient-to-b from-emerald-700 via-emerald-800 to-slate-900 border-2 border-emerald-300 text-white shadow-emerald-800/30'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full mb-2 bg-white/10 backdrop-blur-sm">
                <Clock
                  size={26}
                  className={highContrast ? 'text-white' : nightMode ? 'text-emerald-300' : 'text-white'}
                />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                1 Minuto
                <br />
                Para Mí
              </span>
              <span className="text-xs sm:text-sm mt-2 font-semibold opacity-90 tracking-wide">
                Presiona para tu respiro
              </span>
              <span className="text-[11px] mt-1 font-medium opacity-70 uppercase tracking-widest">
                60 segundos
              </span>
            </motion.button>
          </div>

          {/* Currently Selected Micro-Session Info */}
          <div className="mt-6 max-w-md">
            <span
              className={`text-xs uppercase tracking-wider font-semibold ${
                highContrast ? 'text-white' : 'opacity-70 text-indigo-300 dark:text-indigo-300'
              }`}
            >
              Sesión preparada:
            </span>
            <h2 className="text-base sm:text-lg font-bold tracking-tight mt-0.5">
              {selectedSession.title}
            </h2>
            <p
              className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                highContrast ? 'text-white' : nightMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {selectedSession.subtitle}
            </p>
          </div>
        </div>

        {/* Tailored Category Cards for Hospital Pain Points */}
        <section className="w-full mt-7" aria-labelledby="choose-tension-heading">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3
              id="choose-tension-heading"
              className={`text-xs sm:text-sm font-bold tracking-tight uppercase ${
                highContrast ? 'text-white' : 'opacity-80'
              }`}
            >
              ¿Dónde sientes más la carga ahora?
            </h3>
            <span className={`text-[11px] ${highContrast ? 'text-white' : 'opacity-60'}`}>
              Elige para personalizar tus 60s
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            {MICRO_SESSIONS.map((session) => {
              const isSelected = selectedSession.id === session.id;
              return (
                <button
                  key={session.id}
                  id={`select-session-${session.id}`}
                  onClick={() => handleSelectAndStart(session)}
                  className={`p-4 rounded-3xl text-left border transition-all flex flex-col justify-between group min-h-[140px] ${
                    highContrast
                      ? isSelected
                        ? 'bg-white text-black border-2 border-white'
                        : 'bg-black text-white border-2 border-white hover:bg-slate-900'
                      : isSelected
                      ? nightMode
                        ? 'bg-emerald-950/40 border-2 border-emerald-400 text-emerald-100 shadow-md shadow-emerald-950/40'
                        : 'bg-emerald-50/90 border-2 border-emerald-700 text-emerald-950 shadow-sm'
                      : nightMode
                      ? 'bg-slate-900/70 border-slate-800/90 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                      : 'bg-white/80 border-slate-200/90 text-slate-700 hover:bg-emerald-50/40 hover:border-emerald-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div
                        className={`p-2 rounded-2xl transition-colors ${
                          highContrast
                            ? isSelected
                              ? 'bg-black text-white'
                              : 'border border-white text-white'
                            : isSelected
                            ? nightMode
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-emerald-700 text-white'
                            : nightMode
                            ? 'bg-slate-800 text-slate-300 group-hover:text-emerald-300'
                            : 'bg-slate-100 text-slate-600 group-hover:text-emerald-700'
                        }`}
                      >
                        {getSessionIcon(session.icon)}
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                          highContrast
                            ? 'border border-white text-white'
                            : nightMode
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                        }`}
                      >
                        {session.tag}
                      </span>
                    </div>

                    <h4
                      className={`font-bold text-sm leading-snug transition-colors ${
                        highContrast
                          ? isSelected
                            ? 'text-black'
                            : 'text-white'
                          : 'group-hover:text-emerald-300 dark:group-hover:text-emerald-300'
                      }`}
                    >
                      {session.title}
                    </h4>
                    <p className="text-xs opacity-80 mt-1 line-clamp-2 leading-relaxed">
                      {session.context}
                    </p>
                  </div>

                  <div
                    className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] font-medium ${
                      highContrast
                        ? isSelected
                          ? 'border-black'
                          : 'border-white'
                        : 'border-slate-200/40 dark:border-slate-800'
                    }`}
                  >
                    <span className="opacity-70">
                      {session.targetArea === 'respiracion'
                        ? '3 ciclos (4-7-8)'
                        : `${session.phases.length} fases guiadas`}
                    </span>
                    <span
                      className={`font-bold ${
                        highContrast
                          ? isSelected
                            ? 'text-black'
                            : 'text-white'
                          : nightMode
                          ? 'text-emerald-300'
                          : 'text-emerald-800'
                      }`}
                    >
                      Iniciar 1 min →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Humanized Manifesto: No evaluation, no metrics */}
        <section
          className={`mt-8 p-5 rounded-3xl border w-full max-w-2xl text-center backdrop-blur-sm ${
            highContrast
              ? 'border-2 border-white bg-black text-white'
              : nightMode
              ? 'bg-slate-900/60 border-slate-800/80 text-slate-300'
              : 'bg-white/85 border-slate-200/80 text-slate-600 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 opacity-85">
            <ShieldCheck
              size={16}
              className={highContrast ? 'text-white' : nightMode ? 'text-emerald-400' : 'text-emerald-700'}
            />
            <span>Un santuario sin evaluación</span>
          </div>
          <p className="text-xs sm:text-sm font-serif-quote italic leading-relaxed text-balance">
            "Esta herramienta no te pide nombre ni cargo, no mide tu productividad ni evalúa tu nivel de estrés. Reconocemos la dureza de la alta ocupación hospitalaria. Solo busca darte un minuto de cuidado genuino a ti, que pasas tu vida cuidando de los demás."
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto px-4 py-4 text-center text-xs opacity-60 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200/40 dark:border-slate-800/60">
        <span>1 Minuto Para Mí • Humanizando la tecnología para la salud</span>
        <button
          onClick={() => setShowAffirmations(true)}
          className="hover:underline hover:opacity-100 transition-opacity font-semibold"
        >
          Ver palabras de aliento para turnos difíciles
        </button>
      </footer>

      {/* Modal for Affirmations / Solidarity */}
      <AnimatePresence>
        {showAffirmations && (
          <AffirmationsModal
            nightMode={nightMode}
            highContrast={highContrast}
            onClose={() => setShowAffirmations(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
