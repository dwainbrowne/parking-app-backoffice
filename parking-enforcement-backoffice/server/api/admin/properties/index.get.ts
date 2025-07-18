export default defineEventHandler(async (event) => {
  // Verify JWT token
  const token = getCookie(event, 'auth-token')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  // Mock properties data - replace with actual database query
  const properties = [
    {
      id: '1',
      name: 'Sunset Gardens Apartments',
      address: '123 Sunset Blvd, Los Angeles, CA 90028',
      guestLimitPerUnit: 2,
      enforcementHours: { start: '08:00', end: '22:00' },
      gracePeriodMins: 15,
      active: true,
      units: 45,
      permitSettings: {
        guestPermitsEnabled: true,
        residentPermitsRequired: true,
        visitorTimeLimit: 120
      },
      createdAt: '2024-01-15T10:00:00Z',
      lastUpdated: '2024-12-15T14:30:00Z'
    },
    {
      id: '2',
      name: 'Ocean View Condos',
      address: '456 Pacific Coast Hwy, Santa Monica, CA 90401',
      guestLimitPerUnit: 1,
      enforcementHours: { start: '07:00', end: '23:00' },
      gracePeriodMins: 10,
      active: true,
      units: 28,
      permitSettings: {
        guestPermitsEnabled: false,
        residentPermitsRequired: true,
        visitorTimeLimit: 60
      },
      createdAt: '2024-02-20T09:15:00Z',
      lastUpdated: '2024-12-10T11:45:00Z'
    },
    {
      id: '3',
      name: 'Downtown Lofts',
      address: '789 Spring St, Los Angeles, CA 90014',
      guestLimitPerUnit: 3,
      enforcementHours: { start: '06:00', end: '24:00' },
      gracePeriodMins: 20,
      active: false,
      units: 62,
      permitSettings: {
        guestPermitsEnabled: true,
        residentPermitsRequired: false,
        visitorTimeLimit: 180
      },
      createdAt: '2024-03-10T16:20:00Z',
      lastUpdated: '2024-11-28T13:10:00Z'
    }
  ]

  return {
    success: true,
    data: properties,
    total: properties.length
  }
})