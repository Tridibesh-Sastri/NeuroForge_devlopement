import React, { useState } from 'react';
import { Menu, X, LayoutGrid, Home, Brain, GraduationCap, FileText } from 'lucide-react';
import { PageType, AgentType } from '../../App';

interface NavbarProps {
  navigate: (page: PageType, agent?: AgentType) => void;
  currentPage: PageType;
}

const Navbar: React.FC<NavbarProps> = ({ navigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', page: 'landing' as PageType, icon: <Home className="w-5 h-5 mr-2" /> },
    { name: 'Dashboard', page: 'dashboard' as PageType, icon: <LayoutGrid className="w-5 h-5 mr-2" /> },
    { name: 'Mental Health', page: 'depression' as PageType, icon: <Brain className="w-5 h-5 mr-2" /> },
    { name: 'Career Guidance', page: 'career' as PageType, icon: <GraduationCap className="w-5 h-5 mr-2" /> },
    { name: 'Psychometric', page: 'psychometric' as PageType, icon: <FileText className="w-5 h-5 mr-2" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate('landing')}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                AH
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                AI Agent Hub
              </span>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.page)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                ${currentPage === item.page 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.page);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 
                ${currentPage === item.page 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;