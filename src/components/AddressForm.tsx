import React, { useState, useEffect } from 'react';
import { MapPin, Check, X, Phone } from 'lucide-react';
import { Address } from '../types';
import { countries, getStatesForCountry, validatePostalCode, validatePhoneNumber, formatPhoneNumber } from '../data/regions';
import { useStore } from '../store/useStore';

interface AddressFormProps {
  address?: Address;
  onSave: (address: Address) => void;
  onCancel: () => void;
  isDefault?: boolean;
  onSetDefault?: (isDefault: boolean) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onSave,
  onCancel,
  isDefault = false,
  onSetDefault
}) => {
  const { selectedCountry } = useStore();
  const [formData, setFormData] = useState<Address>({
    country: address?.country || selectedCountry.code,
    street: address?.street || '',
    city: address?.city || '',
    state: address?.state || '',
    zipCode: address?.zipCode || '',
    pinCode: address?.pinCode || '',
    postcode: address?.postcode || '',
    area: address?.area || '',
    locality: address?.locality || '',
    houseNumber: address?.houseNumber || '',
    suburb: address?.suburb || '',
    unit: address?.unit || '',
    province: address?.province || '',
    region: address?.region || '',
    type: address?.type || 'home',
    phone: address?.phone || ''
  });

  const [phone, setPhone] = useState(address?.phone || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  const selectedCountryData = countries.find(c => c.code === formData.country) || selectedCountry;
  const addressFormat = selectedCountryData.addressFormat;
  const states = getStatesForCountry(formData.country);

  useEffect(() => {
    // Reset form when country changes
    if (formData.country !== selectedCountry.code) {
      setFormData(prev => ({
        ...prev,
        state: '',
        zipCode: '',
        pinCode: '',
        postcode: '',
        province: '',
        region: ''
      }));
    }
  }, [formData.country, selectedCountry.code]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields based on country format
    addressFormat.required.forEach(field => {
      const value = formData[field as keyof Address] as string;
      if (!value?.trim()) {
        newErrors[field] = `${addressFormat.labels[field]} is required`;
      }
    });

    // Validate postal code format
    const postalField = addressFormat.fields.find(f => ['zipCode', 'pinCode', 'postcode'].includes(f));
    if (postalField) {
      const postalValue = formData[postalField as keyof Address] as string;
      if (postalValue && !validatePostalCode(postalValue, formData.country)) {
        newErrors[postalField] = `Please enter a valid ${addressFormat.labels[postalField]}`;
      }
    }

    // Validate phone number
    if (phone && !validatePhoneNumber(phone, formData.country)) {
      newErrors.phone = `Please enter a valid ${addressFormat.labels.phone}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsValidating(true);
    
    // Simulate address validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave({ ...formData, phone });
    setIsValidating(false);
  };

  const handleInputChange = (field: keyof Address, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const { [field]: removed, ...rest } = errors;
      setErrors(rest);
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (errors.phone) {
      const { phone, ...rest } = errors;
      setErrors(rest);
    }
  };

  const renderField = (fieldName: string) => {
    const label = addressFormat.labels[fieldName];
    const isRequired = addressFormat.required.includes(fieldName);
    const value = formData[fieldName as keyof Address] as string || '';

    if (fieldName === 'state' && states.length > 0) {
      return (
        <div key={fieldName}>
          <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label} {isRequired && '*'}
          </label>
          <select
            id={fieldName}
            value={value}
            onChange={(e) => handleInputChange(fieldName as keyof Address, e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
              errors[fieldName] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select {label}</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors[fieldName] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[fieldName]}</p>
          )}
        </div>
      );
    }

    return (
      <div key={fieldName}>
        <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label} {isRequired && '*'}
        </label>
        <input
          type="text"
          id={fieldName}
          value={value}
          onChange={(e) => handleInputChange(fieldName as keyof Address, e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
            errors[fieldName] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        {errors[fieldName] && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[fieldName]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <MapPin className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {address ? 'Edit Address' : 'Add New Address'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Country Selection */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Country *
          </label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Address Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="home">🏠 Home</option>
            <option value="work">🏢 Work</option>
            <option value="other">📍 Other</option>
          </select>
        </div>

        {/* Dynamic Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addressFormat.fields.map(fieldName => renderField(fieldName))}
        </div>

        {/* Phone Number */}
        {addressFormat.fields.includes('phone') && (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {addressFormat.labels.phone} {addressFormat.required.includes('phone') && '*'}
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder={`Enter ${addressFormat.labels.phone.toLowerCase()}`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
            )}
          </div>
        )}

        {/* Default Address Checkbox */}
        {onSetDefault && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDefault"
              checked={isDefault}
              onChange={(e) => onSetDefault(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
            />
            <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Set as default address
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isValidating}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Validating...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Save Address
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-center"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};