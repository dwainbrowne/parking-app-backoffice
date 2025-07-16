export default defineEventHandler(async (event) => {
  // Verify JWT token
  const token = getCookie(event, 'auth-token')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  // Mock officers data - replace with actual database query
  const officers = [
    {
      id: '1',
      name: 'John Martinez',
      email: 'j.martinez@parkingco.com',
      phone: '(555) 123-4567',
      assignedProperties: ['1', '2'],
      ticketCount: 145,
      warningCount: 23,
      status: 'on-shift',
      currentLocation: 'Sunset Gardens Apartments',
      shiftStart: '2024-12-15T08:00:00Z',
      shiftLogs: [
        {
          id: '1',
          date: '2024-12-15',
          shiftStart: '08:00',
          shiftEnd: '16:00',
          ticketsIssued: 12,
          warningsIssued: 3,
          propertiesVisited: ['1', '2']
        }
      ],
      metrics: {
        avgTicketsPerShift: 8.5,
        appealRate: 0.12,
        accuracy: 0.94
      }
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 's.chen@parkingco.com',
      phone: '(555) 234-5678',
      assignedProperties: ['2', '3'],
      ticketCount: 98,
      warningCount: 15,
      status: 'on-shift',
      currentLocation: 'Ocean View Condos',
      shiftStart: '2024-12-15T09:00:00Z',
      shiftLogs: [
        {
          id: '2',
          date: '2024-12-15',
          shiftStart: '09:00',
          shiftEnd: '17:00',
          ticketsIssued: 8,
          warningsIssued: 2,
          propertiesVisited: ['2', '3']
        }
      ],
      metrics: {
        avgTicketsPerShift: 6.2,
        appealRate: 0.08,
        accuracy: 0.97
      }
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      email: 'm.rodriguez@parkingco.com',
      phone: '(555) 345-6789',
      assignedProperties: ['1'],
      ticketCount: 203,
      warningCount: 41,
      status: 'off-shift',
      currentLocation: null,
      shiftStart: null,
      shiftLogs: [
        {
          id: '3',
          date: '2024-12-14',
          shiftStart: '14:00',
          shiftEnd: '22:00',
          ticketsIssued: 15,
          warningsIssued: 4,
          propertiesVisited: ['1']
        }
      ],
      metrics: {
        avgTicketsPerShift: 11.2,
        appealRate: 0.15,
        accuracy: 0.91
      }
    }
  ]

  return {
    success: true,
    data: officers,
    total: officers.length
  }
})