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
        <div className="markdown-body prose prose-invert max-w-none prose-p:text-on-surface-variant prose-code:text-primary prose-strong:text-on-surface">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      );
    }

    const parts = text.split(', ');
    return parts.map((part, idx) => (
      <span key={idx} className="inline-block">
        <span className="text-on-surface hover:text-primary transition-colors">
          {part}
        </span>
        {idx < parts.length - 1 && <span className="text-primary mx-1">, </span>}
      </span>
    ));
  };

  // Dirty Tricks Mode: Render tags with comma splitting
  const renderTags = (text: string) => {
    // Strip backticks if present in tags
    const cleanText = text.replace(/```\w*\n?|```/g, '').trim();
    const tags = cleanText.split(',');
    return tags.map((tag, idx) => (
      <span key={idx} className="inline-block bg-surface-container-highest px-3 py-1.5 rounded-xl border ghost-border text-on-surface text-xs md:text-sm mb-2 mr-2 font-mono font-medium">
        {tag.trim()}
      </span>
    ));
  };

  if (isDirtyTricks) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 animate-in fade-in zoom-in duration-700 space-y-6 md:space-y-8">
        {/* Style/Tags Section */}
        <div className="glass-panel ghost-border rounded-[2.5rem] p-1 relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-error/5 via-tertiary/5 to-error/5 opacity-50 pointer-events-none" />
          <div className="bg-surface-container-low/90 rounded-[2.25rem] p-6 md:p-10 relative">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-error" />
                <h3 className="text-sm md:text-base font-headline font-bold text-error uppercase tracking-widest">
                  Style & Tags
                </h3>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {onSave && (
                  <button
                    onClick={onSave}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full transition-all border ${isSaved ? 'bg-error/20 border-error/50 text-error' : 'bg-surface-container-highest border-outline-variant text-on-surface-variant hover:bg-surface-bright'}`}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    <span>{isSaved ? "Saved" : "Save"}</span>
                  </button>
                )}
                <button
                  onClick={() => handleCopy(content.styleTags || "")}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-on-surface-variant bg-surface-container-highest hover:bg-surface-bright rounded-full transition-all border ghost-border"
                >
                  {copiedPrompt ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
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
        <div className="glass-panel ghost-border rounded-[2.5rem] p-1 relative overflow-hidden group shadow-xl">
          <div className="bg-surface-container-low/90 rounded-[2.25rem] p-6 md:p-10 relative">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <Music className="w-6 h-6 text-on-surface-variant" />
                <h3 className="text-sm md:text-base font-headline font-bold text-on-surface-variant uppercase tracking-widest">
                  Structure & Layout
                </h3>
              </div>
              <button
                onClick={() => handleCopy(content.lyrics || "", 'lyrics')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-on-surface-variant bg-surface-container-highest hover:bg-surface-bright rounded-full transition-all border ghost-border"
              >
                {copiedLyrics ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLyrics ? "Copied" : "Copy Structure"}</span>
              </button>
            </div>
            <div className="font-mono text-xs md:text-sm text-on-surface-variant whitespace-pre-wrap leading-relaxed border-l-4 border-error/30 pl-6 md:pl-8 markdown-body prose prose-invert max-w-none prose-p:text-on-surface-variant prose-code:text-primary">
              <ReactMarkdown>{content.lyrics || ""}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Image Prompt Section */}
        {content.imagePrompt && (
          <div className="glass-panel ghost-border rounded-[2.5rem] p-1 relative overflow-hidden group shadow-xl">
            <div className="bg-surface-container-low/90 rounded-[2.25rem] p-6 md:p-10 relative">
               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-secondary" />
                  <h3 className="text-sm md:text-base font-headline font-bold text-secondary uppercase tracking-widest">
                    Album Art Prompt
                  </h3>
                </div>
                <button
                  onClick={() => handleCopy(content.imagePrompt || "", 'image')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-on-surface-variant bg-surface-container-highest hover:bg-surface-bright rounded-full transition-all border ghost-border"
                >
                  {copiedImage ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedImage ? "Copied" : "Copy Art Prompt"}</span>
                </button>
              </div>
              <div className="text-xs md:text-sm text-on-surface-variant leading-relaxed italic bg-surface-container-lowest/50 p-6 rounded-2xl border ghost-border">
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
    <div className="w-full max-w-4xl mx-auto mt-8 animate-in fade-in zoom-in duration-700 space-y-6 md:space-y-8">
      
      {/* Main Prompt Card */}
      <div className="glass-panel ghost-border rounded-[2.5rem] p-1 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-tertiary/5 opacity-50 pointer-events-none" />
        
        <div className="bg-surface-container-low/90 rounded-[2.25rem] p-6 md:p-12 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-tertiary-fixed-dim" />
              <h3 className="text-sm md:text-base font-headline font-bold text-primary uppercase tracking-widest">
                Generated Signal
              </h3>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {onSave && (
                <button
                  onClick={onSave}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full transition-all border ${isSaved ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-surface-container-highest border-outline-variant text-on-surface-variant hover:bg-surface-bright'}`}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </button>
              )}
              <button
                onClick={() => handleCopy(content.fullPrompt)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-on-surface-variant bg-surface-container-highest hover:bg-surface-bright rounded-full transition-all active:scale-95 border ghost-border"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-primary">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="font-mono text-sm md:text-lg leading-relaxed break-words text-on-surface selection:bg-primary/30 mb-8">
            {renderStyledText(content.fullPrompt)}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t ghost-border pt-6 gap-4">
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-surface-container-highest text-[10px] text-on-surface-variant font-bold uppercase tracking-widest rounded-lg">High Fidelity</span>
                <span className="px-3 py-1 bg-surface-container-highest text-[10px] text-on-surface-variant font-bold uppercase tracking-widest rounded-lg">Suno Optimized</span>
            </div>
            
            <div className="flex flex-col items-start sm:items-end gap-1">
                <div className="text-[10px] font-mono text-on-surface-variant/50 uppercase tracking-widest">
                    <span>{content.fullPrompt.length} Characters</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Prompt Section (Standard Mode) */}
      {content.imagePrompt && (
        <div className="glass-panel ghost-border rounded-[2.5rem] p-1 relative overflow-hidden group shadow-xl">
          <div className="bg-surface-container-low/90 rounded-[2.25rem] p-6 md:p-10 relative">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-secondary" />
                <h3 className="text-sm md:text-base font-headline font-bold text-secondary uppercase tracking-widest">
                  Album Art Prompt
                </h3>
              </div>
              <button
                onClick={() => handleCopy(content.imagePrompt || "", 'image')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-on-surface-variant bg-surface-container-highest hover:bg-surface-bright rounded-full transition-all border ghost-border"
              >
                {copiedImage ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                <span>{copiedImage ? "Copied" : "Copy Art Prompt"}</span>
              </button>
            </div>
            <div className="text-xs md:text-sm text-on-surface-variant leading-relaxed italic bg-surface-container-lowest/50 p-6 rounded-2xl border ghost-border">
              {content.imagePrompt}
            </div>
          </div>
        </div>
      )}

      {/* Breakdown Section */}
      {content.elementBreakdown && content.elementBreakdown.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
           <div className="flex items-center gap-3 mb-6 px-2">
              <Layers className="w-5 h-5 text-primary" />
              <h3 className="text-sm md:text-base font-headline font-bold text-on-surface-variant uppercase tracking-widest">
                Signal Analysis
              </h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {content.elementBreakdown.map((item, index) => (
               <div 
                  key={index} 
                  className="bg-surface-container-low/50 ghost-border hover:border-primary/30 rounded-[1.5rem] p-5 md:p-6 transition-all shadow-sm"
               >
                 <div className="text-[10px] md:text-xs font-bold text-primary mb-2 font-mono uppercase tracking-widest">
                   {item.element}
                 </div>
                 <div className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
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
