import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Upload, Wand2, RefreshCw, Download, Image as ImageIcon, Send, Sparkles } from 'lucide-react';

const ImageEditor: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to load a sample luxury image for testing
  const loadSampleImage = async () => {
    setIsProcessing(true);
    try {
      const sampleUrl = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200';
      const response = await fetch(sampleUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
        setProcessedImage(null);
        setError(null);
        setIsProcessing(false);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      setError("Failed to load sample image. Please try uploading your own.");
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setSourceImage(readerEvent.target?.result as string);
        setProcessedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!sourceImage || !prompt) return;

    setIsProcessing(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const base64Data = sourceImage.split(',')[1];
      const mimeType = sourceImage.split(',')[0].split(':')[1].split(';')[0];

      // Using gemini-2.5-flash-image for high-quality artistic edits
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: `Apply the following artistic edit to this brand visual while maintaining premium luxury aesthetics: ${prompt}. Return only the resulting image.`,
            },
          ],
        },
      });

      let foundImage = false;
      const candidate = response.candidates?.[0];
      if (candidate && candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            setProcessedImage(`data:image/png;base64,${base64EncodeString}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("The AI model did not return an image part. Try a more descriptive artistic prompt.");
      }

    } catch (err: any) {
      console.error("Image editing error:", err);
      setError(err.message || "Failed to process image. Ensure your prompt is descriptive.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `aira-ai-edit-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="bg-[#030712] border border-white/5 rounded-3xl p-6 md:p-10 shadow-inner overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#c4a47c]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        
        {/* Workspace */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <ImageIcon size={20} className="text-[#c4a47c]" />
              <span>Input Asset</span>
            </h3>
            <div className="flex items-center space-x-4">
              <button 
                onClick={loadSampleImage}
                disabled={isProcessing}
                className="text-[#c4a47c] hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-[#c4a47c]/20 hover:bg-[#c4a47c]/10 transition-all"
              >
                <Sparkles size={12} />
                <span>Load Sample Asset</span>
              </button>
              {sourceImage && (
                <button 
                  onClick={() => { setSourceImage(null); setProcessedImage(null); }}
                  className="text-slate-500 hover:text-red-400 text-sm flex items-center space-x-1"
                >
                  <RefreshCw size={14} />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative group">
            {!sourceImage ? (
              <label className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-dashed border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-[#c4a47c]/50 transition-all cursor-pointer group">
                <Upload className="text-slate-500 mb-4 group-hover:text-[#c4a47c] transition-colors" size={48} />
                <span className="text-slate-400 font-medium">Click to upload brand asset</span>
                <span className="text-slate-600 text-xs mt-2 italic">Supports PNG, JPG (Max 5MB)</span>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden h-[400px] border border-white/10 shadow-2xl bg-black">
                <img src={sourceImage} className="w-full h-full object-contain" alt="Source" />
                <div className="absolute inset-0 bg-[#030712]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                   <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-[#c4a47c] hover:text-white transition-all"
                   >
                     Replace Image
                   </button>
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Edit Prompt (Artistic Direction)</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., 'Convert to high-fashion noir aesthetic' or 'Add cinematic golden hour light'"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-6 pr-16 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#c4a47c]/30 transition-all font-canva"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && processImage()}
              />
              <button
                onClick={processImage}
                disabled={!sourceImage || !prompt || isProcessing}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#c4a47c] hover:bg-[#b3936b] disabled:bg-slate-800 text-white rounded-xl transition-all shadow-xl shadow-[#c4a47c]/20 active:scale-[0.9] flex items-center justify-center"
              >
                {isProcessing ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-1 font-medium bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20">{error}</p>}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Wand2 size={20} className="text-[#c4a47c]" />
              <span>AI Output</span>
            </h3>
            {processedImage && (
              <button 
                onClick={downloadImage}
                className="text-[#c4a47c] hover:text-[#e6ccaa] text-sm flex items-center space-x-1 font-bold"
              >
                <Download size={14} />
                <span>Save Result</span>
              </button>
            )}
          </div>

          <div className="relative w-full h-[400px] bg-[#050810] border border-white/5 rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-inner group">
            {isProcessing ? (
              <div className="text-center space-y-4">
                <div className="relative">
                   <div className="w-16 h-16 border-4 border-[#c4a47c]/10 border-t-[#c4a47c] rounded-full animate-spin mx-auto" />
                   <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#c4a47c] animate-pulse" size={20} />
                </div>
                <div className="space-y-1">
                   <p className="text-white text-xs font-black uppercase tracking-[0.4em] animate-pulse">Rendering Influence...</p>
                   <p className="text-slate-500 text-[10px] font-light">Consulting Nano-Banana Neural Engines</p>
                </div>
              </div>
            ) : processedImage ? (
              <img src={processedImage} className="w-full h-full object-contain animate-in fade-in duration-1000" alt="Processed" />
            ) : (
              <div className="text-center px-10">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-700">
                   <Wand2 size={40} className="text-slate-700" />
                </div>
                <p className="text-slate-500 text-sm font-light italic max-w-[200px] mx-auto">Upload an asset or click "Load Sample" to begin artistic transformation.</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
              <div className="text-slate-600 text-[9px] uppercase font-black tracking-widest mb-1">Model Engine</div>
              <div className="text-white text-xs font-bold flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                 <span>Gemini 2.5 Flash-Image</span>
              </div>
            </div>
            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
              <div className="text-slate-600 text-[9px] uppercase font-black tracking-widest mb-1">Architecture</div>
              <div className="text-white text-xs font-bold">Nano-Banana V3 (Artistic)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
