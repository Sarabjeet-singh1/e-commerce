import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Features } from './components/Features';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
<<<<<<< HEAD

function App() {
  return (
    <div className="min-h-screen bg-white">
=======
import { CheckoutModal } from './components/CheckoutModal';
import { useStore } from './store/useStore';

function App() {
  const { isCheckoutOpen, setCheckoutOpen } = useStore();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
>>>>>>> d0c48e3 (added checkout feature)
      <Header />
      <Hero />
      <ProductGrid />
      <Features />
      <Newsletter />
      <Footer />
      <Cart />
<<<<<<< HEAD
=======
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setCheckoutOpen(false)} 
      />
>>>>>>> d0c48e3 (added checkout feature)
    </div>
  );
}

export default App;