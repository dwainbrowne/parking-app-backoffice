@@ .. @@
 export interface Property {
   id: string;
   name: string;
   address: string;
   guestLimitPerUnit: number;
   enforcementHours: { start: string; end: string; };
   gracePeriodMins: number;
   active: boolean;
+  units?: number;
+  permitSettings?: {
+    guestPermitsEnabled: boolean;
+    residentPermitsRequired: boolean;
+    visitorTimeLimit: number;
+  };
+  createdAt?: string;
+  lastUpdated?: string;
 }
 
 export interface Officer {
   id: string;
   name: string;
+  email: string;
+  phone: string;
   assignedProperties: string[];
   ticketCount: number;
+  warningCount: number;
+  status: 'on-shift' | 'off-shift';
+  currentLocation?: string | null;
+  shiftStart?: string | null;
   shiftLogs: ShiftLog[];
+  metrics: {
+    avgTicketsPerShift: number;
+    appealRate: number;
+    accuracy: number;
+  };
 }
 
+export interface Ticket {
+  id: string;
+  licensePlate: string;
+  vehicleDescription: string;
+  violationType: string;
+  propertyId: string;
+  propertyName: string;
+  officerId: string;
+  officerName: string;
+  location: string;
+  amount: number;
+  status: 'issued' | 'paid' | 'appealed' | 'voided' | 'overdue';
+  issuedAt: string;
+  dueDate: string;
+  paidAt?: string;
+  appealedAt?: string;
+  voidedAt?: string;
+  photos?: string[];
+  notes?: string;
+  gpsCoordinates?: { lat: number; lng: number; };
+}
+
 export interface Invoice {