
import React, { useState } from 'react';
import UploadBox from '../components/UploadBox';
import { splitPDF } from '../services/pdfService';

const SplitPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleSelect = (files: File[]) => {
    if (files.length > 0) setFile(files[0]);
  };

  const handleSplit = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      // Fixed: splitPDF only expects one argument (the file)
      const pageBytesArray = await splitPDF(file);
      const urls = pageBytesArray.map(bytes => URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
      setResults(urls);
    } catch (err) {
      console.error(err);
      alert('Split failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">Split PDF</h1>
      {!file ? (
        <UploadBox onFilesSelected={handleSelect} accept=".pdf" />
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-700">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-red-500 font-bold">Cancel</button>
          </div>
          <button 
            onClick={handleSplit}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700"
          >
            {processing ? 'Processing...' : 'Split into Pages'}
          </button>

          {results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {results.map((url, i) => (
                <a 
                  key={i} 
                  href={url} 
                  download={`page_${i+1}.pdf`}
                  className="bg-white border p-4 rounded-lg text-center hover:bg-slate-50"
                >
                  <div className="text-xs font-bold text-slate-500 mb-2">Page {i + 1}</div>
                  <div className="text-indigo-600 text-xs font-bold">Download</div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SplitPDF;
