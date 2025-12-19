
import React, { useState, useEffect, useRef } from 'react';
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

// --- REAL FPS HOOK ---
const useFps = (enabled: boolean) => {
    const [fps, setFps] = useState(0);
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());
    const requestRef = useRef<number>(0);

    useEffect(() => {
        if (!enabled) return;

        const loop = (time: number) => {
            frameCount.current++;
            if (time - lastTime.current >= 1000) {
                setFps(frameCount.current);
                frameCount.current = 0;
                lastTime.current = time;
            }
            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [enabled]);

    return fps;
};

// --- REAL DOM STATS HOOK ---
const useDomStats = (enabled: boolean) => {
    const [stats, setStats] = useState({ nodes: 0, width: 0, height: 0 });

    useEffect(() => {
        if (!enabled) return;
        const update = () => {
            setStats({
                nodes: document.getElementsByTagName('*').length,
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        // Initial count
        update();
        
        // Update on resize
        window.addEventListener('resize', update);
        // Using MutationObserver to track DOM changes live would be heavy, 
        // so we poll every second or rely on page transitions
        const interval = setInterval(update, 1000);
        
        return () => {
            window.removeEventListener('resize', update);
            clearInterval(interval);
        };
    }, [enabled]);
    
    return stats;
};

// --- PAGE TRANSITION WRAPPER ---
const PageTransition: React.FC<{ children: React.ReactNode, pageKey: string, enabled: boolean }> = ({ children, pageKey, enabled }) => {
    // If animations are disabled, just render children without wrapper logic
    if (!enabled) return <div key={pageKey} className="animate-fade">{children}</div>;
    
    return (
        <div key={pageKey} className="w-full">
            {children}
        </div>
    );
};

const Layout: React.FC<LayoutProps> = ({ children, settings, currentPage, onNavigate, systemLogs, onTerminalCommand }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Real Hooks
  const realFps = useFps(settings.devMode && settings.showFPS);
  const domStats = useDomStats(settings.devMode && settings.showDomInspector);

  // Auto-scroll terminal
  useEffect(() => {
      if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
  }, [systemLogs, isTerminalOpen]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!terminalInput.trim()) return;
      onTerminalCommand(terminalInput);
      setTerminalInput('');
  };

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
    <div className={`min-h-screen flex flex-col ${settings.devMode && settings.showDebugOutlines ? 'debug-screens' : ''}`}>
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
            <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-element)] px-1.5 rounded">v2.5.0 STATIC</span>
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

      {/* Main Content Stage with Popout Animation */}
      <main className="flex-grow w-full max-w-7xl mx-auto p-6 lg:p-8 app-container flex flex-col relative z-0">
        <PageTransition pageKey={currentPage} enabled={settings.pageTransitions}>
            {children}
        </PageTransition>
      </main>

      {/* REAL FPS Meter (Debug) */}
      {settings.devMode && settings.showFPS && (
        <div className="fixed top-24 right-6 bg-black/90 text-green-400 font-mono text-xs p-3 rounded border border-green-900 z-50 shadow-2xl flex flex-col items-center min-w-[80px]">
          <div className="text-[10px] text-green-700 font-bold mb-1">FPS MONITOR</div>
          <div className="text-2xl font-black tracking-tighter leading-none">{realFps}</div>
          <div className="w-full h-1 bg-gray-800 mt-2 rounded-full overflow-hidden">
             <div 
                className="h-full bg-green-500 transition-all duration-300" 
                style={{ width: `${Math.min((realFps / 144) * 100, 100)}%` }} 
             />
          </div>
        </div>
      )}

      {/* DOM Inspector (Dev Mode) */}
      {settings.devMode && settings.showDomInspector && (
          <div className="fixed bottom-6 right-6 bg-black/90 border border-blue-900/50 p-4 rounded-lg shadow-2xl z-50 text-xs font-mono text-blue-200 space-y-2 min-w-[200px] animate-in slide-in-from-bottom-10 pointer-events-none select-none">
              <div className="flex items-center gap-2 border-b border-blue-900/50 pb-2 mb-2 text-blue-400 font-bold">
                  <Monitor size={14} /> DOM INSPECTOR
              </div>
              <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1"><Hash size={10}/> Nodes:</span>
                  <span className="text-white font-bold">{domStats.nodes}</span>
              </div>
              <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1"><Maximize size={10}/> Viewport:</span>
                  <span className="text-white">{domStats.width} x {domStats.height}</span>
              </div>
              <div className="flex justify-between">
                   <span className="text-gray-500">Breakpoint:</span>
                   <span className="text-yellow-400 font-bold">
                       {domStats.width < 768 ? 'SM (Mobile)' : domStats.width < 1024 ? 'MD (Tablet)' : 'LG (Desktop)'}
                   </span>
              </div>
          </div>
      )}

      {/* SYSTEM TERMINAL (Dev Mode) */}
      {settings.devMode && settings.showSystemTerminal && (
          <div className={`fixed bottom-0 left-0 right-0 md:right-auto md:w-[600px] bg-[#0c0c0c] border-t md:border-r md:border-t border-[#333] z-[60] font-mono text-[11px] shadow-2xl flex flex-col transition-all duration-300 ${isTerminalOpen ? 'h-[350px]' : 'h-[32px]'}`}>
              <div 
                className="flex items-center justify-between px-3 py-1 bg-[#1a1a1a] cursor-pointer border-b border-[#333] hover:bg-[#252525]"
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              >
                  <div className="flex items-center gap-2 text-green-500 font-bold">
                      <Terminal size={12} /> INTERACTIVE_DEV_CONSOLE
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                       <span className="text-gray-500">{systemLogs.length} events</span>
                       {isTerminalOpen ? <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> : null}
                  </div>
              </div>
              
              <div ref={terminalRef} className="flex-grow overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {systemLogs.map(log => (
                      <div key={log.id} className="flex gap-2 hover:bg-[#1a1a1a] p-0.5 rounded break-words">
                          <span className="text-gray-600 select-none shrink-0">[{log.timestamp}]</span>
                          <span className={`shrink-0 font-bold ${log.type === 'warn' ? 'text-yellow-500' : log.type === 'event' ? 'text-blue-400' : log.type === 'cmd' ? 'text-purple-400' : 'text-green-400'}`}>
                              {log.source}{log.type === 'cmd' ? '>' : ':'}
                          </span>
                          <span className="text-gray-300">{log.message}</span>
                      </div>
                  ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="p-2 border-t border-[#333] bg-[#000] flex gap-2">
                  <span className="text-green-500 font-bold animate-pulse">{'>'}</span>
                  <input 
                      type="text" 
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type 'help' for commands..."
                      className="flex-grow bg-transparent border-none outline-none text-green-400 placeholder-gray-800 font-mono"
                      autoFocus
                  />
              </form>
          </div>
      )}
    </div>
  );
};

export default Layout;
