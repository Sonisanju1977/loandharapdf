
import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-32 animate-fade-in relative">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-40 -right-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none animate-float"></div>

      {/* Hero Section */}
      <section className="text-center pt-24 pb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl mb-10 animate-scale-in">
          <span className="flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-600 dark:text-slate-300">New: 100% Local Engine v2.5</span>
        </div>
        
        <h1 className="text-7xl md:text-8xl font-[900] text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.85] animate-slide-up">
          Fast. Private. <br/>
          <span className="gradient-text">LoanDharaTools</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Process your sensitive documents locally. No uploads, no waiting, just instant professional-grade results.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link to="/compress-pdf" className="bg-indigo-600 text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95">
            Start Processing
          </Link>
          <a href="#tools" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-12 py-6 rounded-2xl font-black text-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all shadow-xl hover:shadow-indigo-500/10">
            Browse Tools
          </a>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <div className="flex flex-wrap justify-center gap-12 py-10 border-y border-slate-200/50 dark:border-slate-800/50">
        {[
          { label: 'Privacy', val: '100% Local' },
          { label: 'Latency', val: '0.0ms' },
          { label: 'Pricing', val: 'Zero Cost' },
          { label: 'Security', val: 'End-to-End' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{stat.val}</div>
          </div>
        ))}
      </div>

      {/* Tools Section */}
      <section id="tools" className="relative z-10">
        <div className="flex items-center justify-between mb-16 px-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Powerful Tools</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Everything you need for documents, right in your browser.</p>
          </div>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 mx-12 hidden md:block"></div>
          <div className="text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-widest">Select Category ↓</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS.map((tool, index) => (
            <Link 
              key={tool.id} 
              to={tool.path}
              style={{ animationDelay: `${index * 50}ms` }}
              className="group tool-card glass-card p-12 rounded-[3rem] relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl flex items-center justify-center text-5xl mb-10 group-hover:rotate-[10deg] transition-all duration-500 border border-slate-100 dark:border-slate-700">
                  <span className="group-hover:scale-110 transition-transform">{tool.icon}</span>
                </div>
                <h3 className="text-3xl font-[900] text-slate-900 dark:text-white mb-5 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                  {tool.description}
                </p>
              </div>
              
              <div className="mt-16 flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Browser Native</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="bg-[#020617] rounded-[4rem] p-16 md:p-24 text-white overflow-hidden relative shadow-3xl border border-white/5">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#4f46e520_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="text-indigo-400 font-black text-sm uppercase tracking-widest mb-6">Security First</div>
            <h2 className="text-5xl md:text-6xl font-black mb-10 leading-[0.9] tracking-tighter">Your data stays <br/> on <span className="text-indigo-400">your machine.</span></h2>
            <p className="text-slate-400 text-xl mb-12 leading-relaxed font-medium">
              We've replaced server-side uploads with high-performance local algorithms. Your documents are never seen by us or anyone else. 
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-4xl font-black mb-2">0</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Servers Involved</div>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-4xl font-black mb-2">∞</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Privacy Level</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {[
              { t: 'Local Processing', d: 'Uses your device\'s CPU power for zero-latency results.', i: '⚡' },
              { t: 'GDPR Compliant', d: 'Since data never moves, compliance is built-in by default.', i: '🛡️' },
              { t: 'No Account Required', d: 'Access all premium tools without ever signing up.', i: '👤' }
            ].map((f, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="text-4xl group-hover:scale-110 transition-transform">{f.i}</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{f.t}</h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="pb-24 text-center">
        <p className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-12">Trusted Security Technologies</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale dark:invert">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" className="h-8" alt="JS" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1f/WebAssembly_Logo.svg" className="h-8" alt="WASM" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Logo_of_the_General_Data_Protection_Regulation.svg" className="h-10" alt="GDPR" />
        </div>
      </div>
    </div>
  );
};

export default Home;
