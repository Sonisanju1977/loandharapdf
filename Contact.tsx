
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Contact Us</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Have a question or feedback for LoanDharaTools? We'd love to hear from you.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Message Subject</label>
            <input 
              type="text" 
              placeholder="How can we help?"
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Your Message</label>
            <textarea 
              rows={5}
              placeholder="Tell us about your experience..."
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-indigo-900/20 active:scale-[0.98]"
          >
            Send Message to LoanDharaTools
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-900/20 text-center">
          <div className="text-2xl mb-2">📧</div>
          <h4 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1">Email Support</h4>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">support@loandharatools.com</p>
        </div>
        <div className="p-8 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-900/20 text-center">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="font-bold text-emerald-900 dark:text-emerald-400 mb-1">Response Time</h4>
          <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Usually within 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
