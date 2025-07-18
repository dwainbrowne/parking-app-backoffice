<template>
  <div class="space-y-6">
    <!-- Header Actions -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Property Management</h2>
        <p class="text-sm text-gray-600">Manage properties under enforcement</p>
      </div>
      <button class="btn-primary">Add Property</button>
    </div>
    
    <!-- Properties Table -->
    <div class="dashboard-card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Property Name</th>
              <th class="table-header">Address</th>
              <th class="table-header">Type</th>
              <th class="table-header">Units</th>
              <th class="table-header">Status</th>
              <th class="table-header">Monthly Tickets</th>
              <th class="table-header">Contact</th>
              <th class="table-header">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="property in properties" :key="property.id">
              <td class="table-cell">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ property.name }}</div>
                  <div class="text-sm text-gray-500">{{ property.enforcementHours }}</div>
                </div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ property.address }}</div>
              </td>
              <td class="table-cell">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ property.type }}
                </span>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ property.units }}</div>
              </td>
              <td class="table-cell">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ property.status }}
                </span>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ property.monthlyTickets }}</div>
              </td>
              <td class="table-cell">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ property.contact }}</div>
                  <div class="text-sm text-gray-500">{{ property.phone }}</div>
                </div>
              </td>
              <td class="table-cell">
                <div class="flex space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
                  <button class="text-red-600 hover:text-red-900 text-sm font-medium">Archive</button>
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
const { properties } = useData()
</script>