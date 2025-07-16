export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  // Initialize auth state from cookie on client side
  if (process.client) {
    authStore.checkAuth()
  }
})