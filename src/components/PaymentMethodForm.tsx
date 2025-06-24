import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Lock, Eye, EyeOff } from 'lucide-react';

export type PaymentMethod = 'card' | 'paypal' | 'apple-pay' | 'google-pay' | 'bank-transfer';

interface PaymentMethodFormProps {
  onPaymentMethodSelect: (method: PaymentMethod) => void;
  onPaymentSubmit: (paymentData: any) => void;
  selectedMethod?: PaymentMethod;
  isProcessing?: boolean;
}

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  onPaymentMethodSelect,
  onPaymentSubmit,
  selectedMethod = 'card',
  isProcessing = false
}) => {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    saveCard: false
  });

  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paymentMethods = [
    { id: 'card' as PaymentMethod, name: 'Credit/Debit Card', icon: CreditCard, popular: true },
    { id: 'paypal' as PaymentMethod, name: 'PayPal', icon: Smartphone },
    { id: 'apple-pay' as PaymentMethod, name: 'Apple Pay', icon: Smartphone },
    { id: 'google-pay' as PaymentMethod, name: 'Google Pay', icon: Smartphone },
    { id: 'bank-transfer' as PaymentMethod, name: 'Bank Transfer', icon: Building }
  ];

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateCard = () => {
    const newErrors: Record<string, string> = {};

    if (!cardData.number.replace(/\s/g, '')) {
      newErrors.number = 'Card number is required';
    } else if (cardData.number.replace(/\s/g, '').length < 13) {
      newErrors.number = 'Please enter a valid card number';
    }

    if (!cardData.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!cardData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!cardData.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCard()) {
      onPaymentSubmit({
        method: 'card',
        cardData: {
          ...cardData,
          number: cardData.number.replace(/\s/g, '')
        }
      });
    }
  };

  const handleDigitalWalletSubmit = (method: PaymentMethod) => {
    onPaymentSubmit({ method });
  };

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'American Express';
    if (/^6/.test(num)) return 'Discover';
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => onPaymentMethodSelect(method.id)}
              className={`relative p-4 border-2 rounded-lg transition-all duration-200 ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <method.icon className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">{method.name}</span>
              </div>
              {method.popular && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Forms */}
      {selectedMethod === 'card' && (
        <form onSubmit={handleCardSubmit} className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Lock className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-600">Your payment information is secure and encrypted</span>
            </div>

            {/* Card Number */}
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  value={cardData.number}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    setCardData(prev => ({ ...prev, number: formatted }));
                    if (errors.number) setErrors(prev => ({ ...prev, number: '' }));
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.number ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {getCardType(cardData.number) && (
                  <span className="absolute right-3 top-2 text-sm font-medium text-gray-600">
                    {getCardType(cardData.number)}
                  </span>
                )}
              </div>
              {errors.number && <p className="mt-1 text-sm text-red-600">{errors.number}</p>}
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  value={cardData.expiry}
                  onChange={(e) => {
                    const formatted = formatExpiry(e.target.value);
                    setCardData(prev => ({ ...prev, expiry: formatted }));
                    if (errors.expiry) setErrors(prev => ({ ...prev, expiry: '' }));
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.expiry ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="MM/YY"
                  maxLength={5}
                />
                {errors.expiry && <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>}
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <div className="relative">
                  <input
                    type={showCvv ? 'text' : 'password'}
                    id="cvv"
                    value={cardData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                      setCardData(prev => ({ ...prev, cvv: value }));
                      if (errors.cvv) setErrors(prev => ({ ...prev, cvv: '' }));
                    }}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCvv(!showCvv)}
                    className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                  >
                    {showCvv ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="mb-4">
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                value={cardData.name}
                onChange={(e) => {
                  setCardData(prev => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Save Card */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveCard"
                checked={cardData.saveCard}
                onChange={(e) => setCardData(prev => ({ ...prev, saveCard: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                Save this card for future purchases
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Complete Payment
              </>
            )}
          </button>
        </form>
      )}

      {/* Digital Wallet Options */}
      {(selectedMethod === 'paypal' || selectedMethod === 'apple-pay' || selectedMethod === 'google-pay') && (
        <div className="text-center py-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedMethod === 'paypal' && 'PayPal'}
              {selectedMethod === 'apple-pay' && 'Apple Pay'}
              {selectedMethod === 'google-pay' && 'Google Pay'}
            </h4>
            <p className="text-gray-600 mb-6">
              You'll be redirected to complete your payment securely.
            </p>
          </div>
          
          <button
            onClick={() => handleDigitalWalletSubmit(selectedMethod)}
            disabled={isProcessing}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Redirecting...' : `Continue with ${paymentMethods.find(m => m.id === selectedMethod)?.name}`}
          </button>
        </div>
      )}

      {/* Bank Transfer */}
      {selectedMethod === 'bank-transfer' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <Building className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Bank Transfer Instructions</h4>
              <div className="text-sm text-yellow-700 space-y-2">
                <p><strong>Account Name:</strong> EliteStore Inc.</p>
                <p><strong>Account Number:</strong> 1234567890</p>
                <p><strong>Routing Number:</strong> 021000021</p>
                <p><strong>Reference:</strong> Your order number will be provided</p>
              </div>
              <p className="text-sm text-yellow-600 mt-3">
                Please allow 2-3 business days for processing. Your order will be shipped once payment is confirmed.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => handleDigitalWalletSubmit('bank-transfer')}
            disabled={isProcessing}
            className="mt-4 bg-yellow-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Confirm Bank Transfer
          </button>
        </div>
      )}
    </div>
  );
};