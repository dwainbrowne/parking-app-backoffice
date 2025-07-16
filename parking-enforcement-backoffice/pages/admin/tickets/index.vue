<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Tickets</h1>
        <p class="text-gray-600">Manage parking violation tickets</p>
      </div>
      <div class="flex space-x-3">
        <button
          @click="exportTickets"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <ArrowDownTrayIcon class="w-5 h-5" />
          Export CSV
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="License plate, vehicle..."
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            @input="debouncedSearch"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="filters.status"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            @change="fetchTickets"
          >
            <option value="">All Statuses</option>
            <option value="issued">Issued</option>
            <option value="paid">Paid</option>
            <option value="appealed">Appealed</option>
            <option value="voided">Voided</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Property</label>
          <select
            v-model="filters.property"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            @change="fetchTickets"
          >
            <option value="">All Properties</option>
            <option value="1">Sunset Gardens</option>
            <option value="2">Ocean View Condos</option>
            <option value="3">Downtown Lofts</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Officer</label>
          <select
            v-model="filters.officer"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            @change="fetchTickets"
          >
            <option value="">All Officers</option>
            <option value="1">John Martinez</option>
            <option value="2">Sarah Chen</option>
            <option value="3">Mike Rodriguez</option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <DocumentTextIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Tickets</p>
            <p class="text-2xl font-bold text-gray-900">{{ pagination.total }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircleIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Paid</p>
            <p class="text-2xl font-bold text-gray-900">{{ paidTickets }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <ExclamationTriangleIcon class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Appealed</p>
            <p class="text-2xl font-bold text-gray-900">{{ appealedTickets }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <ClockIcon class="w-6 h-6 text-red-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Overdue</p>
            <p class="text-2xl font-bold text-gray-900">{{ overdueTickets }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tickets Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Tickets</h3>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Violation
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Officer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="ticket in tickets" :key="ticket.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                {{ ticket.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ ticket.licensePlate }}</div>
                  <div class="text-sm text-gray-500">{{ ticket.vehicleDescription }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ ticket.violationType }}</div>
                  <div class="text-sm text-gray-500">{{ ticket.location }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ ticket.propertyName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ ticket.officerName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${{ ticket.amount.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(ticket.status)">
                  {{ getStatusLabel(ticket.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewTicket(ticket)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </button>
                  <button
                    v-if="ticket.status === 'issued'"
                    @click="voidTicket(ticket)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Void
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="pagination.page === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="pagination.page === pagination.totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} to 
              {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of 
              {{ pagination.total }} results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                @click="previousPage"
                :disabled="pagination.page === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="pagination.page === pagination.totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Ticket Detail Modal -->
    <div v-if="selectedTicket" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Ticket Details - {{ selectedTicket.id }}</h3>
          <button
            @click="selectedTicket = null"
            class="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">License Plate</label>
            <p class="mt-1 text-sm text-gray-900">{{ selectedTicket.licensePlate }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Vehicle</label>
            <p class="mt-1 text-sm text-gray-900">{{ selectedTicket.vehicleDescription }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Violation Type</label>
            <p class="mt-1 text-sm text-gray-900">{{ selectedTicket.violationType }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Amount</label>
            <p class="mt-1 text-sm text-gray-900">${{ selectedTicket.amount.toFixed(2) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Property</label>
            <p class="mt-1 text-sm text-gray-900">{{ selectedTicket.propertyName }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Officer</label>
            <p class="mt-1 text-sm text-gray-900">{{ selectedTicket.officerName }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Location</label>
            <p class="mt-1 text-sm text-gray-900">{{ selectedTicket.location }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <span :class="getStatusBadgeClass(selectedTicket.status)">
              {{ getStatusLabel(selectedTicket.status) }}
            </span>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Issued At</label>
            <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(selectedTicket.issuedAt) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Due Date</label>
            <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(selectedTicket.dueDate) }}</p>
          </div>
        </div>

        <div v-if="selectedTicket.notes" class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Notes</label>
          <p class="mt-1 text-sm text-gray-900">{{ selectedTicket.notes }}</p>
        </div>

        <div v-if="selectedTicket.photos && selectedTicket.photos.length > 0" class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Photos</label>
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="photo in selectedTicket.photos"
              :key="photo"
              class="bg-gray-200 h-24 rounded flex items-center justify-center"
            >
              <span class="text-xs text-gray-500">{{ photo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  ArrowDownTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import type { Ticket } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const tickets = ref<Ticket[]>([])
const selectedTicket = ref<Ticket | null>(null)
const loading = ref(false)

const filters = ref({
  search: '',
  status: '',
  property: '',
  officer: ''
})

const pagination = ref({
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0
})

const paidTickets = computed(() => 
  tickets.value.filter(t => t.status === 'paid').length
)

const appealedTickets = computed(() => 
  tickets.value.filter(t => t.status === 'appealed').length
)

const overdueTickets = computed(() => 
  tickets.value.filter(t => t.status === 'overdue').length
)

let searchTimeout: NodeJS.Timeout

const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    fetchTickets()
  }, 500)
}

const fetchTickets = async () => {
  loading.value = true
  try {
    const params = new URLSearchParams({
      page: pagination.value.page.toString(),
      limit: pagination.value.limit.toString(),
      ...filters.value
    })

    const response = await $fetch(`/api/admin/tickets?${params}`)
    tickets.value = response.data
    pagination.value = response.pagination
  } catch (error) {
    console.error('Failed to fetch tickets:', error)
  } finally {
    loading.value = false
  }
}

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    property: '',
    officer: ''
  }
  pagination.value.page = 1
  fetchTickets()
}

const previousPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--
    fetchTickets()
  }
}

const nextPage = () => {
  if (pagination.value.page < pagination.value.totalPages) {
    pagination.value.page++
    fetchTickets()
  }
}

const viewTicket = (ticket: Ticket) => {
  selectedTicket.value = ticket
}

const voidTicket = async (ticket: Ticket) => {
  if (confirm(`Are you sure you want to void ticket ${ticket.id}?`)) {
    try {
      await $fetch(`/api/admin/tickets/${ticket.id}/void`, {
        method: 'POST',
        body: { reason: 'Administrative void' }
      })
      await fetchTickets()
    } catch (error) {
      console.error('Failed to void ticket:', error)
    }
  }
}

const exportTickets = () => {
  // Mock CSV export - implement actual CSV generation
  const csvContent = tickets.value.map(ticket => 
    `${ticket.id},${ticket.licensePlate},${ticket.violationType},${ticket.amount},${ticket.status}`
  ).join('\n')
  
  const blob = new Blob([`ID,License Plate,Violation,Amount,Status\n${csvContent}`], 
    { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'tickets.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}

const getStatusBadgeClass = (status: string) => {
  const classes = {
    issued: 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800',
    paid: 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800',
    appealed: 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800',
    voided: 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800',
    overdue: 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes] || classes.issued
}

const getStatusLabel = (status: string) => {
  const labels = {
    issued: 'Issued',
    paid: 'Paid',
    appealed: 'Appealed',
    voided: 'Voided',
    overdue: 'Overdue'
  }
  return labels[status as keyof typeof labels] || status
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

onMounted(() => {
  fetchTickets()
})
</script>