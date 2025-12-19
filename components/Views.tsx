
import React from 'react';
import { ArrowRight, Cpu, Database, Settings, User, BookOpen, Calendar, Award } from 'lucide-react';
import { CATEGORIES, COMPONENT_DB } from '../constants';
import { AppSettings } from '../types';

/* --- DASHBOARD VIEW --- */
export const DashboardView: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="mb-8 relative animate-enter stagger-1">
        <div className="absolute inset-0 bg-primary blur-[80px] opacity-20 rounded-full"></div>
        <h1 className="relative text-5xl md:text-7xl font-black tracking-tight mb-4 text-[var(--text-main)]">
          R4K1N <span className="text-primary">TECH SPECS</span>
        </h1>
      </div>
      
      <p className="animate-enter stagger-2 text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mb-10 leading-relaxed">
        The ultimate static reference architecture for PC engineering, hardware comparisons, and technical specifications.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center animate-enter stagger-3">
        <button 
          onClick={() => onNavigate('directory')}
          className="bg-primary hover:brightness-110 text-[var(--text-on-primary)] px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_var(--primary-dim)]"
        >
          <Database size={20} /> Access Database
        </button>
        <button 
          onClick={() => onNavigate('settings')}
          className="border border-[var(--border-base)] hover:border-primary/50 bg-[var(--bg-element)] text-[var(--text-main)] px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all hover:bg-[var(--bg-panel)]"
        >
          <Settings size={20} /> Configure UI
        </button>
      </div>

      <div className="mt-20 w-full border-t border-[var(--border-base)] pt-10 animate-enter stagger-4">
        <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] mb-6">Featured Hardware Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['cpu', 'gpu', 'ram'].map((cat, idx) => (
             <div 
                key={cat} 
                onClick={() => onNavigate(`component/${cat}`)}
                className={`group cursor-pointer bg-panel border border-[var(--border-base)] rounded-xl p-1 overflow-hidden hover:border-primary/50 transition-colors animate-enter`}
                style={{ animationDelay: `${(idx + 5) * 100}ms` }}
             >
                <div className="bg-black/40 h-32 rounded-lg mb-4 overflow-hidden relative">
                    <img 
                        src={COMPONENT_DB[cat]?.image || `https://picsum.photos/seed/${cat}/400/200`} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                        alt={cat}
                    />
                </div>
                <div className="px-4 pb-4 text-left">
                    <div className="text-primary font-mono text-xs uppercase font-bold mb-1">{cat}</div>
                    <div className="flex justify-between items-center">
                        <h4 className="text-xl font-bold capitalize text-[var(--text-main)]">{COMPONENT_DB[cat]?.name || cat}</h4>
                        <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- DIRECTORY VIEW --- */
export const DirectoryView: React.FC<{ onNavigate: (p: string) => void, settings: AppSettings }> = ({ onNavigate, settings }) => {
  const isList = settings.gridStyle === 'list';
  const isCompact = settings.gridStyle === 'compact';
  
  const gridClasses = isList 
    ? 'grid-cols-1' 
    : isCompact 
        ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' 
        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div>
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[var(--border-base)] animate-enter stagger-1">
        <div className="bg-primary/20 p-3 rounded-lg">
            <Database className="text-primary" size={32} />
        </div>
        <div>
            <h1 className="text-3xl font-bold text-[var(--text-main)]">Hardware Index</h1>
            <p className="text-[var(--text-muted)]">Select a component category to view specifications.</p>
        </div>
      </div>

      <div className={`grid ${gridClasses} gap-6`}>
        {CATEGORIES.map((id, index) => {
            const data = COMPONENT_DB[id] || { name: id, image: undefined };
            // Calculate delay based on index for the "waterfall" effect
            const delayStyle = { animationDelay: `${(index % 10) * 50 + 100}ms` };
            
            if (isList) {
                return (
                    <div 
                        key={id}
                        onClick={() => onNavigate(`component/${id}`)}
                        className="flex items-center gap-4 bg-panel border border-[var(--border-base)] rounded-xl p-4 cursor-pointer hover:border-primary transition-all hover:bg-[var(--bg-element)] animate-enter"
                        style={delayStyle}
                    >
                        <img 
                            src={data.image || `https://picsum.photos/seed/${id}/100/100`}
                            alt={id}
                            className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold capitalize text-[var(--text-main)]">{data.name}</h3>
                            <span className="text-xs font-mono text-[var(--text-muted)] uppercase">ID: {id}</span>
                        </div>
                        <ArrowRight size={20} className="text-[var(--text-muted)]" />
                    </div>
                )
            }

            return (
                <div 
                    key={id} 
                    onClick={() => onNavigate(`component/${id}`)}
                    className={`bg-panel border border-[var(--border-base)] rounded-xl overflow-hidden hover:border-primary cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 ${isCompact ? 'text-sm' : ''} animate-enter`}
                    style={delayStyle}
                >
                    <div className={`${isCompact ? 'h-24' : 'h-40'} bg-black relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent z-10" />
                        <img 
                            src={data.image || `https://picsum.photos/seed/${id}/400/300`} 
                            alt={id}
                            className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700"
                        />
                    </div>
                    <div className={`relative z-20 ${isCompact ? 'p-3 -mt-6' : 'p-5 -mt-10'}`}>
                        <div className={`bg-[var(--bg-deep)] border border-[var(--border-base)] rounded-lg shadow-lg ${isCompact ? 'p-2' : 'p-3'}`}>
                            <h3 className={`font-bold capitalize mb-1 text-[var(--text-main)] ${isCompact ? 'text-sm' : 'text-lg'}`}>{data.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <span className={`font-mono text-[var(--text-muted)] uppercase ${isCompact ? 'text-[10px]' : 'text-xs'}`}>ID: {id}</span>
                                <ArrowRight size={isCompact ? 12 : 14} className="text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};

/* --- ABOUT VIEW --- */
export const AboutView: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="bg-panel border border-[var(--border-base)] rounded-2xl overflow-hidden relative shadow-2xl animate-enter stagger-1">
                {/* Header Decoration */}
                <div className="h-32 bg-gradient-to-r from-blue-900 to-indigo-900 relative">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>

                <div className="px-8 pb-12">
                    {/* Avatar / Profile Icon */}
                    <div className="relative -mt-16 mb-6 animate-enter stagger-2">
                        <div className="w-32 h-32 bg-deep border-4 border-panel rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden group">
                             <User size={64} className="text-primary relative z-10" />
                             <div className="absolute inset-0 bg-primary/20 blur-md group-hover:bg-primary/40 transition-colors"></div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-[var(--border-base)] pb-8 animate-enter stagger-3">
                        <div>
                            <h1 className="text-4xl font-black mb-2 text-[var(--text-main)]">Rashedusjjaman Rakin</h1>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono">WEB DESIGN</span>
                                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold font-mono">DIPLOMA ENGINEERING</span>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                             <div className="text-sm font-mono text-[var(--text-muted)]">PROJECT VERSION</div>
                             <div className="text-xl font-bold text-[var(--text-main)]">3.5 (AUTO)</div>
                             <div className="text-xs text-[var(--text-muted)]">{new Date().toLocaleDateString()}</div>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 animate-enter stagger-4">
                        {/* Column 1: Academic Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-main)] border-b border-[var(--border-base)] pb-2">
                                <BookOpen size={18} className="text-primary" /> Academic Profile
                            </h3>
                            <div className="bg-[var(--bg-element)] p-5 rounded-xl border border-[var(--border-base)] space-y-4">
                                <InfoRow label="Institute" value="Dhaka Polytechnic Institute" />
                                <InfoRow label="Department" value="Computer Science & Technology" />
                                <InfoRow label="Roll Number" value="852511" />
                                <InfoRow label="Section" value="B" />
                                <InfoRow label="Education" value="Diploma in Engineering" />
                            </div>
                        </div>

                        {/* Column 2: Project Details */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-main)] border-b border-[var(--border-base)] pb-2">
                                <Award size={18} className="text-primary" /> Project Manifest
                            </h3>
                            <div className="bg-[var(--bg-element)] p-5 rounded-xl border border-[var(--border-base)] space-y-4">
                                <InfoRow label="Subject" value="Web Design" />
                                <InfoRow label="Developer" value="Rashedusjjaman Rakin" />
                                <InfoRow label="Tech Stack" value="React 19, TypeScript, Tailwind" />
                                <InfoRow label="Status" value="Active / Production Ready" />
                            </div>
                        </div>
                    </div>

                     <div className="mt-8 bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg text-sm text-blue-400 text-center animate-enter stagger-5">
                        "Designed with precision to demonstrate advanced frontend architecture and component-based UI systems."
                    </div>
                </div>
            </div>
        </div>
    )
}

const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center">
        <span className="text-[var(--text-muted)] text-sm font-medium">{label}</span>
        <span className="text-[var(--text-main)] font-mono text-sm font-semibold text-right">{value}</span>
    </div>
);
