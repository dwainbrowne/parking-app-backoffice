<template>
  <div class="space-y-6">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="dashboard-card">
        <div class="flex items-center">
          <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Tickets Today</p>
            <p class="text-2xl font-bold text-gray-900">{{ dashboardStats.ticketsToday }}</p>
          </div>
        </div>
      </div>
      
      <div class="dashboard-card">
        <div class="flex items-center">
          <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Active Properties</p>
            <p class="text-2xl font-bold text-gray-900">{{ dashboardStats.activeProperties }}</p>
          </div>
        </div>
      </div>
      
      <div class="dashboard-card">
        <div class="flex items-center">
          <div class="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Staff On Shift</p>
            <p class="text-2xl font-bold text-gray-900">{{ dashboardStats.staffOnShift }}</p>
          </div>
        </div>
      </div>
      
      <div class="dashboard-card">
        <div class="flex items-center">
          <div class="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Monthly Revenue</p>
            <p class="text-2xl font-bold text-gray-900">${{ dashboardStats.monthlyRevenue.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="dashboard-card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Tickets</h3>
        <div class="space-y-3">
          <div v-for="ticket in recentTickets" :key="ticket.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p class="text-sm font-medium text-gray-900">{{ ticket.licensePlate }}</p>
              <p class="text-xs text-gray-500">{{ ticket.violation }} - {{ ticket.property }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">${{ ticket.amount.toFixed(2) }}</p>
              <p class="text-xs text-gray-500">{{ formatTime(ticket.dateIssued) }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="dashboard-card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Active Officers</h3>
        <div class="space-y-3">
          <div v-for="officer in activeOfficers" :key="officer.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center">
              <div class="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div class="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ officer.name }}</p>
                <p class="text-xs text-gray-500">{{ officer.assignedProperty }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">{{ officer.ticketsToday }} tickets</p>
              <p class="text-xs text-gray-500">{{ officer.shiftStart }} - {{ officer.shiftEnd }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="dashboard-card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Weekly Overview</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Tickets Issued</span>
            <span class="text-sm font-medium text-gray-900">{{ dashboardStats.ticketsWeek }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Appeals</span>
            <span class="text-sm font-medium text-gray-900">12</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Warnings</span>
            <span class="text-sm font-medium text-gray-900">45</span>
          </div>
        </div>
      </div>
      
      <div class="dashboard-card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Top Violations</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">No Permit</span>
            <span class="text-sm font-medium text-gray-900">156</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Expired Permit</span>
            <span class="text-sm font-medium text-gray-900">89</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Fire Lane</span>
            <span class="text-sm font-medium text-gray-900">42</span>
          </div>
        </div>
      </div>
      
      <div class="dashboard-card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Monthly Targets</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Revenue Goal</span>
            <span class="text-sm font-medium text-gray-900">$50,000</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Progress</span>
            <span class="text-sm font-medium text-green-600">91%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-green-600 h-2 rounded-full" style="width: 91%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { dashboardStats, tickets, officers } = useData()

const recentTickets = computed(() => {
  return tickets.value.slice(0, 5)
})

const activeOfficers = computed(() => {
  return officers.value.filter(officer => officer.status === 'On Shift')
})

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>