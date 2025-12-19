
export interface ComparisonModel {
  id: number;
  name: string;
  brand: string;
  description: string;
  specs: Record<string, string>;
}

export interface Concept {
  title: string;
  text: string;
}

export interface TechSpec {
  key: string;
  val: string;
}

export interface ManufacturingStep {
  step: string;
  detail: string;
}

export interface HardwareData {
  id: string;
  name: string;
  role: string;
  desc: string;
  image: string;
  diagramType: 'processor' | 'card' | 'generic';
  concepts: Concept[];
  techSpecs: TechSpec[];
  // NEW: Heavy educational content
  architectureDeepDive: string[]; 
  manufacturingProcess: ManufacturingStep[];
  marketModels: ComparisonModel[];
}

export interface AppSettings {
  // Theme Tab
  themeMode: 'light' | 'dark' | 'auto' | 'cyber-gold';
  accentColor: string;
  backgroundStyle: 'solid' | 'gradient' | 'pattern';
  borderRadius: number; // px
  uiDensity: 'comfortable' | 'normal' | 'compact';
  fontFamily: 'Inter' | 'JetBrains Mono' | 'Orbitron' | 'Montserrat' | 'Lato' | 'Playfair Display';

  // Animation Tab
  pageTransitions: boolean;
  componentFadeIns: boolean;
  diagramAnimations: boolean;
  performanceMeterAnimations: boolean;
  hoverEffects: boolean;
  parallaxEffects: boolean;
  reducedMotion: boolean;
  gpuAcceleration: boolean;
  
  // Layout Tab
  gridStyle: 'grid' | 'list' | 'compact';
  sidebarPosition: 'left' | 'right' | 'hidden'; 
  navigationStyle: 'top' | 'side';
  layoutStyle: 'two-column' | 'stacked';
  cardSize: 'small' | 'medium' | 'large';

  // Performance Tab
  disableHeavyAnimations: boolean;
  disable3D: boolean;
  lazyLoading: boolean;
  imagePreloading: boolean;
  fpsLimit: number; // 30, 60, 120, 144
  lowPowerMode: boolean;

  // Accessibility Tab
  highContrast: boolean;
  dyslexiaFriendly: boolean;
  fontSizeScale: number; // 0.8 to 1.5
  keyboardNav: boolean;
  screenReaderHints: boolean;

  // Developer Tab
  devMode: boolean;
  showComponentData: boolean;
  showFPS: boolean;
  showGridOverlay: boolean;
  showDebugOutlines: boolean;
  showComponentBoundaries: boolean;
}
