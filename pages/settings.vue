<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-semibold text-gray-900">Settings</h2>
      <p class="text-sm text-gray-600">Manage system settings and configurations</p>
    </div>
    
    <!-- Settings Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- General Settings -->
      <div class="dashboard-card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Company Name</label>
            <input type="text" value="Security Advisors Group" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Contact Email</label>
            <input type="email" value="admin@securityadvisorsgroup.com" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Time Zone</label>
            <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>Eastern Time</option>
              <option>Central Time</option>
              <option>Mountain Time</option>
              <option>Pacific Time</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Ticket Settings -->
      <div class="dashboard-card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Ticket Settings</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Default Fine Amount</label>
            <input type="number" value="50" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Grace Period (minutes)</label>
            <input type="number" value="15" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Appeal Window (days)</label>
            <input type="number" value="30" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
          <div class="flex items-center">
            <input type="checkbox" checked class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label class="ml-2 block text-sm text-gray-900">Enable GPS tracking</label>
          </div>
        </div>
      </div>
      
      <!-- Notification Settings -->
      <div class="dashboard-card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
        <div class="space-y-4">
          <div class="flex items-center">
            <input type="checkbox" checked class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label class="ml-2 block text-sm text-gray-900">Email alerts for appeals</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" checked class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label class="ml-2 block text-sm text-gray-900">SMS notifications</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label class="ml-2 block text-sm text-gray-900">Daily summary reports</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" checked class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label class="ml-2 block text-sm text-gray-900">Overdue invoice alerts</label>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Billing Settings -->
    <div class="dashboard-card">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Billing Settings</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Default Billing Type</label>
          <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>Per Ticket</option>
            <option>Per Enforcement Hour</option>
            <option>Flat Monthly Rate</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Invoice Due Days</label>
          <input type="number" value="15" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Late Fee Percentage</label>
          <input type="number" value="5" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Payment Terms</label>
          <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>Net 15</option>
            <option>Net 30</option>
            <option>Net 45</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Save Button -->
    <div class="flex justify-end">
      <button class="btn-primary">Save Settings</button>
    </div>
  </div>
</template>

<script setup>
// Settings page
</script>