import { defineStore } from 'pinia'
import type { User } from '~/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false
  }),

  actions: {
    async login(email: string, password: string, twoFactorCode?: string) {
      this.loading = true
      try {
        const { data } = await $fetch<{ user: User; token: string }>('/api/admin/auth/login', {
          method: 'POST',
          body: { email, password, twoFactorCode }
        })

        this.user = data.user
        this.token = data.token
        this.isAuthenticated = true

        // Store token in cookie
        const tokenCookie = useCookie('auth-token', {
          httpOnly: false,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })
        tokenCookie.value = data.token

        await navigateTo('/admin/dashboard')
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await $fetch('/api/admin/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.user = null
        this.token = null
        this.isAuthenticated = false
        
        const tokenCookie = useCookie('auth-token')
        tokenCookie.value = null
        
        await navigateTo('/admin/login')
      }
    },

    async checkAuth() {
      const tokenCookie = useCookie('auth-token')
      if (!tokenCookie.value) return

      try {
        const { data } = await $fetch<{ user: User }>('/api/admin/auth/me', {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`
          }
        })

        this.user = data.user
        this.token = tokenCookie.value
        this.isAuthenticated = true
      } catch (error) {
        this.logout()
      }
    },

    async impersonateOfficer(officerId: string) {
      if (this.user?.role !== 'admin') {
        throw new Error('Only admins can impersonate officers')
      }

      try {
        const { data } = await $fetch<{ token: string }>('/api/admin/auth/impersonate', {
          method: 'POST',
          body: { officerId },
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        const tokenCookie = useCookie('auth-token')
        tokenCookie.value = data.token
        this.token = data.token

        await this.checkAuth()
      } catch (error) {
        throw error
      }
    }
  }
})