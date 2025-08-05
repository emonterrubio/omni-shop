import React from 'react';
import { Header } from './Header';
import { MainNavigation } from './MainNavigation';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  className?: string;
}

export function PageLayout({ children, showFooter = true, className = "" }: PageLayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen bg-gray-50 ${className}`}>
      <Header />
      <MainNavigation />
      <main className="max-w-7xl flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
} 