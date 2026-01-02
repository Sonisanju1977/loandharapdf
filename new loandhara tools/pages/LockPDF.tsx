
import React, { useState } from 'react';
import UploadBox from '../components/UploadBox';
import { lockPDF } from '../services/pdfService';

const LockPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!file || !password) return;
    setProcessing(true);
    try {
      const lockedBytes = await lockPDF(file, password);
      const blob = new Blob([lockedBytes], { type: 'application/pdf' });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Encryption failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Password Protect PDF</h1>
      {!file ? (
        <UploadBox onFilesSelected={files => setFile(files[0])} accept=".pdf" />
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <p className="font-bold mb-4">{file.name}</p>
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">Set Password</label>
            <input 
              type="password" 
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. MySecure123"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button 
            onClick={handleProcess}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700"
          >
            {processing ? 'Processing...' : 'Lock PDF'}
          </button>
          
          {resultUrl && (
            <div className="mt-6 text-center">
              <a href={resultUrl} download="locked.pdf" className="text-indigo-600 font-bold underline">Download Protected File</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LockPDF;
