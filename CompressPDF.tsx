
import React, { useState, useMemo } from 'react';
import UploadBox from '../components/UploadBox';
import { compressPDFLocally } from '../services/pdfService';

const CompressPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetSize, setTargetSize] = useState(100); 
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; size: number; ratio: number } | null>(null);

  const originalSizeKB = useMemo(() => file ? (file.size / 1024) : 0, [file]);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      // Automatically suggest 40% reduction
      setTargetSize(Math.max(20, Math.floor((f.size / 1024) * 0.4)));
      setResult(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    
    setProcessing(true);
    setProgress(0);

    try {
      const { data, estimatedSize, ratio } = await compressPDFLocally(file, targetSize, (p) => {
        setProgress(p);
      });
      
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResult({ url, size: estimatedSize, ratio });
      setProcessing(false);
    } catch (err) {
      console.error(err);
      setProcessing(false);
      alert('Compression failed. This might happen with complex or corrupted PDFs.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Extreme PDF Compressor</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">Re-samples and compresses every page to reach your target size.</p>
      </div>

      {!file ? (
        <UploadBox onFilesSelected={handleFileSelect} accept=".pdf" title="Drop PDF here to compress" />
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center text-xl font-bold">PDF</div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white truncate max-w-[200px]">{file.name}</h4>
                <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">{originalSizeKB.toFixed(1)} KB</p>
              </div>
            </div>
            {!processing && (
              <button onClick={() => setFile(null)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
            <div className="mb-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Desired Size (KB)</label>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400">{targetSize}</span>
                    <span className="text-xl font-bold text-slate-400 dark:text-slate-500">KB</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-black px-4 py-1.5 rounded-full ${targetSize < originalSizeKB * 0.2 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                    {targetSize < originalSizeKB * 0.2 ? '🔥 Super Extreme' : '✅ Standard'}
                  </span>
                </div>
              </div>
              
              <input 
                type="range" 
                min="10" 
                max={Math.max(originalSizeKB, 1000)} 
                step="5"
                value={targetSize}
                disabled={processing}
                onChange={(e) => setTargetSize(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition-colors"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-600 mt-4 font-black uppercase tracking-wider">
                <span>Min: 10 KB</span>
                <span>Current: {originalSizeKB.toFixed(0)} KB</span>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-2xl mb-8 border border-orange-100 dark:border-orange-900/20 flex gap-4 items-center">
              <span className="text-2xl">⚡</span>
              <p className="text-xs text-orange-900 dark:text-orange-200 leading-relaxed font-bold uppercase tracking-tight">
                Extreme mode rasterizes pages one by one to ensure the smallest possible size. This happens 100% in your browser.
              </p>
            </div>

            <button 
              onClick={handleCompress}
              disabled={processing}
              className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-2xl transition-all ${
                processing ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 hover:-translate-y-1 active:translate-y-0 shadow-indigo-200 dark:shadow-indigo-900/40'
              }`}
            >
              {processing ? `Optimizing Layers: ${progress}%` : 'Compress Now'}
            </button>
          </div>

          {processing && (
            <div className="space-y-2">
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden shadow-inner p-1">
                <div className="gradient-bg h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-center text-[10px] font-black text-slate-400 dark:text-slate-600 animate-pulse uppercase tracking-widest">Processing Local Memory...</p>
            </div>
          )}

          {result && !processing && (
            <div className="bg-gradient-to-br from-indigo-600 to-violet-800 dark:from-indigo-900 dark:to-slate-900 p-10 rounded-[2.5rem] text-center text-white shadow-2xl animate-fade-in border border-white/10">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-black mb-1">Compression Success!</h3>
              
              <div className="grid grid-cols-2 gap-4 my-8">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="text-white/60 text-[10px] font-black uppercase mb-1 tracking-widest">Final Size</div>
                  <div className="text-2xl font-black">{(result.size / 1024).toFixed(1)} KB</div>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="text-white/60 text-[10px] font-black uppercase mb-1 tracking-widest">Reduction</div>
                  <div className="text-2xl font-black text-emerald-400">-{result.ratio}%</div>
                </div>
              </div>

              <a 
                href={result.url} 
                download={`optimized_${file.name}`}
                className="inline-flex items-center justify-center gap-3 bg-white text-indigo-700 w-full py-5 rounded-2xl font-black hover:bg-slate-50 shadow-2xl transition-all hover:scale-[1.02]"
              >
                Download PDF
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompressPDF;
