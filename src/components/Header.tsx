import React from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';
<<<<<<< HEAD
=======
import { ThemeToggle } from './ThemeToggle';
>>>>>>> d0c48e3 (added checkout feature)

export const Header: React.FC = () => {
  const { 
    cart, 
    getCartItemsCount, 
    setCartOpen, 
    user, 
    isMobileMenuOpen, 
    setMobileMenuOpen 
  } = useStore();

  const cartItemsCount = getCartItemsCount();

  return (
<<<<<<< HEAD
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
=======
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
>>>>>>> d0c48e3 (added checkout feature)
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
<<<<<<< HEAD
              <h1 className="text-2xl font-bold text-gray-900">EliteStore</h1>
=======
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EliteStore</h1>
>>>>>>> d0c48e3 (added checkout feature)
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
<<<<<<< HEAD
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Products
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
=======
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Products
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Categories
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
>>>>>>> d0c48e3 (added checkout feature)
              Contact
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<<<<<<< HEAD
                <Search className="h-5 w-5 text-gray-400" />
=======
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
>>>>>>> d0c48e3 (added checkout feature)
              </div>
              <input
                type="text"
                placeholder="Search products..."
<<<<<<< HEAD
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
=======
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
>>>>>>> d0c48e3 (added checkout feature)
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
<<<<<<< HEAD
            {/* User Account */}
            <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
=======
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Account */}
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
>>>>>>> d0c48e3 (added checkout feature)
              <User className="h-6 w-6" />
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => setCartOpen(true)}
<<<<<<< HEAD
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
=======
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
>>>>>>> d0c48e3 (added checkout feature)
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
<<<<<<< HEAD
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
=======
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
>>>>>>> d0c48e3 (added checkout feature)
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
<<<<<<< HEAD
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                Home
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                Products
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                Categories
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                About
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
=======
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                Home
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                Products
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                Categories
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                About
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
>>>>>>> d0c48e3 (added checkout feature)
                Contact
              </a>
            </div>
            {/* Mobile Search */}
            <div className="px-2 pb-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<<<<<<< HEAD
                  <Search className="h-5 w-5 text-gray-400" />
=======
                  <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
>>>>>>> d0c48e3 (added checkout feature)
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
<<<<<<< HEAD
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
=======
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
>>>>>>> d0c48e3 (added checkout feature)
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};