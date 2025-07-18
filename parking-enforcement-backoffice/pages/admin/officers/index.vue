<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Officers</h1>
        <p class="text-gray-600">Manage enforcement staff and assignments</p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <PlusIcon class="w-5 h-5" />
        Add Officer
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <UserIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Officers</p>
            <p class="text-2xl font-bold text-gray-900">{{ officers.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <ClockIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">On Shift</p>
            <p class="text-2xl font-bold text-gray-900">{{ onShiftCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <DocumentTextIcon class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Tickets</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalTickets }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <ChartBarIcon class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg Accuracy</p>
            <p class="text-2xl font-bold text-gray-900">{{ avgAccuracy }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Officers Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="officer in officers"
        :key="officer.id"
        class="bg-white rounded-lg shadow p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <UserIcon class="w-6 h-6 text-gray-600" />
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-medium text-gray-900">{{ officer.name }}</h3>
              <p class="text-sm text-gray-500">{{ officer.email }}</p>
            </div>
          </div>
          <span :class="[
            'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
            officer.status === 'on-shift' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          ]">
            {{ officer.status === 'on-shift' ? 'On Shift' : 'Off Shift' }}
          </span>
        </div>

        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Tickets Issued:</span>
            <span class="font-medium">{{ officer.ticketCount }}</span>
          </div>
          
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Warnings:</span>
            <span class="font-medium">{{ officer.warningCount }}</span>
          </div>
          
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Accuracy:</span>
            <span class="font-medium">{{ Math.round(officer.metrics.accuracy * 100) }}%</span>
          </div>
          
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Appeal Rate:</span>
            <span class="font-medium">{{ Math.round(officer.metrics.appealRate * 100) }}%</span>
          </div>

          <div v-if="officer.status === 'on-shift'" class="text-sm">
            <span class="text-gray-600">Current Location:</span>
            <p class="font-medium text-blue-600">{{ officer.currentLocation }}</p>
          </div>

          <div class="text-sm">
            <span class="text-gray-600">Assigned Properties:</span>
            <div class="mt-1 flex flex-wrap gap-1">
              <span
                v-for="propertyId in officer.assignedProperties"
                :key="propertyId"
                class="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
              >
                Property {{ propertyId }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-4 flex space-x-2">
          <button
            @click="editOfficer(officer)"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded"
          >
            Edit
          </button>
          <button
            @click="viewMetrics(officer)"
            class="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-3 rounded"
          >
            Metrics
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Officer Modal -->
    <div v-if="showAddModal || editingOfficer" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingOfficer ? 'Edit Officer' : 'Add New Officer' }}
        </h3>
        
        <form @submit.prevent="saveOfficer" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="officerForm.name"
              type="text"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="officerForm.email"
              type="email"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              v-model="officerForm.phone"
              type="tel"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              {{ editingOfficer ? 'Update' : 'Create' }} Officer
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Officer Metrics Modal -->
    <div v-if="showMetricsModal && selectedOfficer" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ selectedOfficer.name }} - Performance Metrics
          </h3>
          <button
            @click="showMetricsModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <p class="text-sm text-blue-600">Avg Tickets/Shift</p>
            <p class="text-2xl font-bold text-blue-900">{{ selectedOfficer.metrics.avgTicketsPerShift }}</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <p class="text-sm text-green-600">Accuracy Rate</p>
            <p class="text-2xl font-bold text-green-900">{{ Math.round(selectedOfficer.metrics.accuracy * 100) }}%</p>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg">
            <p class="text-sm text-yellow-600">Appeal Rate</p>
            <p class="text-2xl font-bold text-yellow-900">{{ Math.round(selectedOfficer.metrics.appealRate * 100) }}%</p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <p class="text-sm text-purple-600">Total Tickets</p>
            <p class="text-2xl font-bold text-purple-900">{{ selectedOfficer.ticketCount }}</p>
          </div>
        </div>

        <div>
          <h4 class="text-md font-medium text-gray-900 mb-3">Recent Shift Logs</h4>
          <div class="space-y-2">
            <div
              v-for="log in selectedOfficer.shiftLogs"
              :key="log.id"
              class="bg-gray-50 p-3 rounded"
            >
              <div class="flex justify-between items-center">
                <span class="font-medium">{{ formatDate(log.date) }}</span>
                <span class="text-sm text-gray-600">{{ log.shiftStart }} - {{ log.shiftEnd }}</span>
              </div>
              <div class="text-sm text-gray-600 mt-1">
                {{ log.ticketsIssued }} tickets, {{ log.warningsIssued }} warnings
              </div>
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
  PlusIcon, 
  UserIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import type { Officer } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const officers = ref<Officer[]>([])
const showAddModal = ref(false)
const showMetricsModal = ref(false)
const editingOfficer = ref<Officer | null>(null)
const selectedOfficer = ref<Officer | null>(null)

const officerForm = ref({
  name: '',
  email: '',
  phone: '',
  assignedProperties: []
})

const onShiftCount = computed(() => 
  officers.value.filter(o => o.status === 'on-shift').length
)

const totalTickets = computed(() => 
  officers.value.reduce((sum, o) => sum + o.ticketCount, 0)
)

const avgAccuracy = computed(() => {
  if (officers.value.length === 0) return 0
  return Math.round(
    officers.value.reduce((sum, o) => sum + o.metrics.accuracy, 0) / officers.value.length * 100
  )
})

const fetchOfficers = async () => {
  try {
    const { data } = await $fetch('/api/admin/officers')
    officers.value = data
  } catch (error) {
    console.error('Failed to fetch officers:', error)
  }
}

const saveOfficer = async () => {
  try {
    if (editingOfficer.value) {
      await $fetch(`/api/admin/officers/${editingOfficer.value.id}`, {
        method: 'PUT',
        body: officerForm.value
      })
    } else {
      await $fetch('/api/admin/officers', {
        method: 'POST',
        body: officerForm.value
      })
    }
    
    await fetchOfficers()
    closeModal()
  } catch (error) {
    console.error('Failed to save officer:', error)
  }
}

const editOfficer = (officer: Officer) => {
  editingOfficer.value = officer
  officerForm.value = {
    name: officer.name,
    email: officer.email,
    phone: officer.phone,
    assignedProperties: officer.assignedProperties
  }
}

const viewMetrics = (officer: Officer) => {
  selectedOfficer.value = officer
  showMetricsModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  editingOfficer.value = null
  officerForm.value = {
    name: '',
    email: '',
    phone: '',
    assignedProperties: []
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(() => {
  fetchOfficers()
})
</script>