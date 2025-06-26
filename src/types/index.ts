export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  stockCount?: number;
  sku?: string;
  brand?: string;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  dateJoined?: Date;
  region?: string;
  preferredCurrency?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  currency: string;
}

export interface Address {
  id?: string;
  type?: 'home' | 'work' | 'other';
  isDefault?: boolean;
  country: string;
  // Common fields
  street: string;
  city: string;
  // Region-specific fields
  state?: string;
  zipCode?: string;
  pinCode?: string;
  postcode?: string;
  area?: string;
  locality?: string;
  houseNumber?: string;
  suburb?: string;
  unit?: string;
  province?: string;
  region?: string;
  phone?: string;
}

export interface PaymentMethodData {
  id: string;
  type: 'card' | 'paypal' | 'apple-pay' | 'google-pay' | 'upi' | 'net-banking';
  last4?: string;
  brand?: string;
  expiry?: string;
  isDefault: boolean;
  country?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: Date;
  helpful: number;
  verified: boolean;
  images?: string[];
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
  country: string;
  flag: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  phoneCode: string;
  addressFormat: AddressFormat;
}

export interface AddressFormat {
  fields: string[];
  required: string[];
  postalCodePattern?: string;
  phonePattern?: string;
  labels: Record<string, string>;
}

export interface WishlistItem {
  id: string;
  product: Product;
  dateAdded: Date;
}