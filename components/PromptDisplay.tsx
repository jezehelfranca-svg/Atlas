import React, { useState } from 'react';
import { Copy, Check, Sparkles, Layers, Zap, Music } from 'lucide-react';
import { GeneratedContent } from '../types';

interface PromptDisplayProps {
  content: GeneratedContent;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ content }) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const isDirtyTricks = content.isDirtyTricks;

  const handleCopy = (text: string, isLyrics: boolean = false) => {
    navigator.clipboard.writeText(text);
    if (isLyrics) {
      setCopiedLyrics(true);
      setTimeout(() => setCopiedLyrics(false), 2000);
    } else {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  // Standard Mode: Visual highlight for keywords
  const renderStyledText = (text: string) => {
    const parts = text.split(', ');
    return parts.map((part, idx) => (
      <span key={idx} className="inline-block">
        <span className="text-slate-200 hover:text-white transition-colors">
          {part}
        </span>
        {idx < parts.length - 1 && <span className="text-studio-accent mr-1">, </span>}
      </span>
    ));
  };

  // Dirty Tricks Mode: Render tags with comma splitting
  const renderTags = (text: string) => {
    // Split by comma for the new format
    const tags = text.split(',');
    return tags.map((tag, idx) => (
      <span key={idx} className="inline-block bg-studio-800/80 px-2 py-1 rounded border border-studio-700/50 text-slate-200 text-xs md:text-sm mb-2 mr-2 font-mono">
        {tag.trim()}
      </span>
    ));
  };

  if (isDirtyTricks) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 animate-in fade-in zoom-in duration-500 space-y-6">
        {/* Style/Tags Section */}
        <div className="glass-panel rounded-xl p-1 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-orange-900/10 to-red-900/10 opacity-50 pointer-events-none" />
          <div className="bg-studio-900/90 rounded-lg p-6 relative">
             <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-mono text-red-400 font-bold uppercase tracking-widest">
                  Style & Tags
                </h3>
              </div>
              <button
                onClick={() => handleCopy(content.styleTags || "")}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-slate-700"
              >
                {copiedPrompt ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPrompt ? "Copied" : "Copy Tags"}</span>
              </button>
            </div>
            <div className="flex flex-wrap">
              {renderTags(content.styleTags || "")}
            </div>
          </div>
        </div>

        {/* Structure/Layout Section */}
        <div className="glass-panel rounded-xl p-1 relative overflow-hidden group">
          <div className="bg-studio-900/90 rounded-lg p-6 relative">
             <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-slate-400" />
                <h3 className="text-sm font-mono text-slate-400 font-bold uppercase tracking-widest">
                  Structure & Layout
                </h3>
              </div>
              <button
                onClick={() => handleCopy(content.lyrics || "", true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-slate-700"
              >
                {copiedLyrics ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLyrics ? "Copied" : "Copy Structure"}</span>
              </button>
            </div>
            <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed border-l-2 border-red-500/30 pl-4">
              {content.lyrics}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  // Standard Mode Render
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 animate-in fade-in zoom-in duration-500 space-y-6">
      
      {/* Main Prompt Card */}
      <div className="glass-panel rounded-xl p-1 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-50 pointer-events-none" />
        
        <div className="bg-studio-900/90 rounded-lg p-6 md:p-8 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h3 className="text-sm font-mono text-studio-glow font-bold uppercase tracking-widest">
                Generated Signal
              </h3>
            </div>
            <button
              onClick={() => handleCopy(content.fullPrompt)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-full transition-all active:scale-95 border border-slate-700"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="font-mono text-sm md:text-base leading-relaxed break-words text-slate-300 selection:bg-studio-accent selection:text-white mb-6">
            {renderStyledText(content.fullPrompt)}
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <div className="flex gap-2">
                <span className="px-2 py-1 bg-studio-800 text-[10px] text-slate-500 rounded uppercase tracking-wider">High Fidelity</span>
                <span className="px-2 py-1 bg-studio-800 text-[10px] text-slate-500 rounded uppercase tracking-wider">Udio Optimized</span>
            </div>
            
            <div className="flex flex-col items-end gap-1 w-1/3">
                <div className="flex justify-end w-full text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    <span>{content.fullPrompt.length} Characters</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Section */}
      {content.elementBreakdown && content.elementBreakdown.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
           <div className="flex items-center gap-2 mb-4 px-1">
              <Layers className="w-4 h-4 text-studio-glow" />
              <h3 className="text-sm font-mono text-slate-400 font-bold uppercase tracking-widest">
                Signal Analysis
              </h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             {content.elementBreakdown.map((item, index) => (
               <div 
                  key={index} 
                  className="bg-studio-800/40 border border-slate-800 hover:border-studio-accent/30 rounded-lg p-4 transition-all"
               >
                 <div className="text-xs font-bold text-studio-accent mb-1 font-mono uppercase tracking-wide">
                   {item.element}
                 </div>
                 <div className="text-sm text-slate-300 leading-snug">
                   {item.description}
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

    </div>
  );
};

export default PromptDisplay;
