import React from 'react';
import { INSTRUMENT_INVENTORY } from '../constants';
import { Plus } from 'lucide-react';

interface InstrumentInventoryProps {
  onSelect: (instrument: string) => void;
}

const InstrumentInventory: React.FC<InstrumentInventoryProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-[90rem] mx-auto mt-8 md:mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 px-1 gap-2">
        <h2 className="text-lg md:text-xl font-bold text-slate-200 flex items-center gap-2">
          <span className="w-2 h-6 bg-studio-accent rounded-sm shadow-[0_0_10px_rgba(139,92,246,0.5)]"></span>
          Instrument Database
        </h2>
        <span className="text-[10px] md:text-xs font-mono text-studio-glow/70 bg-studio-800/50 px-3 py-1 rounded-full border border-studio-700/50">
          Tap to add to input
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
        {INSTRUMENT_INVENTORY.map((category) => (
          <div 
            key={category.name} 
            className="flex flex-col bg-studio-900/40 border border-slate-800 rounded-xl overflow-hidden h-[300px] md:h-[400px] hover:border-slate-700 transition-colors shadow-lg"
          >
            {/* Table Header */}
            <div className="p-2.5 md:p-3 bg-studio-800/80 border-b border-slate-700 backdrop-blur-sm">
              <h3 
                className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-studio-glow truncate" 
                title={category.name}
              >
                {category.name}
              </h3>
            </div>
            
            {/* Table Body (List) */}
            <div className="flex-1 overflow-y-auto p-1 scroll-smooth">
              <div className="space-y-0.5">
                {category.items.map((item, index) => (
                  <div
                    key={item}
                    onClick={() => onSelect(item)}
                    className={`
                      group flex items-center justify-between px-3 py-2 text-[11px] md:text-xs 
                      text-slate-400 hover:text-white hover:bg-studio-700/50 rounded-lg 
                      cursor-pointer transition-all select-none
                      ${index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}
                    `}
                    title="Tap to add"
                  >
                    <span className="truncate font-mono">{item}</span>
                    <Plus className="w-3 h-3 opacity-40 md:opacity-0 group-hover:opacity-100 text-studio-accent transition-opacity transform group-hover:scale-110" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstrumentInventory;