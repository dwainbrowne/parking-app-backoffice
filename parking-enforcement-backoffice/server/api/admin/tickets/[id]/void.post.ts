export default defineEventHandler(async (event) => {
  // Verify JWT token
  const token = getCookie(event, 'auth-token')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const ticketId = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!ticketId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ticket ID is required'
    })
  }

  // Mock void ticket - replace with actual database update
  const voidedTicket = {
    id: ticketId,
    status: 'voided',
    voidedAt: new Date().toISOString(),
    voidReason: body.reason || 'Administrative void',
    voidedBy: 'admin@parkingco.com' // Get from JWT token
  }

  return {
    success: true,
    data: voidedTicket,
    message: 'Ticket voided successfully'
  }
})