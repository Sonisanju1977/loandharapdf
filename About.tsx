
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">About LoanDharaTools</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        <p>
          Welcome to <strong>LoanDharaTools</strong>, your comprehensive destination for high-performance, privacy-first PDF and Image management tools. We believe that professional document editing should be accessible, lightning-fast, and, most importantly, secure.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">Our Mission</h2>
        <p>
          In an era where data privacy is paramount, <strong>LoanDharaTools</strong> was built with a simple philosophy: <strong>Your files should never leave your device.</strong> Unlike traditional online converters that upload your sensitive data to remote servers, our proprietary engine processes everything locally within your browser.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Zero Server Uploads:</strong> Military-grade security by keeping your data on your local machine.</li>
          <li><strong>Pro-Level Speed:</strong> Instant processing utilizing your device's local CPU power.</li>
          <li><strong>No Registration Required:</strong> Use our full suite of tools without any signup or hidden costs.</li>
          <li><strong>Cloudless Conversions:</strong> Even if you lose internet connection mid-process, our tools keep working.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10">The LoanDharaTools Edge</h2>
        <p>
          Whether you are a student merging assignments, a business professional compressing reports, or a designer resizing assets, <strong>LoanDharaTools</strong> provides the professional-grade functionality you expect from paid software, completely free in your web browser.
        </p>
      </div>
    </div>
  );
};

export default About;
