export interface PropertyData {
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  yearBuilt?: number;
  specialFeatures: string[];
}

export interface GeneratedListings {
  mls: string;
  socialMedia: string;
  email: {
    subject: string;
    body: string;
  };
}

export const SPECIAL_FEATURES = [
  'Updated Kitchen',
  'Hardwood Floors',
  'Great Schools',
  'Move-in Ready',
  'Open Floor Plan',
  'Private Backyard',
  'New Appliances',
  'Master Suite',
  'Garage',
  'Pool/Spa',
  'Fireplace',
  'Walk-in Closets'
] as const;
