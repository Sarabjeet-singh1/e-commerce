import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Package, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AddressForm } from './AddressForm';
import { PaymentMethodForm, PaymentMethod } from './PaymentMethodForm';
import { LoadingSpinner } from './LoadingSpinner';
import { Address } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, getCartTotal, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const steps = [
    { id: 'shipping', title: 'Shipping', icon: Truck },
    { id: 'payment', title: 'Payment', icon: CreditCard },
    { id: 'review', title: 'Review', icon: Package },
    { id: 'confirmation', title: 'Confirmation', icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!isOpen) return null;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as CheckoutStep);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as CheckoutStep);
    }
  };

  const handleAddressSave = (address: Address) => {
    setShippingAddress(address);
    handleNext();
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate order number
    const orderNum = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderNumber(orderNum);
    
    setIsProcessing(false);
    handleNext();
  };

  const handleOrderComplete = () => {
    clearCart();
    onClose();
    setCurrentStep('shipping');
    setShippingAddress(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    index <= currentStepIndex 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 font-medium ${
                    index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <ChevronRight className="h-5 w-5 text-gray-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex">
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[60vh]">
              {currentStep === 'shipping' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
                  <AddressForm
                    address={shippingAddress || undefined}
                    onSave={handleAddressSave}
                    onCancel={() => {}}
                  />
                </div>
              )}

              {currentStep === 'payment' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
                  <PaymentMethodForm
                    selectedMethod={paymentMethod}
                    onPaymentMethodSelect={setPaymentMethod}
                    onPaymentSubmit={handlePaymentSubmit}
                    isProcessing={isProcessing}
                  />
                </div>
              )}

              {currentStep === 'review' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Order Review</h3>
                  
                  {/* Shipping Address */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    {shippingAddress && (
                      <div className="text-gray-700">
                        <p>{shippingAddress.street}</p>
                        <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                        <p>{shippingAddress.country}</p>
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Payment Method</h4>
                    <p className="text-gray-700 capitalize">{paymentMethod.replace('-', ' ')}</p>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex items-center space-x-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.product.name}</p>
                            <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsProcessing(true);
                      handlePaymentSubmit({ method: paymentMethod });
                    }}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <LoadingSpinner size="sm" color="white" className="mr-2" />
                        Processing Order...
                      </>
                    ) : (
                      `Place Order - $${total.toFixed(2)}`
                    )}
                  </button>
                </div>
              )}

              {currentStep === 'confirmation' && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your purchase. Your order has been successfully placed.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="font-semibold">Order Number: {orderNumber}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      You'll receive a confirmation email shortly with tracking information.
                    </p>
                  </div>
                  <button
                    onClick={handleOrderComplete}
                    className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-80 bg-gray-50 p-6 border-l">
              <h4 className="font-semibold text-lg mb-4">Order Summary</h4>
              
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
                  🎉 You qualify for free shipping!
                </div>
              )}
            </div>
          </div>

          {/* Footer Navigation */}
          {currentStep !== 'confirmation' && (
            <div className="flex justify-between items-center p-6 border-t bg-gray-50">
              <button
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </button>

              {currentStep !== 'review' && (
                <button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 'shipping' && !shippingAddress) ||
                    isProcessing
                  }
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};