
import React, { useState } from 'react';
import UploadBox from '../components/UploadBox';

interface ImageToolsProps {
  tool: 'compress' | 'resize';
}

const ImageTools: React.FC<ImageToolsProps> = ({ tool }) => {
  const [image, setImage] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState(800);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (files: File[]) => {
    if (files.length > 0) {
      setImage(files[0]);
      setResult(null);
    }
  };

  const processImage = async () => {
    if (!image) return;
    setProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize logic
        let targetWidth = width;
        let targetHeight = (img.height / img.width) * targetWidth;
        
        if (tool === 'compress') {
          targetWidth = img.width;
          targetHeight = img.height;
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        const dataUrl = canvas.toDataURL('image/jpeg', quality / 100);
        setResult(dataUrl);
        setProcessing(false);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10 capitalize">Image {tool}</h1>
      
      {!image ? (
        <UploadBox onFilesSelected={handleSelect} accept="image/*" />
      ) : (
        <div className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200">
          <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-3">
               <img src={URL.createObjectURL(image)} className="w-12 h-12 rounded object-cover" alt="Preview" />
               <span className="font-bold text-slate-700">{image.name}</span>
             </div>
             <button onClick={() => setImage(null)} className="text-slate-400">Change</button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Quality ({quality}%)</label>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={quality} 
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            {tool === 'resize' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Width (pixels)</label>
                <input 
                  type="number" 
                  value={width} 
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            )}
          </div>

          <button 
            onClick={processImage}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 mt-4"
          >
            {processing ? 'Processing...' : `Process Image Now`}
          </button>

          {result && (
            <div className="mt-8 text-center p-6 bg-indigo-50 rounded-xl">
              <img src={result} className="max-h-48 mx-auto mb-4 rounded shadow-md" alt="Result" />
              <a 
                href={result} 
                download={`processed_${image.name}`}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold"
              >
                Download Result
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageTools;
