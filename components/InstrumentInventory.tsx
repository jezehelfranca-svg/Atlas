import React from 'react';
import { INSTRUMENT_INVENTORY } from '../constants';
import { Plus } from 'lucide-react';

interface InstrumentInventoryProps {
  onSelect: (instrument: string) => void;
}

const InstrumentInventory: React.FC<InstrumentInventoryProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-12 md:mt-20 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 px-2 gap-4">
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface flex items-center gap-3">
          <span className="w-2 h-8 bg-primary rounded-full shadow-lg shadow-primary/20"></span>
          Instrument Database
        </h2>
        <span className="text-[10px] md:text-xs font-mono font-bold text-primary-fixed-dim bg-surface-container-high px-4 py-1.5 rounded-full border ghost-border uppercase tracking-widest">
          Tap to add to input
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {INSTRUMENT_INVENTORY.map((category) => (
          <div 
            key={category.name} 
            className="flex flex-col bg-surface-container-low ghost-border rounded-[2rem] overflow-hidden h-[350px] md:h-[450px] hover:border-primary/30 transition-all shadow-sm hover:shadow-xl group"
          >
            {/* Table Header */}
            <div className="p-5 bg-surface-container-high/50 border-b ghost-border backdrop-blur-md">
              <h3 
                className="text-xs font-bold uppercase tracking-widest text-primary truncate" 
                title={category.name}
              >
                {category.name}
              </h3>
            </div>
            
            {/* Table Body (List) */}
            <div className="flex-1 overflow-y-auto p-2 scroll-smooth custom-scrollbar">
              <div className="space-y-1">
                {category.items.map((item, index) => (
                  <div
                    key={item}
                    onClick={() => onSelect(item)}
                    className={`
                      group/item flex items-center justify-between px-4 py-3 text-xs 
                      text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-2xl 
                      cursor-pointer transition-all select-none
                      ${index % 2 === 0 ? 'bg-on-surface/[0.02]' : 'bg-transparent'}
                    `}
                    title="Tap to add"
                  >
                    <span className="truncate font-mono font-medium">{item}</span>
                    <Plus className="w-4 h-4 opacity-40 md:opacity-0 group-hover/item:opacity-100 text-primary transition-all transform group-hover/item:scale-125" />
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