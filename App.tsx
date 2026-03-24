import React, { useState, useCallback, useEffect } from 'react';
import { generateMusicPrompt } from './services/geminiService';
import InstrumentInventory from './components/InstrumentInventory';
import PromptDisplay from './components/PromptDisplay';
import { AppState, PromptHistoryItem, GeneratedContent } from './types';
import { Wand2, Activity, History as HistoryIcon, Mic2, RotateCcw, Zap, Bookmark, Trash2 } from 'lucide-react';

const generateId = () => Math.random().toString(36).substr(2, 9);

const STORAGE_KEY = 'audioAlchemyState';

interface SavedState {
  userInput: string;
  userLyrics: string;
  tempo: string;
  musicalKey: string;
  isDirtyTricks: boolean;
  history: PromptHistoryItem[];
  savedPrompts: PromptHistoryItem[];
  currentContent: GeneratedContent | null;
}

const loadSavedState = (): Partial<SavedState> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load state from local storage", e);
  }
  return {};
};

const App: React.FC = () => {
  // Direct state initialization from localStorage for maximum reliability
  const [userInput, setUserInput] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).userInput || '' : '';
  });
  const [userLyrics, setUserLyrics] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).userLyrics || '' : '';
  });
  const [tempo, setTempo] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).tempo || '' : '';
  });
  const [musicalKey, setMusicalKey] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).musicalKey || '' : '';
  });
  const [currentContent, setCurrentContent] = useState<GeneratedContent | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).currentContent || null : null;
  });
  const [history, setHistory] = useState<PromptHistoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).history || [] : [];
  });
  const [savedPrompts, setSavedPrompts] = useState<PromptHistoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).savedPrompts || [] : [];
  });
  const [isDirtyTricks, setIsDirtyTricks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).isDirtyTricks || false : false;
  });

  const [appState, setAppState] = useState<AppState>(currentContent ? AppState.SUCCESS : AppState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Persistence effect
  useEffect(() => {
    const stateToSave: SavedState = {
      userInput,
      userLyrics,
      tempo,
      musicalKey,
      isDirtyTricks,
      history,
      savedPrompts,
      currentContent
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save state to local storage", e);
    }
  }, [userInput, userLyrics, tempo, musicalKey, isDirtyTricks, history, savedPrompts, currentContent]);

  const handleSavePrompt = useCallback(() => {
    if (!currentContent || !userInput) return;
    
    const isAlreadySaved = savedPrompts.some(p => 
      p.input === userInput && 
      JSON.stringify(p.output) === JSON.stringify(currentContent)
    );

    if (isAlreadySaved) return;

    const newSaved: PromptHistoryItem = {
      id: generateId(),
      input: userInput,
      output: currentContent,
      timestamp: Date.now()
    };

    setSavedPrompts(prev => [newSaved, ...prev]);
  }, [currentContent, userInput, savedPrompts]);

  const handleDeleteHistory = useCallback((id: string) => {
    setHistory(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleDeleteSaved = useCallback((id: string) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your entire generation history?')) {
      setHistory([]);
    }
  }, []);

  const handleClearSaved = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your entire saved library?')) {
      setSavedPrompts([]);
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit triggered", { userInput, isDirtyTricks });
    if (!userInput.trim()) return;

    setAppState(AppState.GENERATING);
    setErrorMsg('');

    try {
      console.log("Calling generateMusicPrompt...");
      const generatedContent = await generateMusicPrompt(userInput, isDirtyTricks, userLyrics, tempo, musicalKey);
      console.log("generateMusicPrompt successful", generatedContent);
      
      setCurrentContent(generatedContent);
      setHistory(prev => [{
        id: generateId(),
        input: userInput,
        output: generatedContent,
        timestamp: Date.now()
      }, ...prev].slice(0, 10)); // Keep last 10
      
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
      setErrorMsg("Signal interrupted. Please check your API configuration or try again.");
    }
  }, [userInput, userLyrics, isDirtyTricks, tempo, musicalKey]);

  const handleReset = useCallback(() => {
    setUserInput('');
    setUserLyrics('');
    setTempo('');
    setMusicalKey('');
    setCurrentContent(null);
    setAppState(AppState.IDLE);
    setErrorMsg('');
  }, []);

  const loadHistoryItem = (item: PromptHistoryItem) => {
    setUserInput(item.input);
    setUserLyrics(item.output.lyrics || '');
    setTempo(''); 
    setMusicalKey('');
    setCurrentContent(item.output);
    setIsDirtyTricks(!!item.output.isDirtyTricks);
    setAppState(AppState.SUCCESS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInstrumentSelect = (instrument: string) => {
    setUserInput((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return instrument;
      if (trimmed.endsWith(',')) return `${trimmed} ${instrument}`;
      return `${trimmed}, ${instrument}`;
    });
  };

  return (
    <div className="min-h-screen bg-studio-900 text-slate-200 font-sans selection:bg-purple-500/30">
      {/* Background Ambience */}
      <div className={`fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${isDirtyTricks ? 'from-red-900/30 via-studio-900 to-black' : 'from-studio-800 via-studio-900 to-black'} pointer-events-none z-0 transition-all duration-1000`} />
      
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-12 max-w-[95rem]">
        
        {/* Header */}
        <header className="text-center mb-8 md:mb-12 space-y-3 md:space-y-4">
          <div className={`inline-flex items-center justify-center p-2.5 md:p-3 rounded-2xl border border-white/5 mb-2 md:mb-4 shadow-xl transition-all duration-500 ${isDirtyTricks ? 'bg-red-900/20 shadow-red-900/20' : 'bg-studio-800/50 shadow-purple-900/20'}`}>
            {isDirtyTricks ? <Zap className="w-6 h-6 md:w-8 md:h-8 text-red-500 animate-pulse" /> : <Mic2 className="w-6 h-6 md:w-8 md:h-8 text-studio-accent" />}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500">
            AudioAlchemy
          </h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto px-2">
            AI-powered creative assistant for music generation. Input a genre or gear to generate high-fidelity, instrument-aware prompts.
          </p>
        </header>

        {/* Input Section */}
        <div className="max-w-4xl mx-auto relative space-y-4">
          
          {/* Dirty Tricks Toggle */}
          <div className="flex justify-end">
            <button 
              type="button"
              onClick={() => setIsDirtyTricks(!isDirtyTricks)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${isDirtyTricks ? 'bg-red-900/30 border-red-500/50 text-red-200 hover:bg-red-900/50' : 'bg-studio-800/50 border-slate-700 text-slate-400 hover:text-slate-200'}`}
            >
              <Zap className={`w-3 h-3 ${isDirtyTricks ? 'text-red-400 fill-red-400' : 'text-slate-500'}`} />
              Dirty Tricks {isDirtyTricks ? 'ON' : 'OFF'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="relative z-20 flex flex-col gap-3 md:gap-4">
            <div className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isDirtyTricks ? 'from-red-600 to-orange-600' : 'from-indigo-500 to-purple-600'}`}></div>
              <div className="relative bg-studio-900 ring-1 ring-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex flex-col">
                   <div className="flex flex-col md:flex-row items-stretch md:items-center p-1.5 md:p-3 border-b border-white/5 gap-2">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={isDirtyTricks ? "Enter genre and instruments..." : "Describe a genre or select instruments..."}
                        className="flex-1 bg-transparent border-none outline-none text-base md:text-lg placeholder-slate-600 text-white px-3 md:px-4 py-3 min-w-0"
                        disabled={appState === AppState.GENERATING}
                      />
                      <div className="flex items-center justify-between md:justify-end gap-2 px-2 pb-2 md:pb-0">
                         {(userInput || userLyrics || currentContent) && (
                          <button
                            type="button"
                            onClick={handleReset}
                            title="Clear everything"
                            className="p-2.5 md:p-3 text-slate-400 hover:text-white hover:bg-studio-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                          >
                            <RotateCcw className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={!userInput.trim() || appState === AppState.GENERATING}
                          className={`flex-1 md:flex-none text-white px-5 md:px-6 py-3 rounded-lg font-medium transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg ${isDirtyTricks ? 'bg-red-600 hover:bg-red-500 shadow-red-900/20' : 'bg-studio-accent hover:bg-violet-600 shadow-violet-900/20'}`}
                        >
                          {appState === AppState.GENERATING ? (
                            <>
                              <Activity className="w-5 h-5 animate-spin" />
                              <span>Processing</span>
                            </>
                          ) : (
                            <>
                              {isDirtyTricks ? <Zap className="w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
                              <span>Generate</span>
                            </>
                          )}
                        </button>
                      </div>
                   </div>

                   {/* Lyrics Input (Dirty Tricks Only) */}
                   {isDirtyTricks && (
                      <div className="bg-black/20 animate-in slide-in-from-top-2 fade-in duration-300">
                         <textarea
                            value={userLyrics}
                            onChange={(e) => setUserLyrics(e.target.value)}
                            placeholder="[Optional] Paste lyrics here to apply automatic punctuation, timing controls, and formatting..."
                            className="w-full bg-transparent border-none outline-none text-sm text-slate-300 px-6 py-4 min-h-[100px] placeholder-slate-600/70 resize-y font-mono"
                            disabled={appState === AppState.GENERATING}
                         />
                      </div>
                   )}
                </div>
              </div>
            </div>

            {/* Tempo and Key Selectors */}
            <div className="relative z-10 p-4 bg-studio-900 ring-1 ring-white/10 rounded-xl shadow-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Tempo</label>
                  <select 
                    value={tempo} 
                    onChange={(e) => setTempo(e.target.value)}
                    disabled={appState === AppState.GENERATING}
                    className="w-full bg-studio-800 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-studio-accent transition-colors"
                  >
                    <option value="">Any Tempo</option>
                    <option value="Slow (60-90 BPM)">Slow (60-90 BPM)</option>
                    <option value="Moderate (90-120 BPM)">Moderate (90-120 BPM)</option>
                    <option value="Fast (120-160 BPM)">Fast (120-160 BPM)</option>
                    <option value="Very Fast (160+ BPM)">Very Fast (160+ BPM)</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Musical Key</label>
                  <select 
                    value={musicalKey} 
                    onChange={(e) => setMusicalKey(e.target.value)}
                    disabled={appState === AppState.GENERATING}
                    className="w-full bg-studio-800 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-studio-accent transition-colors"
                  >
                    <option value="">Any Key</option>
                    <optgroup label="Major Keys (Happy, Bright)">
                      <option value="C Major">C Major</option>
                      <option value="G Major">G Major</option>
                      <option value="D Major">D Major</option>
                      <option value="A Major">A Major</option>
                      <option value="E Major">E Major</option>
                      <option value="F Major">F Major</option>
                      <option value="Bb Major">Bb Major</option>
                      <option value="Eb Major">Eb Major</option>
                    </optgroup>
                    <optgroup label="Minor Keys (Sad, Dark, Serious)">
                      <option value="A Minor">A Minor</option>
                      <option value="E Minor">E Minor</option>
                      <option value="B Minor">B Minor</option>
                      <option value="F# Minor">F# Minor</option>
                      <option value="C# Minor">C# Minor</option>
                      <option value="D Minor">D Minor</option>
                      <option value="G Minor">G Minor</option>
                      <option value="C Minor">C Minor</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-slate-400 bg-studio-800/50 p-3 rounded-lg border border-white/5 leading-relaxed">
                <p className="mb-1"><strong className="text-slate-300">How Tempo & Key influence feel:</strong></p>
                <p><strong>Tempo</strong> sets the energy level. Slow tempos (60-90 BPM) feel relaxed, romantic, or sad. Moderate tempos (90-120 BPM) are great for pop and groove. Fast tempos (120+ BPM) create excitement, urgency, and high energy.</p>
                <p className="mt-1"><strong>Key</strong> sets the emotional color. <strong>Major keys</strong> generally sound happy, bright, or triumphant. <strong>Minor keys</strong> often sound sad, dark, mysterious, or serious.</p>
              </div>
            </div>
          </form>

          {/* Helper Text */}
          <div className="flex justify-between items-center px-2 text-xs text-slate-500 font-mono">
             <span>Model: Gemini 3.1 Flash Lite Preview</span>
             <span className="hidden sm:inline">{isDirtyTricks ? 'Manual Control Protocol Active' : 'Standard Prompt Engineering'}</span>
          </div>
        </div>

        {/* Error Message */}
        {appState === AppState.ERROR && (
            <div className="max-w-4xl mx-auto mt-6 p-4 bg-red-900/20 border border-red-800/50 text-red-300 rounded-lg text-sm text-center">
                {errorMsg}
            </div>
        )}

        {/* Saved Library Section */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-12 border-t border-slate-800 pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
            <div className="flex items-center gap-2 text-studio-glow">
              <Bookmark className="w-4 h-4" />
              <h2 className="text-sm font-semibold uppercase tracking-wider">Saved Library</h2>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-[10px] text-slate-500 font-mono">{savedPrompts.length} Items</span>
              {savedPrompts.length > 0 && (
                <button 
                  onClick={handleClearSaved}
                  className="text-[10px] text-slate-600 hover:text-red-400 uppercase tracking-widest font-bold transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
          
          {savedPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedPrompts.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className={`group relative cursor-pointer bg-studio-800/40 hover:bg-studio-800/70 border border-studio-accent/10 hover:border-studio-accent/40 rounded-xl p-5 transition-all shadow-lg`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSaved(item.id);
                    }}
                    className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs font-mono font-bold truncate max-w-[80%] ${item.output.isDirtyTricks ? 'text-red-400' : 'text-studio-accent'}`}>
                        {item.output.isDirtyTricks && <Zap className="w-3 h-3 inline mr-1" />}
                        {item.input}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 line-clamp-3 font-mono leading-relaxed mb-4 flex-grow">
                      {item.output.isDirtyTricks ? item.output.styleTags : item.output.fullPrompt}
                    </p>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                        {item.output.isDirtyTricks ? 'Dirty Tricks' : 'Standard'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-studio-800/20 rounded-xl border border-dashed border-white/5">
              <p className="text-slate-500 text-sm italic">No saved prompts yet. Click the bookmark icon on a generation to save it here.</p>
            </div>
          )}
        </div>

        {/* History Section */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-12 border-t border-slate-800 pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
            <div className="flex items-center gap-2 text-slate-400">
              <HistoryIcon className="w-4 h-4" />
              <h2 className="text-sm font-semibold uppercase tracking-wider">Recent Generations</h2>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-[10px] text-slate-500 font-mono">{history.length} Items</span>
              {history.length > 0 && (
                <button 
                  onClick={handleClearHistory}
                  className="text-[10px] text-slate-600 hover:text-red-400 uppercase tracking-widest font-bold transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>
          </div>

          {history.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className={`group relative cursor-pointer bg-studio-800/30 hover:bg-studio-800/60 border border-white/5 rounded-lg p-4 transition-all ${item.output.isDirtyTricks ? 'hover:border-red-500/30' : 'hover:border-studio-accent/30'}`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteHistory(item.id);
                    }}
                    className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-mono truncate max-w-[70%] ${item.output.isDirtyTricks ? 'text-red-400' : 'text-studio-accent'}`}>
                      {item.output.isDirtyTricks && <Zap className="w-3 h-3 inline mr-1" />}
                      {item.input}
                    </span>
                    <span className="text-[10px] text-slate-600">
                        {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-2 font-mono opacity-70 group-hover:opacity-100 transition-opacity">
                    {item.output.isDirtyTricks ? item.output.styleTags : item.output.fullPrompt}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-studio-800/10 rounded-xl border border-dashed border-white/5">
              <p className="text-slate-600 text-sm italic">Your generation history will appear here.</p>
            </div>
          )}
        </div>

        {/* Output Section */}
        {(appState === AppState.SUCCESS || (appState === AppState.GENERATING && currentContent)) && currentContent && (
          <div className={appState === AppState.GENERATING ? 'opacity-40 pointer-events-none grayscale-[0.3] transition-all duration-500' : 'transition-all duration-500'}>
            <PromptDisplay 
              content={currentContent} 
              onSave={handleSavePrompt}
              isSaved={savedPrompts.some(p => 
                p.input === userInput && 
                JSON.stringify(p.output) === JSON.stringify(currentContent)
              )}
            />
          </div>
        )}
        {appState === AppState.GENERATING && !currentContent && (
           <div className="mt-12 p-12 bg-studio-800/20 rounded-xl border border-white/5 text-center animate-pulse">
            <Activity className="w-12 h-12 text-studio-accent mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-mono text-slate-300">Alchemy in progress...</h3>
            <p className="text-slate-500 text-sm mt-2">Generating your musical signal.</p>
          </div>
        )}

        {/* Available Inventory (Selection Tables) */}
        <div className="mt-20">
          <InstrumentInventory onSelect={handleInstrumentSelect} />
        </div>
      </div>
    </div>
  );
};

export default App;
