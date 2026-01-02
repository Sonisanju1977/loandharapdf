
import React, { useRef, useState } from 'react';

interface UploadBoxProps {
  onFilesSelected: (files: File[]) => void;
  accept: string;
  multiple?: boolean;
  title?: string;
  subtitle?: string;
}

const UploadBox: React.FC<UploadBoxProps> = ({ 
  onFilesSelected, 
  accept, 
  multiple = false, 
  title = "Drop your files here", 
  subtitle = "or click to browse your storage" 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <div 
      className={`relative w-full py-24 px-8 border-4 border-dashed rounded-[3.5rem] transition-all duration-500 cursor-pointer flex flex-col items-center justify-center text-center group overflow-hidden
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10 scale-[1.02]' 
          : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 hover:border-indigo-400 dark:hover:border-indigo-900 shadow-2xl hover:shadow-indigo-500/10'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      {/* Animated Background Decor */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,#4f46e505_0%,transparent_70%)] pointer-events-none`}></div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept={accept} 
        multiple={multiple} 
        onChange={handleFileChange}
      />
      
      <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] flex items-center justify-center mb-10 group-hover:scale-125 transition-all duration-700 shadow-xl border border-indigo-100/50 dark:border-indigo-900/50">
        <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400 transform group-hover:-translate-y-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      
      <h3 className="text-3xl font-[900] text-slate-800 dark:text-white mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-lg text-slate-400 dark:text-slate-500 font-medium mb-12 tracking-wide">{subtitle}</p>
      
      <button className="bg-indigo-600 text-white px-12 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-indigo-700 dark:hover:bg-indigo-500 shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] transition-all active:scale-95 z-10">
        Browse Files
      </button>

      <div className="mt-12 flex flex-wrap justify-center gap-8 text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.25em]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          Local Processing
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          Privacy Shield
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          WASM Powered
        </div>
      </div>
    </div>
  );
};

export default UploadBox;
