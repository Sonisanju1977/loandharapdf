
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import UploadBox from '../components/UploadBox';

const JPGToPDF: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setResultUrl(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConvertToPDF = async () => {
    if (files.length === 0) return;
    
    setProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          continue; // Skip unsupported types
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert('Failed to convert images to PDF.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">JPG to PDF Converter</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">Convert your images into a high-quality PDF document locally.</p>
      </div>

      <div className="space-y-8">
        <UploadBox 
          onFilesSelected={handleFilesSelected} 
          accept="image/jpeg, image/png" 
          multiple={true} 
          title="Drop JPG/PNG images here"
          subtitle="Add multiple images to create a multi-page PDF"
        />

        {files.length > 0 && (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Images Selected ({files.length})</h3>
              <button 
                onClick={() => handleFilesSelected([])} // This acts as an "Add more" trigger if used with another UploadBox, but here we just have one.
                className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {files.map((f, i) => (
                <div key={i} className="relative group aspect-[3/4] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                  <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => removeFile(i)} className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 dark:bg-slate-900/90 rounded-md text-[10px] font-bold text-slate-600 dark:text-slate-400">
                    Page {i + 1}
                  </div>
                </div>
              ))}
              {/* Add More Trigger */}
              <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors aspect-[3/4]">
                <input type="file" multiple accept="image/jpeg, image/png" className="hidden" onChange={(e) => e.target.files && handleFilesSelected(Array.from(e.target.files))} />
                <span className="text-2xl mb-1 text-slate-400">+</span>
                <span className="text-[10px] font-black uppercase text-slate-400">Add More</span>
              </label>
            </div>

            <button 
              onClick={handleConvertToPDF}
              disabled={processing}
              className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-2xl transition-all ${
                processing ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 shadow-indigo-200 dark:shadow-indigo-900/40'
              }`}
            >
              {processing ? 'Generating PDF...' : 'Convert to PDF'}
            </button>
          </div>
        )}

        {resultUrl && (
          <div className="bg-gradient-to-br from-indigo-600 to-violet-800 dark:from-indigo-900 dark:to-slate-900 p-10 rounded-[2.5rem] text-center text-white shadow-2xl animate-fade-in border border-white/10">
            <h3 className="text-2xl font-black mb-6">PDF Ready!</h3>
            <a 
              href={resultUrl} 
              download="LoanDharaTools_Images.pdf"
              className="inline-flex items-center justify-center gap-3 bg-white text-indigo-700 w-full py-5 rounded-2xl font-black hover:bg-slate-50 shadow-2xl transition-all hover:scale-[1.02]"
            >
              Download Your PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default JPGToPDF;
