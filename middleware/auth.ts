export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    return navigateTo('/admin/login')
  }
  
  // Check if user has admin role for admin routes
  if (to.path.startsWith('/admin') && authStore.user?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied'
    })
  }
})