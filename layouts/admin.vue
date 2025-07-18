<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <div class="flex h-16 items-center justify-center border-b border-gray-200">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span class="text-lg font-semibold text-gray-900">ParkingCo</span>
        </div>
      </div>

      <nav class="mt-8 px-4">
        <div class="space-y-2">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
              $route.path === item.href
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            ]"
          >
            <component
              :is="item.icon"
              class="mr-3 h-5 w-5 flex-shrink-0"
              :class="[
                $route.path === item.href
                  ? 'text-blue-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              ]"
            />
            {{ item.name }}
          </NuxtLink>
        </div>
      </nav>
    </div>

    <!-- Main content -->
    <div class="pl-64">
      <!-- Top bar -->
      <div class="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div class="flex h-16 items-center justify-between px-6">
          <h1 class="text-xl font-semibold text-gray-900">
            {{ pageTitle }}
          </h1>
          
          <div class="flex items-center space-x-4">
            <!-- User menu -->
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span class="text-xs font-medium">
                    {{ authStore.user?.name?.charAt(0) }}
                  </span>
                </div>
                <span>{{ authStore.user?.name }}</span>
                <ChevronDownIcon class="w-4 h-4" />
              </button>

              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                @click.away="showUserMenu = false"
              >
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const route = useRoute()

const showUserMenu = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Properties', href: '/admin/properties', icon: BuildingOfficeIcon },
  { name: 'Officers', href: '/admin/officers', icon: UserGroupIcon },
  { name: 'Tickets', href: '/admin/tickets', icon: DocumentTextIcon },
  { name: 'Invoices', href: '/admin/invoices', icon: CurrencyDollarIcon },
  { name: 'Reports', href: '/admin/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon }
]

const pageTitle = computed(() => {
  const currentNav = navigation.find(item => item.href === route.path)
  return currentNav?.name || 'Admin Dashboard'
})

const handleLogout = async () => {
  showUserMenu.value = false
  await authStore.logout()
}

// Check authentication on mount
onMounted(async () => {
  await authStore.checkAuth()
})
</script>