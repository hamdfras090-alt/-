import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => location.pathname === path ? "text-primary font-bold" : "text-gray-600 hover:text-primary";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="text-primary h-8 w-8" />
              <span>ملخصاتي</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={isActive('/')}>الرئيسية</Link>
            <Link to="/mohasaba-1" className={isActive('/mohasaba-1')}>المحاسبة 1</Link>
            <Link to="/about" className={isActive('/about')}>من نحن</Link>
            <Link to="/#contact" className="text-gray-600 hover:text-primary">تواصل</Link>
          </nav>

          {/* WhatsApp Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://wa.me/218XXXXXXXXX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <Phone size={16} />
              <span>واتساب</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">الرئيسية</Link>
            <Link to="/mohasaba-1" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">المحاسبة 1</Link>
            <Link to="/about" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">من نحن</Link>
            <a 
              href="https://wa.me/218XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer" 
              className="block mt-4 text-center w-full bg-green-500 text-white px-4 py-3 rounded-lg font-bold"
            >
             تواصل عبر واتساب
            </a>
          </div>
        </div>
      )}
    </header>
  );
};