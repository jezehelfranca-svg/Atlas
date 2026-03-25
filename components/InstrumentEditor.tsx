import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MoreVertical, Waves, Zap, Activity, Wind, Volume2, Bolt } from 'lucide-react';
import { InstrumentDetails, AlchemicalParameters } from '../types';

interface InstrumentEditorProps {
  instrument: InstrumentDetails;
  params: AlchemicalParameters;
  onParamChange: (key: keyof AlchemicalParameters, value: number) => void;
  onClose: () => void;
  onAddToPrompt: () => void;
}

export const InstrumentEditor: React.FC<InstrumentEditorProps> = ({
  instrument,
  params,
  onParamChange,
  onClose,
  onAddToPrompt
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 bg-background overflow-y-auto pb-32"
    >
      {/* Top Navigation */}
      <header className="sticky top-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-2xl border-b border-outline-variant/20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-on-surface/5 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-on-surface" />
          </button>
          <h1 className="font-headline tracking-tight text-on-surface text-xl font-bold">Instrument Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary text-sm font-headline tracking-widest uppercase opacity-80 hidden sm:inline">Sync Active</span>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-on-surface/5 transition-colors active:scale-95">
            <MoreVertical className="w-6 h-6 text-on-surface" />
          </button>
        </div>
      </header>

      <main className="pt-8 px-6 max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20">
              <img 
                alt={instrument.name} 
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100" 
                src={instrument.imageUrl}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          </div>
          <div className="lg:col-span-5 pb-4">
            <span className="font-headline text-tertiary tracking-[0.3em] uppercase text-sm mb-2 block">{instrument.category}</span>
            <h2 className="font-headline text-5xl lg:text-7xl font-extrabold tracking-tighter text-on-surface leading-none">
              {instrument.name.split(' ')[0]} <span className="text-primary">{instrument.name.split(' ').slice(1).join(' ')}</span>
            </h2>
            <div className="flex items-center gap-4 mt-6">
              <span className="px-3 py-1 bg-surface-container-high rounded-full font-label text-xs tracking-widest text-on-surface-variant border border-outline-variant/20">
                {instrument.est || 'EST. 1983'}
              </span>
              <span className="w-12 h-[1px] bg-outline-variant"></span>
              <span className="font-label text-xs text-primary-fixed-dim uppercase tracking-widest">
                {instrument.synthesisType || 'FM Synthesis'}
              </span>
            </div>
          </div>
        </section>

        {/* Sonic Character & Heritage Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-panel p-8 rounded-2xl border border-outline-variant/20 space-y-4">
            <h3 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
              <Waves className="w-6 h-6 text-primary" />
              Sonic Character
            </h3>
            <p className="text-lg leading-relaxed text-on-surface-variant font-light italic">
              "{instrument.heritage}"
            </p>
          </div>
          <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20">
            <h3 className="font-headline text-xs font-bold tracking-[0.2em] uppercase text-tertiary mb-6">Studio Heritage</h3>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Pioneered by</span>
                <span className="text-on-surface font-medium">{instrument.pioneeredBy || 'Brian Eno'}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Mastered by</span>
                <span className="text-on-surface font-medium">{instrument.masteredBy || 'Quincy Jones'}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Signature Sound</span>
                <span className="text-on-surface font-medium">{instrument.signatureSound || 'Depeche Mode'}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Alchemical Parameters */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-outline-variant/20 pb-4">
            <div>
              <h3 className="font-headline text-3xl font-bold">Alchemical Parameters</h3>
              <p className="text-on-surface-variant text-sm mt-1 font-label">Refining frequencies through algorithmic transmutation</p>
            </div>
            <div className="hidden md:flex gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Grit Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="font-headline font-bold text-lg tracking-tight flex items-center gap-2">
                  <Zap className="w-5 h-5 text-error" /> Grit
                </label>
                <span className="font-label text-xs py-1 px-2 bg-surface-container-highest rounded text-on-surface border border-outline-variant/20">
                  VAL: {params.grit}%
                </span>
              </div>
              <div className="relative h-12 flex items-center">
                <div className="absolute w-full h-1.5 bg-surface-container-highest rounded-full"></div>
                <div 
                  className="absolute h-1.5 bg-gradient-to-r from-primary to-primary-fixed-dim rounded-full transition-all duration-300"
                  style={{ width: `${params.grit}%` }}
                ></div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={params.grit}
                  onChange={(e) => onParamChange('grit', parseInt(e.target.value))}
                  className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
                />
                <div 
                  className="absolute -translate-x-1/2 w-6 h-6 bg-tertiary rounded-full shadow-lg border-2 border-surface flex items-center justify-center transition-all duration-300"
                  style={{ left: `${params.grit}%` }}
                >
                  <div className="w-1 h-3 bg-on-tertiary rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                <span>Clean</span>
                <span>Distorted</span>
              </div>
            </div>

            {/* Air Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="font-headline font-bold text-lg tracking-tight flex items-center gap-2">
                  <Wind className="w-5 h-5 text-primary" /> Air
                </label>
                <span className="font-label text-xs py-1 px-2 bg-surface-container-highest rounded text-on-surface border border-outline-variant/20 text-primary">
                  VAL: {params.air}%
                </span>
              </div>
              <div className="relative h-12 flex items-center">
                <div className="absolute w-full h-1.5 bg-surface-container-highest rounded-full"></div>
                <div 
                  className="absolute h-1.5 bg-gradient-to-r from-primary to-primary-fixed-dim rounded-full transition-all duration-300"
                  style={{ width: `${params.air}%` }}
                ></div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={params.air}
                  onChange={(e) => onParamChange('air', parseInt(e.target.value))}
                  className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
                />
                <div 
                  className="absolute -translate-x-1/2 w-6 h-6 bg-tertiary rounded-full shadow-lg border-2 border-surface flex items-center justify-center transition-all duration-300"
                  style={{ left: `${params.air}%` }}
                >
                  <div className="w-1 h-3 bg-on-tertiary rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                <span>Muffled</span>
                <span>Ethereal</span>
              </div>
            </div>

            {/* Velocity Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="font-headline font-bold text-lg tracking-tight flex items-center gap-2">
                  <Activity className="w-5 h-5 text-secondary" /> Velocity
                </label>
                <span className="font-label text-xs py-1 px-2 bg-surface-container-highest rounded text-on-surface border border-outline-variant/20">
                  VAL: {params.velocity}%
                </span>
              </div>
              <div className="relative h-12 flex items-center">
                <div className="absolute w-full h-1.5 bg-surface-container-highest rounded-full"></div>
                <div 
                  className="absolute h-1.5 bg-gradient-to-r from-primary to-primary-fixed-dim rounded-full transition-all duration-300"
                  style={{ width: `${params.velocity}%` }}
                ></div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={params.velocity}
                  onChange={(e) => onParamChange('velocity', parseInt(e.target.value))}
                  className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
                />
                <div 
                  className="absolute -translate-x-1/2 w-6 h-6 bg-tertiary rounded-full shadow-lg border-2 border-surface flex items-center justify-center transition-all duration-300"
                  style={{ left: `${params.velocity}%` }}
                >
                  <div className="w-1 h-3 bg-on-tertiary rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                <span>Soft</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>
        </section>

        {/* Action Area */}
        <section className="flex flex-col items-center pt-8">
          <button 
            onClick={onAddToPrompt}
            className="group relative px-12 py-5 rounded-2xl bg-primary text-on-primary font-headline font-bold text-lg tracking-tight active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(0,219,233,0.3)] hover:shadow-[0_0_30px_rgba(0,219,233,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              ADD TO PROMPT
              <Bolt className="w-6 h-6 fill-current" />
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
          </button>
          <p className="mt-6 font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant opacity-60">Synthesis Engine Ready</p>
        </section>
      </main>

      {/* Bottom Navigation (Fixed for consistency) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-3 pb-6 px-4 bg-background/90 backdrop-blur-lg border-t border-outline-variant/20">
        <button className="flex flex-col items-center justify-center text-on-surface-variant opacity-50">
          <Activity className="w-6 h-6" />
          <span className="font-body text-[10px] font-medium tracking-wide mt-1">Studio</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant opacity-50">
          <Volume2 className="w-6 h-6" />
          <span className="font-body text-[10px] font-medium tracking-wide mt-1">Library</span>
        </button>
        <button className="flex flex-col items-center justify-center text-primary relative">
          <Zap className="w-6 h-6 fill-current" />
          <span className="font-body text-[10px] font-medium tracking-wide mt-1">Alchemy</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"></div>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant opacity-50">
          <MoreVertical className="w-6 h-6" />
          <span className="font-body text-[10px] font-medium tracking-wide mt-1">Settings</span>
        </button>
      </nav>
    </motion.div>
  );
};
