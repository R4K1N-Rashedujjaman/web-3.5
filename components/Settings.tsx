
import React, { useState } from 'react';
import { AppSettings } from '../types';
import { 
    Palette, Zap, Layout as LayoutIcon, Eye, Database, Code, 
    Monitor, Moon, Sun, Sliders, Battery, Download, Upload, Trash2, RefreshCw,
    Smartphone, Grid, List, AlignJustify, Type, Layers, Cpu, MousePointer, Activity, 
    Terminal, FileJson, Ban, MousePointer2, Frame, BoxSelect, ImageOff, Network, FileCode
} from 'lucide-react';

interface SettingsProps {
    settings: AppSettings;
    updateSettings: (newSettings: Partial<AppSettings>) => void;
    resetSettings: () => void;
}

const SettingsView: React.FC<SettingsProps> = ({ settings, updateSettings, resetSettings }) => {
    const [activeTab, setActiveTab] = useState<'theme' | 'anim' | 'layout' | 'perf' | 'access' | 'data' | 'dev'>('theme');
    const [importText, setImportText] = useState('');

    const handleImport = () => {
        try {
            const parsed = JSON.parse(importText);
            updateSettings(parsed);
            alert("Configuration loaded successfully.");
            setImportText('');
        } catch (e) {
            alert("Invalid JSON configuration.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
        alert("Configuration copied to clipboard.");
    };

    const themePresets = [
        { name: 'Cyber Blue', color: '#3b82f6' },
        { name: 'Emerald Tech', color: '#10b981' },
        { name: 'Crimson Red', color: '#ef4444' },
        { name: 'Royal Purple', color: '#8b5cf6' },
        { name: 'Amber Glow', color: '#f59e0b' },
        { name: 'Neon Pink', color: '#ec4899' },
    ];

    const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-all relative overflow-hidden group ${
                activeTab === id 
                ? 'bg-primary/10 text-[var(--text-main)] font-bold' 
                : 'text-[var(--text-muted)] hover:bg-[var(--border-base)] hover:text-[var(--text-main)]'
            }`}
        >
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-primary transition-transform duration-200 ${activeTab === id ? 'scale-y-100' : 'scale-y-0'}`} />
            <Icon size={18} className={activeTab === id ? 'text-primary' : 'group-hover:text-[var(--text-main)]'} />
            <span className="text-sm tracking-wide">{label}</span>
        </button>
    );

    return (
        <div className="animate-fade-in flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded border border-primary/30">
                        <Sliders className="text-primary" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-widest leading-none text-[var(--text-main)]">Control Center</h1>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">SYS_CONFIG_V2.5</span>
                    </div>
                </div>
                {settings.lowPowerMode && <div className="text-amber-500 text-xs font-mono border border-amber-500/30 bg-amber-500/10 px-2 py-1 rounded">LOW POWER MODE ACTIVE</div>}
            </div>

            <div className="flex flex-col lg:flex-row flex-grow bg-panel rounded-lg border border-[var(--border-base)] overflow-hidden shadow-2xl relative">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-64 bg-deep/80 border-b lg:border-b-0 lg:border-r border-[var(--border-base)] flex-shrink-0 overflow-y-auto">
                    <div className="p-4 text-xs font-mono text-[var(--text-muted)] uppercase font-bold tracking-wider sticky top-0 bg-deep/95 backdrop-blur z-10 border-b border-[var(--border-base)]">Configuration Categories</div>
                    <TabButton id="theme" label="Theme" icon={Palette} />
                    <TabButton id="anim" label="Animation" icon={Zap} />
                    <TabButton id="layout" label="Layout" icon={LayoutIcon} />
                    <TabButton id="perf" label="Performance" icon={Battery} />
                    <TabButton id="access" label="Accessibility" icon={Eye} />
                    <TabButton id="data" label="Data Management" icon={Database} />
                    <TabButton id="dev" label="Developer Mode" icon={Code} />
                </div>

                {/* Content Area */}
                <div className="flex-grow p-6 lg:p-8 overflow-y-auto bg-panel/50 backdrop-blur-sm scroll-smooth text-[var(--text-main)]">
                    
                    {/* THEME TAB */}
                    {activeTab === 'theme' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <SectionTitle title="Visual Theme System" icon={Palette} />
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <ControlGroup label="Mode Selection">
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <SelectCard label="Light" icon={Sun} active={settings.themeMode === 'light'} onClick={() => updateSettings({ themeMode: 'light' })} />
                                            <SelectCard label="Dark" icon={Moon} active={settings.themeMode === 'dark'} onClick={() => updateSettings({ themeMode: 'dark' })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <SelectCard label="Auto" icon={Monitor} active={settings.themeMode === 'auto'} onClick={() => updateSettings({ themeMode: 'auto' })} />
                                            <button 
                                                onClick={() => updateSettings({ themeMode: 'cyber-gold' })}
                                                className={`
                                                    flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200 relative overflow-hidden
                                                    ${settings.themeMode === 'cyber-gold'
                                                        ? 'border-[#FFD700] text-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.3)] bg-black' 
                                                        : 'border-[var(--border-base)] bg-[var(--bg-element)] text-[var(--text-muted)] hover:border-[#FFD700]/50 hover:text-[#FFD700]'
                                                    }
                                                `}
                                            >
                                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,215,0,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite_linear] pointer-events-none opacity-50"></div>
                                                <Zap size={24} className="mb-2 relative z-10" />
                                                <span className="font-bold text-sm relative z-10">Cyber Gold</span>
                                            </button>
                                        </div>
                                    </ControlGroup>

                                    <ControlGroup label="Color Presets">
                                        <div className="grid grid-cols-3 gap-2">
                                            {themePresets.map((preset) => (
                                                <button
                                                    key={preset.name}
                                                    onClick={() => updateSettings({ accentColor: preset.color })}
                                                    className={`
                                                        p-2 rounded border text-xs font-bold transition-all flex flex-col items-center gap-1
                                                        ${settings.accentColor === preset.color 
                                                            ? 'border-primary bg-primary/20 text-[var(--text-main)]' 
                                                            : 'border-[var(--border-base)] text-[var(--text-muted)] hover:border-white/20'
                                                        }
                                                    `}
                                                >
                                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.color }} />
                                                    {preset.name}
                                                </button>
                                            ))}
                                        </div>
                                    </ControlGroup>

                                    <ControlGroup label="Custom Accent">
                                        <div className="flex items-center gap-4 bg-[var(--bg-element)] p-3 rounded border border-[var(--border-base)]">
                                            <input 
                                                type="color" 
                                                value={settings.accentColor} 
                                                onChange={(e) => updateSettings({ accentColor: e.target.value })}
                                                className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                                            />
                                            <div className="flex-grow">
                                                <div className="text-xs text-[var(--text-muted)] font-mono">HEX VALUE</div>
                                                <div className="font-mono text-[var(--text-main)]">{settings.accentColor}</div>
                                            </div>
                                            <div className="w-10 h-10 rounded bg-primary shadow-[0_0_15px_var(--primary)]" />
                                        </div>
                                    </ControlGroup>
                                </div>

                                <div className="space-y-6">
                                    <ControlGroup label="Typography & Shape">
                                        <div className="space-y-4">
                                            <Dropdown 
                                                label="Font Family"
                                                value={settings.fontFamily} 
                                                options={['Inter', 'JetBrains Mono', 'Orbitron', 'Montserrat', 'Lato', 'Playfair Display']}
                                                onChange={(v) => updateSettings({ fontFamily: v as any })} 
                                            />
                                            <Dropdown 
                                                label="UI Density"
                                                value={settings.uiDensity} 
                                                options={['comfortable', 'normal', 'compact']}
                                                onChange={(v) => updateSettings({ uiDensity: v as any })} 
                                            />
                                            <RangeSlider 
                                                label={`Border Radius (${settings.borderRadius}px)`}
                                                value={settings.borderRadius}
                                                min={0} max={20}
                                                onChange={(v) => updateSettings({ borderRadius: v })}
                                            />
                                        </div>
                                    </ControlGroup>

                                    <ControlGroup label="Background Style">
                                         <div className="grid grid-cols-3 gap-2">
                                            {['solid', 'gradient', 'pattern'].map((style) => (
                                                <button
                                                    key={style}
                                                    onClick={() => updateSettings({ backgroundStyle: style as any })}
                                                    className={`p-2 text-xs uppercase font-bold rounded border transition-all ${settings.backgroundStyle === style ? 'bg-primary border-primary text-[var(--text-on-primary)]' : 'border-[var(--border-base)] text-[var(--text-muted)] hover:border-primary/50'}`}
                                                >
                                                    {style}
                                                </button>
                                            ))}
                                        </div>
                                    </ControlGroup>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ANIMATION TAB */}
                    {activeTab === 'anim' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <SectionTitle title="Motion Dynamics" icon={Zap} />
                            
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                <Switch label="Popout Page Transitions" desc="Professional slow-pop effect." checked={settings.pageTransitions} onChange={(c) => updateSettings({ pageTransitions: c })} highlight icon={Zap} />
                                <Switch label="Component Fade-ins" checked={settings.componentFadeIns} onChange={(c) => updateSettings({ componentFadeIns: c })} />
                                <Switch label="Diagram Animations" checked={settings.diagramAnimations} onChange={(c) => updateSettings({ diagramAnimations: c })} />
                                <Switch label="Perf. Meter Motion" checked={settings.performanceMeterAnimations} onChange={(c) => updateSettings({ performanceMeterAnimations: c })} />
                                <Switch label="Hover Glow Effects" checked={settings.hoverEffects} onChange={(c) => updateSettings({ hoverEffects: c })} />
                                <Switch label="Parallax Effects" checked={settings.parallaxEffects} onChange={(c) => updateSettings({ parallaxEffects: c })} />
                                
                                <div className="col-span-full">
                                    <ControlGroup label="Scroll Physics">
                                         <div className="flex gap-2">
                                            <button
                                                onClick={() => updateSettings({ scrollBehavior: 'smooth' })}
                                                className={`flex-1 py-2 rounded text-xs uppercase font-bold border transition-all ${
                                                    settings.scrollBehavior === 'smooth' 
                                                        ? 'bg-primary text-[var(--text-on-primary)] border-primary' 
                                                        : 'bg-[var(--bg-element)] text-[var(--text-muted)] border-[var(--border-base)]'
                                                }`}
                                            >
                                                Smooth
                                            </button>
                                            <button
                                                onClick={() => updateSettings({ scrollBehavior: 'auto' })}
                                                className={`flex-1 py-2 rounded text-xs uppercase font-bold border transition-all ${
                                                    settings.scrollBehavior === 'auto' 
                                                        ? 'bg-primary text-[var(--text-on-primary)] border-primary' 
                                                        : 'bg-[var(--bg-element)] text-[var(--text-muted)] border-[var(--border-base)]'
                                                }`}
                                            >
                                                Instant
                                            </button>
                                        </div>
                                    </ControlGroup>
                                </div>

                                <div className="col-span-full border-t border-[var(--border-base)] my-4" />
                                
                                <Switch 
                                    label="Reduced Motion" 
                                    desc="Simplifies animations for accessibility."
                                    checked={settings.reducedMotion} 
                                    onChange={(c) => updateSettings({ reducedMotion: c })} 
                                    icon={Smartphone}
                                />
                                <Switch 
                                    label="GPU Acceleration" 
                                    desc="Force hardware compositing."
                                    checked={settings.gpuAcceleration} 
                                    onChange={(c) => updateSettings({ gpuAcceleration: c })} 
                                    icon={Cpu}
                                />
                            </div>
                        </div>
                    )}

                    {/* LAYOUT TAB */}
                    {activeTab === 'layout' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <SectionTitle title="Interface Structure" icon={LayoutIcon} />
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <ControlGroup label="Component View Style">
                                    <div className="grid grid-cols-3 gap-2">
                                        <SelectCard label="Grid" icon={Grid} active={settings.gridStyle === 'grid'} onClick={() => updateSettings({ gridStyle: 'grid' })} />
                                        <SelectCard label="List" icon={List} active={settings.gridStyle === 'list'} onClick={() => updateSettings({ gridStyle: 'list' })} />
                                        <SelectCard label="Compact" icon={AlignJustify} active={settings.gridStyle === 'compact'} onClick={() => updateSettings({ gridStyle: 'compact' })} />
                                    </div>
                                </ControlGroup>

                                <div className="space-y-4">
                                     <Dropdown 
                                        label="Navigation Style"
                                        value={settings.navigationStyle} 
                                        options={['top', 'side']}
                                        onChange={(v) => updateSettings({ navigationStyle: v as any })} 
                                    />
                                    <Dropdown 
                                        label="Detail Layout"
                                        value={settings.layoutStyle} 
                                        options={['two-column', 'stacked']}
                                        onChange={(v) => updateSettings({ layoutStyle: v as any })} 
                                    />
                                    
                                    <ControlGroup label="Page Container Width">
                                        <div className="flex gap-2">
                                            {['standard', 'wide', 'full'].map((w) => (
                                                <button
                                                    key={w}
                                                    onClick={() => updateSettings({ contentWidth: w as any })}
                                                    className={`flex-1 py-2 rounded text-xs uppercase font-bold border transition-all ${
                                                        settings.contentWidth === w 
                                                            ? 'bg-primary text-[var(--text-on-primary)] border-primary' 
                                                            : 'bg-[var(--bg-element)] text-[var(--text-muted)] border-[var(--border-base)]'
                                                    }`}
                                                >
                                                    {w}
                                                </button>
                                            ))}
                                        </div>
                                    </ControlGroup>

                                    <RangeSlider 
                                        label="Card Scale"
                                        value={settings.cardSize === 'small' ? 0 : settings.cardSize === 'medium' ? 1 : 2}
                                        min={0} max={2}
                                        onChange={(v) => updateSettings({ cardSize: v === 0 ? 'small' : v === 1 ? 'medium' : 'large' })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PERFORMANCE TAB */}
                    {activeTab === 'perf' && (
                         <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <SectionTitle title="System Optimization" icon={Battery} />

                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3 mb-6">
                                <Activity className="text-amber-500 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-amber-500 text-sm">Optimization Advisor</h4>
                                    <p className="text-xs text-amber-200/70">Adjust these settings if you experience frame drops or high memory usage on your device.</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                <Switch label="Disable Heavy Animations" checked={settings.disableHeavyAnimations} onChange={(c) => updateSettings({ disableHeavyAnimations: c })} />
                                <Switch label="Disable 3D Diagrams" checked={settings.disable3D} onChange={(c) => updateSettings({ disable3D: c })} />
                                <Switch label="Lazy Loading" checked={settings.lazyLoading} onChange={(c) => updateSettings({ lazyLoading: c })} />
                                <Switch label="Image Preloading" checked={settings.imagePreloading} onChange={(c) => updateSettings({ imagePreloading: c })} />
                                <Switch label="Low Spec Mode" desc="Disables images for max speed." checked={settings.lowSpecMode} onChange={(c) => updateSettings({ lowSpecMode: c })} icon={ImageOff} highlight />
                                
                                <div className="col-span-full">
                                    <ControlGroup label="Animation FPS Target (Simulation)">
                                        <div className="flex gap-2">
                                            {[30, 60, 120, 144].map((fps) => (
                                                <button
                                                    key={fps}
                                                    onClick={() => updateSettings({ fpsLimit: fps })}
                                                    className={`flex-1 py-2 rounded text-xs font-bold font-mono border transition-all ${
                                                        settings.fpsLimit === fps 
                                                            ? 'bg-primary/20 text-primary border-primary' 
                                                            : 'bg-[var(--bg-element)] text-[var(--text-muted)] border-[var(--border-base)] hover:bg-[var(--bg-panel)]'
                                                    }`}
                                                >
                                                    {fps}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => updateSettings({ fpsLimit: 999 })}
                                                className={`flex-1 py-2 rounded text-xs font-bold font-mono border transition-all ${
                                                    settings.fpsLimit === 999 
                                                        ? 'bg-primary/20 text-primary border-primary' 
                                                        : 'bg-[var(--bg-element)] text-[var(--text-muted)] border-[var(--border-base)] hover:bg-[var(--bg-panel)]'
                                                }`}
                                            >
                                                MAX
                                            </button>
                                        </div>
                                    </ControlGroup>
                                </div>

                                <div className="col-span-full pt-4">
                                     <Switch 
                                        label="Low Power Mode" 
                                        desc="Aggressively reduces effects to conserve energy."
                                        checked={settings.lowPowerMode} 
                                        onChange={(c) => updateSettings({ lowPowerMode: c })} 
                                        highlight
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ACCESSIBILITY TAB */}
                    {activeTab === 'access' && (
                         <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <SectionTitle title="Accessibility & Readability" icon={Eye} />
                            
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                <Switch label="High Contrast Mode" checked={settings.highContrast} onChange={(c) => updateSettings({ highContrast: c })} />
                                <Switch label="Dyslexia-Friendly Font" checked={settings.dyslexiaFriendly} onChange={(c) => updateSettings({ dyslexiaFriendly: c })} />
                                <Switch label="Keyboard Navigation Hints" checked={settings.keyboardNav} onChange={(c) => updateSettings({ keyboardNav: c })} />
                                <Switch label="Screen Reader ARIA Hints" checked={settings.screenReaderHints} onChange={(c) => updateSettings({ screenReaderHints: c })} />
                                <Switch label="Focus Highlight" desc="Thick neon outlines on focus." checked={settings.focusHighlight} onChange={(c) => updateSettings({ focusHighlight: c })} icon={BoxSelect} />
                                
                                <div className="col-span-full">
                                     <RangeSlider 
                                        label={`Font Size Scale (${Math.round(settings.fontSizeScale * 100)}%)`}
                                        value={settings.fontSizeScale}
                                        min={0.8} max={1.5} step={0.1}
                                        onChange={(v) => updateSettings({ fontSizeScale: v })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DATA TAB */}
                    {activeTab === 'data' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <SectionTitle title="Data Persistence" icon={Database} />
                            
                            <div className="grid gap-6">
                                <div className="p-4 bg-deep/50 rounded border border-[var(--border-base)]">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-sm text-[var(--text-main)]">Export Configuration</h3>
                                        <button onClick={copyToClipboard} className="text-xs bg-primary/20 text-primary px-3 py-1 rounded hover:bg-primary/30 transition-colors">Copy to Clipboard</button>
                                    </div>
                                    <div className="bg-[var(--bg-element)] p-3 rounded font-mono text-xs text-[var(--text-muted)] overflow-hidden h-24 relative">
                                        {JSON.stringify(settings, null, 2)}
                                        <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
                                    </div>
                                </div>

                                <div className="p-4 bg-deep/50 rounded border border-[var(--border-base)]">
                                    <h3 className="font-bold text-sm mb-4 text-[var(--text-main)]">Import Configuration</h3>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={importText}
                                            onChange={(e) => setImportText(e.target.value)}
                                            placeholder="Paste JSON string here..."
                                            className="flex-grow bg-[var(--bg-element)] border border-[var(--border-base)] rounded px-3 py-2 text-sm font-mono text-[var(--text-main)] focus:border-primary outline-none"
                                        />
                                        <button onClick={handleImport} className="bg-[var(--border-base)] hover:bg-primary/20 text-[var(--text-main)] px-4 py-2 rounded flex items-center gap-2 transition-colors">
                                            <Upload size={14} /> Import
                                        </button>
                                    </div>
                                </div>

                                <div className="border-t border-[var(--border-base)] pt-6 flex gap-4">
                                    <button 
                                        onClick={resetSettings}
                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                                    >
                                        <RefreshCw size={16} /> Reset Settings
                                    </button>
                                    <button 
                                        onClick={() => { localStorage.clear(); window.location.reload(); }}
                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                                    >
                                        <Trash2 size={16} /> Clear Storage
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DEV TAB */}
                     {activeTab === 'dev' && (
                         <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <SectionTitle title="Developer Tools" icon={Code} />
                            
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                <Switch label="Developer Mode" checked={settings.devMode} onChange={(c) => updateSettings({ devMode: c })} highlight />
                                
                                <div className={`col-span-full grid md:grid-cols-2 gap-x-12 gap-y-6 transition-opacity duration-300 ${!settings.devMode ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
                                    <Switch label="Interactive Terminal" desc="CLI with input & logging." checked={settings.showSystemTerminal} onChange={(c) => updateSettings({ showSystemTerminal: c })} icon={Terminal} />
                                    <Switch label="Source Code Terminal" desc="Inspect application source." checked={settings.showSourceCode} onChange={(c) => updateSettings({ showSourceCode: c })} icon={FileCode} />
                                    <Switch label="Wireframe Mode" desc="Strip styling for layout debug." checked={settings.wireframeMode} onChange={(c) => updateSettings({ wireframeMode: c })} icon={Frame} />
                                    <Switch label="Show Component Data" desc="View raw JSON source." checked={settings.showComponentData} onChange={(c) => updateSettings({ showComponentData: c })} icon={FileJson} />
                                    <Switch label="Show Real FPS" desc="Monitors requestAnimationFrame." checked={settings.showFPS} onChange={(c) => updateSettings({ showFPS: c })} icon={Activity} />
                                    <Switch label="DOM Inspector" desc="Floating node counter." checked={settings.showDomInspector} onChange={(c) => updateSettings({ showDomInspector: c })} icon={Network} />
                                    <Switch label="Show Grid Overlay" checked={settings.showGridOverlay} onChange={(c) => updateSettings({ showGridOverlay: c })} />
                                    <Switch label="Debug Outlines" checked={settings.showDebugOutlines} onChange={(c) => updateSettings({ showDebugOutlines: c })} />
                                    <Switch label="Component Boundaries" checked={settings.showComponentBoundaries} onChange={(c) => updateSettings({ showComponentBoundaries: c })} />
                                    <Switch label="Event Logger" desc="Log clicks to terminal" checked={settings.logInteractions} onChange={(c) => updateSettings({ logInteractions: c })} icon={MousePointer2} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* --- UI COMPONENTS --- */

const SectionTitle = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-base)] pb-4">
        <div className="bg-primary/20 p-2 rounded text-primary">
            <Icon size={20} />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wide text-[var(--text-main)]">{title}</h2>
    </div>
);

const ControlGroup: React.FC<{ label: string, children: React.ReactNode }> = ({ label, children }) => (
    <div>
        <label className="block text-xs font-bold text-[var(--text-muted)] mb-3 uppercase tracking-wider flex items-center gap-2">
            <div className="w-1 h-3 bg-primary" />
            {label}
        </label>
        {children}
    </div>
);

const SelectCard = ({ label, icon: Icon, active, onClick }: { label: string, icon: any, active: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`
            flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200 w-full
            ${active 
                ? 'border-primary bg-primary/20 text-[var(--text-on-primary)] shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                : 'border-[var(--border-base)] bg-[var(--bg-element)] text-[var(--text-muted)] hover:border-primary/50 hover:bg-deep'
            }
        `}
    >
        <Icon size={24} className="mb-2" />
        <span className="font-bold text-sm">{label}</span>
    </button>
);

const Switch = ({ label, desc, checked, onChange, icon: Icon, highlight }: { label: string, desc?: string, checked: boolean, onChange: (v: boolean) => void, icon?: any, highlight?: boolean }) => (
    <div className={`flex items-center justify-between p-3 rounded border transition-colors ${highlight && checked ? 'bg-primary/10 border-primary/50' : 'bg-deep/30 border-[var(--border-base)] hover:border-primary/50'}`}>
        <div className="flex items-center gap-3">
            {Icon && <Icon size={16} className={checked ? 'text-primary' : 'text-[var(--text-muted)]'} />}
            <div>
                <div className={`font-bold text-sm ${checked ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>{label}</div>
                {desc && <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{desc}</div>}
            </div>
        </div>
        <button 
            onClick={() => onChange(!checked)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 relative ${checked ? 'bg-primary' : 'bg-gray-700'}`}
        >
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
    </div>
);

const Dropdown = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) => (
    <div className="relative">
        <label className="text-[10px] text-[var(--text-muted)] font-bold uppercase mb-1 block">{label}</label>
        <div className="relative">
            <select 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none bg-[var(--bg-element)] border border-[var(--border-base)] p-2 rounded text-sm text-[var(--text-main)] focus:border-primary outline-none capitalize cursor-pointer hover:bg-deep transition-colors"
            >
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <div className="absolute right-3 top-2.5 pointer-events-none text-[var(--text-muted)]">
                <AlignJustify size={14} />
            </div>
        </div>
    </div>
);

const RangeSlider = ({ label, value, min, max, step = 1, onChange }: { label: string, value: number, min: number, max: number, step?: number, onChange: (v: number) => void }) => (
    <div>
        <div className="flex justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">{label}</span>
        </div>
        <input 
            type="range" 
            min={min} max={max} step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
    </div>
);

export default SettingsView;
