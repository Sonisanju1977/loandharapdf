
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Terms & Conditions</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        <p>
          By accessing the website at <strong>LoanDharaTools</strong>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">1. Use License</h2>
        <p>
          Permission is granted to use the tools on <strong>LoanDharaTools</strong> website for personal or commercial use. This is the grant of a license, not a transfer of title, and under this license, you may not:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
          <li>Remove any copyright or other proprietary notations from the materials;</li>
          <li>Use the tools for any illegal purpose or to process malicious files.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">2. Disclaimer of Liability</h2>
        <p>
          The tools on <strong>LoanDharaTools</strong> are provided on an 'as is' basis. <strong>LoanDharaTools</strong> makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">3. Limitations</h2>
        <p>
          In no event shall <strong>LoanDharaTools</strong> or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the tools on the website.
        </p>
      </div>
    </div>
  );
};

export default Terms;
