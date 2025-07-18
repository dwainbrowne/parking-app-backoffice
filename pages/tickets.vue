<template>
  <div class="space-y-6">
    <!-- Header Actions -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Ticket Management</h2>
        <p class="text-sm text-gray-600">View and manage all parking tickets</p>
      </div>
      <div class="flex space-x-3">
        <button class="btn-secondary">Export CSV</button>
        <button class="btn-primary">New Ticket</button>
      </div>
    </div>
    
    <!-- Ticket Detail Modal -->
    <div v-if="selectedTicket" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Ticket Details - {{ selectedTicket.id }}</h3>
          <button @click="selectedTicket = null" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Ticket Information -->
          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-3">Ticket Information</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">License Plate:</span>
                  <span class="font-medium">{{ selectedTicket.licensePlate }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Vehicle:</span>
                  <span class="font-medium">{{ selectedTicket.vehicleDescription }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Violation:</span>
                  <span class="font-medium">{{ selectedTicket.violation }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Amount:</span>
                  <span class="font-medium text-green-600">${{ selectedTicket.amount.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Status:</span>
                  <span :class="getStatusClass(selectedTicket.status)">
                    {{ selectedTicket.status }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-3">Location & Officer</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Property:</span>
                  <span class="font-medium">{{ selectedTicket.property }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Location:</span>
                  <span class="font-medium">{{ selectedTicket.location }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Officer:</span>
                  <span class="font-medium">{{ selectedTicket.officer }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Date/Time:</span>
                  <span class="font-medium">{{ formatDateTime(selectedTicket.dateIssued) }}</span>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-3">Notes</h4>
              <p class="text-sm text-gray-700">{{ selectedTicket.notes }}</p>
            </div>
          </div>
          
          <!-- Photos -->
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Evidence Photos ({{ selectedTicket.photosCount }})</h4>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="(photo, index) in selectedTicket.photos" :key="index" class="relative">
                <img 
                  :src="photo" 
                  :alt="`Evidence photo ${index + 1}`"
                  class="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                  @click="openPhotoModal(photo)"
                >
                <div class="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {{ index + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 mt-6">
          <button class="btn-secondary">Print Ticket</button>
          <button class="text-red-600 hover:text-red-900 px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">Void Ticket</button>
          <button @click="selectedTicket = null" class="btn-primary">Close</button>
        </div>
      </div>
    </div>
    
    <!-- Photo Modal -->
    <div v-if="selectedPhoto" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
      <div class="relative max-w-4xl max-h-full p-4">
        <button @click="selectedPhoto = null" class="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img :src="selectedPhoto" alt="Evidence photo" class="max-w-full max-h-full object-contain">
      </div>
    </div>
    
    <!-- Filters -->
    <div class="dashboard-card">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Property</label>
          <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>All Properties</option>
            <option>Sunset Gardens HOA</option>
            <option>Downtown Plaza</option>
            <option>Oceanview Condos</option>
            <option>Park Avenue Apartments</option>
            <option>Harbor Point</option>
            <option>Bayfront Towers</option>
            <option>Coral Gables Shopping Center</option>
            <option>Westside Medical Plaza</option>
            <option>University Village</option>
            <option>Brickell Business Center</option>
            <option>Sunset Mall</option>
            <option>Marina Bay Condos</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>All Status</option>
            <option>Issued</option>
            <option>Appealed</option>
            <option>Voided</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Officer</label>
          <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>All Officers</option>
            <option>Officer John Smith</option>
            <option>Officer Maria Garcia</option>
            <option>Officer Robert Johnson</option>
            <option>Officer Lisa Chen</option>
            <option>Officer David Wilson</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Date Range</label>
          <input type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
      </div>
    </div>
    
    <!-- Tickets Table -->
    <div class="dashboard-card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Ticket ID</th>
              <th class="table-header">License Plate</th>
              <th class="table-header">Property</th>
              <th class="table-header">Violation</th>
              <th class="table-header">Officer</th>
              <th class="table-header">Date/Time</th>
              <th class="table-header">Status</th>
              <th class="table-header">Amount</th>
              <th class="table-header">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="ticket in tickets" :key="ticket.id">
              <td class="table-cell">
                <div class="text-sm font-medium text-gray-900">{{ ticket.id }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm font-medium text-gray-900">{{ ticket.licensePlate }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ ticket.property }}</div>
                <div class="text-sm text-gray-500">{{ ticket.location }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ ticket.violation }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ ticket.officer }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ formatDate(ticket.dateIssued) }}</div>
                <div class="text-sm text-gray-500">{{ formatTime(ticket.dateIssued) }}</div>
              </td>
              <td class="table-cell">
                <span :class="getStatusClass(ticket.status)">
                  {{ ticket.status }}
                </span>
              </td>
              <td class="table-cell">
                <div class="text-sm font-medium text-gray-900">${{ ticket.amount.toFixed(2) }}</div>
              </td>
              <td class="table-cell">
                <div class="flex space-x-2">
                  <button @click="selectedTicket = ticket" class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View</button>
                  <button class="text-red-600 hover:text-red-900 text-sm font-medium">Void</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const { tickets } = useData()

const selectedTicket = ref(null)
const selectedPhoto = ref(null)

const openPhotoModal = (photo) => {
  selectedPhoto.value = photo
}

const getStatusClass = (status) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide'
  
  switch (status) {
    case 'Issued':
      return `${baseClasses} bg-green-100 text-green-800 border border-green-200`
    case 'Appealed':
      return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`
    case 'Voided':
      return `${baseClasses} bg-red-100 text-red-800 border border-red-200`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>