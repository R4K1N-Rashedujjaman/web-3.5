import React, { useState } from 'react';
import { Menu, X, Settings, Database, Info, Home, Cpu } from 'lucide-react';
import { AppSettings } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  settings: AppSettings;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, settings, currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ page, label, icon: Icon }: { page: string, label: string, icon: any }) => {
    const isActive = currentPage === page || (currentPage.startsWith('component') && page === 'directory');
    return (
      <button
        onClick={() => {
            onNavigate(page);
            setMobileMenuOpen(false);
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-primary text-white font-semibold shadow-lg shadow-primary/30' 
            : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border-base)]'
        }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${settings.showDebugOutlines ? 'debug-screens' : ''}`}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-deep/80 border-b border-[var(--border-base)] h-[70px] flex items-center justify-between px-6 lg:px-8">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('dashboard')}
        >
            <div className="bg-primary/20 p-2 rounded-lg border border-primary/30 group-hover:bg-primary/40 transition-colors">
                <Cpu className="text-primary" />
            </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none text-[var(--text-main)]">
              R4K1N <span className="text-primary">SPECS</span>
            </h1>
            <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-element)] px-1.5 rounded">v2.4.0 STATIC</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavItem page="dashboard" label="Dashboard" icon={Home} />
          <NavItem page="directory" label="Database" icon={Database} />
          <NavItem page="settings" label="Control Panel" icon={Settings} />
          <NavItem page="about" label="About Project" icon={Info} />
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[var(--text-main)] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 right-0 bg-deep border-b border-[var(--border-base)] p-4 flex flex-col gap-2 z-40 animate-in slide-in-from-top-4 shadow-2xl">
          <NavItem page="dashboard" label="Dashboard" icon={Home} />
          <NavItem page="directory" label="Database" icon={Database} />
          <NavItem page="settings" label="Control Panel" icon={Settings} />
          <NavItem page="about" label="About Project" icon={Info} />
        </div>
      )}

      {/* Main Content Stage */}
      <main className="flex-grow w-full max-w-7xl mx-auto p-6 lg:p-8">
        {children}
      </main>

      {/* FPS Meter (Debug) */}
      {settings.showFPS && (
        <div className="fixed top-20 right-4 bg-black/80 text-green-400 font-mono text-xs p-2 rounded border border-green-900 z-50 pointer-events-none">
          FPS: 60 (Simulated)
        </div>
      )}
    </div>
  );
};

export default Layout;