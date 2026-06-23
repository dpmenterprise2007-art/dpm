import { mysqlTable, int, varchar, text, timestamp, decimal, json, date, boolean } from 'drizzle-orm/mysql-core';

/**
 * DPM ENTERPRISE PRIVATE LIMITED - Complete Database Schema
 * 
 * TABLES:
 * 1. users - User management (Director, Staff, Vendors)
 * 2. leads - Lead tracking with AI scoring
 * 3. projects - Project management
 * 4. quotations - Quote generation and tracking
 * 5. invoices - Billing and invoicing
 * 6. payments - Payment tracking
 * 7. vendors - Supplier/vendor management
 * 8. buyers - Client/buyer management
 * 9. social_posts - Social media automation
 * 10. alerts - Notification system
 */

// ============================================
// USER MANAGEMENT
// ============================================

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 50 }).notNull().unique(), // DPM_DIR_01, DPM_STAFF_01
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(), // director, staff, vendor, buyer
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  panGst: varchar('pan_gst', { length: 50 }), // For vendors/buyers
  accountStatus: varchar('account_status', { length: 20 }).notNull().default('active'), // active, frozen, suspended
  failedLoginAttempts: int('failed_login_attempts').default(0),
  lastLogin: timestamp('last_login'),
  resetRequests: int('reset_requests').default(0),
  createdBy: int('created_by'), // Director who created this user
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// LEAD MANAGEMENT
// ============================================

export const leads = mysqlTable('leads', {
  id: int('id').primaryKey().autoincrement(),
  leadId: varchar('lead_id', { length: 50 }).notNull().unique(), // LEAD_2026_0001
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  email: varchar('email', { length: 255 }),
  company: varchar('company', { length: 255 }),
  projectType: varchar('project_type', { length: 100 }).notNull(), // Residential, Corporate, etc.
  budget: varchar('budget', { length: 100 }),
  timeline: varchar('timeline', { length: 100 }),
  location: varchar('location', { length: 255 }),
  source: varchar('source', { length: 100 }).notNull(), // IndiaMART, Website, etc.
  message: text('message'),
  
  // AI Scoring
  score: int('score').default(0), // 0-145 points
  status: varchar('status', { length: 20 }).notNull().default('cold'), // hot, warm, cold
  priority: int('priority').default(0),
  insights: json('insights'), // Array of AI insights
  
  // Tracking
  responseTime: int('response_time'), // Seconds to first response
  assignedTo: int('assigned_to'), // User ID
  followUpDate: timestamp('follow_up_date'),
  conversionStatus: varchar('conversion_status', { length: 50 }).default('new'), // new, contacted, quoted, converted, lost
  conversionValue: decimal('conversion_value', { precision: 15, scale: 2 }),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// PROJECT MANAGEMENT
// ============================================

export const projects = mysqlTable('projects', {
  id: int('id').primaryKey().autoincrement(),
  projectId: varchar('project_id', { length: 50 }).notNull().unique(), // PROJ_2026_0001
  leadId: int('lead_id'), // Link to lead
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }),
  
  projectName: varchar('project_name', { length: 255 }).notNull(),
  projectType: varchar('project_type', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  
  // Financial
  estimatedValue: decimal('estimated_value', { precision: 15, scale: 2 }).notNull(),
  actualValue: decimal('actual_value', { precision: 15, scale: 2 }),
  advanceReceived: decimal('advance_received', { precision: 15, scale: 2 }).default('0'),
  balanceAmount: decimal('balance_amount', { precision: 15, scale: 2 }),
  
  // Timeline
  startDate: timestamp('start_date'),
  expectedEndDate: timestamp('expected_end_date'),
  actualEndDate: timestamp('actual_end_date'),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('planning'), // planning, in_progress, completed, on_hold, cancelled
  progress: int('progress').default(0), // 0-100%
  
  // Team
  projectManager: int('project_manager'), // User ID
  assignedTeam: json('assigned_team'), // Array of user IDs
  
  // Documents
  documents: json('documents'), // Array of document URLs
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// QUOTATIONS
// ============================================

export const quotations = mysqlTable('quotations', {
  id: int('id').primaryKey().autoincrement(),
  quotationId: varchar('quotation_id', { length: 50 }).notNull().unique(), // QUOT_2026_0001
  leadId: int('lead_id'),
  projectId: int('project_id'),
  
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }),
  clientAddress: text('client_address'),
  
  // Items
  items: json('items').notNull(), // Array of {description, quantity, rate, amount}
  subtotal: decimal('subtotal', { precision: 15, scale: 2 }).notNull(),
  gst: decimal('gst', { precision: 15, scale: 2 }).notNull(),
  total: decimal('total', { precision: 15, scale: 2 }).notNull(),
  
  // Terms
  validUntil: timestamp('valid_until').notNull(),
  paymentTerms: text('payment_terms'),
  deliveryTerms: text('delivery_terms'),
  notes: text('notes'),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, sent, accepted, rejected, expired
  sentDate: timestamp('sent_date'),
  acceptedDate: timestamp('accepted_date'),
  
  createdBy: int('created_by'), // User ID
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// INVOICES
// ============================================

export const invoices = mysqlTable('invoices', {
  id: int('id').primaryKey().autoincrement(),
  invoiceId: varchar('invoice_id', { length: 50 }).notNull().unique(), // INV_2026_0001
  projectId: int('project_id'),
  quotationId: int('quotation_id'),
  
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }),
  clientAddress: text('client_address'),
  clientGstin: varchar('client_gstin', { length: 50 }),
  
  // Items
  items: json('items').notNull(),
  subtotal: decimal('subtotal', { precision: 15, scale: 2 }).notNull(),
  gst: decimal('gst', { precision: 15, scale: 2 }).notNull(),
  total: decimal('total', { precision: 15, scale: 2 }).notNull(),
  
  // Payment
  paidAmount: decimal('paid_amount', { precision: 15, scale: 2 }).default('0'),
  balanceAmount: decimal('balance_amount', { precision: 15, scale: 2 }),
  dueDate: timestamp('due_date').notNull(),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('unpaid'), // unpaid, partial, paid, overdue
  paymentMethod: varchar('payment_method', { length: 50 }),
  
  notes: text('notes'),
  
  createdBy: int('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// SALES MODULE - COMPLETE
// ============================================

// Sales Invoices
export const salesInvoices = mysqlTable('sales_invoices', {
  id: int('id').primaryKey().autoincrement(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull().unique(), // INV-2026-0001
  
  // Customer Details
  customerId: int('customer_id'), // Link to buyers table
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerGstin: varchar('customer_gstin', { length: 50 }),
  customerAddress: text('customer_address'),
  customerPhone: varchar('customer_phone', { length: 20 }),
  customerEmail: varchar('customer_email', { length: 255 }),
  
  // Invoice Details
  invoiceDate: date('invoice_date').notNull(),
  dueDate: date('due_date'),
  
  // Financial
  subtotal: decimal('subtotal', { precision: 15, scale: 2 }).notNull(),
  cgst: decimal('cgst', { precision: 15, scale: 2 }).default('0'),
  sgst: decimal('sgst', { precision: 15, scale: 2 }).default('0'),
  igst: decimal('igst', { precision: 15, scale: 2 }).default('0'),
  discount: decimal('discount', { precision: 15, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 15, scale: 2 }).notNull(),
  
  // Payment
  paidAmount: decimal('paid_amount', { precision: 15, scale: 2 }).default('0'),
  balanceAmount: decimal('balance_amount', { precision: 15, scale: 2 }).notNull(),
  paymentStatus: varchar('payment_status', { length: 50 }).notNull().default('unpaid'), // paid, partial, unpaid, overdue
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, sent, paid, cancelled
  
  // Related
  projectId: int('project_id'), // Link to projects
  quotationId: int('quotation_id'), // Link to quotations
  
  notes: text('notes'),
  termsConditions: text('terms_conditions'),
  
  createdBy: int('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Sales Invoice Items
export const salesInvoiceItems = mysqlTable('sales_invoice_items', {
  id: int('id').primaryKey().autoincrement(),
  invoiceId: int('invoice_id').notNull(), // Link to sales_invoices
  
  // Item Details
  itemName: varchar('item_name', { length: 255 }).notNull(),
  description: text('description'),
  hsnCode: varchar('hsn_code', { length: 20 }),
  
  // Quantity & Pricing
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unit: varchar('unit', { length: 50 }).notNull(), // sqft, nos, kg, etc.
  rate: decimal('rate', { precision: 15, scale: 2 }).notNull(),
  
  // Tax
  cgstRate: decimal('cgst_rate', { precision: 5, scale: 2 }).default('0'),
  sgstRate: decimal('sgst_rate', { precision: 5, scale: 2 }).default('0'),
  igstRate: decimal('igst_rate', { precision: 5, scale: 2 }).default('0'),
  
  // Amounts
  taxableAmount: decimal('taxable_amount', { precision: 15, scale: 2 }).notNull(),
  cgstAmount: decimal('cgst_amount', { precision: 15, scale: 2 }).default('0'),
  sgstAmount: decimal('sgst_amount', { precision: 15, scale: 2 }).default('0'),
  igstAmount: decimal('igst_amount', { precision: 15, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 15, scale: 2 }).notNull(),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Sales Quotations
export const salesQuotations = mysqlTable('sales_quotations', {
  id: int('id').primaryKey().autoincrement(),
  quotationNumber: varchar('quotation_number', { length: 50 }).notNull().unique(), // QUOT-2026-0001
  
  // Customer Details
  customerId: int('customer_id'),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }),
  customerEmail: varchar('customer_email', { length: 255 }),
  
  // Quotation Details
  quotationDate: date('quotation_date').notNull(),
  validUntil: date('valid_until'),
  
  // Financial
  subtotal: decimal('subtotal', { precision: 15, scale: 2 }).notNull(),
  cgst: decimal('cgst', { precision: 15, scale: 2 }).default('0'),
  sgst: decimal('sgst', { precision: 15, scale: 2 }).default('0'),
  igst: decimal('igst', { precision: 15, scale: 2 }).default('0'),
  discount: decimal('discount', { precision: 15, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 15, scale: 2 }).notNull(),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, sent, accepted, rejected, expired
  
  // Related
  leadId: int('lead_id'),
  projectId: int('project_id'),
  
  notes: text('notes'),
  termsConditions: text('terms_conditions'),
  
  createdBy: int('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Sales Quotation Items
export const salesQuotationItems = mysqlTable('sales_quotation_items', {
  id: int('id').primaryKey().autoincrement(),
  quotationId: int('quotation_id').notNull(),
  
  itemName: varchar('item_name', { length: 255 }).notNull(),
  description: text('description'),
  
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
  rate: decimal('rate', { precision: 15, scale: 2 }).notNull(),
  
  cgstRate: decimal('cgst_rate', { precision: 5, scale: 2 }).default('0'),
  sgstRate: decimal('sgst_rate', { precision: 5, scale: 2 }).default('0'),
  igstRate: decimal('igst_rate', { precision: 5, scale: 2 }).default('0'),
  
  taxableAmount: decimal('taxable_amount', { precision: 15, scale: 2 }).notNull(),
  cgstAmount: decimal('cgst_amount', { precision: 15, scale: 2 }).default('0'),
  sgstAmount: decimal('sgst_amount', { precision: 15, scale: 2 }).default('0'),
  igstAmount: decimal('igst_amount', { precision: 15, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 15, scale: 2 }).notNull(),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Sales Payments
export const salesPayments = mysqlTable('sales_payments', {
  id: int('id').primaryKey().autoincrement(),
  paymentNumber: varchar('payment_number', { length: 50 }).notNull().unique(), // PAY-2026-0001
  
  // Invoice Details
  invoiceId: int('invoice_id').notNull(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull(),
  
  // Customer Details
  customerId: int('customer_id'),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  
  // Payment Details
  paymentDate: date('payment_date').notNull(),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(), // cash, cheque, bank_transfer, upi, card
  
  // Transaction Details
  transactionRef: varchar('transaction_ref', { length: 100 }),
  bankName: varchar('bank_name', { length: 100 }),
  chequeNumber: varchar('cheque_number', { length: 50 }),
  upiId: varchar('upi_id', { length: 100 }),
  
  notes: text('notes'),
  
  createdBy: int('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// PURCHASE MODULE - COMPLETE
// ============================================

// Purchase Bills
export const purchaseBills = mysqlTable('purchase_bills', {
  id: int('id').primaryKey().autoincrement(),
  billNumber: varchar('bill_number', { length: 50 }).notNull().unique(), // BILL-2026-0001
  vendorBillNumber: varchar('vendor_bill_number', { length: 50 }), // Vendor's invoice number
  
  // Vendor Details
  vendorId: int('vendor_id').notNull(), // Link to vendors table
  vendorName: varchar('vendor_name', { length: 255 }).notNull(),
  vendorGstin: varchar('vendor_gstin', { length: 50 }),
  vendorAddress: text('vendor_address'),
  
  // Bill Details
  billDate: date('bill_date').notNull(),
  dueDate: date('due_date'),
  
  // Financial
  subtotal: decimal('subtotal', { precision: 15, scale: 2 }).notNull(),
  cgst: decimal('cgst', { precision: 15, scale: 2 }).default('0'),
  sgst: decimal('sgst', { precision: 15, scale: 2 }).default('0'),
  igst: decimal('igst', { precision: 15, scale: 2 }).default('0'),
  tds: decimal('tds', { precision: 15, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 15, scale: 2 }).notNull(),
  
  // Payment
  paidAmount: decimal('paid_amount', { precision: 15, scale: 2 }).default('0'),
  balanceAmount: decimal('balance_amount', { precision: 15, scale: 2 }).notNull(),
  paymentStatus: varchar('payment_status', { length: 50 }).notNull().default('unpaid'), // paid, partial, unpaid, overdue
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, approved, paid, cancelled
  
  // Related
  projectId: int('project_id'),
  purchaseOrderId: int('purchase_order_id'),
  
  notes: text('notes'),
  
  createdBy: int('created_by'),
  approvedBy: int('approved_by'),
  approvedAt: timestamp('approved_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Purchase Bill Items
export const purchaseBillItems = mysqlTable('purchase_bill_items', {
  id: int('id').primaryKey().autoincrement(),
  billId: int('bill_id').notNull(),
  
  itemName: varchar('item_name', { length: 255 }).notNull(),
  description: text('description'),
  hsnCode: varchar('hsn_code', { length: 20 }),
  
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
  rate: decimal('rate', { precision: 15, scale: 2 }).notNull(),
  
  cgstRate: decimal('cgst_rate', { precision: 5, scale: 2 }).default('0'),
  sgstRate: decimal('sgst_rate', { precision: 5, scale: 2 }).default('0'),
  igstRate: decimal('igst_rate', { precision: 5, scale: 2 }).default('0'),
  
  taxableAmount: decimal('taxable_amount', { precision: 15, scale: 2 }).notNull(),
  cgstAmount: decimal('cgst_amount', { precision: 15, scale: 2 }).default('0'),
  sgstAmount: decimal('sgst_amount', { precision: 15, scale: 2 }).default('0'),
  igstAmount: decimal('igst_amount', { precision: 15, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 15, scale: 2 }).notNull(),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Purchase Orders
export const purchaseOrders = mysqlTable('purchase_orders', {
  id: int('id').primaryKey().autoincrement(),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(), // PO-2026-0001
  
  // Vendor Details
  vendorId: int('vendor_id').notNull(),
  vendorName: varchar('vendor_name', { length: 255 }).notNull(),
  
  // Order Details
  orderDate: date('order_date').notNull(),
  expectedDelivery: date('expected_delivery'),
  
  // Financial
  subtotal: decimal('subtotal', { precision: 15, scale: 2 }).notNull(),
  cgst: decimal('cgst', { precision: 15, scale: 2 }).default('0'),
  sgst: decimal('sgst', { precision: 15, scale: 2 }).default('0'),
  igst: decimal('igst', { precision: 15, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 15, scale: 2 }).notNull(),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, sent, approved, received, cancelled
  
  // Related
  projectId: int('project_id'),
  
  notes: text('notes'),
  termsConditions: text('terms_conditions'),
  
  createdBy: int('created_by'),
  approvedBy: int('approved_by'),
  approvedAt: timestamp('approved_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Purchase Order Items
export const purchaseOrderItems = mysqlTable('purchase_order_items', {
  id: int('id').primaryKey().autoincrement(),
  orderId: int('order_id').notNull(),
  
  itemName: varchar('item_name', { length: 255 }).notNull(),
  description: text('description'),
  
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
  rate: decimal('rate', { precision: 15, scale: 2 }).notNull(),
  
  cgstRate: decimal('cgst_rate', { precision: 5, scale: 2 }).default('0'),
  sgstRate: decimal('sgst_rate', { precision: 5, scale: 2 }).default('0'),
  igstRate: decimal('igst_rate', { precision: 5, scale: 2 }).default('0'),
  
  taxableAmount: decimal('taxable_amount', { precision: 15, scale: 2 }).notNull(),
  cgstAmount: decimal('cgst_amount', { precision: 15, scale: 2 }).default('0'),
  sgstAmount: decimal('sgst_amount', { precision: 15, scale: 2 }).default('0'),
  igstAmount: decimal('igst_amount', { precision: 15, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 15, scale: 2 }).notNull(),
  
  receivedQuantity: decimal('received_quantity', { precision: 10, scale: 2 }).default('0'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Purchase Payments
export const purchasePayments = mysqlTable('purchase_payments', {
  id: int('id').primaryKey().autoincrement(),
  paymentNumber: varchar('payment_number', { length: 50 }).notNull().unique(), // VPAY-2026-0001
  
  // Bill Details
  billId: int('bill_id').notNull(),
  billNumber: varchar('bill_number', { length: 50 }).notNull(),
  
  // Vendor Details
  vendorId: int('vendor_id').notNull(),
  vendorName: varchar('vendor_name', { length: 255 }).notNull(),
  
  // Payment Details
  paymentDate: date('payment_date').notNull(),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  tdsAmount: decimal('tds_amount', { precision: 15, scale: 2 }).default('0'),
  netAmount: decimal('net_amount', { precision: 15, scale: 2 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  
  // Transaction Details
  transactionRef: varchar('transaction_ref', { length: 100 }),
  bankName: varchar('bank_name', { length: 100 }),
  chequeNumber: varchar('cheque_number', { length: 50 }),
  
  notes: text('notes'),
  
  createdBy: int('created_by'),
  approvedBy: int('approved_by'),
  approvedAt: timestamp('approved_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// INVENTORY MODULE - COMPLETE
// ============================================

// Products/Items Master
export const products = mysqlTable('products', {
  id: int('id').primaryKey().autoincrement(),
  productCode: varchar('product_code', { length: 50 }).notNull().unique(), // PROD-001
  
  // Product Details
  productName: varchar('product_name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }).notNull(), // furniture, hardware, electrical, etc.
  subCategory: varchar('sub_category', { length: 100 }),
  
  // Tax
  hsnCode: varchar('hsn_code', { length: 20 }),
  gstRate: decimal('gst_rate', { precision: 5, scale: 2 }).default('18'),
  
  // Pricing
  purchaseRate: decimal('purchase_rate', { precision: 15, scale: 2 }),
  sellingRate: decimal('selling_rate', { precision: 15, scale: 2 }),
  mrp: decimal('mrp', { precision: 15, scale: 2 }),
  
  // Inventory
  unit: varchar('unit', { length: 50 }).notNull(), // sqft, nos, kg, etc.
  reorderLevel: decimal('reorder_level', { precision: 10, scale: 2 }).default('10'),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('active'), // active, inactive
  
  createdBy: int('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Stock/Inventory
export const stock = mysqlTable('stock', {
  id: int('id').primaryKey().autoincrement(),
  
  // Product Details
  productId: int('product_id').notNull(),
  productCode: varchar('product_code', { length: 50 }).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  
  // Warehouse/Location
  warehouseId: int('warehouse_id'),
  warehouseName: varchar('warehouse_name', { length: 255 }),
  
  // Stock Levels
  openingStock: decimal('opening_stock', { precision: 10, scale: 2 }).default('0'),
  currentStock: decimal('current_stock', { precision: 10, scale: 2 }).notNull(),
  reservedStock: decimal('reserved_stock', { precision: 10, scale: 2 }).default('0'),
  availableStock: decimal('available_stock', { precision: 10, scale: 2 }).notNull(),
  
  // Valuation
  avgCost: decimal('avg_cost', { precision: 15, scale: 2 }),
  stockValue: decimal('stock_value', { precision: 15, scale: 2 }),
  
  lastUpdated: timestamp('last_updated').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Stock Movements
export const stockMovements = mysqlTable('stock_movements', {
  id: int('id').primaryKey().autoincrement(),
  movementNumber: varchar('movement_number', { length: 50 }).notNull().unique(), // STK-2026-0001
  
  // Product Details
  productId: int('product_id').notNull(),
  productCode: varchar('product_code', { length: 50 }).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  
  // Movement Details
  movementType: varchar('movement_type', { length: 50 }).notNull(), // in, out, transfer, adjustment
  movementDate: date('movement_date').notNull(),
  
  // Quantity
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
  
  // Warehouse
  fromWarehouse: int('from_warehouse'),
  toWarehouse: int('to_warehouse'),
  
  // Reference
  referenceType: varchar('reference_type', { length: 50 }), // purchase, sale, project, adjustment
  referenceId: int('reference_id'),
  referenceNumber: varchar('reference_number', { length: 50 }),
  
  // Valuation
  rate: decimal('rate', { precision: 15, scale: 2 }),
  value: decimal('value', { precision: 15, scale: 2 }),
  
  notes: text('notes'),
  
  createdBy: int('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Warehouses
export const warehouses = mysqlTable('warehouses', {
  id: int('id').primaryKey().autoincrement(),
  warehouseCode: varchar('warehouse_code', { length: 50 }).notNull().unique(), // WH-001
  
  warehouseName: varchar('warehouse_name', { length: 255 }).notNull(),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  pincode: varchar('pincode', { length: 10 }),
  
  // Contact
  contactPerson: varchar('contact_person', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('active'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// GST MODULE - COMPLETE
// ============================================

// GST Returns
export const gstReturns = mysqlTable('gst_returns', {
  id: int('id').primaryKey().autoincrement(),
  
  // Return Details
  returnType: varchar('return_type', { length: 50 }).notNull(), // GSTR1, GSTR3B, GSTR9
  returnPeriod: varchar('return_period', { length: 20 }).notNull(), // MM-YYYY
  financialYear: varchar('financial_year', { length: 20 }).notNull(), // 2025-26
  
  // Filing Details
  filingDate: date('filing_date'),
  dueDate: date('due_date').notNull(),
  arn: varchar('arn', { length: 50 }), // Acknowledgement Reference Number
  
  // Amounts
  totalSales: decimal('total_sales', { precision: 15, scale: 2 }).default('0'),
  totalPurchases: decimal('total_purchases', { precision: 15, scale: 2 }).default('0'),
  outputGst: decimal('output_gst', { precision: 15, scale: 2 }).default('0'),
  inputGst: decimal('input_gst', { precision: 15, scale: 2 }).default('0'),
  netGst: decimal('net_gst', { precision: 15, scale: 2 }).default('0'),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, filed, accepted, rejected
  
  // JSON Data
  returnData: json('return_data'), // Complete return data
  
  notes: text('notes'),
  
  filedBy: int('filed_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// GST Transactions
export const gstTransactions = mysqlTable('gst_transactions', {
  id: int('id').primaryKey().autoincrement(),
  
  // Transaction Details
  transactionType: varchar('transaction_type', { length: 50 }).notNull(), // sale, purchase
  transactionDate: date('transaction_date').notNull(),
  
  // Document Details
  documentType: varchar('document_type', { length: 50 }).notNull(), // invoice, bill, credit_note, debit_note
  documentNumber: varchar('document_number', { length: 50 }).notNull(),
  documentId: int('document_id'),
  
  // Party Details
  partyName: varchar('party_name', { length: 255 }).notNull(),
  partyGstin: varchar('party_gstin', { length: 50 }),
  partyState: varchar('party_state', { length: 100 }),
  
  // Amounts
  taxableAmount: decimal('taxable_amount', { precision: 15, scale: 2 }).notNull(),
  cgst: decimal('cgst', { precision: 15, scale: 2 }).default('0'),
  sgst: decimal('sgst', { precision: 15, scale: 2 }).default('0'),
  igst: decimal('igst', { precision: 15, scale: 2 }).default('0'),
  totalGst: decimal('total_gst', { precision: 15, scale: 2 }).notNull(),
  totalAmount: decimal('total_amount', { precision: 15, scale: 2 }).notNull(),
  
  // GST Return
  returnPeriod: varchar('return_period', { length: 20 }), // MM-YYYY
  returnId: int('return_id'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// ACCOUNTING/LEDGER MODULE
// ============================================

// Chart of Accounts
export const chartOfAccounts = mysqlTable('chart_of_accounts', {
  id: int('id').primaryKey().autoincrement(),
  accountCode: varchar('account_code', { length: 50 }).notNull().unique(), // ACC-001
  
  accountName: varchar('account_name', { length: 255 }).notNull(),
  accountType: varchar('account_type', { length: 50 }).notNull(), // asset, liability, equity, income, expense
  accountGroup: varchar('account_group', { length: 100 }), // current_asset, fixed_asset, etc.
  
  parentAccountId: int('parent_account_id'), // For sub-accounts
  
  // Balance
  openingBalance: decimal('opening_balance', { precision: 15, scale: 2 }).default('0'),
  currentBalance: decimal('current_balance', { precision: 15, scale: 2 }).default('0'),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('active'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Journal Entries
export const journalEntries = mysqlTable('journal_entries', {
  id: int('id').primaryKey().autoincrement(),
  entryNumber: varchar('entry_number', { length: 50 }).notNull().unique(), // JE-2026-0001
  
  entryDate: date('entry_date').notNull(),
  entryType: varchar('entry_type', { length: 50 }).notNull(), // journal, payment, receipt, contra
  
  // Reference
  referenceType: varchar('reference_type', { length: 50 }),
  referenceId: int('reference_id'),
  referenceNumber: varchar('reference_number', { length: 50 }),
  
  description: text('description'),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, posted, cancelled
  
  createdBy: int('created_by'),
  postedBy: int('posted_by'),
  postedAt: timestamp('posted_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Journal Entry Lines
export const journalEntryLines = mysqlTable('journal_entry_lines', {
  id: int('id').primaryKey().autoincrement(),
  entryId: int('entry_id').notNull(),
  
  accountId: int('account_id').notNull(),
  accountCode: varchar('account_code', { length: 50 }).notNull(),
  accountName: varchar('account_name', { length: 255 }).notNull(),
  
  debit: decimal('debit', { precision: 15, scale: 2 }).default('0'),
  credit: decimal('credit', { precision: 15, scale: 2 }).default('0'),
  
  description: text('description'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Expenses Table
export const expenses = mysqlTable('expenses', {
  id: int('id').primaryKey().autoincrement(),
  expenseId: varchar('expense_id', { length: 50 }).notNull().unique(),
  category: varchar('category', { length: 100 }).notNull(), // Materials, Labor, Transport, Office, Marketing, Utilities
  description: text('description').notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  gstAmount: decimal('gst_amount', { precision: 12, scale: 2 }).default('0.00'),
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }).notNull(),
  paymentMode: varchar('payment_mode', { length: 50 }).notNull(), // Cash, UPI, Card, Bank Transfer, Cheque
  paymentDate: date('payment_date').notNull(),
  vendor: varchar('vendor', { length: 255 }),
  invoiceNumber: varchar('invoice_number', { length: 100 }),
  projectId: varchar('project_id', { length: 50 }),
  status: varchar('status', { length: 20 }).default('paid'), // paid, pending, cancelled
  createdAt: timestamp('created_at').defaultNow(),
});

// ============================================
// GeM PORTAL SYSTEM
// ============================================

// GeM Tenders Table - Government tenders from GeM portal
export const gemTenders = mysqlTable('gem_tenders', {
  id: int('id').primaryKey().autoincrement(),
  tenderId: varchar('tender_id', { length: 100 }).notNull().unique(),
  
  // Tender Details
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }).notNull(), // Furniture, Interior, Civil Work, etc.
  
  // Organization Details
  organization: varchar('organization', { length: 255 }).notNull(),
  department: varchar('department', { length: 255 }),
  location: varchar('location', { length: 255 }),
  
  // Financial Details
  estimatedValue: decimal('estimated_value', { precision: 15, scale: 2 }),
  emdAmount: decimal('emd_amount', { precision: 15, scale: 2 }), // Earnest Money Deposit
  
  // Timeline
  publishDate: date('publish_date').notNull(),
  bidSubmissionDeadline: timestamp('bid_submission_deadline').notNull(),
  technicalBidOpeningDate: timestamp('technical_bid_opening_date'),
  financialBidOpeningDate: timestamp('financial_bid_opening_date'),
  
  // Requirements
  eligibilityCriteria: text('eligibility_criteria'),
  technicalRequirements: text('technical_requirements'),
  documentsRequired: json('documents_required'), // Array of required documents
  
  // Status
  status: varchar('status', { length: 50 }).default('active'), // active, closed, awarded, cancelled
  
  // Metadata
  gemUrl: varchar('gem_url', { length: 500 }),
  bidNumber: varchar('bid_number', { length: 100 }),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// GeM Bids Table - Our bid submissions
export const gemBids = mysqlTable('gem_bids', {
  id: int('id').primaryKey().autoincrement(),
  bidId: varchar('bid_id', { length: 100 }).notNull().unique(),
  tenderId: varchar('tender_id', { length: 100 }).notNull(), // Link to gemTenders
  
  // Bid Details
  bidAmount: decimal('bid_amount', { precision: 15, scale: 2 }).notNull(),
  technicalScore: int('technical_score'), // Out of 100
  financialScore: int('financial_score'), // Out of 100
  totalScore: int('total_score'), // Out of 100
  
  // Bid Components
  boqId: varchar('boq_id', { length: 100 }), // Link to BOQ
  technicalBid: json('technical_bid'), // Technical proposal details
  financialBid: json('financial_bid'), // Financial proposal details
  
  // Documents
  documents: json('documents'), // Array of uploaded documents
  
  // Status
  status: varchar('status', { length: 50 }).default('draft'), // draft, submitted, under-evaluation, shortlisted, rejected, won, lost
  submittedDate: timestamp('submitted_date'),
  evaluationDate: timestamp('evaluation_date'),
  resultDate: timestamp('result_date'),
  
  // Result
  rank: int('rank'),
  isWinner: varchar('is_winner', { length: 10 }).default('pending'), // pending, yes, no
  rejectionReason: text('rejection_reason'),
  
  // Assignment
  preparedBy: varchar('prepared_by', { length: 255 }),
  approvedBy: varchar('approved_by', { length: 255 }),
  
  // Notes
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// BOQ (Bill of Quantities) Table
export const boq = mysqlTable('boq', {
  id: int('id').primaryKey().autoincrement(),
  boqId: varchar('boq_id', { length: 100 }).notNull().unique(),
  tenderId: varchar('tender_id', { length: 100 }), // Link to tender
  bidId: varchar('bid_id', { length: 100 }), // Link to bid
  
  // BOQ Details
  title: varchar('title', { length: 255 }).notNull(),
  projectType: varchar('project_type', { length: 100 }).notNull(),
  
  // Line Items
  items: json('items').notNull(), // Array of {item, description, unit, quantity, rate, amount}
  
  // Totals
  subtotal: decimal('subtotal', { precision: 15, scale: 2 }).notNull(),
  gst: decimal('gst', { precision: 15, scale: 2 }).notNull(),
  total: decimal('total', { precision: 15, scale: 2 }).notNull(),
  
  // Specifications
  specifications: text('specifications'),
  deliveryTimeline: varchar('delivery_timeline', { length: 255 }),
  warrantyPeriod: varchar('warranty_period', { length: 100 }),
  
  // Status
  status: varchar('status', { length: 50 }).default('draft'), // draft, approved, submitted
  
  createdBy: varchar('created_by', { length: 255 }),
  approvedBy: varchar('approved_by', { length: 255 }),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// GeM Documents Table - Certificates and documents
export const gemDocuments = mysqlTable('gem_documents', {
  id: int('id').primaryKey().autoincrement(),
  documentId: varchar('document_id', { length: 100 }).notNull().unique(),
  
  // Document Details
  documentType: varchar('document_type', { length: 100 }).notNull(), // ISO, MSME, GST, PAN, etc.
  documentName: varchar('document_name', { length: 255 }).notNull(),
  documentNumber: varchar('document_number', { length: 100 }),
  
  // File Details
  fileName: varchar('file_name', { length: 255 }).notNull(),
  filePath: varchar('file_path', { length: 500 }).notNull(),
  fileSize: int('file_size'), // in bytes
  fileType: varchar('file_type', { length: 50 }), // pdf, jpg, png
  
  // Validity
  issueDate: date('issue_date'),
  expiryDate: date('expiry_date'),
  isExpired: varchar('is_expired', { length: 10 }).default('no'),
  
  // Usage
  bidId: varchar('bid_id', { length: 100 }), // Link to bid if used
  
  // Status
  status: varchar('status', { length: 50 }).default('active'), // active, expired, revoked
  
  uploadedBy: varchar('uploaded_by', { length: 255 }),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// GeM Notifications Table - Tender alerts
export const gemNotifications = mysqlTable('gem_notifications', {
  id: int('id').primaryKey().autoincrement(),
  notificationId: varchar('notification_id', { length: 100 }).notNull().unique(),
  
  // Notification Details
  type: varchar('type', { length: 50 }).notNull(), // new-tender, deadline-reminder, result-announced, bid-status
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  
  // Related Entity
  tenderId: varchar('tender_id', { length: 100 }),
  bidId: varchar('bid_id', { length: 100 }),
  
  // Delivery
  channel: varchar('channel', { length: 50 }).notNull(), // email, whatsapp, sms, in-app
  recipient: varchar('recipient', { length: 255 }).notNull(),
  
  // Status
  status: varchar('status', { length: 50 }).default('pending'), // pending, sent, failed
  sentDate: timestamp('sent_date'),
  
  // Priority
  priority: varchar('priority', { length: 20 }).default('normal'), // low, normal, high, urgent
  
  createdAt: timestamp('created_at').defaultNow(),
});

// GST Filings Table
export const gstFilings = mysqlTable('gst_filings', {
  id: int('id').primaryKey().autoincrement(),
  filingId: varchar('filing_id', { length: 50 }).notNull().unique(),
  filingType: varchar('filing_type', { length: 20 }).notNull(), // GSTR-1, GSTR-3B, GSTR-9
  period: varchar('period', { length: 20 }).notNull(), // MM-YYYY
  dueDate: date('due_date').notNull(),
  filedDate: date('filed_date'),
  status: varchar('status', { length: 20 }).default('pending'), // pending, filed, late
  totalSales: decimal('total_sales', { precision: 15, scale: 2 }).default('0.00'),
  totalPurchases: decimal('total_purchases', { precision: 15, scale: 2 }).default('0.00'),
  outputGst: decimal('output_gst', { precision: 12, scale: 2 }).default('0.00'),
  inputGst: decimal('input_gst', { precision: 12, scale: 2 }).default('0.00'),
  netGst: decimal('net_gst', { precision: 12, scale: 2 }).default('0.00'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Email Campaigns Table
export const emailCampaigns = mysqlTable('email_campaigns', {
  id: int('id').primaryKey().autoincrement(),
  campaignId: varchar('campaign_id', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 500 }).notNull(),
  template: varchar('template', { length: 100 }).notNull(), // welcome, follow-up, quote, newsletter
  content: text('content').notNull(),
  recipients: int('recipients').default(0),
  sent: int('sent').default(0),
  opened: int('opened').default(0),
  clicked: int('clicked').default(0),
  status: varchar('status', { length: 20 }).default('draft'), // draft, scheduled, sending, sent, failed
  scheduledAt: timestamp('scheduled_at'),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// WhatsApp Messages Table
export const whatsappMessages = mysqlTable('whatsapp_messages', {
  id: int('id').primaryKey().autoincrement(),
  messageId: varchar('message_id', { length: 50 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }).notNull(),
  name: varchar('name', { length: 255 }),
  message: text('message').notNull(),
  reply: text('reply'),
  type: varchar('type', { length: 20 }).notNull(), // incoming, outgoing, auto-reply
  status: varchar('status', { length: 20 }).default('pending'), // pending, sent, delivered, read, failed
  leadId: varchar('lead_id', { length: 50 }),
  aiGenerated: boolean('ai_generated').default(false),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Social Media Posts Table
export const socialPosts = mysqlTable('social_posts', {
  id: int('id').primaryKey().autoincrement(),
  postId: varchar('post_id', { length: 50 }).notNull().unique(),
  platform: varchar('platform', { length: 50 }).notNull(), // linkedin, facebook, instagram, youtube, google-business
  content: text('content').notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  hashtags: text('hashtags'),
  status: varchar('status', { length: 20 }).default('draft'), // draft, scheduled, posted, failed
  scheduledAt: timestamp('scheduled_at'),
  postedAt: timestamp('posted_at'),
  likes: int('likes').default(0),
  comments: int('comments').default(0),
  shares: int('shares').default(0),
  reach: int('reach').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// System Logs Table
export const systemLogs = mysqlTable('system_logs', {
  id: int('id').primaryKey().autoincrement(),
  logId: varchar('log_id', { length: 50 }).notNull().unique(),
  type: varchar('type', { length: 50 }).notNull(), // error, warning, info, success
  category: varchar('category', { length: 100 }).notNull(), // api, cron, database, email, whatsapp
  message: text('message').notNull(),
  details: text('details'),
  userId: varchar('user_id', { length: 50 }),
  ipAddress: varchar('ip_address', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// ============================================
// SALES PIPELINE
// ============================================

// Deals Table - Sales opportunities
export const deals = mysqlTable('deals', {
  id: int('id').primaryKey().autoincrement(),
  dealId: varchar('deal_id', { length: 50 }).notNull().unique(),
  leadId: varchar('lead_id', { length: 50 }), // Link to leads table
  
  // Deal Information
  title: varchar('title', { length: 255 }).notNull(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  
  // Project Details
  projectType: varchar('project_type', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }),
  description: text('description'),
  
  // Financial
  estimatedValue: decimal('estimated_value', { precision: 15, scale: 2 }).notNull(),
  actualValue: decimal('actual_value', { precision: 15, scale: 2 }),
  probability: int('probability').default(50), // 0-100%
  
  // Sales Pipeline Stage
  stage: varchar('stage', { length: 50 }).notNull().default('new'), // new, contacted, qualified, proposal, negotiation, closed-won, closed-lost
  
  // Timeline
  expectedCloseDate: date('expected_close_date'),
  actualCloseDate: date('actual_close_date'),
  
  // Assignment
  assignedTo: varchar('assigned_to', { length: 255 }),
  
  // Status
  status: varchar('status', { length: 20 }).default('active'), // active, won, lost, on-hold
  lostReason: text('lost_reason'),
  
  // Tracking
  source: varchar('source', { length: 100 }), // Website, LinkedIn, GeM Portal, etc.
  lastContactDate: timestamp('last_contact_date'),
  nextFollowUpDate: date('next_follow_up_date'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Quotes Table - Price quotations
export const quotes = mysqlTable('quotes', {
  id: int('id').primaryKey().autoincrement(),
  quoteId: varchar('quote_id', { length: 50 }).notNull().unique(),
  dealId: varchar('deal_id', { length: 50 }), // Link to deals
  leadId: varchar('lead_id', { length: 50 }), // Link to leads
  
  // Client Information
  clientName: varchar('client_name', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  
  // Quote Details
  projectType: varchar('project_type', { length: 100 }).notNull(),
  projectDescription: text('project_description'),
  
  // Pricing
  subtotal: decimal('subtotal', { precision: 15, scale: 2 }).notNull(),
  gstRate: decimal('gst_rate', { precision: 5, scale: 2 }).default('18.00'),
  gstAmount: decimal('gst_amount', { precision: 15, scale: 2 }).notNull(),
  total: decimal('total', { precision: 15, scale: 2 }).notNull(),
  
  // Line Items (JSON array)
  lineItems: json('line_items').notNull(), // [{item, description, quantity, rate, amount}]
  
  // Terms
  validUntil: date('valid_until').notNull(),
  paymentTerms: text('payment_terms'),
  notes: text('notes'),
  
  // Status
  status: varchar('status', { length: 20 }).default('draft'), // draft, sent, viewed, accepted, rejected, expired
  sentDate: timestamp('sent_date'),
  viewedDate: timestamp('viewed_date'),
  acceptedDate: timestamp('accepted_date'),
  
  createdBy: varchar('created_by', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Follow-ups Table - Sales activities
export const followUps = mysqlTable('follow_ups', {
  id: int('id').primaryKey().autoincrement(),
  followUpId: varchar('follow_up_id', { length: 50 }).notNull().unique(),
  dealId: varchar('deal_id', { length: 50 }), // Link to deals
  leadId: varchar('lead_id', { length: 50 }), // Link to leads
  
  // Follow-up Details
  type: varchar('type', { length: 50 }).notNull(), // call, email, meeting, whatsapp, site-visit
  subject: varchar('subject', { length: 255 }).notNull(),
  description: text('description'),
  
  // Scheduling
  scheduledDate: timestamp('scheduled_date').notNull(),
  completedDate: timestamp('completed_date'),
  
  // Status
  status: varchar('status', { length: 20 }).default('pending'), // pending, completed, cancelled, rescheduled
  outcome: text('outcome'), // Notes about the follow-up result
  
  // Assignment
  assignedTo: varchar('assigned_to', { length: 255 }),
  
  // Next Action
  nextAction: text('next_action'),
  nextActionDate: date('next_action_date'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Sales Activities Table - Track all interactions
export const salesActivities = mysqlTable('sales_activities', {
  id: int('id').primaryKey().autoincrement(),
  activityId: varchar('activity_id', { length: 50 }).notNull().unique(),
  dealId: varchar('deal_id', { length: 50 }),
  leadId: varchar('lead_id', { length: 50 }),
  
  // Activity Details
  type: varchar('type', { length: 50 }).notNull(), // call, email, meeting, note, stage-change, quote-sent
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  
  // Metadata
  duration: int('duration'), // in minutes
  outcome: varchar('outcome', { length: 100 }), // positive, neutral, negative
  
  // User
  performedBy: varchar('performed_by', { length: 255 }),
  
  createdAt: timestamp('created_at').defaultNow(),
});

// ============================================
// PAYMENTS
// ============================================

export const payments = mysqlTable('payments', {
  id: int('id').primaryKey().autoincrement(),
  paymentId: varchar('payment_id', { length: 50 }).notNull().unique(), // PAY_2026_0001
  invoiceId: int('invoice_id'),
  projectId: int('project_id'),
  
  clientName: varchar('client_name', { length: 255 }).notNull(),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(), // cash, cheque, neft, upi, card
  transactionId: varchar('transaction_id', { length: 100 }),
  
  paymentDate: timestamp('payment_date').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, completed, failed
  
  notes: text('notes'),
  receivedBy: int('received_by'), // User ID
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// VENDORS/SUPPLIERS
// ============================================

export const vendors = mysqlTable('vendors', {
  id: int('id').primaryKey().autoincrement(),
  vendorId: varchar('vendor_id', { length: 50 }).notNull().unique(), // VEN_2026_0001
  
  companyName: varchar('company_name', { length: 255 }).notNull(),
  contactPerson: varchar('contact_person', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  
  // Business Details
  gstNumber: varchar('gst_number', { length: 50 }).notNull().unique(),
  panNumber: varchar('pan_number', { length: 50 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(), // Raw Materials, Hardware, etc.
  
  // Address
  address: text('address').notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  pincode: varchar('pincode', { length: 10 }).notNull(),
  
  // Banking
  bankName: varchar('bank_name', { length: 255 }),
  accountNumber: varchar('account_number', { length: 50 }),
  ifscCode: varchar('ifsc_code', { length: 20 }),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, rejected, suspended
  approvedBy: int('approved_by'), // Director user ID
  approvedDate: timestamp('approved_date'),
  
  // Performance
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  totalOrders: int('total_orders').default(0),
  totalValue: decimal('total_value', { precision: 15, scale: 2 }).default('0'),
  
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// BUYERS/CLIENTS
// ============================================

export const buyers = mysqlTable('buyers', {
  id: int('id').primaryKey().autoincrement(),
  buyerId: varchar('buyer_id', { length: 50 }).notNull().unique(), // BUY_2026_0001
  
  name: varchar('name', { length: 255 }).notNull(),
  companyName: varchar('company_name', { length: 255 }),
  phone: varchar('phone', { length: 20 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  
  // Business Details
  gstNumber: varchar('gst_number', { length: 50 }),
  panNumber: varchar('pan_number', { length: 50 }),
  buyerType: varchar('buyer_type', { length: 50 }).notNull(), // individual, corporate, government
  
  // Address
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  pincode: varchar('pincode', { length: 10 }),
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('active'), // active, inactive
  
  // Business Stats
  totalProjects: int('total_projects').default(0),
  totalValue: decimal('total_value', { precision: 15, scale: 2 }).default('0'),
  outstandingAmount: decimal('outstanding_amount', { precision: 15, scale: 2 }).default('0'),
  
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// SOCIAL MEDIA AUTOMATION (Removed duplicate - using line 265 version)
// ============================================

// ============================================
// ALERT/NOTIFICATION SYSTEM
// ============================================

export const alerts = mysqlTable('alerts', {
  id: int('id').primaryKey().autoincrement(),
  alertId: varchar('alert_id', { length: 50 }).notNull().unique(), // ALERT_2026_0001
  
  type: varchar('type', { length: 50 }).notNull(), // lead, payment, approval, system
  priority: varchar('priority', { length: 20 }).notNull(), // high, medium, low
  
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  
  // Recipients
  recipientId: int('recipient_id').notNull(), // User ID
  recipientType: varchar('recipient_type', { length: 50 }).notNull(), // director, staff, vendor
  
  // Channels
  channels: json('channels').notNull(), // ['whatsapp', 'email', 'sms']
  
  // Status
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, sent, delivered, failed
  sentAt: timestamp('sent_at'),
  deliveredAt: timestamp('delivered_at'),
  readAt: timestamp('read_at'),
  
  // Related Data
  relatedType: varchar('related_type', { length: 50 }), // lead, project, invoice, etc.
  relatedId: int('related_id'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// ACCOUNTING WALLET
// ============================================

export const wallet = mysqlTable('wallet', {
  id: int('id').primaryKey().autoincrement(),
  transactionId: varchar('transaction_id', { length: 50 }).notNull().unique(), // TXN_2026_0001
  
  type: varchar('type', { length: 50 }).notNull(), // income, expense
  category: varchar('category', { length: 100 }).notNull(), // project_payment, vendor_payment, salary, etc.
  
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  description: text('description').notNull(),
  
  // Related
  relatedType: varchar('related_type', { length: 50 }), // invoice, payment, project
  relatedId: int('related_id'),
  
  // Payment Details
  paymentMethod: varchar('payment_method', { length: 50 }),
  transactionRef: varchar('transaction_ref', { length: 100 }),
  
  transactionDate: timestamp('transaction_date').notNull(),
  
  // Balance Tracking
  balanceBefore: decimal('balance_before', { precision: 15, scale: 2 }).notNull(),
  balanceAfter: decimal('balance_after', { precision: 15, scale: 2 }).notNull(),
  
  createdBy: int('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
