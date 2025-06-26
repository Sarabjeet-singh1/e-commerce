import { Country, Currency, AddressFormat } from '../types';

export const currencies: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1, country: 'IN', flag: '🇮🇳' },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012, country: 'US', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.011, country: 'EU', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0095, country: 'GB', flag: '🇬🇧' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.016, country: 'CA', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.018, country: 'AU', flag: '🇦🇺' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 1.8, country: 'JP', flag: '🇯🇵' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 0.016, country: 'SG', flag: '🇸🇬' }
];

const addressFormats: Record<string, AddressFormat> = {
  IN: {
    fields: ['street', 'area', 'city', 'state', 'pinCode'],
    required: ['street', 'city', 'state', 'pinCode'],
    postalCodePattern: '^[1-9][0-9]{5}$',
    phonePattern: '^\\+91[6-9][0-9]{9}$',
    labels: {
      street: 'Street/Building',
      area: 'Area/Locality',
      city: 'City',
      state: 'State',
      pinCode: 'PIN Code',
      phone: 'Mobile Number'
    }
  },
  US: {
    fields: ['street', 'city', 'state', 'zipCode'],
    required: ['street', 'city', 'state', 'zipCode'],
    postalCodePattern: '^[0-9]{5}(-[0-9]{4})?$',
    phonePattern: '^\\+1[2-9][0-9]{9}$',
    labels: {
      street: 'Street Address',
      city: 'City',
      state: 'State',
      zipCode: 'ZIP Code',
      phone: 'Phone Number'
    }
  },
  GB: {
    fields: ['houseNumber', 'street', 'city', 'postcode'],
    required: ['street', 'city', 'postcode'],
    postalCodePattern: '^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$',
    phonePattern: '^\\+44[1-9][0-9]{8,9}$',
    labels: {
      houseNumber: 'House Number',
      street: 'Street Name',
      city: 'City',
      postcode: 'Postcode',
      phone: 'Phone Number'
    }
  },
  AU: {
    fields: ['unit', 'street', 'suburb', 'state', 'postcode'],
    required: ['street', 'suburb', 'state', 'postcode'],
    postalCodePattern: '^[0-9]{4}$',
    phonePattern: '^\\+61[2-9][0-9]{8}$',
    labels: {
      unit: 'Unit/Street Number',
      street: 'Street Name',
      suburb: 'Suburb',
      state: 'State',
      postcode: 'Postcode',
      phone: 'Phone Number'
    }
  },
  CA: {
    fields: ['street', 'city', 'province', 'postcode'],
    required: ['street', 'city', 'province', 'postcode'],
    postalCodePattern: '^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$',
    phonePattern: '^\\+1[2-9][0-9]{9}$',
    labels: {
      street: 'Street Address',
      city: 'City',
      province: 'Province',
      postcode: 'Postal Code',
      phone: 'Phone Number'
    }
  },
  DE: {
    fields: ['street', 'postcode', 'city'],
    required: ['street', 'postcode', 'city'],
    postalCodePattern: '^[0-9]{5}$',
    phonePattern: '^\\+49[1-9][0-9]{10,11}$',
    labels: {
      street: 'Street Address',
      postcode: 'Postal Code',
      city: 'City',
      phone: 'Phone Number'
    }
  }
};

export const countries: Country[] = [
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    phoneCode: '+91',
    addressFormat: addressFormats.IN
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    phoneCode: '+1',
    addressFormat: addressFormats.US
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    phoneCode: '+44',
    addressFormat: addressFormats.GB
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    phoneCode: '+61',
    addressFormat: addressFormats.AU
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    phoneCode: '+1',
    addressFormat: addressFormats.CA
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    phoneCode: '+49',
    addressFormat: addressFormats.DE
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    phoneCode: '+33',
    addressFormat: addressFormats.DE // Similar to Germany
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY',
    phoneCode: '+81',
    addressFormat: addressFormats.DE // Simplified format
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    phoneCode: '+65',
    addressFormat: addressFormats.DE // Simplified format
  }
];

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const australianStates = [
  'NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'
];

export const canadianProvinces = [
  'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'
];

export const getStatesForCountry = (countryCode: string): string[] => {
  switch (countryCode) {
    case 'IN':
      return indianStates;
    case 'US':
      return usStates;
    case 'AU':
      return australianStates;
    case 'CA':
      return canadianProvinces;
    default:
      return [];
  }
};

export const formatPhoneNumber = (phone: string, countryCode: string): string => {
  const country = countries.find(c => c.code === countryCode);
  if (!country) return phone;

  const cleaned = phone.replace(/\D/g, '');
  
  switch (countryCode) {
    case 'IN':
      if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
      }
      break;
    case 'US':
    case 'CA':
      if (cleaned.length === 10) {
        return `${country.phoneCode} (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      }
      break;
    default:
      return `${country.phoneCode} ${cleaned}`;
  }
  
  return phone;
};

export const validatePostalCode = (code: string, countryCode: string): boolean => {
  const country = countries.find(c => c.code === countryCode);
  if (!country?.addressFormat.postalCodePattern) return true;
  
  const pattern = new RegExp(country.addressFormat.postalCodePattern);
  return pattern.test(code);
};

export const validatePhoneNumber = (phone: string, countryCode: string): boolean => {
  const country = countries.find(c => c.code === countryCode);
  if (!country?.addressFormat.phonePattern) return true;
  
  const pattern = new RegExp(country.addressFormat.phonePattern);
  return pattern.test(phone);
};