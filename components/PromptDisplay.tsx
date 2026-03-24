import React, { useState } from 'react';
import { Copy, Check, Sparkles, Layers, Zap, Music, Bookmark, BookmarkCheck, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GeneratedContent } from '../types';

interface PromptDisplayProps {
  content: GeneratedContent;
  onSave?: () => void;
  isSaved?: boolean;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ content, onSave, isSaved }) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const isDirtyTricks = content.isDirtyTricks;

  const handleCopy = (text: string, type: 'prompt' | 'lyrics' | 'image' = 'prompt') => {
    // Strip backticks if present for clean pasting
    const cleanText = text.replace(/```\w*\n?|```/g, '').trim();
    navigator.clipboard.writeText(cleanText);
    
    if (type === 'lyrics') {
      setCopiedLyrics(true);
      setTimeout(() => setCopiedLyrics(false), 2000);
    } else if (type === 'image') {
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2000);
    } else {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  // Standard Mode: Visual highlight for keywords
  const renderStyledText = (text: string) => {
    // If it's a markdown code block, render it with ReactMarkdown
    if (text.includes('```')) {
      return (
        <div className="markdown-body prose prose-invert max-w-none">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      );
    }

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
    // Strip backticks if present in tags
    const cleanText = text.replace(/```\w*\n?|```/g, '').trim();
    const tags = cleanText.split(',');
    return tags.map((tag, idx) => (
      <span key={idx} className="inline-block bg-studio-800/80 px-2 py-1 rounded border border-studio-700/50 text-slate-200 text-xs md:text-sm mb-2 mr-2 font-mono">
        {tag.trim()}
      </span>
    ));
  };

  if (isDirtyTricks) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 animate-in fade-in zoom-in duration-500 space-y-4 md:space-y-6">
        {/* Style/Tags Section */}
        <div className="glass-panel rounded-xl p-0.5 md:p-1 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-orange-900/10 to-red-900/10 opacity-50 pointer-events-none" />
          <div className="bg-studio-900/90 rounded-lg p-4 md:p-6 relative">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                <h3 className="text-xs md:text-sm font-mono text-red-400 font-bold uppercase tracking-widest">
                  Style & Tags
                </h3>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onSave && (
                  <button
                    onClick={onSave}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-[10px] md:text-xs font-medium rounded-full transition-all border ${isSaved ? 'bg-red-900/30 border-red-500/50 text-red-200' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                  >
                    {isSaved ? <BookmarkCheck className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                    <span>{isSaved ? "Saved" : "Save"}</span>
                  </button>
                )}
                <button
                  onClick={() => handleCopy(content.styleTags || "")}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-[10px] md:text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-slate-700"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPrompt ? "Copied" : "Copy Tags"}</span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap">
              {renderTags(content.styleTags || "")}
            </div>
          </div>
        </div>

        {/* Structure/Layout Section */}
        <div className="glass-panel rounded-xl p-0.5 md:p-1 relative overflow-hidden group">
          <div className="bg-studio-900/90 rounded-lg p-4 md:p-6 relative">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                <h3 className="text-xs md:text-sm font-mono text-slate-400 font-bold uppercase tracking-widest">
                  Structure & Layout
                </h3>
              </div>
              <button
                onClick={() => handleCopy(content.lyrics || "", 'lyrics')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-1.5 text-[10px] md:text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-slate-700"
              >
                {copiedLyrics ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLyrics ? "Copied" : "Copy Structure"}</span>
              </button>
            </div>
            <div className="font-mono text-xs md:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed border-l-2 border-red-500/30 pl-3 md:pl-4 markdown-body prose prose-invert max-w-none">
              <ReactMarkdown>{content.lyrics || ""}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Image Prompt Section */}
        {content.imagePrompt && (
          <div className="glass-panel rounded-xl p-0.5 md:p-1 relative overflow-hidden group">
            <div className="bg-studio-900/90 rounded-lg p-4 md:p-6 relative">
               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                  <h3 className="text-xs md:text-sm font-mono text-indigo-400 font-bold uppercase tracking-widest">
                    Album Art Prompt
                  </h3>
                </div>
                <button
                  onClick={() => handleCopy(content.imagePrompt || "", 'image')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-1.5 text-[10px] md:text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-slate-700"
                >
                  {copiedImage ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedImage ? "Copied" : "Copy Art Prompt"}</span>
                </button>
              </div>
              <div className="text-xs md:text-sm text-slate-300 leading-relaxed italic bg-studio-800/50 p-3 md:p-4 rounded-lg border border-studio-700/30">
                {content.imagePrompt}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Standard Mode Render
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 animate-in fade-in zoom-in duration-500 space-y-4 md:space-y-6">
      
      {/* Main Prompt Card */}
      <div className="glass-panel rounded-xl p-0.5 md:p-1 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-50 pointer-events-none" />
        
        <div className="bg-studio-900/90 rounded-lg p-4 md:p-8 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              <h3 className="text-xs md:text-sm font-mono text-studio-glow font-bold uppercase tracking-widest">
                Generated Signal
              </h3>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onSave && (
                <button
                  onClick={onSave}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-[10px] md:text-xs font-medium rounded-full transition-all border ${isSaved ? 'bg-studio-accent/30 border-studio-accent/50 text-studio-glow' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                >
                  {isSaved ? <BookmarkCheck className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </button>
              )}
              <button
                onClick={() => handleCopy(content.fullPrompt)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-[10px] md:text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-full transition-all active:scale-95 border border-slate-700"
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
          </div>

          <div className="font-mono text-xs md:text-base leading-relaxed break-words text-slate-300 selection:bg-studio-accent selection:text-white mb-6">
            {renderStyledText(content.fullPrompt)}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t border-slate-800 pt-4 gap-3">
            <div className="flex gap-2">
                <span className="px-2 py-1 bg-studio-800 text-[9px] md:text-[10px] text-slate-500 rounded uppercase tracking-wider">High Fidelity</span>
                <span className="px-2 py-1 bg-studio-800 text-[9px] md:text-[10px] text-slate-500 rounded uppercase tracking-wider">Suno Optimized</span>
            </div>
            
            <div className="flex flex-col items-start sm:items-end gap-1">
                <div className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    <span>{content.fullPrompt.length} Characters</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Prompt Section (Standard Mode) */}
      {content.imagePrompt && (
        <div className="glass-panel rounded-xl p-0.5 md:p-1 relative overflow-hidden group">
          <div className="bg-studio-900/90 rounded-lg p-4 md:p-6 relative">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                <h3 className="text-xs md:text-sm font-mono text-indigo-400 font-bold uppercase tracking-widest">
                  Album Art Prompt
                </h3>
              </div>
              <button
                onClick={() => handleCopy(content.imagePrompt || "", 'image')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-1.5 text-[10px] md:text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-slate-700"
              >
                {copiedImage ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedImage ? "Copied" : "Copy Art Prompt"}</span>
              </button>
            </div>
            <div className="text-xs md:text-sm text-slate-300 leading-relaxed italic bg-studio-800/50 p-3 md:p-4 rounded-lg border border-studio-700/30">
              {content.imagePrompt}
            </div>
          </div>
        </div>
      )}

      {/* Breakdown Section */}
      {content.elementBreakdown && content.elementBreakdown.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
           <div className="flex items-center gap-2 mb-4 px-1">
              <Layers className="w-4 h-4 text-studio-glow" />
              <h3 className="text-xs md:text-sm font-mono text-slate-400 font-bold uppercase tracking-widest">
                Signal Analysis
              </h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             {content.elementBreakdown.map((item, index) => (
               <div 
                  key={index} 
                  className="bg-studio-800/40 border border-slate-800 hover:border-studio-accent/30 rounded-lg p-3 md:p-4 transition-all"
               >
                 <div className="text-[10px] md:text-xs font-bold text-studio-accent mb-1 font-mono uppercase tracking-wide">
                   {item.element}
                 </div>
                 <div className="text-xs md:text-sm text-slate-300 leading-snug">
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
