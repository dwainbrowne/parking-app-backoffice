import type { DashboardStats } from '~/types'

// Mock data - replace with actual database queries
const generateMockStats = (): DashboardStats => {
  const today = new Date()
  const ticketTrend = []
  
  // Generate 30 days of ticket data
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    ticketTrend.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 50) + 10
    })
  }

  return {
    ticketsToday: 23,
    ticketsWeek: 156,
    ticketsMonth: 642,
    activeProperties: 12,
    officersOnShift: 8,
    estimatedRevenue: 15750.00,
    ticketTrend
  }
}

export default defineEventHandler(async (event) => {
  try {
    // Verify authentication
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    const stats = generateMockStats()

    return {
      success: true,
      data: stats
    }
  } catch (error) {
    if (error.statusCode) throw error
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})