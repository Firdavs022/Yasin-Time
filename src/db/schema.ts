import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

// Users table with Firebase UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  role: text('role').notNull().default('admin'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Real-time Leads Pipeline
export const leads = pgTable('leads', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  propertyInterestId: text('property_interest_id'),
  propertyTitle: text('property_title'),
  budget: text('budget').notNull(),
  dealType: text('deal_type').notNull(),
  preferredTime: text('preferred_time'),
  message: text('message'),
  status: text('status').notNull().default('new'),
  managerAssigned: text('manager_assigned'),
  notes: text('notes'),
  source: text('source').default("Veb-sayt arizasi"),
  createdAt: text('created_at').notNull(),
});

// Property CMS Catalog
export const properties = pgTable('properties', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  location: text('location').notNull(),
  dealType: text('deal_type').notNull(),
  category: text('category').notNull(),
  bedrooms: integer('bedrooms').notNull().default(1),
  bathrooms: integer('bathrooms').notNull().default(1),
  area: integer('area').notNull().default(50),
  roi: text('roi'),
  handoverDate: text('handover_date'),
  paymentPlan: text('payment_plan'),
  images: text('images').notNull(), // JSON array string
  featured: boolean('featured').notNull().default(false),
  isAzizi: boolean('is_azizi').notNull().default(false),
  status: text('status').notNull().default('available'),
  createdAt: text('created_at').notNull(),
});

// Dynamic Property Categories
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  nameUz: text('name_uz').notNull(),
  nameRu: text('name_ru').notNull(),
  nameEn: text('name_en').notNull(),
  nameTg: text('name_tg').notNull(),
  iconName: text('icon_name').default('Building'),
});

// Financial Analytics: Expenses
export const expenses = pgTable('expenses', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  amount: integer('amount').notNull(),
  date: text('date').notNull(),
  paidBy: text('paid_by'),
  notes: text('notes'),
});

// Audit Activity Logs
export const auditLogs = pgTable('audit_logs', {
  id: text('id').primaryKey(),
  user: text('user').notNull(),
  role: text('role').notNull(),
  action: text('action').notNull(),
  target: text('target').notNull(),
  timestamp: text('timestamp').notNull(),
});
