
import React, { useState } from 'react';
import UploadBox from '../components/UploadBox';

const PDFToImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    // Real implementation requires pdf.js or similar
    // For demo, we simulate a delay and provide a placeholder
    setTimeout(() => {
      setImages(['https://picsum.photos/400/600?random=1', 'https://picsum.photos/400/600?random=2']);
      setProcessing(false);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">PDF to JPG</h1>
      {!file ? (
        <UploadBox onFilesSelected={f => setFile(f[0])} accept=".pdf" />
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border flex justify-between">
            <span className="font-bold">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-red-500">Change</button>
          </div>
          <button onClick={handleProcess} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold">
            {processing ? 'Converting...' : 'Convert Each Page to JPG'}
          </button>

          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div key={i} className="bg-white p-2 border rounded-lg">
                   <img src={img} className="w-full rounded mb-2" alt={`Page ${i+1}`} />
                   <a href={img} download={`page_${i+1}.jpg`} className="text-xs font-bold text-indigo-600">Download JPG</a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFToImage;
