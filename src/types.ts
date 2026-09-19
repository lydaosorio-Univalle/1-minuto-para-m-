export type TargetArea =
  | 'respiracion'
  | 'cuello'
  | 'hombros'
  | 'manos'
  | 'ojos-mente'
  | 'suspiro';

export type VisualCue =
  | 'inhale'
  | 'exhale'
  | 'hold'
  | 'stretch-neck-down'
  | 'stretch-neck-right'
  | 'stretch-neck-left'
  | 'stretch-neck-up'
  | 'shoulders-up'
  | 'shoulders-roll'
  | 'chest-open'
  | 'shoulders-rest'
  | 'hands-open'
  | 'hands-wrist'
  | 'hands-flex'
  | 'hands-shake'
  | 'palming'
  | 'relax-eyes'
  | 'horizon'
  | 'soft-blink'
  | 'physio-inhale'
  | 'physio-sip'
  | 'physio-exhale'
  | 'physio-rest'
  | 'steady';

export interface MicroPhase {
  id: string;
  name: string;
  duration: number; // in seconds
  instruction: string;
  detail: string;
  visualCue: VisualCue;
  breathGuidance?: 'inhale' | 'exhale' | 'hold' | 'steady';
}

export interface MicroSession {
  id: string;
  title: string;
  subtitle: string;
  targetArea: TargetArea;
  context: string;
  tag: string;
  icon: string;
  phases: MicroPhase[];
  careMessage: string;
  postMessage: string;
}

export type AppView = 'home' | 'session' | 'completed' | 'affirmations';
