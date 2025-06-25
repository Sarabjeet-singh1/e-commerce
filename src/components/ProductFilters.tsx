import React, { useState } from 'react';
import { Filter, X, ChevronDown, Star } from 'lucide-react';

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  onSale: boolean;
}

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    availability: true
  });

  const categories = [
    'Electronics',
    'Fashion',
    'Food',
    'Beauty',
    'Home',
    'Sports',
    'Books',
    'Toys'
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, rating });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Filter Panel */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl lg:relative lg:w-full lg:shadow-none border-l border-gray-200 dark:border-gray-700 lg:border-l-0 lg:border lg:rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded lg:hidden"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-6 overflow-y-auto h-full pb-20">
          {/* Categories */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white">Category</h4>
              <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${
                expandedSections.category ? 'rotate-180' : ''
              }`} />
            </button>
            
            {expandedSections.category && (
              <div className="mt-3 space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white">Price Range</h4>
              <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${
                expandedSections.price ? 'rotate-180' : ''
              }`} />
            </button>
            
            {expandedSections.price && (
              <div className="mt-3 space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <span className="text-gray-500 dark:text-gray-400">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  {[
                    [0, 25],
                    [25, 50],
                    [50, 100],
                    [100, 250],
                    [250, 500],
                    [500, 1000]
                  ].map(([min, max]) => (
                    <label key={`${min}-${max}`} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange[0] === min && filters.priceRange[1] === max}
                        onChange={() => handlePriceChange(min, max)}
                        className="text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        ${min} - ${max}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white">Rating</h4>
              <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${
                expandedSections.rating ? 'rotate-180' : ''
              }`} />
            </button>
            
            {expandedSections.rating && (
              <div className="mt-3 space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                    />
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">
                        & up
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div>
            <button
              onClick={() => toggleSection('availability')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white">Availability</h4>
              <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${
                expandedSections.availability ? 'rotate-180' : ''
              }`} />
            </button>
            
            {expandedSections.availability && (
              <div className="mt-3 space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => onFiltersChange({ ...filters, inStock: e.target.checked })}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">In Stock</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => onFiltersChange({ ...filters, onSale: e.target.checked })}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">On Sale</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};