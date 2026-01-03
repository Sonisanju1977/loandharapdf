
import React, { useState, useRef } from 'react';
import UploadBox from '../components/UploadBox';

const MergeImage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setResultUrl(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMergeImages = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 images to merge.');
      return;
    }
    
    setProcessing(true);
    try {
      const images = await Promise.all(
        files.map(file => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
          });
        })
      );

      // Calculate canvas size (Vertical Stitch)
      const maxWidth = Math.max(...images.map(img => img.width));
      const totalHeight = images.reduce((sum, img) => sum + img.height, 0);

      const canvas = document.createElement('canvas');
      canvas.width = maxWidth;
      canvas.height = totalHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas context failed');

      let currentY = 0;
      images.forEach(img => {
        // Draw image centered horizontally if widths differ
        const offsetX = (maxWidth - img.width) / 2;
        ctx.drawImage(img, offsetX, currentY);
        currentY += img.height;
      });

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setResultUrl(dataUrl);
    } catch (err) {
      console.error(err);
      alert('Failed to merge images.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Merge Images</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">Stitch multiple images vertically into one single JPEG.</p>
      </div>

      <div className="space-y-8">
        <UploadBox 
          onFilesSelected={handleFilesSelected} 
          accept="image/jpeg, image/png" 
          multiple={true} 
          title="Drop JPEG/PNG files to merge"
          subtitle="Add more files to stitch them into a single image"
        />

        {files.length > 0 && (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Image Queue ({files.length})</h3>
              <button onClick={() => setFiles([])} className="text-sm font-black text-red-500 uppercase tracking-widest">Clear</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {files.map((f, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-100 dark:border-slate-800">
                  <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => removeFile(i)} className="p-1.5 bg-red-500 text-white rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              ))}
              <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 aspect-square">
                <input type="file" multiple accept="image/jpeg, image/png" className="hidden" onChange={(e) => e.target.files && handleFilesSelected(Array.from(e.target.files))} />
                <span className="text-xl text-slate-400">+ Add More</span>
              </label>
            </div>

            <button 
              onClick={handleMergeImages}
              disabled={processing || files.length < 2}
              className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-2xl transition-all ${
                processing || files.length < 2 ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 shadow-indigo-200 dark:shadow-indigo-900/40'
              }`}
            >
              {processing ? 'Merging Images...' : 'Merge All into One JPEG'}
            </button>
          </div>
        )}

        {resultUrl && (
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 text-center shadow-2xl animate-fade-in">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Merged Preview</h3>
            <div className="max-h-[400px] overflow-y-auto mb-8 border border-slate-100 dark:border-slate-800 rounded-2xl">
              <img src={resultUrl} className="w-full h-auto" alt="Result" />
            </div>
            <a 
              href={resultUrl} 
              download="LoanDharaTools_Merged.jpg"
              className="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white w-full py-5 rounded-2xl font-black hover:bg-indigo-700 shadow-xl transition-all"
            >
              Download Merged Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MergeImage;
