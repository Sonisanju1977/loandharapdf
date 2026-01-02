
import React from 'react';
import UploadBox from '../components/UploadBox';

interface Props { name: string; }

const GenericToolPlaceholder: React.FC<Props> = ({ name }) => {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-10">{name}</h1>
      <UploadBox onFilesSelected={() => alert('This tool is currently in maintenance. Please try Merge or Compress.')} accept="*" />
      <div className="mt-12 p-8 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
        <h3 className="font-bold text-indigo-900 mb-2">Cloud-Powered Conversion</h3>
        <p className="text-indigo-700 text-sm">
          This feature normally uses our high-speed Cloud VPS clusters. 
          While we update the frontend implementation, please check out our local PDF merging and compression tools.
        </p>
      </div>
    </div>
  );
};

export default GenericToolPlaceholder;
