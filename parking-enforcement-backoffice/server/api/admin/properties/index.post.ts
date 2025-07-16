export default defineEventHandler(async (event) => {
  // Verify JWT token
  const token = getCookie(event, 'auth-token')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const body = await readBody(event)
  
  // Validate required fields
  const requiredFields = ['name', 'address', 'guestLimitPerUnit', 'enforcementHours', 'gracePeriodMins']
  for (const field of requiredFields) {
    if (!body[field]) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required field: ${field}`
      })
    }
  }

  // Mock property creation - replace with actual database insert
  const newProperty = {
    id: Date.now().toString(),
    ...body,
    active: body.active ?? true,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }

  return {
    success: true,
    data: newProperty,
    message: 'Property created successfully'
  }
})