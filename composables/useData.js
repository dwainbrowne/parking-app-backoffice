export const useData = () => {
  // Dashboard Stats
  const dashboardStats = ref({
    ticketsToday: 43,
    ticketsWeek: 287,
    ticketsMonth: 1234,
    activeProperties: 12,
    staffOnShift: 8,
    monthlyRevenue: 45678
  })

  // Properties Data
  const properties = ref([
    {
      id: 1,
      name: 'Sunset Gardens HOA',
      address: '123 Palm Ave, Miami, FL 33101',
      type: 'Residential Complex',
      units: 150,
      status: 'Active',
      enforcementHours: '8:00 AM - 6:00 PM',
      permitTypes: ['Guest', 'Residential'],
      monthlyTickets: 45,
      contact: 'Sarah Johnson',
      phone: '(305) 555-0123'
    },
    {
      id: 2,
      name: 'Downtown Plaza',
      address: '456 Business Blvd, Miami, FL 33102',
      type: 'Commercial',
      units: 89,
      status: 'Active',
      enforcementHours: '24/7',
      permitTypes: ['Visitor', 'Employee'],
      monthlyTickets: 67,
      contact: 'Mike Chen',
      phone: '(305) 555-0124'
    },
    {
      id: 3,
      name: 'Oceanview Condos',
      address: '789 Ocean Dr, Miami, FL 33103',
      type: 'Condominium',
      units: 200,
      status: 'Active',
      enforcementHours: '6:00 AM - 10:00 PM',
      permitTypes: ['Guest', 'Residential'],
      monthlyTickets: 32,
      contact: 'Lisa Rodriguez',
      phone: '(305) 555-0125'
    },
    {
      id: 4,
      name: 'Park Avenue Apartments',
      address: '321 Park Ave, Miami, FL 33104',
      type: 'Apartment Complex',
      units: 120,
      status: 'Active',
      enforcementHours: '8:00 AM - 8:00 PM',
      permitTypes: ['Guest', 'Residential'],
      monthlyTickets: 28,
      contact: 'David Kim',
      phone: '(305) 555-0126'
    },
    {
      id: 5,
      name: 'Harbor Point',
      address: '654 Harbor St, Miami, FL 33105',
      type: 'Mixed Use',
      units: 175,
      status: 'Active',
      enforcementHours: '24/7',
      permitTypes: ['Guest', 'Residential', 'Commercial'],
      monthlyTickets: 52,
      contact: 'Anna Thompson',
      phone: '(305) 555-0127'
    },
    {
      id: 6,
      name: 'Bayfront Towers',
      address: '987 Bay View Dr, Miami, FL 33106',
      type: 'High-Rise Residential',
      units: 300,
      status: 'Active',
      enforcementHours: '24/7',
      permitTypes: ['Guest', 'Residential', 'Valet'],
      monthlyTickets: 78,
      contact: 'Jennifer Martinez',
      phone: '(305) 555-0128'
    },
    {
      id: 7,
      name: 'Coral Gables Shopping Center',
      address: '456 Miracle Mile, Coral Gables, FL 33134',
      type: 'Shopping Center',
      units: 45,
      status: 'Active',
      enforcementHours: '9:00 AM - 11:00 PM',
      permitTypes: ['Customer', 'Employee', 'Delivery'],
      monthlyTickets: 89,
      contact: 'Robert Davis',
      phone: '(305) 555-0129'
    },
    {
      id: 8,
      name: 'Westside Medical Plaza',
      address: '789 Medical Dr, Miami, FL 33107',
      type: 'Medical Complex',
      units: 150,
      status: 'Active',
      enforcementHours: '6:00 AM - 8:00 PM',
      permitTypes: ['Patient', 'Staff', 'Visitor'],
      monthlyTickets: 34,
      contact: 'Dr. Patricia Wilson',
      phone: '(305) 555-0130'
    },
    {
      id: 9,
      name: 'University Village',
      address: '123 Campus Blvd, Miami, FL 33108',
      type: 'Student Housing',
      units: 400,
      status: 'Active',
      enforcementHours: '24/7',
      permitTypes: ['Student', 'Visitor', 'Faculty'],
      monthlyTickets: 156,
      contact: 'Mark Thompson',
      phone: '(305) 555-0131'
    },
    {
      id: 10,
      name: 'Brickell Business Center',
      address: '555 Brickell Ave, Miami, FL 33109',
      type: 'Office Complex',
      units: 200,
      status: 'Active',
      enforcementHours: '6:00 AM - 10:00 PM',
      permitTypes: ['Employee', 'Visitor', 'Client'],
      monthlyTickets: 67,
      contact: 'Amanda Foster',
      phone: '(305) 555-0132'
    },
    {
      id: 11,
      name: 'Sunset Mall',
      address: '888 Sunset Dr, Miami, FL 33110',
      type: 'Shopping Mall',
      units: 500,
      status: 'Active',
      enforcementHours: '8:00 AM - 12:00 AM',
      permitTypes: ['Customer', 'Employee', 'Service'],
      monthlyTickets: 234,
      contact: 'Carlos Rodriguez',
      phone: '(305) 555-0133'
    },
    {
      id: 12,
      name: 'Marina Bay Condos',
      address: '321 Marina Way, Miami, FL 33111',
      type: 'Waterfront Condos',
      units: 180,
      status: 'Active',
      enforcementHours: '24/7',
      permitTypes: ['Resident', 'Guest', 'Marina'],
      monthlyTickets: 41,
      contact: 'Susan Lee',
      phone: '(305) 555-0134'
    }
  ])

  // Officers Data
  const officers = ref([
    {
      id: 1,
      name: 'Officer John Smith',
      badge: 'PE001',
      phone: '(305) 555-1001',
      email: 'j.smith@securityadvisorsgroup.com',
      status: 'On Shift',
      assignedProperty: 'Sunset Gardens HOA',
      shiftStart: '08:00',
      shiftEnd: '16:00',
      ticketsToday: 8,
      ticketsWeek: 42,
      warningsToday: 3,
      experience: '2 years'
    },
    {
      id: 2,
      name: 'Officer Maria Garcia',
      badge: 'PE002',
      phone: '(305) 555-1002',
      email: 'm.garcia@securityadvisorsgroup.com',
      status: 'On Shift',
      assignedProperty: 'Downtown Plaza',
      shiftStart: '12:00',
      shiftEnd: '20:00',
      ticketsToday: 6,
      ticketsWeek: 35,
      warningsToday: 2,
      experience: '3 years'
    },
    {
      id: 3,
      name: 'Officer Robert Johnson',
      badge: 'PE003',
      phone: '(305) 555-1003',
      email: 'r.johnson@securityadvisorsgroup.com',
      status: 'Off Shift',
      assignedProperty: 'Oceanview Condos',
      shiftStart: '16:00',
      shiftEnd: '24:00',
      ticketsToday: 0,
      ticketsWeek: 38,
      warningsToday: 0,
      experience: '5 years'
    },
    {
      id: 4,
      name: 'Officer Lisa Chen',
      badge: 'PE004',
      phone: '(305) 555-1004',
      email: 'l.chen@securityadvisorsgroup.com',
      status: 'On Shift',
      assignedProperty: 'Park Avenue Apartments',
      shiftStart: '08:00',
      shiftEnd: '16:00',
      ticketsToday: 5,
      ticketsWeek: 29,
      warningsToday: 1,
      experience: '1 year'
    },
    {
      id: 5,
      name: 'Officer David Wilson',
      badge: 'PE005',
      phone: '(305) 555-1005',
      email: 'd.wilson@securityadvisorsgroup.com',
      status: 'On Shift',
      assignedProperty: 'Harbor Point',
      shiftStart: '00:00',
      shiftEnd: '08:00',
      ticketsToday: 4,
      ticketsWeek: 31,
      warningsToday: 2,
      experience: '4 years'
    }
  ])

  // Tickets Data
  const tickets = ref([
    {
      id: 'TK001',
      licensePlate: 'ABC123',
      property: 'Sunset Gardens HOA',
      violation: 'No Permit Displayed',
      officer: 'Officer John Smith',
      dateIssued: '2024-01-15 14:30',
      status: 'Issued',
      amount: 50.00,
      location: 'Visitor Parking Lot A',
      photosCount: 3,
      photos: [
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Blue Honda Civic',
      notes: 'Vehicle parked in visitor space without valid permit displayed on dashboard.'
    },
    {
      id: 'TK002',
      licensePlate: 'XYZ789',
      property: 'Downtown Plaza',
      violation: 'Expired Permit',
      officer: 'Officer Maria Garcia',
      dateIssued: '2024-01-15 15:45',
      status: 'Appealed',
      amount: 50.00,
      location: 'Level 2 Parking',
      photosCount: 2,
      photos: [
        'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Red Toyota Camry',
      notes: 'Permit expired 3 days ago. Vehicle owner has filed an appeal.'
    },
    {
      id: 'TK003',
      licensePlate: 'DEF456',
      property: 'Oceanview Condos',
      violation: 'Parking in Fire Lane',
      officer: 'Officer Robert Johnson',
      dateIssued: '2024-01-15 16:20',
      status: 'Issued',
      amount: 100.00,
      location: 'Building B Entrance',
      photosCount: 4,
      photos: [
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'White Ford F-150',
      notes: 'Vehicle blocking fire lane access. Immediate safety hazard.'
    },
    {
      id: 'TK004',
      licensePlate: 'GHI789',
      property: 'Park Avenue Apartments',
      violation: 'Handicap Violation',
      officer: 'Officer Lisa Chen',
      dateIssued: '2024-01-15 17:10',
      status: 'Voided',
      amount: 200.00,
      location: 'Main Entrance',
      photosCount: 5,
      photos: [
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Black BMW X5',
      notes: 'Ticket voided - vehicle owner provided valid handicap placard after appeal.'
    },
    {
      id: 'TK005',
      licensePlate: 'JKL012',
      property: 'Harbor Point',
      violation: 'No Permit Displayed',
      officer: 'Officer David Wilson',
      dateIssued: '2024-01-15 18:00',
      status: 'Issued',
      amount: 50.00,
      location: 'Residential Section',
      photosCount: 2,
      photos: [
        'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Silver Nissan Altima',
      notes: 'No permit visible in vehicle. Standard violation.'
    },
    {
      id: 'TK006',
      licensePlate: 'MNO345',
      property: 'Sunset Gardens HOA',
      violation: 'Overnight Parking',
      officer: 'Officer John Smith',
      dateIssued: '2024-01-15 22:30',
      status: 'Issued',
      amount: 75.00,
      location: 'Guest Parking',
      photosCount: 3,
      photos: [
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Green Jeep Wrangler',
      notes: 'Vehicle parked overnight in guest parking area. Violation of HOA rules.'
    },
    {
      id: 'TK007',
      licensePlate: 'PQR678',
      property: 'Downtown Plaza',
      violation: 'Blocking Driveway',
      officer: 'Officer Maria Garcia',
      dateIssued: '2024-01-16 08:15',
      status: 'Issued',
      amount: 150.00,
      location: 'Loading Dock',
      photosCount: 4,
      photos: [
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Yellow Delivery Van',
      notes: 'Commercial vehicle blocking loading dock access during business hours.'
    },
    {
      id: 'TK008',
      licensePlate: 'STU901',
      property: 'Oceanview Condos',
      violation: 'No Permit Displayed',
      officer: 'Officer Robert Johnson',
      dateIssued: '2024-01-16 09:45',
      status: 'Issued',
      amount: 50.00,
      location: 'Pool Area Parking',
      photosCount: 2,
      photos: [
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Purple Mini Cooper',
      notes: 'Vehicle in pool area parking without required permit.'
    },
    {
      id: 'TK009',
      licensePlate: 'VWX234',
      property: 'Park Avenue Apartments',
      violation: 'Expired Permit',
      officer: 'Officer Lisa Chen',
      dateIssued: '2024-01-16 11:20',
      status: 'Appealed',
      amount: 50.00,
      location: 'Tenant Parking',
      photosCount: 3,
      photos: [
        'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Orange Volkswagen Beetle',
      notes: 'Tenant permit expired last week. Appeal submitted by resident.'
    },
    {
      id: 'TK010',
      licensePlate: 'YZA567',
      property: 'Harbor Point',
      violation: 'Double Parking',
      officer: 'Officer David Wilson',
      dateIssued: '2024-01-16 13:30',
      status: 'Issued',
      amount: 100.00,
      location: 'Commercial Plaza',
      photosCount: 5,
      photos: [
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Black Mercedes C-Class',
      notes: 'Vehicle double parked, blocking access to adjacent parking spaces.'
    },
    {
      id: 'TK011',
      licensePlate: 'BCD890',
      property: 'Bayfront Towers',
      violation: 'No Permit Displayed',
      officer: 'Officer John Smith',
      dateIssued: '2024-01-16 14:15',
      status: 'Issued',
      amount: 50.00,
      location: 'Tower A Garage',
      photosCount: 2,
      photos: [
        'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'White Tesla Model 3',
      notes: 'Electric vehicle without proper guest permit in residential tower garage.'
    },
    {
      id: 'TK012',
      licensePlate: 'EFG123',
      property: 'Coral Gables Shopping Center',
      violation: 'Overtime Parking',
      officer: 'Officer Maria Garcia',
      dateIssued: '2024-01-16 16:45',
      status: 'Issued',
      amount: 75.00,
      location: 'Customer Parking Zone A',
      photosCount: 3,
      photos: [
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Red Mazda CX-5',
      notes: 'Vehicle exceeded 3-hour customer parking limit by 2 hours.'
    },
    {
      id: 'TK013',
      licensePlate: 'HIJ456',
      property: 'University Village',
      violation: 'No Student Permit',
      officer: 'Officer Robert Johnson',
      dateIssued: '2024-01-16 18:20',
      status: 'Appealed',
      amount: 40.00,
      location: 'Dormitory C Parking',
      photosCount: 2,
      photos: [
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Blue Subaru Impreza',
      notes: 'Student vehicle without valid university parking permit. Appeal pending review.'
    },
    {
      id: 'TK014',
      licensePlate: 'KLM789',
      property: 'Westside Medical Plaza',
      violation: 'Handicap Violation',
      officer: 'Officer Lisa Chen',
      dateIssued: '2024-01-17 09:30',
      status: 'Issued',
      amount: 200.00,
      location: 'Main Entrance Handicap Space',
      photosCount: 4,
      photos: [
        'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Gray Honda Accord',
      notes: 'Vehicle parked in handicap space without proper placard or license plate.'
    },
    {
      id: 'TK015',
      licensePlate: 'NOP012',
      property: 'Sunset Mall',
      violation: 'Employee Parking Violation',
      officer: 'Officer David Wilson',
      dateIssued: '2024-01-17 11:45',
      status: 'Issued',
      amount: 60.00,
      location: 'Customer Parking Level 1',
      photosCount: 2,
      photos: [
        'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      vehicleDescription: 'Black Ford Focus',
      notes: 'Mall employee parked in customer area during peak shopping hours.'
    }
  ])

  // Invoices Data
  const invoices = ref([
    {
      id: 'INV001',
      client: 'Sunset Gardens HOA',
      period: 'January 2024',
      issueDate: '2024-01-31',
      dueDate: '2024-02-15',
      amount: 2250.00,
      status: 'Paid',
      billingType: 'Per Ticket',
      ticketCount: 45,
      ratePerTicket: 50.00
    },
    {
      id: 'INV002',
      client: 'Downtown Plaza',
      period: 'January 2024',
      issueDate: '2024-01-31',
      dueDate: '2024-02-15',
      amount: 3350.00,
      status: 'Pending',
      billingType: 'Per Ticket',
      ticketCount: 67,
      ratePerTicket: 50.00
    },
    {
      id: 'INV003',
      client: 'Oceanview Condos',
      period: 'January 2024',
      issueDate: '2024-01-31',
      dueDate: '2024-02-15',
      amount: 1600.00,
      status: 'Paid',
      billingType: 'Per Ticket',
      ticketCount: 32,
      ratePerTicket: 50.00
    },
    {
      id: 'INV004',
      client: 'Park Avenue Apartments',
      period: 'January 2024',
      issueDate: '2024-01-31',
      dueDate: '2024-02-15',
      amount: 1500.00,
      status: 'Overdue',
      billingType: 'Flat Rate',
      ticketCount: 28,
      ratePerTicket: 0
    },
    {
      id: 'INV005',
      client: 'Harbor Point',
      period: 'January 2024',
      issueDate: '2024-01-31',
      dueDate: '2024-02-15',
      amount: 2600.00,
      status: 'Pending',
      billingType: 'Per Ticket',
      ticketCount: 52,
      ratePerTicket: 50.00
    }
  ])

  return {
    dashboardStats,
    properties,
    officers,
    tickets,
    invoices
  }
}