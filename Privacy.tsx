
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Privacy Policy</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        <p className="text-sm font-bold uppercase text-indigo-600 dark:text-indigo-400">Last Updated: October 2023</p>
        
        <p>
          At <strong>LoanDharaTools</strong>, we are committed to protecting your privacy. This policy outlines how we handle data and the measures we take to ensure your documents remain secure.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">1. Data Sovereignty</h2>
        <p>
          The core feature of <strong>LoanDharaTools</strong> is <strong>Local Browser Processing</strong>. We do not transmit your PDF, JPEG, PNG, or other uploaded files to any server. All conversions, compressions, and merges take place in your browser's memory using JavaScript and WebAssembly.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">2. No Personal Data Collection</h2>
        <p>
          We do not require users to create accounts, provide email addresses, or share any personal identity information to use our tools. Your session is anonymous.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">3. Cookies and Analytics</h2>
        <p>
          We may use minimal cookies or third-party analytics (like Google Analytics) solely to monitor website performance and traffic patterns to improve user experience. These do not access your document content.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">4. Advertising</h2>
        <p>
          This site may display advertisements via Google AdSense. These third-party vendors may use cookies to serve ads based on your prior visits to this or other websites. You may opt-out of personalized advertising by visiting Google Ad Settings.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">5. Compliance</h2>
        <p>
          Our platform is designed to be compliant with GDPR and CCPA standards because we do not store, process, or sell user document data.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
