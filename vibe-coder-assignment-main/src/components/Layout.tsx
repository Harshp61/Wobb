import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950 text-gray-900 dark:text-gray-100">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50" aria-label="Main navigation">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              InfluencerHub
            </span>
          </Link>
          {title && (
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100" id="page-title">{title}</h1>
          )}
        </div>
      </header>
      <main className="flex-1 container mx-auto px-6 py-8 max-w-7xl" role="main" aria-labelledby={title ? "page-title" : undefined}>
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>© {new Date().getFullYear()} Wobb Assignment • Built with ❤️</p>
      </footer>
    </div>
  );
}
