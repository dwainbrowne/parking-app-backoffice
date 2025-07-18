<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-semibold text-gray-900">Reports & Analytics</h2>
      <p class="text-sm text-gray-600">View detailed analytics and generate reports</p>
    </div>
    
    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="dashboard-card">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">1,234</div>
          <div class="text-sm text-gray-500">Total Tickets This Month</div>
          <div class="text-xs text-green-600 mt-1">+12% from last month</div>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">85%</div>
          <div class="text-sm text-gray-500">Appeal Success Rate</div>
          <div class="text-xs text-red-600 mt-1">-3% from last month</div>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-600">$61,700</div>
          <div class="text-sm text-gray-500">Total Revenue</div>
          <div class="text-xs text-green-600 mt-1">+18% from last month</div>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="text-center">
          <div class="text-2xl font-bold text-orange-600">42</div>
          <div class="text-sm text-gray-500">Avg. Tickets per Day</div>
          <div class="text-xs text-gray-500 mt-1">No change</div>
        </div>
      </div>
    </div>
    
    <!-- Charts and Tables -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top Violations -->
      <div class="dashboard-card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Top Violations</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-4 h-4 bg-blue-500 rounded mr-3"></div>
              <span class="text-sm text-gray-700">No Permit Displayed</span>
            </div>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-900">456</span>
              <span class="text-xs text-gray-500 ml-1">(37%)</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-4 h-4 bg-green-500 rounded mr-3"></div>
              <span class="text-sm text-gray-700">Expired Permit</span>
            </div>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-900">298</span>
              <span class="text-xs text-gray-500 ml-1">(24%)</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
              <span class="text-sm text-gray-700">Fire Lane Violation</span>
            </div>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-900">187</span>
              <span class="text-xs text-gray-500 ml-1">(15%)</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-4 h-4 bg-red-500 rounded mr-3"></div>
              <span class="text-sm text-gray-700">Handicap Violation</span>
            </div>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-900">156</span>
              <span class="text-xs text-gray-500 ml-1">(13%)</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-4 h-4 bg-purple-500 rounded mr-3"></div>
              <span class="text-sm text-gray-700">Other</span>
            </div>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-900">137</span>
              <span class="text-xs text-gray-500 ml-1">(11%)</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Property Performance -->
      <div class="dashboard-card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Property Performance</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-medium text-gray-900">Downtown Plaza</div>
              <div class="text-xs text-gray-500">Commercial</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">67 tickets</div>
              <div class="text-xs text-gray-500">$3,350 revenue</div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-medium text-gray-900">Harbor Point</div>
              <div class="text-xs text-gray-500">Mixed Use</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">52 tickets</div>
              <div class="text-xs text-gray-500">$2,600 revenue</div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-medium text-gray-900">Sunset Gardens HOA</div>
              <div class="text-xs text-gray-500">Residential</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">45 tickets</div>
              <div class="text-xs text-gray-500">$2,250 revenue</div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-medium text-gray-900">Oceanview Condos</div>
              <div class="text-xs text-gray-500">Condominium</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">32 tickets</div>
              <div class="text-xs text-gray-500">$1,600 revenue</div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-medium text-gray-900">Park Avenue Apartments</div>
              <div class="text-xs text-gray-500">Apartment Complex</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">28 tickets</div>
              <div class="text-xs text-gray-500">$1,400 revenue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Officer Performance -->
    <div class="dashboard-card">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Officer Performance</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-xs font-medium text-gray-500 uppercase">
              <th class="pb-3">Officer</th>
              <th class="pb-3">Tickets Issued</th>
              <th class="pb-3">Warnings</th>
              <th class="pb-3">Appeals</th>
              <th class="pb-3">Success Rate</th>
              <th class="pb-3">Revenue Generated</th>
            </tr>
          </thead>
          <tbody class="space-y-2">
            <tr>
              <td class="py-2 text-sm font-medium text-gray-900">Officer John Smith</td>
              <td class="py-2 text-sm text-gray-900">42</td>
              <td class="py-2 text-sm text-gray-900">15</td>
              <td class="py-2 text-sm text-gray-900">3</td>
              <td class="py-2 text-sm text-green-600">93%</td>
              <td class="py-2 text-sm text-gray-900">$2,100</td>
            </tr>
            <tr>
              <td class="py-2 text-sm font-medium text-gray-900">Officer Robert Johnson</td>
              <td class="py-2 text-sm text-gray-900">38</td>
              <td class="py-2 text-sm text-gray-900">12</td>
              <td class="py-2 text-sm text-gray-900">2</td>
              <td class="py-2 text-sm text-green-600">95%</td>
              <td class="py-2 text-sm text-gray-900">$1,900</td>
            </tr>
            <tr>
              <td class="py-2 text-sm font-medium text-gray-900">Officer Maria Garcia</td>
              <td class="py-2 text-sm text-gray-900">35</td>
              <td class="py-2 text-sm text-gray-900">18</td>
              <td class="py-2 text-sm text-gray-900">4</td>
              <td class="py-2 text-sm text-green-600">89%</td>
              <td class="py-2 text-sm text-gray-900">$1,750</td>
            </tr>
            <tr>
              <td class="py-2 text-sm font-medium text-gray-900">Officer David Wilson</td>
              <td class="py-2 text-sm text-gray-900">31</td>
              <td class="py-2 text-sm text-gray-900">10</td>
              <td class="py-2 text-sm text-gray-900">1</td>
              <td class="py-2 text-sm text-green-600">97%</td>
              <td class="py-2 text-sm text-gray-900">$1,550</td>
            </tr>
            <tr>
              <td class="py-2 text-sm font-medium text-gray-900">Officer Lisa Chen</td>
              <td class="py-2 text-sm text-gray-900">29</td>
              <td class="py-2 text-sm text-gray-900">8</td>
              <td class="py-2 text-sm text-gray-900">2</td>
              <td class="py-2 text-sm text-green-600">93%</td>
              <td class="py-2 text-sm text-gray-900">$1,450</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// Reports page with analytics data
</script>