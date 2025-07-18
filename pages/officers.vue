<template>
  <div class="space-y-6">
    <!-- Header Actions -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Officer Management</h2>
        <p class="text-sm text-gray-600">Manage enforcement staff and assignments</p>
      </div>
      <button class="btn-primary">Add Officer</button>
    </div>
    
    <!-- Officers Table -->
    <div class="dashboard-card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Officer</th>
              <th class="table-header">Badge</th>
              <th class="table-header">Status</th>
              <th class="table-header">Assigned Property</th>
              <th class="table-header">Shift</th>
              <th class="table-header">Today</th>
              <th class="table-header">This Week</th>
              <th class="table-header">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="officer in officers" :key="officer.id">
              <td class="table-cell">
                <div class="flex items-center">
                  <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-600">{{ officer.name.split(' ').map(n => n[0]).join('') }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ officer.name }}</div>
                    <div class="text-sm text-gray-500">{{ officer.email }}</div>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ officer.badge }}</div>
              </td>
              <td class="table-cell">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  officer.status === 'On Shift' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                ]">
                  {{ officer.status }}
                </span>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ officer.assignedProperty }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ officer.shiftStart }} - {{ officer.shiftEnd }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ officer.ticketsToday }} tickets</div>
                <div class="text-sm text-gray-500">{{ officer.warningsToday }} warnings</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ officer.ticketsWeek }} tickets</div>
              </td>
              <td class="table-cell">
                <div class="flex space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
                  <button class="text-red-600 hover:text-red-900 text-sm font-medium">Remove</button>
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
const { officers } = useData()
</script>