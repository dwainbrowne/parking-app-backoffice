import jwt from 'jsonwebtoken'
import type { User } from '~/types'

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@parkingco.com',
    name: 'Admin User',
    role: 'admin',
    twoFactorEnabled: false,
    active: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  }
]

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No token provided'
      })
    }

    const token = authHeader.substring(7)
    const config = useRuntimeConfig()
    
    const decoded = jwt.verify(token, config.jwtSecret) as any
    const user = mockUsers.find(u => u.id === decoded.userId && u.active)
    
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      })
    }

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          twoFactorEnabled: user.twoFactorEnabled,
          lastLogin: user.lastLogin
        }
      }
    }
  } catch (error) {
    if (error.statusCode) throw error
    
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }
})