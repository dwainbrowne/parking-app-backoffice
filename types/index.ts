export interface Property {
  id: string;
  name: string;
  address: string;
  guestLimitPerUnit: number;
  enforcementHours: { start: string; end: string; };
  gracePeriodMins: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Officer {
  id: string;
  name: string;
  email: string;
  assignedProperties: string[];
  ticketCount: number;
  shiftLogs: ShiftLog[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShiftLog {
  id: string;
  officerId: string;
  propertyId: string;
  startTime: string;
  endTime?: string;
  ticketsIssued: number;
}

export interface Ticket {
  id: string;
  propertyId: string;
  officerId: string;
  licensePlate: string;
  violationType: string;
  description: string;
  amount: number;
  status: 'pending' | 'paid' | 'voided' | 'appealed';
  issuedAt: string;
  dueDate: string;
  location: string;
  photos?: string[];
}

export interface Invoice {
  id: string;
  clientId: string;
  propertyId: string;
  periodStart: string;
  periodEnd: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'unpaid' | 'paid' | 'overdue';
  createdAt: string;
  dueDate: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'officer';
  twoFactorEnabled: boolean;
  lastLogin?: string;
  active: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  timestamp: string;
  ipAddress: string;
}

export interface DashboardStats {
  ticketsToday: number;
  ticketsWeek: number;
  ticketsMonth: number;
  activeProperties: number;
  officersOnShift: number;
  estimatedRevenue: number;
  ticketTrend: { date: string; count: number; }[];
}