import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import type { User } from '~/types'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  twoFactorCode: z.string().optional()
})

// Mock user database - replace with actual database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@parkingco.com',
    name: 'Admin User',
    role: 'admin',
    twoFactorEnabled: false,
    active: true,
    createdAt: new Date().toISOString()
  }
]

// Mock password hash for 'password123'
const mockPasswordHash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, twoFactorCode } = loginSchema.parse(body)

    // Find user
    const user = mockUsers.find(u => u.email === email && u.active)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, mockPasswordHash)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    // Check 2FA if enabled
    if (user.twoFactorEnabled && !twoFactorCode) {
      throw createError({
        statusCode: 422,
        statusMessage: '2FA code required'
      })
    }

    if (user.twoFactorEnabled && twoFactorCode !== '123456') { // Mock 2FA
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid 2FA code'
      })
    }

    // Generate JWT
    const config = useRuntimeConfig()
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    )

    // Update last login
    user.lastLogin = new Date().toISOString()

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
        },
        token
      }
    }
  } catch (error) {
    if (error.statusCode) throw error
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})