export default defineEventHandler(async (event) => {
  // Verify JWT token
  const token = getCookie(event, 'auth-token')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const search = query.search as string || ''
  const status = query.status as string || ''
  const property = query.property as string || ''
  const officer = query.officer as string || ''

  // Mock tickets data - replace with actual database query
  const allTickets = [
    {
      id: 'TKT-001',
      licensePlate: 'ABC123',
      vehicleDescription: '2020 Honda Civic - Blue',
      violationType: 'Unauthorized Parking',
      propertyId: '1',
      propertyName: 'Sunset Gardens Apartments',
      officerId: '1',
      officerName: 'John Martinez',
      location: 'Visitor Parking Spot #12',
      amount: 75.00,
      status: 'issued',
      issuedAt: '2024-12-15T10:30:00Z',
      dueDate: '2024-12-29T23:59:59Z',
      photos: ['photo1.jpg', 'photo2.jpg'],
      notes: 'Vehicle parked in visitor spot for over 2 hours without permit',
      gpsCoordinates: { lat: 34.0928, lng: -118.3287 }
    },
    {
      id: 'TKT-002',
      licensePlate: 'XYZ789',
      vehicleDescription: '2019 Toyota Camry - White',
      violationType: 'Expired Permit',
      propertyId: '2',
      propertyName: 'Ocean View Condos',
      officerId: '2',
      officerName: 'Sarah Chen',
      location: 'Resident Parking Space A-15',
      amount: 50.00,
      status: 'paid',
      issuedAt: '2024-12-14T14:15:00Z',
      dueDate: '2024-12-28T23:59:59Z',
      paidAt: '2024-12-15T09:22:00Z',
      photos: ['photo3.jpg'],
      notes: 'Resident permit expired 3 days ago',
      gpsCoordinates: { lat: 34.0194, lng: -118.4912 }
    },
    {
      id: 'TKT-003',
      licensePlate: 'DEF456',
      vehicleDescription: '2021 Ford F-150 - Black',
      violationType: 'Fire Lane Violation',
      propertyId: '1',
      propertyName: 'Sunset Gardens Apartments',
      officerId: '1',
      officerName: 'John Martinez',
      location: 'Fire Lane - Building B',
      amount: 150.00,
      status: 'appealed',
      issuedAt: '2024-12-13T16:45:00Z',
      dueDate: '2024-12-27T23:59:59Z',
      appealedAt: '2024-12-14T11:30:00Z',
      photos: ['photo4.jpg', 'photo5.jpg'],
      notes: 'Vehicle blocking fire lane access',
      gpsCoordinates: { lat: 34.0928, lng: -118.3287 }
    },
    {
      id: 'TKT-004',
      licensePlate: 'GHI789',
      vehicleDescription: '2018 BMW X5 - Silver',
      violationType: 'Handicap Violation',
      propertyId: '3',
      propertyName: 'Downtown Lofts',
      officerId: '3',
      officerName: 'Mike Rodriguez',
      location: 'Handicap Space #3',
      amount: 200.00,
      status: 'overdue',
      issuedAt: '2024-11-28T11:20:00Z',
      dueDate: '2024-12-12T23:59:59Z',
      photos: ['photo6.jpg'],
      notes: 'No handicap placard visible, vehicle in handicap space',
      gpsCoordinates: { lat: 34.0522, lng: -118.2437 }
    }
  ]

  // Apply filters
  let filteredTickets = allTickets
  
  if (search) {
    filteredTickets = filteredTickets.filter(ticket => 
      ticket.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
      ticket.vehicleDescription.toLowerCase().includes(search.toLowerCase()) ||
      ticket.violationType.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (status) {
    filteredTickets = filteredTickets.filter(ticket => ticket.status === status)
  }

  if (property) {
    filteredTickets = filteredTickets.filter(ticket => ticket.propertyId === property)
  }

  if (officer) {
    filteredTickets = filteredTickets.filter(ticket => ticket.officerId === officer)
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex)

  return {
    success: true,
    data: paginatedTickets,
    pagination: {
      page,
      limit,
      total: filteredTickets.length,
      totalPages: Math.ceil(filteredTickets.length / limit)
    }
  }
})