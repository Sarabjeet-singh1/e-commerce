import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Features } from './components/Features';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { UserAccount } from './components/UserAccount';
import { ProductQuickView } from './components/ProductQuickView';
import { useStore } from './store/useStore';

function App() {
  const { 
    isCheckoutOpen, 
    setCheckoutOpen,
    isWishlistOpen,
    setWishlistOpen,
    isAccountOpen,
    setAccountOpen,
    quickViewProduct,
    setQuickViewProduct
  } = useStore();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <Hero />
      <ProductGrid />
      <Features />
      <Newsletter />
      <Footer />
      <Cart />
      
      {/* Modals */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setCheckoutOpen(false)} 
      />
      
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
      
      <UserAccount
        isOpen={isAccountOpen}
        onClose={() => setAccountOpen(false)}
      />
      
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default App;