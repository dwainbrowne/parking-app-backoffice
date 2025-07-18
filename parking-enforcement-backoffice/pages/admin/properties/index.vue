<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Properties</h1>
        <p class="text-gray-600">Manage client properties and enforcement settings</p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <PlusIcon class="w-5 h-5" />
        Add Property
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <BuildingOfficeIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Properties</p>
            <p class="text-2xl font-bold text-gray-900">{{ activeProperties }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <HomeIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Units</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalUnits }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <ClockIcon class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg Grace Period</p>
            <p class="text-2xl font-bold text-gray-900">{{ avgGracePeriod }}min</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <UserGroupIcon class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg Guest Limit</p>
            <p class="text-2xl font-bold text-gray-900">{{ avgGuestLimit }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Properties Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">All Properties</h3>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Units
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enforcement Hours
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grace Period
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
            <tr v-for="property in properties" :key="property.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ property.name }}</div>
                  <div class="text-sm text-gray-500">{{ property.address }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ property.units || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ property.enforcementHours.start }} - {{ property.enforcementHours.end }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ property.gracePeriodMins }} min
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  property.active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                ]">
                  {{ property.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editProperty(property)"
                  class="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </button>
                <button
                  @click="togglePropertyStatus(property)"
                  :class="[
                    'hover:underline',
                    property.active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                  ]"
                >
                  {{ property.active ? 'Deactivate' : 'Activate' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Property Modal -->
    <div v-if="showAddModal || editingProperty" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingProperty ? 'Edit Property' : 'Add New Property' }}
        </h3>
        
        <form @submit.prevent="saveProperty" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Property Name</label>
              <input
                v-model="propertyForm.name"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Units</label>
              <input
                v-model.number="propertyForm.units"
                type="number"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              v-model="propertyForm.address"
              required
              rows="2"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Guest Limit per Unit</label>
              <input
                v-model.number="propertyForm.guestLimitPerUnit"
                type="number"
                required
                min="0"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Enforcement Start</label>
              <input
                v-model="propertyForm.enforcementHours.start"
                type="time"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Enforcement End</label>
              <input
                v-model="propertyForm.enforcementHours.end"
                type="time"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Grace Period (minutes)</label>
            <input
              v-model.number="propertyForm.gracePeriodMins"
              type="number"
              required
              min="0"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="flex items-center">
            <input
              v-model="propertyForm.active"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Active</label>
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
              {{ editingProperty ? 'Update' : 'Create' }} Property
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  PlusIcon, 
  BuildingOfficeIcon, 
  HomeIcon, 
  ClockIcon, 
  UserGroupIcon 
} from '@heroicons/vue/24/outline'
import type { Property } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const properties = ref<Property[]>([])
const showAddModal = ref(false)
const editingProperty = ref<Property | null>(null)

const propertyForm = ref({
  name: '',
  address: '',
  guestLimitPerUnit: 2,
  enforcementHours: { start: '08:00', end: '22:00' },
  gracePeriodMins: 15,
  active: true,
  units: 0
})

const activeProperties = computed(() => 
  properties.value.filter(p => p.active).length
)

const totalUnits = computed(() => 
  properties.value.reduce((sum, p) => sum + (p.units || 0), 0)
)

const avgGracePeriod = computed(() => {
  if (properties.value.length === 0) return 0
  return Math.round(
    properties.value.reduce((sum, p) => sum + p.gracePeriodMins, 0) / properties.value.length
  )
})

const avgGuestLimit = computed(() => {
  if (properties.value.length === 0) return 0
  return Math.round(
    properties.value.reduce((sum, p) => sum + p.guestLimitPerUnit, 0) / properties.value.length
  )
})

const fetchProperties = async () => {
  try {
    const { data } = await $fetch('/api/admin/properties')
    properties.value = data
  } catch (error) {
    console.error('Failed to fetch properties:', error)
  }
}

const saveProperty = async () => {
  try {
    if (editingProperty.value) {
      // Update existing property
      await $fetch(`/api/admin/properties/${editingProperty.value.id}`, {
        method: 'PUT',
        body: propertyForm.value
      })
    } else {
      // Create new property
      await $fetch('/api/admin/properties', {
        method: 'POST',
        body: propertyForm.value
      })
    }
    
    await fetchProperties()
    closeModal()
  } catch (error) {
    console.error('Failed to save property:', error)
  }
}

const editProperty = (property: Property) => {
  editingProperty.value = property
  propertyForm.value = { ...property }
}

const togglePropertyStatus = async (property: Property) => {
  try {
    await $fetch(`/api/admin/properties/${property.id}`, {
      method: 'PUT',
      body: { ...property, active: !property.active }
    })
    await fetchProperties()
  } catch (error) {
    console.error('Failed to toggle property status:', error)
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingProperty.value = null
  propertyForm.value = {
    name: '',
    address: '',
    guestLimitPerUnit: 2,
    enforcementHours: { start: '08:00', end: '22:00' },
    gracePeriodMins: 15,
    active: true,
    units: 0
  }
}

onMounted(() => {
  fetchProperties()
})
</script>