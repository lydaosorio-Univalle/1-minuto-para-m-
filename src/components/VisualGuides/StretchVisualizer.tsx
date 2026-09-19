import React from 'react';
import { motion } from 'motion/react';
import { VisualCue } from '../../types';

interface StretchVisualizerProps {
  visualCue: VisualCue;
  nightMode?: boolean;
  highContrast?: boolean;
}

export const StretchVisualizer: React.FC<StretchVisualizerProps> = ({
  visualCue,
  nightMode = true,
  highContrast = false,
}) => {
  // Cool, calming palette: deep blues, sage greens, soft lavenders
  const accentColor = highContrast
    ? '#34d399'
    : nightMode
    ? '#93c5aa' // Calming sage green
    : '#2d6a4f'; // Deep sage green

  const secondaryColor = highContrast
    ? '#c4b5fd'
    : nightMode
    ? '#a5b4fc' // Soft lavender
    : '#4f46e5'; // Gentle indigo

  const trackColor = highContrast
    ? 'rgba(255, 255, 255, 0.15)'
    : nightMode
    ? 'rgba(147, 197, 170, 0.12)'
    : 'rgba(45, 106, 79, 0.08)';

  const bodyStroke = highContrast
    ? '#ffffff'
    : nightMode
    ? '#e2e8f0'
    : '#1e293b';

  const cardFill = nightMode ? '#0f172a' : '#f8fafc';

  // Render specific anatomical animation based on visualCue
  const renderVisual = () => {
    // 1. Neck Stretches
    if (visualCue.startsWith('stretch-neck')) {
      let headRotate = 0;
      let headY = 0;
      let label = 'Alineación';

      if (visualCue === 'stretch-neck-down') {
        headRotate = 0;
        headY = 14;
        label = 'Flexión anterior: cuello largo';
      } else if (visualCue === 'stretch-neck-right') {
        headRotate = 20;
        headY = 3;
        label = 'Inclinación lateral derecha';
      } else if (visualCue === 'stretch-neck-left') {
        headRotate = -20;
        headY = 3;
        label = 'Inclinación lateral izquierda';
      } else if (visualCue === 'stretch-neck-up') {
        headRotate = 0;
        headY = -3;
        label = 'Mirada serena al frente';
      }

      return (
        <div className="relative flex flex-col items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-52 h-52 overflow-visible">
            {/* Soft backdrop glow */}
            <circle cx="100" cy="100" r="75" fill={trackColor} filter="blur(16px)" />

            {/* Torso / Shoulders base */}
            <path
              d="M 35 175 Q 70 145 100 145 Q 130 145 165 175"
              fill="none"
              stroke={bodyStroke}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Clavicles */}
            <path
              d="M 60 152 Q 100 162 140 152"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.8"
            />

            {/* Neck pillar */}
            <line x1="100" y1="145" x2="100" y2="105" stroke={bodyStroke} strokeWidth="5.5" strokeLinecap="round" />

            {/* Tension release gentle aura */}
            <motion.ellipse
              cx="100"
              cy="130"
              rx="45"
              ry="18"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Animated Head */}
            <motion.g
              animate={{ rotate: headRotate, y: headY }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ transformOrigin: '100px 115px' }}
            >
              {/* Head oval */}
              <ellipse
                cx="100"
                cy="75"
                rx="28"
                ry="36"
                fill={cardFill}
                stroke={bodyStroke}
                strokeWidth="3.5"
              />
              {/* Serene closed eyes curved line */}
              <path d="M 86 75 Q 92 79 96 75" fill="none" stroke={bodyStroke} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 104 75 Q 108 79 114 75" fill="none" stroke={bodyStroke} strokeWidth="2.5" strokeLinecap="round" />
              {/* Gentle peaceful smile */}
              <path d="M 94 92 Q 100 96 106 92" fill="none" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          </svg>
          <span className={`text-xs font-medium tracking-wide mt-1 ${highContrast ? 'text-white font-bold' : 'opacity-80'}`}>
            {label}
          </span>
        </div>
      );
    }

    // 2. Shoulders & Chest
    if (visualCue.startsWith('shoulders') || visualCue === 'chest-open') {
      let label = 'Relajación de hombros';

      if (visualCue === 'shoulders-up') {
        label = 'Eleva hacia orejas... y suelta suave';
      } else if (visualCue === 'shoulders-roll') {
        label = 'Rotaciones circulares lentas';
      } else if (visualCue === 'chest-open') {
        label = 'Apertura torácica y diafragma';
      } else if (visualCue === 'shoulders-rest') {
        label = 'Brazos pesados, gravedad libre';
      }

      return (
        <div className="relative flex flex-col items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-52 h-52 overflow-visible">
            <circle cx="100" cy="100" r="75" fill={trackColor} filter="blur(16px)" />

            {/* Spine reference */}
            <line x1="100" y1="70" x2="100" y2="175" stroke={secondaryColor} strokeWidth="2.5" strokeDasharray="5 5" opacity="0.6" />

            {/* Torso & Shoulder structure */}
            <motion.path
              animate={{
                d:
                  visualCue === 'chest-open'
                    ? 'M 25 180 Q 70 125 100 125 Q 130 125 175 180'
                    : visualCue === 'shoulders-up'
                    ? 'M 30 155 Q 65 115 100 130 Q 135 115 170 155'
                    : 'M 35 175 Q 70 135 100 135 Q 130 135 165 175',
              }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              fill="none"
              stroke={bodyStroke}
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Chest glow on expansion */}
            {visualCue === 'chest-open' && (
              <motion.circle
                cx="100"
                cy="145"
                r="30"
                fill={accentColor}
                opacity={0.3}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                filter="blur(10px)"
              />
            )}

            {/* Gentle shoulder roll indicators */}
            {visualCue === 'shoulders-roll' && (
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '55px 140px' }}
              >
                <circle cx="55" cy="140" r="15" fill="none" stroke={secondaryColor} strokeWidth="2" strokeDasharray="5 5" />
              </motion.g>
            )}

            {/* Head fixed calmly */}
            <ellipse cx="100" cy="72" rx="22" ry="28" fill={cardFill} stroke={bodyStroke} strokeWidth="3.5" />
            <path d="M 88 72 Q 93 75 97 72" fill="none" stroke={bodyStroke} strokeWidth="2" strokeLinecap="round" />
            <path d="M 103 72 Q 107 75 112 72" fill="none" stroke={bodyStroke} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className={`text-xs font-medium tracking-wide mt-1 ${highContrast ? 'text-white font-bold' : 'opacity-80'}`}>
            {label}
          </span>
        </div>
      );
    }

    // 3. Hands & Wrists
    if (visualCue.startsWith('hands')) {
      let label = 'Manos y muñecas';
      let handAnim = {};

      if (visualCue === 'hands-open') {
        label = 'Apertura estelar de dedos';
        handAnim = { scale: [0.92, 1.15, 0.92] };
      } else if (visualCue === 'hands-wrist') {
        label = 'Círculos suaves de muñeca';
        handAnim = { rotate: [0, 15, -15, 0] };
      } else if (visualCue === 'hands-flex') {
        label = 'Elongación de flexores y palmas';
        handAnim = { y: [0, -6, 0] };
      } else if (visualCue === 'hands-shake') {
        label = 'Sacudida ligera: soltar tensión';
        handAnim = { x: [-3, 3, -3, 3, 0] };
      }

      return (
        <div className="relative flex flex-col items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-52 h-52 overflow-visible">
            <circle cx="100" cy="100" r="75" fill={trackColor} filter="blur(16px)" />

            <motion.g
              animate={handAnim}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '100px 140px' }}
            >
              {/* Forearm */}
              <path d="M 90 180 L 92 135 L 108 135 L 110 180 Z" fill="none" stroke={bodyStroke} strokeWidth="3.5" strokeLinejoin="round" />
              {/* Wrist crease */}
              <line x1="90" y1="135" x2="110" y2="135" stroke={secondaryColor} strokeWidth="2.5" strokeDasharray="3 3" />

              {/* Hand Palm */}
              <path
                d="M 84 135 Q 82 105 92 95 Q 100 90 108 95 Q 118 105 116 135 Z"
                fill={cardFill}
                stroke={bodyStroke}
                strokeWidth="3.5"
              />

              {/* Fingers spread */}
              {/* Thumb */}
              <path d="M 84 125 Q 68 115 72 102 Q 78 98 86 112" fill="none" stroke={bodyStroke} strokeWidth="3.5" strokeLinecap="round" />
              {/* Index */}
              <path d="M 89 95 Q 86 65 91 60 Q 96 65 95 95" fill="none" stroke={bodyStroke} strokeWidth="3.5" strokeLinecap="round" />
              {/* Middle */}
              <path d="M 97 93 Q 99 55 103 52 Q 107 55 105 93" fill="none" stroke={bodyStroke} strokeWidth="3.5" strokeLinecap="round" />
              {/* Ring */}
              <path d="M 106 95 Q 110 65 114 62 Q 118 67 113 97" fill="none" stroke={bodyStroke} strokeWidth="3.5" strokeLinecap="round" />
              {/* Pinky */}
              <path d="M 114 105 Q 124 82 128 82 Q 130 88 118 116" fill="none" stroke={bodyStroke} strokeWidth="3" strokeLinecap="round" />
            </motion.g>

            {/* Subtle glow dots around fingertips */}
            <circle cx="70" cy="98" r="3" fill={accentColor} opacity="0.6" />
            <circle cx="91" cy="55" r="3" fill={accentColor} opacity="0.7" />
            <circle cx="103" cy="48" r="3" fill={accentColor} opacity="0.8" />
            <circle cx="115" cy="58" r="3" fill={accentColor} opacity="0.6" />
          </svg>
          <span className={`text-xs font-medium tracking-wide mt-1 ${highContrast ? 'text-white font-bold' : 'opacity-80'}`}>
            {label}
          </span>
        </div>
      );
    }

    // 4. Visual Pause & Eye Rest
    if (visualCue === 'palming' || visualCue === 'relax-eyes' || visualCue === 'horizon' || visualCue === 'soft-blink') {
      let label = 'Descanso de pantallas';

      if (visualCue === 'palming') label = 'Calor reconfortante en tus palmas';
      if (visualCue === 'relax-eyes') label = 'Descanso en la suave penumbra';
      if (visualCue === 'horizon') label = 'Enfocar el horizonte lejano';
      if (visualCue === 'soft-blink') label = 'Parpadeo gentil y rehidratante';

      return (
        <div className="relative flex flex-col items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-52 h-52 overflow-visible">
            <circle cx="100" cy="100" r="75" fill={trackColor} filter="blur(16px)" />

            {/* Visual horizon or eye shape */}
            {visualCue === 'horizon' ? (
              <g>
                <line
                  x1="30"
                  y1="110"
                  x2="170"
                  y2="110"
                  stroke={bodyStroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <motion.circle
                  cx="100"
                  cy="95"
                  r="24"
                  fill={secondaryColor}
                  opacity={0.3}
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <path d="M 35 110 Q 70 85 100 110 Q 130 90 165 110" fill="none" stroke={accentColor} strokeWidth="2" />
              </g>
            ) : (
              <g>
                {/* Eye outline */}
                <motion.path
                  d="M 40 100 Q 100 50 160 100 Q 100 150 40 100 Z"
                  fill={cardFill}
                  stroke={bodyStroke}
                  strokeWidth="3.5"
                />

                {/* Eyelids closing peacefully */}
                <motion.path
                  d={visualCue === 'soft-blink' ? 'M 40 100 Q 100 100 160 100' : 'M 40 100 Q 100 120 160 100'}
                  fill="none"
                  stroke={secondaryColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  animate={{
                    d:
                      visualCue === 'soft-blink'
                        ? [
                            'M 40 100 Q 100 75 160 100',
                            'M 40 100 Q 100 100 160 100',
                            'M 40 100 Q 100 75 160 100',
                          ]
                        : 'M 40 100 Q 100 108 160 100',
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Gentle rays of warmth / palming glow */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="45"
                  fill={accentColor}
                  opacity={0.2}
                  animate={{ scale: [0.9, 1.15, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  filter="blur(12px)"
                />
              </g>
            )}
          </svg>
          <span className={`text-xs font-medium tracking-wide mt-1 ${highContrast ? 'text-white font-bold' : 'opacity-80'}`}>
            {label}
          </span>
        </div>
      );
    }

    // 5. Physiological Sigh
    return (
      <div className="relative flex flex-col items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-52 h-52 overflow-visible">
          <circle cx="100" cy="100" r="75" fill={trackColor} filter="blur(16px)" />
          {/* Lungs schematic artistic silhouette */}
          <motion.path
            d="M 92 80 C 80 60 50 70 50 110 C 50 145 80 150 92 130 Z"
            fill={nightMode ? 'rgba(147, 197, 170, 0.25)' : 'rgba(45, 106, 79, 0.2)'}
            stroke={bodyStroke}
            strokeWidth="3"
            animate={{ scale: visualCue.includes('exhale') ? 0.86 : 1.15 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            style={{ transformOrigin: '92px 105px' }}
          />
          <motion.path
            d="M 108 80 C 120 60 150 70 150 110 C 150 145 120 150 108 130 Z"
            fill={nightMode ? 'rgba(147, 197, 170, 0.25)' : 'rgba(45, 106, 79, 0.2)'}
            stroke={bodyStroke}
            strokeWidth="3"
            animate={{ scale: visualCue.includes('exhale') ? 0.86 : 1.15 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            style={{ transformOrigin: '108px 105px' }}
          />
          {/* Trachea line */}
          <line x1="100" y1="50" x2="100" y2="95" stroke={secondaryColor} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="100" y1="95" x2="82" y2="110" stroke={secondaryColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="100" y1="95" x2="118" y2="110" stroke={secondaryColor} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span className={`text-xs font-medium tracking-wide mt-1 ${highContrast ? 'text-white font-bold' : 'opacity-80'}`}>
          {visualCue === 'physio-sip' ? 'Sorbo extra de aire' : 'Expansión pulmonar libre'}
        </span>
      </div>
    );
  };

  return <div className="w-full flex items-center justify-center py-2">{renderVisual()}</div>;
};
