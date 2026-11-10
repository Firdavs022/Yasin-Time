export type Language = 'uz' | 'ru' | 'en' | 'tg';

export type Theme = 'dark' | 'light';

export type DealType = 'sale' | 'rent' | 'offplan' | 'investment';

export interface Property {
  id: string;
  title: string;
  titleRu: string;
  titleEn: string;
  titleTg: string;
  categoryId: string; // e.g. 'apartments', 'villas', 'townhouses', 'commercial' or custom
  categoryName: string;
  dealType: 'sale' | 'rent' | 'offplan';
  price: number; // in USD
  currency: string;
  pricePerMonth?: number;
  areaSqM: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  city: string;
  country: string;
  images: string[];
  featured?: boolean;
  signatureProject?: boolean;
  projectType?: 'offplan' | 'flipping' | 'rental' | 'villa';
  handoverDate?: string;
  paymentPlan?: string;
  roiExpected?: string;
  description: {
    uz: string;
    ru: string;
    en: string;
    tg: string;
  };
  features: string[];
  aziziPartner: boolean;
  status: 'available' | 'reserved' | 'sold';
  createdAt: string;
}

export interface Category {
  id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
    tg: string;
  };
  iconName: string;
}

export type LeadStatus = 'new' | 'contacted' | 'meeting' | 'negotiation' | 'won' | 'lost';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  propertyInterestId?: string;
  propertyTitle?: string;
  budget: string;
  dealType: DealType;
  preferredTime?: string;
  message: string;
  status: LeadStatus;
  managerAssigned?: string;
  notes?: string;
  createdAt: string;
  source: string;
}

export type ExpenseCategory = 'marketing' | 'office' | 'payroll' | 'legal' | 'transport' | 'other';

export interface Expense {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  notes?: string;
  paidBy?: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  target: string;
  timestamp: string;
}

export type UserRole = 'admin' | 'manager' | 'accountant';
