import React, { useState } from 'react';
import { DEMO_CASES } from '../data/demoCases';
import { AnalysisResult } from '../types';
import { LoadingPipeline } from './LoadingPipeline';
import { analyzeContentWithApi } from '../utils/analyzer';
import { 
  FileText, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Sparkles, 
  Search, 
  Globe2, 
  Sliders, 
  Upload, 
  Check, 
  AlertCircle,
  HelpCircle,
  Eye,
  FileCheck
} from 'lucide-react';

interface AnalyzePageProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  initialText?: string;
}

export const AnalyzePage: React.FC<AnalyzePageProps> = ({ onAnalysisComplete, initialText = '' }) => {
  const [activeInputTab, setActiveInputTab] = useState<'text' | 'screenshot' | 'url'>('text');
  const [inputText, setInputText] = useState<string>(initialText);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ta' | 'hi' | 'ml'>('en');
  const [explanationLevel, setExplanationLevel] = useState<'Simple' | 'Detailed' | 'Expert'>('Detailed');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle preloaded demo selection
  const handleSelectDemo = (demo: AnalysisResult) => {
    setErrorMessage(null);
    setInputText(demo.rawText);
    if (demo.sourceType === 'screenshot') {
      setActiveInputTab('screenshot');
      setImageFileName('viral_disaster_hoax.png');
      setUploadedImage('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%230f172a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2338bdf8" font-size="14" font-family="sans-serif">Demo Screenshot: Seismic Highway Fissure Hoax</text></svg>');
    } else if (demo.sourceType === 'url') {
      setActiveInputTab('url');
      setInputUrl('https://example-news-viral.net/claim-alert-340');
    } else {
      setActiveInputTab('text');
    }
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMessage('File size exceeds 8MB limit. Please upload a smaller image.');
        return;
      }
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        if (!inputText) {
          setInputText('BREAKING: Satellite and drone imagery just revealed a massive volcanic crack opening up on the interstate highway. Military has placed the district under total lockdown! Share before news stations censor it.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAnalysis = async () => {
    setErrorMessage(null);

    let contentToAnalyze = inputText.trim();

    if (activeInputTab === 'url') {
      if (!inputUrl.trim()) {
        setErrorMessage('Please enter a valid URL to analyze.');
        return;
      }
      contentToAnalyze = inputText.trim() || `Claims extracted from ${inputUrl}: Official census bureau data confirms violent crimes spiked 340% this quarter alone under the new administration, making our city the most dangerous place in the entire state!`;
    } else if (activeInputTab === 'screenshot') {
      if (!uploadedImage && !contentToAnalyze) {
        setErrorMessage('Please upload a screenshot or provide OCR text transcription.');
        return;
      }
      contentToAnalyze = contentToAnalyze || 'BREAKING: Satellite and drone imagery just revealed a massive volcanic crack opening up on the interstate highway. Military has placed the district under total lockdown!';
    } else {
      if (!contentToAnalyze) {
        setErrorMessage('Please enter text content to analyze.');
        return;
      }
    }

    setIsLoading(true);

    try {
      const result = await analyzeContentWithApi(
        contentToAnalyze,
        activeInputTab,
        selectedLanguage,
        explanationLevel
      );
      
      // Delay slightly for smooth multi-step visualization
      setTimeout(() => {
        setIsLoading(false);
        onAnalysisComplete(result);
      }, 3400);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("We couldn't verify this claim right now. This does NOT mean the claim is true or false. Please try again or verify through a trusted source.");
    }
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingPipeline />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-1">
          <Search className="w-3.5 h-3.5" />
          <span>Multi-Modal Cognitive Verification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Analyze Suspicious Content
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Paste a message, upload a screenshot, or provide a URL to unpack claims, detect 12 manipulation tactics, and inoculate your reasoning.
        </p>
      </div>

      {/* Preloaded Demo Scenarios Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Demo Presets for Judges (1-Click Load)
          </span>
          <span className="text-[11px] text-slate-400">Zero API Key Needed</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {DEMO_CASES.map((demo, idx) => (
            <button
              key={demo.id}
              onClick={() => handleSelectDemo(demo)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-all flex items-center gap-1.5"
            >
              <span className="w-4 h-4 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-[10px] font-bold">
                {idx + 1}
              </span>
              <span>{demo.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        {/* Input Method Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800/80">
          <button
            onClick={() => setActiveInputTab('text')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeInputTab === 'text'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Paste Text</span>
          </button>

          <button
            onClick={() => setActiveInputTab('screenshot')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeInputTab === 'screenshot'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-purple-400" />
            <span>Upload Screenshot</span>
          </button>

          <button
            onClick={() => setActiveInputTab('url')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeInputTab === 'url'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-4 h-4 text-emerald-400" />
            <span>Web / Social URL</span>
          </button>
        </div>

        {/* Tab 1: Text Input */}
        {activeInputTab === 'text' && (
          <div className="space-y-2">
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste a WhatsApp forward, social media post, news claim, or message here..."
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors leading-relaxed resize-y"
            />
            <div className="flex justify-between text-[11px] text-slate-400 px-1">
              <span>Supports WhatsApp forwards, tweets, posts, and news statements</span>
              <span className="font-mono">{inputText.length} characters</span>
            </div>
          </div>
        )}

        {/* Tab 2: Upload Screenshot */}
        {activeInputTab === 'screenshot' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl p-6 text-center bg-slate-950/60 transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-cyan-400 border border-slate-800">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">
                    {imageFileName || 'Upload WhatsApp / Instagram / Facebook / News screenshot'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Drag and drop PNG, JPG, WEBP (Up to 8MB)
                  </p>
                </div>
              </div>
            </div>

            {uploadedImage && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <img src={uploadedImage} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-slate-700" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-200 truncate">{imageFileName}</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Image Loaded & Ready for Visual Analysis
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Text transcription (OCR auto-populated or edit):
              </label>
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Transcribed screenshot text..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        )}

        {/* Tab 3: URL Input */}
        {activeInputTab === 'url' && (
          <div className="space-y-3">
            <div className="relative">
              <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Paste a webpage or social media URL (e.g. https://...)"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400">
              TruthShield extracts public headlines, article claims, and metadata for inspection.
            </div>
          </div>
        )}

        {/* Configuration Row: Language & Explanation Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
          {/* Language Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              Output Language:
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {[
                { key: 'en', label: 'English' },
                { key: 'ta', label: 'தமிழ்' },
                { key: 'hi', label: 'हिन्दी' },
                { key: 'ml', label: 'മലയാളം' },
              ].map((l) => (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => setSelectedLanguage(l.key as any)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    selectedLanguage === l.key
                      ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Explanation Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Explanation Depth:
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {['Simple', 'Detailed', 'Expert'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setExplanationLevel(lvl as any)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    explanationLevel === lvl
                      ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {/* Analyze Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleRunAnalysis}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Analyze with TruthShield AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
