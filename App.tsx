
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { DashboardView, DirectoryView, AboutView } from './components/Views';
import ComponentDetail from './components/ComponentDetail';
import SettingsView from './components/Settings.tsx';
import { AppSettings } from './types';
import { DEFAULT_SETTINGS, COMPONENT_DB } from './constants';

const App: React.FC = () => {
  // --- STATE ---
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('R4K1N_SETTINGS');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');

  // --- EFFECTS ---
  
  // Persist Settings
  useEffect(() => {
    localStorage.setItem('R4K1N_SETTINGS', JSON.stringify(settings));
    applyVisualSettings(settings);
  }, [settings]);

  // Initial Hash Handle
  useEffect(() => {
    const handleHash = () => {
        const hash = window.location.hash.replace('#/', '');
        if (hash) setCurrentRoute(hash);
        else setCurrentRoute('dashboard');
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // --- ACTIONS ---

  const navigate = (route: string) => {
    window.location.hash = `#/${route}`;
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    if(confirm("Factory Reset all settings?")) {
        setSettings(DEFAULT_SETTINGS);
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
    if (s.showGridOverlay) document.body.classList.add('debug-grid');
    else document.body.classList.remove('debug-grid');

    // Debug Outlines
    if (s.showDebugOutlines) document.body.classList.add('debug-screens');
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
        Content = <ComponentDetail id={id} onBack={() => navigate('directory')} />;
    } else {
        Content = <div>Component Not Found</div>;
    }
  } else {
    Content = <DashboardView onNavigate={navigate} />;
  }

  return (
    <>
      <Layout settings={settings} currentPage={currentRoute} onNavigate={navigate}>
          {Content}
      </Layout>
      
      {/* Dev Overlay - Grid */}
      {settings.showGridOverlay && (
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
      )}
    </>
  );
};

export default App;
