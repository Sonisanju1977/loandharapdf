
import React, { useState } from 'react';
import UploadBox from '../components/UploadBox';
import { mergePDFs } from '../services/pdfService';

const MergePDF: React.FC = () => {
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

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 files to merge.');
      return;
    }
    
    setProcessing(true);
    try {
      const mergedBytes = await mergePDFs(files);
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert('Failed to merge PDFs.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Merge PDF</h1>
        <p className="text-slate-600">Combine multiple PDF files into one in seconds.</p>
      </div>

      <div className="space-y-8">
        <UploadBox onFilesSelected={handleFilesSelected} accept=".pdf" multiple={true} />

        {files.length > 0 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Files to Merge ({files.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-xs font-bold text-slate-400">{i + 1}</span>
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded font-bold text-xs">PDF</div>
                    <p className="text-sm font-medium text-slate-700 truncate">{f.name}</p>
                  </div>
                  <button onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={handleMerge}
              disabled={processing || files.length < 2}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                processing || files.length < 2 ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {processing ? 'Merging...' : 'Merge PDF Files'}
            </button>
          </div>
        )}

        {resultUrl && (
          <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-2xl text-center animate-in zoom-in">
             <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Files Merged Successfully!</h3>
              <p className="text-indigo-700 mb-6">Your combined document is ready for download.</p>
              <a 
                href={resultUrl} 
                download="merged_document.pdf"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all"
              >
                Download Merged PDF
              </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MergePDF;
