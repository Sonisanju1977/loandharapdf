
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Disclaimer</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        <p>
          The information and tools provided by <strong>LoanDharaTools</strong> are for general informational and utility purposes only.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">1. No Guarantee of Exact File Size</h2>
        <p>
          Our PDF and Image compression tools provide <strong>approximate</strong> results based on quality sliders and target KB inputs. <strong>LoanDharaTools</strong> does not guarantee that the final file size will exactly match the requested target, as compression effectiveness depends entirely on the source file content, metadata, and internal structure.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">2. Accuracy and Integrity</h2>
        <p>
          While we strive to maintain the highest quality of conversion and compression, <strong>LoanDharaTools</strong> is not responsible for any data loss, formatting issues, or visual artifacts that may occur during document processing. Users are encouraged to verify their downloaded files before deleting originals.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">3. Third-Party Links</h2>
        <p>
          <strong>LoanDharaTools</strong> may contain links to external sites that are not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective privacy policies.
        </p>
        
        <p className="mt-10 font-bold border-t border-slate-200 pt-6">
          Use of <strong>LoanDharaTools</strong> constitutes acceptance of these terms and acknowledges that the service is used at the user's own risk.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
