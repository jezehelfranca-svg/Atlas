import React, { useState, useCallback, useEffect } from 'react';
import { generateMusicPrompt } from './services/geminiService';
import InstrumentInventory from './components/InstrumentInventory';
import PromptDisplay from './components/PromptDisplay';
import { InstrumentEditor } from './components/InstrumentEditor';
import { AppState, PromptHistoryItem, GeneratedContent, InstrumentDetails, AlchemicalParameters } from './types';
import { INSTRUMENT_DETAILS, DEFAULT_INSTRUMENT_DETAILS } from './constants';
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

  // Instrument Editor State
  const [editingInstrument, setEditingInstrument] = useState<InstrumentDetails | null>(null);
  const [instrumentParams, setInstrumentParams] = useState<AlchemicalParameters>({
    grit: 42,
    air: 88,
    velocity: 65
  });

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

  const handleInstrumentSelect = useCallback((instrumentName: string) => {
    const details = INSTRUMENT_DETAILS[instrumentName] || {
      ...DEFAULT_INSTRUMENT_DETAILS,
      name: instrumentName
    };
    setEditingInstrument(details);
    // Set some interesting initial values
    setInstrumentParams({
      grit: Math.floor(Math.random() * 40) + 20,
      air: Math.floor(Math.random() * 40) + 50,
      velocity: Math.floor(Math.random() * 40) + 40
    });
  }, []);

  const handleAddInstrumentToPrompt = useCallback(() => {
    if (!editingInstrument) return;
    
    const paramString = `(${instrumentParams.grit}% grit, ${instrumentParams.air}% air, ${instrumentParams.velocity}% velocity)`;
    const newAddition = `${editingInstrument.name} ${paramString}`;
    
    setUserInput(prev => {
      const currentInput = prev.trim();
      if (!currentInput) return newAddition;
      if (currentInput.toLowerCase().includes(editingInstrument.name.toLowerCase())) return prev;
      return `${currentInput}, ${newAddition}`;
    });
    
    setEditingInstrument(null);
  }, [editingInstrument, instrumentParams, setUserInput]);

  return (
    <div className="min-h-screen bg-background text-on-background font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Dynamic Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20 transition-all duration-1000 ${isDirtyTricks ? 'bg-error' : 'bg-primary'}`} />
        <div className={`absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20 transition-all duration-1000 ${isDirtyTricks ? 'bg-tertiary' : 'bg-secondary'}`} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 max-w-5xl">
        
        {editingInstrument && (
          <InstrumentEditor
            instrument={editingInstrument}
            params={instrumentParams}
            onParamChange={(key, value) => setInstrumentParams(prev => ({ ...prev, [key]: value }))}
            onClose={() => setEditingInstrument(null)}
            onAddToPrompt={handleAddInstrumentToPrompt}
          />
        )}

        {/* Header */}
        <header className="text-center mb-12 md:mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className={`inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-[2rem] ghost-border mb-6 transition-all duration-700 shadow-2xl ${isDirtyTricks ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary-fixed-dim'}`}>
            {isDirtyTricks ? <Zap className="w-8 h-8 md:w-12 md:h-12" /> : <Mic2 className="w-8 h-8 md:w-12 md:h-12" />}
          </div>
          <h1 className="text-4xl md:text-7xl font-headline font-bold tracking-tight text-on-background mb-4">
            AudioAlchemy
          </h1>
          <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Creative assistant for high-fidelity music generation. Craft instrument-aware prompts for Suno and Udio.
          </p>
        </header>

        {/* Input Section */}
        <div className="relative space-y-6">
          
          {/* Dirty Tricks Toggle */}
          <div className="flex justify-end">
            <button 
              type="button"
              onClick={() => setIsDirtyTricks(!isDirtyTricks)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${isDirtyTricks ? 'bg-error/20 border-error/50 text-error hover:bg-error/30' : 'bg-surface-container border-outline-variant text-on-surface-variant hover:text-on-surface'}`}
            >
              <Zap className={`w-3.5 h-3.5 ${isDirtyTricks ? 'fill-current' : ''}`} />
              Dirty Tricks {isDirtyTricks ? 'ON' : 'OFF'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="relative z-20 space-y-4">
            <div className="glass-panel ghost-border rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="flex flex-col">
                 <div className="flex flex-col md:flex-row items-stretch p-2 md:p-4 gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={isDirtyTricks ? "Enter genre and instruments..." : "Describe a genre or select instruments..."}
                      className="flex-1 bg-transparent border-none outline-none text-lg md:text-xl placeholder-on-surface-variant/50 text-on-surface px-4 py-4"
                      disabled={appState === AppState.GENERATING}
                    />
                    <div className="flex items-center gap-2 p-2 md:p-0">
                       {(userInput || userLyrics || currentContent) && (
                        <button
                          type="button"
                          onClick={handleReset}
                          title="Clear everything"
                          className="p-4 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-2xl transition-colors"
                        >
                          <RotateCcw className="w-6 h-6" />
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={!userInput.trim() || appState === AppState.GENERATING}
                        className={`flex-1 md:flex-none px-8 py-4 rounded-2xl font-bold transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg ${isDirtyTricks ? 'bg-error text-on-error hover:bg-error/90' : 'bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim'}`}
                      >
                        {appState === AppState.GENERATING ? (
                          <>
                            <Activity className="w-6 h-6 animate-spin" />
                            <span>Processing</span>
                          </>
                        ) : (
                          <>
                            {isDirtyTricks ? <Zap className="w-6 h-6" /> : <Wand2 className="w-6 h-6" />}
                            <span>Generate</span>
                          </>
                        )}
                      </button>
                    </div>
                 </div>

                 {/* Lyrics Input (Dirty Tricks Only) */}
                 {isDirtyTricks && (
                    <div className="bg-surface-container-lowest/50 border-t ghost-border animate-in slide-in-from-top-2 fade-in duration-300">
                       <textarea
                          value={userLyrics}
                          onChange={(e) => setUserLyrics(e.target.value)}
                          placeholder="[Optional] Paste lyrics here for structure and timing controls..."
                          className="w-full bg-transparent border-none outline-none text-sm text-on-surface-variant px-6 py-5 min-h-[120px] placeholder-on-surface-variant/30 resize-y font-mono"
                          disabled={appState === AppState.GENERATING}
                       />
                    </div>
                 )}
              </div>
            </div>

            {/* Tempo and Key Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-low ghost-border rounded-3xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-widest">Tempo</label>
                  <select 
                    value={tempo} 
                    onChange={(e) => setTempo(e.target.value)}
                    disabled={appState === AppState.GENERATING}
                    className="w-full bg-surface-container-highest border-none rounded-2xl px-4 py-3.5 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Any Tempo</option>
                    <option value="Slow (60-90 BPM)">Slow (60-90 BPM)</option>
                    <option value="Moderate (90-120 BPM)">Moderate (90-120 BPM)</option>
                    <option value="Fast (120-160 BPM)">Fast (120-160 BPM)</option>
                    <option value="Very Fast (160+ BPM)">Very Fast (160+ BPM)</option>
                  </select>
                </div>
                <div className="text-[11px] text-on-surface-variant/70 leading-relaxed">
                  <strong className="text-on-surface">Tempo:</strong> Sets the energy. Slow is relaxed/sad, Fast is high energy/urgency.
                </div>
              </div>

              <div className="bg-surface-container-low ghost-border rounded-3xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-widest">Musical Key</label>
                  <select 
                    value={musicalKey} 
                    onChange={(e) => setMusicalKey(e.target.value)}
                    disabled={appState === AppState.GENERATING}
                    className="w-full bg-surface-container-highest border-none rounded-2xl px-4 py-3.5 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
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
                <div className="text-[11px] text-on-surface-variant/70 leading-relaxed">
                  <strong className="text-on-surface">Key:</strong> Sets the color. Major is bright/happy, Minor is dark/mysterious.
                </div>
              </div>
            </div>
          </form>

          {/* Helper Text */}
          <div className="flex justify-between items-center px-4 text-[10px] text-on-surface-variant/50 font-mono uppercase tracking-widest">
             <span>Gemini 3.1 Flash Lite</span>
             <span className="hidden sm:inline">{isDirtyTricks ? 'Manual Control' : 'Standard Mode'}</span>
          </div>
        </div>

        {/* Error Message */}
        {appState === AppState.ERROR && (
            <div className="mt-8 p-5 bg-error-container text-on-error-container rounded-3xl text-sm text-center font-medium animate-in fade-in zoom-in duration-300">
                {errorMsg}
            </div>
        )}

        {/* Output Section */}
        {(appState === AppState.SUCCESS || (appState === AppState.GENERATING && currentContent)) && currentContent && (
          <div className={`mt-12 ${appState === AppState.GENERATING ? 'opacity-40 pointer-events-none grayscale-[0.3]' : ''} transition-all duration-500`}>
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
           <div className="mt-12 p-16 bg-surface-container-low ghost-border rounded-[2.5rem] text-center animate-pulse">
            <Activity className="w-16 h-16 text-primary mx-auto mb-6 animate-spin" />
            <h3 className="text-xl font-headline font-bold text-on-surface">Alchemy in progress...</h3>
            <p className="text-on-surface-variant text-base mt-2">Transmuting your ideas into sound.</p>
          </div>
        )}

        {/* Saved Library Section */}
        <div className="mt-16 md:mt-24 space-y-8">
          <div className="flex items-center justify-between border-b ghost-border pb-4">
            <div className="flex items-center gap-3 text-secondary">
              <Bookmark className="w-5 h-5" />
              <h2 className="text-lg font-headline font-bold uppercase tracking-widest">Saved Library</h2>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-on-surface-variant/50 font-mono">{savedPrompts.length} Items</span>
              {savedPrompts.length > 0 && (
                <button 
                  onClick={handleClearSaved}
                  className="text-xs text-on-surface-variant hover:text-error uppercase tracking-widest font-bold transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
          
          {savedPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedPrompts.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className="group relative cursor-pointer bg-surface-container-low hover:bg-surface-container ghost-border hover:border-secondary/30 rounded-[2rem] p-6 transition-all shadow-sm hover:shadow-xl"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSaved(item.id);
                    }}
                    className="absolute top-6 right-6 p-2 text-on-surface-variant hover:text-error opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="flex flex-col h-full space-y-4">
                    <div className="flex justify-between items-start">
                      <span className={`text-sm font-bold truncate max-w-[80%] ${item.output.isDirtyTricks ? 'text-error' : 'text-secondary'}`}>
                        {item.output.isDirtyTricks && <Zap className="w-3.5 h-3.5 inline mr-1.5" />}
                        {item.input}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant line-clamp-3 font-mono leading-relaxed flex-grow">
                      {item.output.isDirtyTricks ? item.output.styleTags : item.output.fullPrompt}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t ghost-border">
                      <span className="text-[10px] text-on-surface-variant/40 font-mono">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <span className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-bold">
                        {item.output.isDirtyTricks ? 'Dirty Tricks' : 'Standard'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-container-lowest/30 rounded-[2.5rem] border-2 border-dashed ghost-border">
              <p className="text-on-surface-variant text-sm italic">Your saved alchemy will appear here.</p>
            </div>
          )}
        </div>

        {/* History Section */}
        <div className="mt-16 md:mt-24 space-y-8">
          <div className="flex items-center justify-between border-b ghost-border pb-4">
            <div className="flex items-center gap-3 text-on-surface-variant">
              <HistoryIcon className="w-5 h-5" />
              <h2 className="text-lg font-headline font-bold uppercase tracking-widest">Recent</h2>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-on-surface-variant/50 font-mono">{history.length} Items</span>
              {history.length > 0 && (
                <button 
                  onClick={handleClearHistory}
                  className="text-xs text-on-surface-variant hover:text-error uppercase tracking-widest font-bold transition-colors"
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
                  className="group relative cursor-pointer bg-surface-container-low/50 hover:bg-surface-container-low ghost-border rounded-2xl p-5 transition-all"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteHistory(item.id);
                    }}
                    className="absolute top-5 right-5 p-2 text-on-surface-variant hover:text-error opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs font-bold truncate max-w-[70%] ${item.output.isDirtyTricks ? 'text-error' : 'text-primary-fixed-dim'}`}>
                      {item.output.isDirtyTricks && <Zap className="w-3 h-3 inline mr-1.5" />}
                      {item.input}
                    </span>
                    <span className="text-[10px] text-on-surface-variant/40 font-mono">
                        {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant/70 line-clamp-2 font-mono leading-relaxed">
                    {item.output.isDirtyTricks ? item.output.styleTags : item.output.fullPrompt}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface-container-lowest/20 rounded-[2rem] border-2 border-dashed ghost-border">
              <p className="text-on-surface-variant/50 text-sm italic">No recent signals detected.</p>
            </div>
          )}
        </div>

        {/* Available Inventory (Selection Tables) */}
        <div className="mt-24 md:mt-32">
          <InstrumentInventory onSelect={handleInstrumentSelect} />
        </div>
      </div>
    </div>
  );
};

export default App;
