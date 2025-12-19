
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import { DashboardView, DirectoryView, AboutView } from './components/Views';
import ComponentDetail from './components/ComponentDetail';
import SettingsView from './components/Settings.tsx';
import { AppSettings, LogEntry } from './types';
import { DEFAULT_SETTINGS, COMPONENT_DB } from './constants';
import { X, FileCode, Lock, LogOut } from 'lucide-react';

// --- REAL SOURCE CODE STORAGE ---
const SOURCE_FILES: Record<string, string> = {
    'index.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>R4K1N Tech Specs</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              primary: 'var(--primary)',
              'primary-dim': 'var(--primary-dim)',
              surface: 'var(--bg-surface)',
              panel: 'var(--bg-panel)',
              deep: 'var(--bg-deep)',
            },
            fontFamily: {
              sans: ['var(--font-stack)', 'sans-serif'],
              mono: ['Fira Code', 'Courier New', 'monospace'],
            },
            borderRadius: {
              'none': '0',
              'sm': 'calc(var(--radius) * 0.5)',
              DEFAULT: 'var(--radius)',
              'md': 'var(--radius)',
              'lg': 'calc(var(--radius) * 1.5)',
              'xl': 'calc(var(--radius) * 2.5)',
              'full': '9999px',
            },
            transitionDuration: {
              DEFAULT: 'var(--anim-speed)',
            }
          },
        },
      }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&family=Orbitron:wght@500;900&family=Montserrat:wght@400;700&family=Lato:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --primary: #3b82f6;
        --primary-dim: rgba(59, 130, 246, 0.1);
        --bg-deep: #020617;
        --bg-surface: #0f172a;
        --bg-panel: #1e293b;
        
        /* Semantic Colors for Theming */
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
        --border-base: rgba(255, 255, 255, 0.1);
        --bg-element: rgba(0, 0, 0, 0.2);
        
        --font-stack: 'Inter';
        --anim-speed: 300ms;
        --radius: 8px; /* Default matches 0.5rem */
      }
      body {
        background-color: var(--bg-deep);
        color: var(--text-main);
        transition: background-color var(--anim-speed), color var(--anim-speed);
      }
      /* Custom Scrollbar */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: var(--bg-deep); }
      ::-webkit-scrollbar-thumb { background: var(--bg-panel); border-radius: 4px; border: 1px solid var(--border-base); }
      ::-webkit-scrollbar-thumb:hover { background: var(--primary); }
      
      .blueprint-grid {
        background-image: linear-gradient(var(--bg-panel) 1px, transparent 1px), linear-gradient(90deg, var(--bg-panel) 1px, transparent 1px);
        background-size: 20px 20px;
      }
      
      /* Density Classes */
      body.density-compact { --radius: 4px; font-size: 0.95em; }
      body.density-comfortable { font-size: 1.05em; }

      /* --- MATERIAL DESIGN ENTRANCE ANIMATIONS --- */
      
      /* The Base Animation Keyframe */
      @keyframes materialSlideUp {
        0% { 
          opacity: 0; 
          transform: translateY(30px) scale(0.98); 
        }
        100% { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
        }
      }

      /* Base Class */
      .animate-enter {
        /* Standard Emphasis Decelerate Curve */
        animation: materialSlideUp 0.6s cubic-bezier(0.2, 0.0, 0.2, 1) forwards;
        opacity: 0; /* Start invisible so we don't see jump */
      }

      /* Stagger Delays for children */
      .stagger-1 { animation-delay: 50ms; }
      .stagger-2 { animation-delay: 100ms; }
      .stagger-3 { animation-delay: 150ms; }
      .stagger-4 { animation-delay: 200ms; }
      .stagger-5 { animation-delay: 250ms; }
      .stagger-6 { animation-delay: 300ms; }

      /* Fast Fade for simple transitions */
      @keyframes simpleFade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fade {
        animation: simpleFade 0.4s ease-out forwards;
      }
    </style>
  <script type="importmap">
{
  "imports": {
    "react-dom/": "https://esm.sh/react-dom@^19.2.3/",
    "react/": "https://esm.sh/react@^19.2.3/",
    "react": "https://esm.sh/react@^19.2.3",
    "lucide-react": "https://esm.sh/lucide-react@^0.562.0?external=react"
  }
}
</script>
</head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>`,
    'types.ts': `export interface ComparisonModel {
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
  scrollBehavior: 'smooth' | 'auto'; // NEW
  
  // Layout Tab
  gridStyle: 'grid' | 'list' | 'compact';
  sidebarPosition: 'left' | 'right' | 'hidden'; 
  navigationStyle: 'top' | 'side';
  layoutStyle: 'two-column' | 'stacked';
  cardSize: 'small' | 'medium' | 'large';
  contentWidth: 'standard' | 'wide' | 'full'; // NEW

  // Performance Tab
  disableHeavyAnimations: boolean;
  disable3D: boolean;
  lazyLoading: boolean;
  imagePreloading: boolean;
  fpsLimit: number; // 30, 60, 120, 144
  lowPowerMode: boolean;
  lowSpecMode: boolean; // NEW (Texture Quality)

  // Accessibility Tab
  highContrast: boolean;
  dyslexiaFriendly: boolean;
  fontSizeScale: number; // 0.8 to 1.5
  keyboardNav: boolean;
  screenReaderHints: boolean;
  focusHighlight: boolean; // NEW

  // Developer Tab
  devMode: boolean;
  showComponentData: boolean;
  showFPS: boolean;
  showGridOverlay: boolean;
  showDebugOutlines: boolean;
  showComponentBoundaries: boolean;
  logInteractions: boolean; // NEW
  showDomInspector: boolean; // NEW
  showSystemTerminal: boolean; // NEW
  wireframeMode: boolean; // NEW
  showSourceCode: boolean; // NEW
}

export interface LogEntry {
    id: string;
    timestamp: string;
    source: string;
    message: string;
    type: 'info' | 'event' | 'warn' | 'cmd';
}`,
    'App.tsx': `// [SELF REFERENCE] This is the code for the file you are currently viewing.
// NOTE: The 'SOURCE_FILES' dictionary content is truncated here to prevent infinite recursion.

import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import { DashboardView, DirectoryView, AboutView } from './components/Views';
import ComponentDetail from './components/ComponentDetail';
import SettingsView from './components/Settings.tsx';
import { AppSettings, LogEntry } from './types';
import { DEFAULT_SETTINGS, COMPONENT_DB } from './constants';
import { X, FileCode, Lock, LogOut } from 'lucide-react';

const App: React.FC = () => {
  // --- STATE ---
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('R4K1N_SETTINGS');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');
  const [systemLogs, setSystemLogs] = useState<LogEntry[]>([]);

  // --- LOGGING HELPER ---
  const addLog = useCallback((source: string, message: string, type: 'info' | 'event' | 'warn' | 'cmd' = 'info') => {
      const entry: LogEntry = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          source: source.toUpperCase(),
          message,
          type
      };
      setSystemLogs(prev => [...prev.slice(-99), entry]); // Keep last 100
  }, []);

  // --- EFFECTS ---
  
  // Persist Settings & Log Changes
  useEffect(() => {
    localStorage.setItem('R4K1N_SETTINGS', JSON.stringify(settings));
    applyVisualSettings(settings);
  }, [settings]);

  // Initial Hash Handle
  useEffect(() => {
    const handleHash = () => {
        const hash = window.location.hash.replace('#/', '');
        const newRoute = hash || 'dashboard';
        setCurrentRoute(newRoute);
        addLog('ROUTER', \`Navigated to: \${newRoute}\`, 'event');
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    addLog('SYSTEM', 'Application Mounted', 'info');
    return () => window.removeEventListener('hashchange', handleHash);
  }, [addLog]);

  // Event Logger (Fixed with Capture Phase)
  useEffect(() => {
    if (!settings.devMode || !settings.logInteractions) return;
    const handler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const tag = target.tagName;
        // Attempt to get meaningful text from the target
        const text = target.innerText?.substring(0, 15) || target.id || target.className || 'Unknown';
        addLog('INPUT', \`Click: <\${tag}> "\${text.replace(/[\\n\\r]+/g, ' ').trim()}"\`, 'event');
    };
    // Use capture: true to catch events even if propagation is stopped by React components
    window.addEventListener('click', handler, { capture: true });
    return () => window.removeEventListener('click', handler, { capture: true });
  }, [settings.logInteractions, settings.devMode, addLog]);

  // --- ACTIONS ---

  const navigate = (route: string) => {
    window.location.hash = \`#/\${route}\`;
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    addLog('CONFIG', \`Settings Updated: \${Object.keys(updates).join(', ')}\`, 'warn');
  };

  const resetSettings = () => {
    if(confirm("Factory Reset all settings?")) {
        setSettings(DEFAULT_SETTINGS);
        addLog('SYSTEM', 'Factory Reset Executed', 'warn');
    }
  };
  
  // ... (Terminal Logic and Helpers omitted for brevity in self-view) ...
  
  return (
    <>
      <Layout 
        settings={settings} 
        currentPage={currentRoute} 
        onNavigate={navigate} 
        systemLogs={systemLogs}
        onTerminalCommand={handleTerminalCommand}
      >
          {Content}
      </Layout>
      {/* Overlays */}
    </>
  );
};`,
    'components/Layout.tsx': `import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Settings, Database, Info, Home, Cpu, Hash, Monitor, Maximize, Terminal } from 'lucide-react';
import { AppSettings, LogEntry } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  settings: AppSettings;
  currentPage: string;
  onNavigate: (page: string) => void;
  systemLogs: LogEntry[];
  onTerminalCommand: (cmd: string) => void;
}

// ... (Hooks omitted) ...

const Layout: React.FC<LayoutProps> = ({ children, settings, currentPage, onNavigate, systemLogs, onTerminalCommand }) => {
  // ...
  return (
    <div className={\`min-h-screen flex flex-col \${settings.devMode && settings.showDebugOutlines ? 'debug-screens' : ''}\`}>
       {/* ... */}
    </div>
  );
};

export default Layout;`
};

const App: React.FC = () => {
  // --- STATE ---
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('R4K1N_SETTINGS');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');
  const [systemLogs, setSystemLogs] = useState<LogEntry[]>([]);

  // --- LOGGING HELPER ---
  const addLog = useCallback((source: string, message: string, type: 'info' | 'event' | 'warn' | 'cmd' = 'info') => {
      const entry: LogEntry = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          source: source.toUpperCase(),
          message,
          type
      };
      setSystemLogs(prev => [...prev.slice(-99), entry]); // Keep last 100
  }, []);

  // --- EFFECTS ---
  
  // Persist Settings & Log Changes
  useEffect(() => {
    localStorage.setItem('R4K1N_SETTINGS', JSON.stringify(settings));
    applyVisualSettings(settings);
  }, [settings]);

  // Initial Hash Handle
  useEffect(() => {
    const handleHash = () => {
        const hash = window.location.hash.replace('#/', '');
        const newRoute = hash || 'dashboard';
        setCurrentRoute(newRoute);
        addLog('ROUTER', `Navigated to: ${newRoute}`, 'event');
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    addLog('SYSTEM', 'Application Mounted', 'info');
    return () => window.removeEventListener('hashchange', handleHash);
  }, [addLog]);

  // Event Logger (Global Click Tracking)
  useEffect(() => {
    if (!settings.devMode || !settings.logInteractions) return;
    const handler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const tag = target.tagName;
        // Attempt to find best identifier
        const text = target.innerText?.substring(0, 15) || target.id || target.className || 'Unknown';
        addLog('INPUT', `Click: <${tag}> "${text.replace(/[\n\r]+/g, ' ').trim()}"`, 'event');
    };
    // Use Capture to ensure we catch events before React handles them
    window.addEventListener('click', handler, { capture: true });
    return () => window.removeEventListener('click', handler, { capture: true });
  }, [settings.logInteractions, settings.devMode, addLog]);

  // --- ACTIONS ---

  const navigate = (route: string) => {
    window.location.hash = `#/${route}`;
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    addLog('CONFIG', `Settings Updated: ${Object.keys(updates).join(', ')}`, 'warn');
  };

  const resetSettings = () => {
    if(confirm("Factory Reset all settings?")) {
        setSettings(DEFAULT_SETTINGS);
        addLog('SYSTEM', 'Factory Reset Executed', 'warn');
    }
  };

  // --- TERMINAL COMMAND HANDLER ---
  const handleTerminalCommand = (rawCmd: string) => {
      addLog('USER', rawCmd, 'cmd');
      const parts = rawCmd.trim().toLowerCase().split(' ');
      const cmd = parts[0];
      const arg = parts[1];

      switch(cmd) {
          case 'help':
              addLog('HELP', 'Available commands:', 'info');
              addLog('HELP', '- goto <page>: dashboard, directory, settings', 'info');
              addLog('HELP', '- theme <light|dark|cyber>: Change theme', 'info');
              addLog('HELP', '- source: Open Source Code Viewer', 'info');
              addLog('HELP', '- clear: Clear logs', 'info');
              addLog('HELP', '- dev <on|off>: Toggle Developer Mode', 'info');
              break;
          case 'clear':
              setSystemLogs([]);
              addLog('SYSTEM', 'Logs cleared', 'info');
              break;
          case 'goto':
              if (['dashboard', 'directory', 'settings', 'about'].includes(arg)) {
                  navigate(arg);
                  addLog('CMD', `Navigating to ${arg}...`, 'event');
              } else {
                  addLog('ERROR', `Unknown page: ${arg}`, 'warn');
              }
              break;
          case 'theme':
               if (arg === 'light' || arg === 'dark' || arg === 'auto') {
                   updateSettings({ themeMode: arg });
                   addLog('CMD', `Theme set to ${arg}`, 'event');
               } else if (arg === 'cyber') {
                   updateSettings({ themeMode: 'cyber-gold' });
                   addLog('CMD', `Theme set to Cyber Gold`, 'event');
               } else {
                   addLog('ERROR', 'Invalid theme. Try: light, dark, cyber', 'warn');
               }
               break;
          case 'source':
              updateSettings({ showSourceCode: true });
              addLog('CMD', 'Opening Source Code Viewer...', 'event');
              break;
          case 'dev':
              if (arg === 'on') {
                  updateSettings({ devMode: true });
                  addLog('CMD', 'Developer Mode ENABLED', 'warn');
              } else if (arg === 'off') {
                  updateSettings({ devMode: false });
                  addLog('CMD', 'Developer Mode DISABLED', 'warn');
              }
              break;
          default:
              addLog('ERROR', `Unknown command: ${cmd}. Type 'help'.`, 'warn');
      }
  };

  // --- HELPERS ---

  const applyVisualSettings = (s: AppSettings) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', s.accentColor);
    root.style.setProperty('--primary-dim', s.accentColor + '20'); 
    root.style.setProperty('--anim-speed', (s.disableHeavyAnimations || s.lowPowerMode) ? '0s' : '300ms');
    root.style.setProperty('--radius', `${s.borderRadius}px`);
    root.style.setProperty('--font-stack', s.dyslexiaFriendly ? 'OpenDyslexic, sans-serif' : s.fontFamily);
    root.style.fontSize = `${s.fontSizeScale * 16}px`;
    
    // Scroll Behavior
    root.style.scrollBehavior = s.scrollBehavior;

    // Theme Mode Configuration
    if (s.themeMode === 'light') {
        // Light Mode Palette
        root.style.setProperty('--bg-deep', '#f8fafc');
        root.style.setProperty('--bg-surface', '#ffffff');
        root.style.setProperty('--bg-panel', '#f1f5f9');
        
        // Semantic Colors (Inverted)
        root.style.setProperty('--text-main', '#0f172a');
        root.style.setProperty('--text-muted', '#64748b');
        root.style.setProperty('--border-base', 'rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--bg-element', 'rgba(0, 0, 0, 0.05)');
        root.style.setProperty('--text-on-primary', '#ffffff');
        
        document.body.style.color = '#0f172a';
    } else if (s.themeMode === 'cyber-gold') {
        // Cyber Gold Futuristic Palette
        root.style.setProperty('--bg-deep', '#050400'); // Pitch black with gold undertone
        root.style.setProperty('--bg-surface', '#0a0900'); // Deep dark gold
        root.style.setProperty('--bg-panel', '#141200'); // Dark metallic gold
        
        // Gold Typography
        root.style.setProperty('--text-main', '#fff8e1'); // Off-white gold
        root.style.setProperty('--text-muted', '#c5b358'); // Vegas Gold
        
        // Neon Gold Glowing Borders
        root.style.setProperty('--border-base', 'rgba(255, 215, 0, 0.4)');
        root.style.setProperty('--bg-element', 'rgba(255, 215, 0, 0.08)');
        
        // Enforce Gold Primary in this mode for the full effect
        root.style.setProperty('--primary', '#FFD700'); 
        root.style.setProperty('--primary-dim', 'rgba(255, 215, 0, 0.15)');
        root.style.setProperty('--text-on-primary', '#000000'); // Black text on Gold background

        document.body.style.color = '#fff8e1';
    } else {
        // Dark Mode Palette (Default)
        root.style.setProperty('--bg-deep', '#020617');
        root.style.setProperty('--bg-surface', '#0f172a');
        root.style.setProperty('--bg-panel', '#1e293b');
        
        // Semantic Colors (Standard)
        root.style.setProperty('--text-main', '#f8fafc');
        root.style.setProperty('--text-muted', '#94a3b8');
        root.style.setProperty('--border-base', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--bg-element', 'rgba(0, 0, 0, 0.2)');
        root.style.setProperty('--text-on-primary', '#ffffff');
        
        document.body.style.color = '#f8fafc';
    }

    // Density Classes
    document.body.classList.remove('density-compact', 'density-normal', 'density-comfortable');
    document.body.classList.add(`density-${s.uiDensity}`);

    // High Contrast
    document.body.style.filter = s.highContrast ? 'contrast(1.25)' : 'none';

    // Grid Overlay
    if (settings.devMode && s.showGridOverlay) document.body.classList.add('debug-grid');
    else document.body.classList.remove('debug-grid');

    // Debug Outlines
    if (settings.devMode && s.showDebugOutlines) document.body.classList.add('debug-screens');
    else document.body.classList.remove('debug-screens');
  };

  // --- RENDER ROUTER ---

  let Content;
  if (currentRoute === 'settings') {
    Content = <SettingsView settings={settings} updateSettings={updateSettings} resetSettings={resetSettings} />;
  } else if (currentRoute === 'about') {
    Content = <AboutView />;
  } else if (currentRoute === 'directory') {
    // Pass settings to DirectoryView so it can read Grid/List preferences
    Content = <DirectoryView onNavigate={navigate} settings={settings} />;
  } else if (currentRoute.startsWith('component/')) {
    const id = currentRoute.split('/')[1];
    if (COMPONENT_DB[id] || id) { 
        Content = <ComponentDetail id={id} onBack={() => navigate('directory')} settings={settings} />;
    } else {
        Content = <div className="p-8 text-center text-red-500 font-mono">ERROR 404: Component ID Not Found</div>;
    }
  } else {
    Content = <DashboardView onNavigate={navigate} />;
  }

  return (
    <>
        {/* Global Styles based on Settings */}
        <style>{`
            ${settings.focusHighlight ? `*:focus-visible { outline: 2px solid var(--primary); outline-offset: 4px; box-shadow: 0 0 10px var(--primary); }` : ''}
            
            ${settings.contentWidth === 'wide' ? `.app-container { max-width: 1600px !important; }` : ''}
            ${settings.contentWidth === 'full' ? `.app-container { max-width: 98% !important; }` : ''}
            
            /* Debug Outlines: Cyan Universal Outline */
            ${settings.devMode && settings.showDebugOutlines ? `* { outline: 1px solid cyan !important; }` : ''}
            
            /* Component Boundaries: Red Box Shadow on containers */
            ${settings.devMode && settings.showComponentBoundaries ? `div, section, main, header, footer { box-shadow: inset 0 0 0 1px rgba(255, 0, 0, 0.5) !important; }` : ''}
            
            ${settings.devMode && settings.wireframeMode ? `
                * { 
                    background-color: #050505 !important; 
                    background-image: none !important;
                    color: #0f0 !important; 
                    border-color: #004400 !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                    text-shadow: none !important;
                    filter: none !important;
                    font-family: 'Courier New', monospace !important;
                }
                img { opacity: 0.2 !important; filter: grayscale(100%) !important; border: 1px solid #0f0 !important; }
                .blueprint-grid { display: none !important; }
            ` : ''}
        `}</style>
      <Layout 
        settings={settings} 
        currentPage={currentRoute} 
        onNavigate={navigate} 
        systemLogs={systemLogs}
        onTerminalCommand={handleTerminalCommand}
      >
          {Content}
      </Layout>
      
      {/* Dev Overlay - Grid (Updated to High Contrast Green) */}
      {settings.devMode && settings.showGridOverlay && (
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-30 bg-[linear-gradient(to_right,#00ff0020_1px,transparent_1px),linear-gradient(to_bottom,#00ff0020_1px,transparent_1px)] bg-[size:20px_20px]" />
      )}

      {/* Source Code Viewer Overlay */}
      {settings.devMode && settings.showSourceCode && (
          <SourceCodeOverlay onClose={() => updateSettings({ showSourceCode: false })} />
      )}
    </>
  );
};

// --- SOURCE CODE OVERLAY ---
const SourceCodeOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [activeFile, setActiveFile] = useState('App.tsx');
    const files = Object.keys(SOURCE_FILES);

    return (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in zoom-in-95 duration-200">
            <div className="w-full max-w-6xl h-[85vh] bg-[#0d0d0d] border border-gray-800 rounded-lg shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
                
                {/* Window Header */}
                <div className="bg-[#1a1a1a] border-b border-gray-800 p-3 flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 px-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer" onClick={onClose} title="Close" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="text-gray-400 text-xs font-mono flex items-center gap-2">
                            <FileCode size={14} className="text-blue-400" /> 
                            <span className="opacity-50">root / src /</span> 
                            <span className="text-white font-bold">{activeFile}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-1 text-[10px] text-gray-500 font-mono bg-black/50 px-2 py-1 rounded border border-white/5">
                            <Lock size={10} /> READ-ONLY
                        </div>
                        <button 
                            onClick={onClose}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 px-3 py-1 rounded text-xs font-bold font-mono transition-colors flex items-center gap-2"
                        >
                            <LogOut size={12} /> EXIT TERMINAL
                        </button>
                    </div>
                </div>

                <div className="flex flex-grow overflow-hidden">
                    {/* File Explorer Sidebar */}
                    <div className="w-48 md:w-64 bg-[#111] border-r border-gray-800 flex flex-col shrink-0 overflow-y-auto">
                        <div className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-[#151515] sticky top-0 border-b border-gray-800">
                            Project Explorer
                        </div>
                        {files.map(file => (
                            <button
                                key={file}
                                onClick={() => setActiveFile(file)}
                                className={`
                                    text-left px-4 py-2 text-xs font-mono transition-colors truncate
                                    ${activeFile === file 
                                        ? 'bg-[#2a2d2e] text-white border-l-2 border-blue-500' 
                                        : 'text-gray-400 hover:text-white hover:bg-[#222] border-l-2 border-transparent'
                                    }
                                `}
                            >
                                {file}
                            </button>
                        ))}
                    </div>

                    {/* Code Editor Area */}
                    <div 
                        className="flex-grow bg-[#0c0c0c] p-0 overflow-hidden relative group"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="text-xs text-gray-600 font-mono bg-black/80 px-2 py-1 rounded">Protected View</span>
                        </div>
                        
                        <div className="w-full h-full overflow-auto custom-scrollbar p-6">
                            <pre className="font-mono text-sm leading-relaxed text-gray-300 select-none">
                                <code>{SOURCE_FILES[activeFile]}</code>
                            </pre>
                        </div>
                    </div>
                </div>
                
                {/* Status Bar */}
                <div className="bg-[#1a1a1a] border-t border-gray-800 p-1 px-3 flex justify-between items-center text-[10px] text-gray-500 font-mono select-none">
                    <div className="flex gap-3">
                        <span>UTF-8</span>
                        <span>TypeScript React</span>
                    </div>
                    <div>
                        Ln {SOURCE_FILES[activeFile].split('\n').length}, Col 1
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
