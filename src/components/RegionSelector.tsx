import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { countries, currencies } from '../data/regions';
import { useStore } from '../store/useStore';

export const RegionSelector: React.FC = () => {
  const { selectedCountry, setCountry, selectedCurrency, setCurrency } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    const currency = currencies.find(c => c.code === country?.currency);
    
    if (country) {
      setCountry(country);
    }
    if (currency) {
      setCurrency(currency);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
      >
        <Globe className="h-4 w-4" />
        <span className="text-lg">{selectedCountry.flag}</span>
        <span>{selectedCountry.code}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {selectedCurrency.symbol}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
            <div className="py-1">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                Select Region
              </div>
              {countries.map((country) => {
                const currency = currencies.find(c => c.code === country.currency);
                return (
                  <button
                    key={country.code}
                    onClick={() => handleCountryChange(country.code)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      selectedCountry.code === country.code
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{country.flag}</span>
                        <div>
                          <div className="font-medium">{country.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {country.phoneCode}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{currency?.symbol}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {currency?.code}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};