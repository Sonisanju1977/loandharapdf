
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TOOLS, CATEGORIES } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const pdfTools = TOOLS.filter(t => t.category === 'pdf');
  const imageTools = TOOLS.filter(t => t.category === 'image' || t.category === 'convert');

  return (
    <div className="flex flex-col min-h-screen font-inter transition-colors duration-500">
      {/* Premium Navigation Header */}
      <header className="sticky top-0 z-[100] bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-16">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white text-xl font-black transform group-hover:rotate-12 transition-all shadow-xl shadow-indigo-500/20">LT</div>
              <span className="text-3xl font-[900] text-slate-900 dark:text-white tracking-tighter">LoanDhara<span className="text-indigo-600 dark:text-indigo-400">Tools</span></span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-10">
              <Link to="/" className={`text-sm font-black uppercase tracking-widest nav-link ${location.pathname === '/' ? 'text-indigo-600' : 'text-slate-500 dark:text-slate-400'}`}>Home</Link>
              
              <div onMouseEnter={() => setActiveMenu('pdf')} onMouseLeave={() => setActiveMenu(null)} className="relative group py-8">
                <button className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest nav-link ${location.pathname.includes('pdf') ? 'text-indigo-600' : 'text-slate-500 dark:text-slate-400'}`}>
                  PDF Tools
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className={`absolute top-full left-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-3xl p-6 transition-all duration-500 transform ${activeMenu === 'pdf' ? 'opacity-100 translate-y-0 visible scale-100' : 'opacity-0 translate-y-4 invisible scale-95'}`}>
                  <div className="grid gap-2">
                    {pdfTools.map(tool => (
                      <Link key={tool.id} to={tool.path} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group/item">
                        <span className="text-2xl group-hover/item:scale-125 transition-transform">{tool.icon}</span>
                        <div>
                          <div className="text-sm font-black text-slate-800 dark:text-slate-100">{tool.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{tool.category} Engine</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div onMouseEnter={() => setActiveMenu('image')} onMouseLeave={() => setActiveMenu(null)} className="relative group py-8">
                <button className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest nav-link ${location.pathname.includes('image') || location.pathname.includes('jpg') ? 'text-indigo-600' : 'text-slate-500 dark:text-slate-400'}`}>
                  Image Tools
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className={`absolute top-full left-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-3xl p-6 transition-all duration-500 transform ${activeMenu === 'image' ? 'opacity-100 translate-y-0 visible scale-100' : 'opacity-0 translate-y-4 invisible scale-95'}`}>
                  <div className="grid gap-2">
                    {imageTools.map(tool => (
                      <Link key={tool.id} to={tool.path} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group/item">
                        <span className="text-2xl group-hover/item:scale-125 transition-transform">{tool.icon}</span>
                        <div>
                          <div className="text-sm font-black text-slate-800 dark:text-slate-100">{tool.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{tool.category} Tool</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleDarkMode} 
              className="p-4 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <button className="bg-slate-900 dark:bg-indigo-600 text-white px-8 py-4 rounded-2xl text-sm font-[900] uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all active:scale-95 hidden sm:block">
              Get Pro
            </button>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-6 sm:px-8 py-16 gap-16">
        {/* Sidebar (Modern Glassmorphism) */}
        <aside className={`
          lg:block w-80 flex-shrink-0 transition-all duration-500
          ${isSidebarOpen ? 'fixed inset-0 z-[110] bg-white/95 dark:bg-slate-950/95 p-10 overflow-y-auto' : 'hidden'} 
          lg:relative lg:p-0 lg:bg-transparent
        `}>
          <div className="flex justify-between items-center mb-12 lg:hidden">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-black">LT</div>
               <span className="text-2xl font-black dark:text-white">LoanDhara</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-400">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="space-y-12">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="animate-scale-in">
                <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.25em] mb-6 pl-4 border-l-2 border-slate-200 dark:border-slate-800">{cat.name}</h3>
                <ul className="space-y-2">
                  {TOOLS.filter(t => t.category === cat.id).map(tool => (
                    <li key={tool.id}>
                      <Link 
                        to={tool.path} 
                        className={`group flex items-center gap-4 px-6 py-4 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all ${
                          location.pathname === tool.path 
                          ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 translate-x-2' 
                          : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-xl'
                        }`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <span className="text-xl group-hover:scale-125 transition-transform">{tool.icon}</span>
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="animate-slide-up transition-all">{children}</div>
          
          {/* Enhanced Ad Placement */}
          <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] mt-32 p-12 text-center relative overflow-hidden group shadow-sm hover:shadow-indigo-500/5 transition-all">
             <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
             <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-600 mb-4 block">Trusted Partner Advertisement</span>
             <div className="flex flex-col items-center">
                <div className="w-48 h-3 bg-slate-100 dark:bg-slate-800 rounded-full mb-2"></div>
                <div className="w-32 h-3 bg-slate-100 dark:bg-slate-800 rounded-full opacity-50"></div>
             </div>
          </div>
        </main>
      </div>

      {/* Premium Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-24 mt-32 transition-all">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white text-xl font-black">LT</div>
                <span className="text-3xl font-[900] text-slate-800 dark:text-white tracking-tighter">LoanDhara</span>
              </div>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                The most secure, browser-native toolkit for the modern professional. Privacy is not a choice, it's our standard.
              </p>
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-[0.2em] mb-10">Company</h4>
              <ul className="space-y-4 text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Support</Link></li>
                <li><Link to="/" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-[0.2em] mb-10">Legal & Trust</h4>
              <ul className="space-y-4 text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <li><Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Shield</Link></li>
                <li><Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                <li><Link to="/disclaimer" className="hover:text-indigo-600 transition-colors">Compliance Info</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-[0.2em] mb-10">Latest News</h4>
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-black text-indigo-500 mb-2 tracking-[0.2em] uppercase">October 2023 Update</div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Added support for multi-page TIFF conversions and WebP optimization.</p>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-[900] text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
            <div>&copy; {new Date().getFullYear()} LoanDharaTools. Developed for Global Security.</div>
            <div className="flex gap-10">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Cloudless Infrastructure</span>
              <span>v2.5.0 Stable</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
