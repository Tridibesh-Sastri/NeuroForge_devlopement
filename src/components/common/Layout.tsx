import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { PageType, AgentType } from '../../App';

interface LayoutProps {
  children: React.ReactNode;
  navigate: (page: PageType, agent?: AgentType) => void;
  currentPage: PageType;
}

export const Layout: React.FC<LayoutProps> = ({ children, navigate, currentPage }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar navigate={navigate} currentPage={currentPage} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};