import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4" aria-label="Main navigation">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Influencer Search
          </Link>
          {title && (
            <h1 className="text-2xl font-medium" id="page-title">{title}</h1>
          )}
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4" role="main" aria-labelledby={title ? "page-title" : undefined}>
        {children}
      </main>
      <footer className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Wobb Assignment
      </footer>
    </div>
  );
}
