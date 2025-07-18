<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      <p class="mt-1 text-sm text-gray-600">
        Real-time insights into your parking enforcement operations
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <DocumentTextIcon class="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Today's Tickets</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.ticketsToday || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CalendarIcon class="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">This Week</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.ticketsWeek || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon class="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Properties</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.activeProperties || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <UserGroupIcon class="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Officers On Shift</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.officersOnShift || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Revenue and Chart Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Revenue Card -->
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Estimated Revenue</p>
            <p class="text-3xl font-bold text-green-600">
              ${{ formatCurrency(stats?.estimatedRevenue || 0) }}
            </p>
            <p class="text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CurrencyDollarIcon class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <!-- Tickets Trend Chart -->
      <div class="lg:col-span-2 card">
        <div class="mb-4">
          <h3 class="text-lg font-medium text-gray-900">Tickets Issued (Last 30 Days)</h3>
        </div>
        <div class="h-64">
          <Line
            v-if="chartData"
            :data="chartData"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Tickets -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Recent Tickets</h3>
          <NuxtLink to="/admin/tickets" class="text-sm text-blue-600 hover:text-blue-500">
            View all
          </NuxtLink>
        </div>
        <div class="space-y-3">
          <div
            v-for="ticket in recentTickets"
            :key="ticket.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ ticket.licensePlate }}</p>
              <p class="text-xs text-gray-500">{{ ticket.violationType }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">${{ ticket.amount }}</p>
              <p class="text-xs text-gray-500">{{ formatTime(ticket.issuedAt) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Officers -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Officers On Duty</h3>
          <NuxtLink to="/admin/officers" class="text-sm text-blue-600 hover:text-blue-500">
            View all
          </NuxtLink>
        </div>
        <div class="space-y-3">
          <div
            v-for="officer in activeOfficers"
            :key="officer.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-xs font-medium text-blue-600">
                  {{ officer.name.charAt(0) }}
                </span>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ officer.name }}</p>
                <p class="text-xs text-gray-500">{{ officer.currentProperty }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">{{ officer.ticketsToday }}</p>
              <p class="text-xs text-gray-500">tickets today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DocumentTextIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import type { DashboardStats } from '~/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const authStore = useAuthStore()

// Reactive data
const stats = ref<DashboardStats | null>(null)
const loading = ref(true)

// Mock recent tickets
const recentTickets = ref([
  {
    id: '1',
    licensePlate: 'ABC-123',
    violationType: 'Unauthorized Parking',
    amount: 75,
    issuedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: '2',
    licensePlate: 'XYZ-789',
    violationType: 'Expired Permit',
    amount: 50,
    issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    id: '3',
    licensePlate: 'DEF-456',
    violationType: 'No Permit',
    amount: 100,
    issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() // 4 hours ago
  }
])

// Mock active officers
const activeOfficers = ref([
  {
    id: '1',
    name: 'John Smith',
    currentProperty: 'Sunset Apartments',
    ticketsToday: 8
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    currentProperty: 'Oak Ridge Complex',
    ticketsToday: 12
  },
  {
    id: '3',
    name: 'Mike Davis',
    currentProperty: 'Pine Valley HOA',
    ticketsToday: 6
  }
])

// Chart configuration
const chartData = computed(() => {
  if (!stats.value?.ticketTrend) return null

  return {
    labels: stats.value.ticketTrend.map(item => {
      const date = new Date(item.date)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }),
    datasets: [
      {
        label: 'Tickets Issued',
        data: stats.value.ticketTrend.map(item => item.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}

// Utility functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  } else {
    return date.toLocaleDateString()
  }
}

// Load dashboard data
const loadDashboardData = async () => {
  try {
    loading.value = true
    const { data } = await $fetch<{ data: DashboardStats }>('/api/admin/dashboard/stats', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    stats.value = data
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
  } finally {
    loading.value = false
  }
}

// Initialize
onMounted(() => {
  loadDashboardData()
})
</script>