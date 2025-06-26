import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, Order, Address, PaymentMethodData, Currency, Country } from '../types';
import { currencies, countries } from '../data/regions';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;

  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;

  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // Addresses
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (index: number, address: Address) => void;
  removeAddress: (index: number) => void;

  // Payment Methods
  paymentMethods: PaymentMethodData[];
  addPaymentMethod: (method: PaymentMethodData) => void;
  removePaymentMethod: (id: string) => void;

  // Region & Currency
  selectedCountry: Country;
  setCountry: (country: Country) => void;
  selectedCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number) => number;

  // UI
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setAccountOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Product Filters
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;

  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

// Default to India
const defaultCountry = countries.find(c => c.code === 'IN') || countries[0];
const defaultCurrency = currencies.find(c => c.code === 'INR') || currencies[0];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart, convertPrice } = get();
        return cart.reduce((total, item) => total + (convertPrice(item.product.price) * item.quantity), 0);
      },
      getCartItemsCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      addToWishlist: (product) => {
        const { wishlist } = get();
        if (!wishlist.find(item => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
        } else {
          // Remove if already in wishlist
          set({ wishlist: wishlist.filter(item => item.id !== product.id) });
        }
      },
      removeFromWishlist: (productId) => {
        set({ wishlist: get().wishlist.filter(item => item.id !== productId) });
      },
      clearWishlist: () => set({ wishlist: [] }),
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId);
      },

      // User
      user: {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        phone: '+91 98765 43210',
        dateJoined: new Date('2023-01-15'),
        region: 'IN',
        preferredCurrency: 'INR'
      },
      setUser: (user) => set({ user }),

      // Orders
      orders: [
        {
          id: 'ORD-001',
          items: [],
          total: 24999.99,
          status: 'delivered',
          createdAt: new Date('2024-01-15'),
          shippingAddress: {
            street: '123, MG Road',
            area: 'Connaught Place',
            city: 'New Delhi',
            state: 'Delhi',
            pinCode: '110001',
            country: 'IN'
          },
          paymentMethod: 'UPI',
          trackingNumber: 'TRK123456789',
          currency: 'INR'
        },
        {
          id: 'ORD-002',
          items: [],
          total: 12499.99,
          status: 'shipped',
          createdAt: new Date('2024-01-20'),
          shippingAddress: {
            street: '456, Brigade Road',
            area: 'Commercial Street',
            city: 'Bangalore',
            state: 'Karnataka',
            pinCode: '560001',
            country: 'IN'
          },
          paymentMethod: 'Credit Card',
          trackingNumber: 'TRK987654321',
          currency: 'INR'
        }
      ],
      addOrder: (order) => {
        set({ orders: [order, ...get().orders] });
      },

      // Addresses
      addresses: [
        {
          id: '1',
          street: '123, MG Road',
          area: 'Connaught Place',
          city: 'New Delhi',
          state: 'Delhi',
          pinCode: '110001',
          country: 'IN',
          type: 'home',
          isDefault: true
        },
        {
          id: '2',
          street: '456, Brigade Road',
          area: 'Commercial Street',
          city: 'Bangalore',
          state: 'Karnataka',
          pinCode: '560001',
          country: 'IN',
          type: 'work',
          isDefault: false
        }
      ],
      addAddress: (address) => {
        set({ addresses: [...get().addresses, address] });
      },
      updateAddress: (index, address) => {
        const addresses = [...get().addresses];
        addresses[index] = address;
        set({ addresses });
      },
      removeAddress: (index) => {
        const addresses = [...get().addresses];
        addresses.splice(index, 1);
        set({ addresses });
      },

      // Payment Methods
      paymentMethods: [
        {
          id: '1',
          type: 'upi',
          last4: '9876',
          brand: 'UPI',
          expiry: '',
          isDefault: true,
          country: 'IN'
        },
        {
          id: '2',
          type: 'card',
          last4: '4242',
          brand: 'Visa',
          expiry: '12/25',
          isDefault: false,
          country: 'IN'
        }
      ],
      addPaymentMethod: (method) => {
        set({ paymentMethods: [...get().paymentMethods, method] });
      },
      removePaymentMethod: (id) => {
        set({ paymentMethods: get().paymentMethods.filter(method => method.id !== id) });
      },

      // Region & Currency
      selectedCountry: defaultCountry,
      setCountry: (country) => set({ selectedCountry: country }),
      selectedCurrency: defaultCurrency,
      setCurrency: (currency) => set({ selectedCurrency: currency }),
      convertPrice: (price) => {
        const { selectedCurrency } = get();
        return price * selectedCurrency.rate;
      },

      // UI
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      isCheckoutOpen: false,
      setCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
      isWishlistOpen: false,
      setWishlistOpen: (open) => set({ isWishlistOpen: open }),
      isAccountOpen: false,
      setAccountOpen: (open) => set({ isAccountOpen: open }),
      quickViewProduct: null,
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),

      // Product Filters
      viewMode: 'grid',
      setViewMode: (mode) => set({ viewMode: mode }),

      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ecommerce-store',
      partialize: (state) => ({ 
        cart: state.cart, 
        wishlist: state.wishlist,
        user: state.user, 
        theme: state.theme,
        selectedCountry: state.selectedCountry,
        selectedCurrency: state.selectedCurrency,
        viewMode: state.viewMode,
        addresses: state.addresses,
        paymentMethods: state.paymentMethods,
        orders: state.orders
      }),
    }
  )
);