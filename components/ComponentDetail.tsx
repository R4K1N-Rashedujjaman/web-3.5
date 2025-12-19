
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Zap, Activity, Grid, Scale, Plus, Factory, BookOpen, ChevronRight } from 'lucide-react';
import { HardwareData, ComparisonModel } from '../types';
import { COMPONENT_DB } from '../constants';

const ComponentDetail: React.FC<{ id: string, onBack: () => void }> = ({ id, onBack }) => {
  const data: HardwareData = COMPONENT_DB[id] || {
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    role: "Standard Component",
    desc: "Critical component for system functionality. Technical deep-dive pending update.",
    image: `https://picsum.photos/seed/${id}/800/600`, 
    diagramType: "generic",
    concepts: [],
    architectureDeepDive: [],
    manufacturingProcess: [],
    techSpecs: [{key:"Standard", val:"ISO Certified"}],
    marketModels: []
  };

  const [compareQueue, setCompareQueue] = useState<number[]>([]);

  const toggleCompare = (modelId: number) => {
    setCompareQueue(prev => {
        if (prev.includes(modelId)) return prev.filter(p => p !== modelId);
        if (prev.length >= 2) {
            alert("Comparison Limit Reached (Max 2). Please unselect one first.");
            return prev;
        }
        return [...prev, modelId];
    });
  };

  return (
    <div className="animate-fade-in pb-32">
        <button onClick={onBack} className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-main)] mb-6 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Database
        </button>

        {/* 1. Technical Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 border-b border-[var(--border-base)] pb-12">
            <div className="order-2 lg:order-1">
                <span className="text-primary font-mono tracking-widest text-sm font-bold bg-primary/10 px-2 py-1 rounded inline-block mb-3">ID: {data.id.toUpperCase()}</span>
                <h1 className="text-5xl lg:text-7xl font-black mb-4 leading-tight text-[var(--text-main)]">
                    {data.name}
                </h1>
                <p className="text-2xl text-[var(--text-muted)] mb-6 font-light font-mono">{data.role}</p>
                <p className="text-lg leading-relaxed text-[var(--text-main)] border-l-4 border-primary pl-6 py-1 opacity-90">
                    {data.desc}
                </p>
            </div>
            <div className="relative group order-1 lg:order-2">
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img 
                    src={data.image} 
                    alt={data.name} 
                    className="relative w-full rounded-xl shadow-2xl border border-[var(--border-base)] group-hover:scale-[1.02] transition-transform duration-500 object-cover h-[400px]" 
                />
            </div>
        </div>

        {/* 2. Analysis Grid */}
        <SectionHeader number="01" title="Engineering Concepts" />
        <div className="grid md:grid-cols-3 gap-6 mb-16">
            {data.concepts.length > 0 ? data.concepts.map((c, i) => (
                <div key={i} className="bg-panel p-6 rounded-lg border border-[var(--border-base)] hover:border-primary/50 transition-colors group">
                    <strong className="block text-primary text-lg mb-3 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        <Zap size={18} /> {c.title}
                    </strong>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{c.text}</p>
                </div>
            )) : <p className="text-[var(--text-muted)] italic">No advanced concepts loaded.</p>}
        </div>

        {/* 3. Specs & Blueprint */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
            <div className="lg:col-span-3">
                <SectionHeader number="02" title="Specification Matrix" />
                <div className="bg-panel rounded-lg border border-[var(--border-base)] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            {data.techSpecs.map((s, i) => (
                                <tr key={i} className="border-b border-[var(--border-base)] hover:bg-[var(--bg-element)] transition-colors group">
                                    <th className="p-4 text-[var(--text-muted)] font-mono text-sm w-1/3 group-hover:text-primary transition-colors">{s.key}</th>
                                    <td className="p-4 text-[var(--text-main)] font-mono text-sm font-bold">{s.val}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="lg:col-span-2 flex flex-col">
                <SectionHeader number="03" title="Schematic" />
                <div className="flex-grow blueprint-grid bg-deep border border-dashed border-[var(--border-base)] rounded-lg relative flex items-center justify-center overflow-hidden min-h-[300px]">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <Grid size={150} className="text-primary animate-pulse" />
                    </div>
                    <div className="z-10 bg-panel/90 backdrop-blur border border-[var(--border-base)] text-[var(--text-main)] font-mono px-6 py-3 rounded shadow-xl">
                        {data.name.toUpperCase()}<br/>
                        <span className="text-xs text-[var(--text-muted)]">BLK_DIA_001</span>
                    </div>
                </div>
            </div>
        </div>

        {/* NEW SECTION: Architectural Deep Dive */}
        {data.architectureDeepDive && data.architectureDeepDive.length > 0 && (
            <div className="mb-16">
                <SectionHeader number="04" title="Architectural Deep Dive" />
                <div className="bg-panel/50 p-8 rounded-xl border border-[var(--border-base)]">
                    <div className="flex items-start gap-6">
                        <div className="hidden md:block bg-primary/10 p-4 rounded-lg">
                            <BookOpen className="text-primary" size={32} />
                        </div>
                        <div className="space-y-6 text-[var(--text-main)] leading-loose text-lg font-light">
                            {data.architectureDeepDive.map((para, i) => (
                                <p key={i} className="opacity-90">{para}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* NEW SECTION: Manufacturing Process */}
        {data.manufacturingProcess && data.manufacturingProcess.length > 0 && (
            <div className="mb-16">
                <SectionHeader number="05" title="Manufacturing Process" />
                <div className="relative border-l-2 border-[var(--border-base)] ml-4 md:ml-6 space-y-12">
                    {data.manufacturingProcess.map((step, i) => (
                        <div key={i} className="relative pl-8 group">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-deep border-2 border-primary group-hover:scale-125 transition-transform"></div>
                            <div className="bg-panel border border-[var(--border-base)] rounded-lg p-6 hover:border-primary/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded font-mono">STEP {i + 1}</div>
                                    <h4 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                                        {step.step}
                                        <ChevronRight size={16} className="text-[var(--text-muted)]" />
                                    </h4>
                                </div>
                                <p className="text-[var(--text-muted)] leading-relaxed">{step.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* 6. Comparative Engine */}
        <SectionHeader number="06" title="Comparison Engine" />
        
        {data.marketModels.length === 0 ? (
            <p className="text-[var(--text-muted)]">Awaiting comparison data for this category.</p>
        ) : (
            <div className="bg-panel/30 p-6 rounded-xl border border-[var(--border-base)]">
                <p className="mb-6 text-[var(--text-main)] flex items-center gap-2">
                    <Scale size={20} className="text-primary" />
                    Select exactly <strong>two</strong> models below to launch the VS Matrix.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {data.marketModels.map(m => {
                        const isSelected = compareQueue.includes(m.id);
                        return (
                            <div 
                                key={m.id}
                                className={`
                                    p-6 rounded-xl border-2 transition-all relative flex flex-col group
                                    ${isSelected 
                                        ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
                                        : 'border-[var(--border-base)] bg-panel hover:border-[var(--text-muted)]'
                                    }
                                `}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-black tracking-tight text-[var(--text-main)]">{m.name}</h3>
                                    <div className="bg-[var(--bg-element)] px-3 py-1 rounded text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">{m.brand}</div>
                                </div>
                                <p className="text-[var(--text-muted)] mb-6 flex-grow">{m.description}</p>
                                
                                <button
                                    onClick={() => toggleCompare(m.id)}
                                    className={`
                                        w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                                        ${isSelected 
                                            ? 'bg-primary text-white shadow-lg' 
                                            : 'bg-[var(--bg-element)] text-[var(--text-muted)] hover:bg-[var(--border-base)] hover:text-[var(--text-main)]'
                                        }
                                    `}
                                >
                                    {isSelected ? (
                                        <><CheckCircle size={20} /> Selected for Compare</>
                                    ) : (
                                        <><Plus size={20} /> Add to Compare</>
                                    )}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )}

        {/* Comparison Overlay */}
        <ComparisonOverlay 
            queue={compareQueue} 
            models={data.marketModels} 
            onClose={() => setCompareQueue([])} 
        />
    </div>
  );
};

const SectionHeader: React.FC<{number: string, title: string}> = ({number, title}) => (
    <div className="flex items-center gap-4 mb-8 mt-4">
        <span className="text-primary font-bold font-mono text-xl bg-primary/10 w-10 h-10 flex items-center justify-center rounded">{number}</span>
        <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--text-main)]">{title}</h3>
        <div className="h-px bg-gradient-to-r from-[var(--border-base)] to-transparent flex-grow"></div>
    </div>
);

const ComparisonOverlay: React.FC<{ queue: number[], models: ComparisonModel[], onClose: () => void }> = ({ queue, models, onClose }) => {
    if (queue.length < 2) return null;

    const m1 = models.find(m => m.id === queue[0]);
    const m2 = models.find(m => m.id === queue[1]);

    if (!m1 || !m2) return null;

    const keys = Object.keys(m1.specs);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t-4 border-primary shadow-[0_-20px_60px_rgba(0,0,0,0.4)] z-50 animate-slide-in-from-bottom h-[80vh] flex flex-col text-[var(--text-main)]">
            <div className="max-w-7xl mx-auto w-full p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-2 rounded text-white">
                             <Activity size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter">VS Engine Output</h2>
                            <p className="text-sm text-[var(--text-muted)]">Direct Specification Contrast</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-sm border border-[var(--border-base)] px-6 py-3 rounded-lg hover:bg-[var(--bg-element)] font-bold transition-all bg-panel">
                        Close Engine
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-3 bg-panel border border-[var(--border-base)] rounded-xl overflow-hidden shadow-2xl">
                        {/* Header Row */}
                        <div className="p-6 bg-[var(--bg-element)] border-b border-[var(--border-base)]"></div>
                        <div className="p-6 bg-[var(--bg-element)] border-b border-l border-[var(--border-base)] font-black text-center text-xl sticky top-0 backdrop-blur-sm">{m1.name}</div>
                        <div className="p-6 bg-[var(--bg-element)] border-b border-l border-[var(--border-base)] font-black text-center text-xl sticky top-0 backdrop-blur-sm">{m2.name}</div>

                        {/* Data Rows */}
                        {keys.map(k => (
                            <React.Fragment key={k}>
                                <div className="p-5 border-t border-[var(--border-base)] font-mono text-primary font-bold text-sm flex items-center bg-[var(--bg-deep)]/50">{k}</div>
                                <div className="p-5 border-t border-[var(--border-base)] border-l border-[var(--border-base)] text-center font-mono text-lg">{m1.specs[k]}</div>
                                <div className="p-5 border-t border-[var(--border-base)] border-l border-[var(--border-base)] text-center font-mono text-lg">{m2.specs[k]}</div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentDetail;
