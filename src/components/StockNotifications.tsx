import React, { useState } from 'react';
import { Bell, X, Check } from 'lucide-react';

interface StockNotificationProps {
  productId: string;
  productName: string;
  isInStock: boolean;
}

export const StockNotification: React.FC<StockNotificationProps> = ({
  productId,
  productName,
  isInStock
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      setIsSubscribed(true);
      setTimeout(() => {
        setShowForm(false);
        setIsSubscribed(false);
        setEmail('');
      }, 2000);
    }
  };

  if (isInStock) return null;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <Bell className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
            Out of Stock
          </h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
            This item is currently unavailable. Get notified when it's back in stock.
          </p>
          
          {!showForm && !isSubscribed && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Notify Me
            </button>
          )}

          {showForm && !isSubscribed && (
            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-yellow-300 dark:border-yellow-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Subscribe
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 p-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {isSubscribed && (
            <div className="mt-3 flex items-center space-x-2 text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">
                You'll be notified when this item is back in stock!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};