import React, { useState, useCallback } from 'react';
import { generateMusicPrompt } from './services/geminiService';
import InstrumentInventory from './components/InstrumentInventory';
import PromptDisplay from './components/PromptDisplay';
import { AppState, PromptHistoryItem, GeneratedContent } from './types';
import { Wand2, Activity, History as HistoryIcon, Mic2, RotateCcw, Zap } from 'lucide-react';

const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [userLyrics, setUserLyrics] = useState('');
  const [tempo, setTempo] = useState('');
  const [musicalKey, setMusicalKey] = useState('');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentContent, setCurrentContent] = useState<GeneratedContent | null>(null);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isDirtyTricks, setIsDirtyTricks] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setAppState(AppState.GENERATING);
    setErrorMsg('');

    try {
      const generatedContent = await generateMusicPrompt(userInput, isDirtyTricks, userLyrics, tempo, musicalKey);
      
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
    setCurrentContent(item.output);
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
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-[95rem]">
        
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <div className={`inline-flex items-center justify-center p-3 rounded-2xl border border-white/5 mb-4 shadow-xl transition-all duration-500 ${isDirtyTricks ? 'bg-red-900/20 shadow-red-900/20' : 'bg-studio-800/50 shadow-purple-900/20'}`}>
            {isDirtyTricks ? <Zap className="w-8 h-8 text-red-500 animate-pulse" /> : <Mic2 className="w-8 h-8 text-studio-accent" />}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500">
            AudioAlchemy
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
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

          <form onSubmit={handleSubmit} className="relative z-20 flex flex-col gap-4">
            <div className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isDirtyTricks ? 'from-red-600 to-orange-600' : 'from-indigo-500 to-purple-600'}`}></div>
              <div className="relative bg-studio-900 ring-1 ring-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex flex-col">
                   <div className="flex items-center p-2 md:p-3 border-b border-white/5">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={isDirtyTricks ? "Enter genre and instruments..." : "Describe a genre (e.g., 'Dark Synthwave') or select instruments below..."}
                        className="flex-1 bg-transparent border-none outline-none text-base md:text-lg placeholder-slate-600 text-white px-4 py-3 min-w-0"
                        disabled={appState === AppState.GENERATING}
                      />
                      <div className="flex items-center gap-2 px-2">
                         {(userInput || userLyrics || currentContent) && (
                          <button
                            type="button"
                            onClick={handleReset}
                            title="Clear everything"
                            className="p-3 text-slate-400 hover:text-white hover:bg-studio-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                          >
                            <RotateCcw className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={!userInput.trim() || appState === AppState.GENERATING}
                          className={`text-white px-6 py-3 rounded-lg font-medium transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg ${isDirtyTricks ? 'bg-red-600 hover:bg-red-500 shadow-red-900/20' : 'bg-studio-accent hover:bg-violet-600 shadow-violet-900/20'}`}
                        >
                          {appState === AppState.GENERATING ? (
                            <>
                              <Activity className="w-5 h-5 animate-spin" />
                              <span>Processing</span>
                            </>
                          ) : (
                            <>
                              {isDirtyTricks ? <Zap className="w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
                              <span className="hidden md:inline">Generate</span>
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
             <span>Model: Gemini 3.0 Pro Preview</span>
             <span className="hidden sm:inline">{isDirtyTricks ? 'Manual Control Protocol Active' : 'Standard Prompt Engineering'}</span>
          </div>
        </div>

        {/* Error Message */}
        {appState === AppState.ERROR && (
            <div className="max-w-4xl mx-auto mt-6 p-4 bg-red-900/20 border border-red-800/50 text-red-300 rounded-lg text-sm text-center">
                {errorMsg}
            </div>
        )}

        {/* Output Section */}
        {appState === AppState.SUCCESS && currentContent && (
          <PromptDisplay content={currentContent} />
        )}

        {/* Available Inventory (Selection Tables) */}
        <InstrumentInventory onSelect={handleInstrumentSelect} />

        {/* History Section */}
        {history.length > 0 && (
          <div className="max-w-4xl mx-auto mt-20 border-t border-slate-800 pt-8">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <HistoryIcon className="w-4 h-4" />
              <h2 className="text-sm font-semibold uppercase tracking-wider">Recent Generations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className={`group cursor-pointer bg-studio-800/30 hover:bg-studio-800/60 border border-white/5 rounded-lg p-4 transition-all ${item.output.isDirtyTricks ? 'hover:border-red-500/30' : 'hover:border-studio-accent/30'}`}
                >
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
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
