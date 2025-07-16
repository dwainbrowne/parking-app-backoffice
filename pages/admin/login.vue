<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        Admin Dashboard
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Parking Enforcement Management System
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="input-field"
                :disabled="loading"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="input-field"
                :disabled="loading"
              />
            </div>
          </div>

          <div v-if="showTwoFactor">
            <label for="twoFactorCode" class="block text-sm font-medium text-gray-700">
              Two-Factor Authentication Code
            </label>
            <div class="mt-1">
              <input
                id="twoFactorCode"
                v-model="form.twoFactorCode"
                name="twoFactorCode"
                type="text"
                placeholder="Enter 6-digit code"
                class="input-field"
                :disabled="loading"
              />
            </div>
          </div>

          <div v-if="error" class="rounded-md bg-red-50 p-4">
            <div class="text-sm text-red-700">
              {{ error }}
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full btn-primary"
              :disabled="loading"
            >
              <span v-if="loading" class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="text-sm text-gray-600">
            <p class="mb-2">Demo credentials:</p>
            <p><strong>Email:</strong> admin@parkingco.com</p>
            <p><strong>Password:</strong> password123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: []
})

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  email: 'admin@parkingco.com',
  password: 'password123',
  twoFactorCode: ''
})

const loading = ref(false)
const error = ref('')
const showTwoFactor = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    await authStore.login(form.email, form.password, form.twoFactorCode)
  } catch (err: any) {
    if (err.statusMessage === '2FA code required') {
      showTwoFactor.value = true
      error.value = 'Please enter your two-factor authentication code'
    } else {
      error.value = err.statusMessage || 'Login failed'
    }
  } finally {
    loading.value = false
  }
}

// Redirect if already authenticated
onMounted(async () => {
  await authStore.checkAuth()
  if (authStore.isAuthenticated) {
    await router.push('/admin/dashboard')
  }
})
</script>