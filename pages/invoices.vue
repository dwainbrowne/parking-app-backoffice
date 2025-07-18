<template>
  <div class="space-y-6">
    <!-- Header Actions -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Invoice Management</h2>
        <p class="text-sm text-gray-600">Manage client billing and invoices</p>
      </div>
      <button @click="showGenerateModal = true" class="btn-primary">Generate Invoice</button>
    </div>
    
    <!-- Generate Invoice Modal -->
    <div v-if="showGenerateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Generate New Invoice</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Client/Property</label>
              <select v-model="invoiceForm.client" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select Client</option>
                <option value="all">All Properties</option>
                <option v-for="property in properties" :key="property.id" :value="property.name">
                  {{ property.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Time Period</label>
              <select v-model="invoiceForm.period" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="current">This Month</option>
                <option value="last">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div v-if="invoiceForm.period === 'custom'" class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">From Date</label>
                <input v-model="invoiceForm.fromDate" type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">To Date</label>
                <input v-model="invoiceForm.toDate" type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Billing Type</label>
              <select v-model="invoiceForm.billingType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="per-ticket">Per Ticket ($50.00)</option>
                <option value="flat-rate">Flat Monthly Rate</option>
                <option value="per-hour">Per Enforcement Hour</option>
              </select>
            </div>
            <div v-if="invoiceForm.billingType === 'flat-rate'">
              <label class="block text-sm font-medium text-gray-700">Monthly Rate</label>
              <input v-model="invoiceForm.flatRate" type="number" step="0.01" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button @click="showGenerateModal = false" class="btn-secondary">Cancel</button>
            <button @click="generateInvoice" class="btn-primary">Generate Invoice</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Invoice Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="dashboard-card">
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-900">$11,300</div>
          <div class="text-sm text-gray-500">Total Outstanding</div>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">$3,850</div>
          <div class="text-sm text-gray-500">Paid This Month</div>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="text-center">
          <div class="text-2xl font-bold text-red-600">$1,500</div>
          <div class="text-sm text-gray-500">Overdue</div>
        </div>
      </div>
    </div>
    
    <!-- Invoices Table -->
    <div class="dashboard-card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Invoice ID</th>
              <th class="table-header">Client</th>
              <th class="table-header">Period</th>
              <th class="table-header">Issue Date</th>
              <th class="table-header">Due Date</th>
              <th class="table-header">Amount</th>
              <th class="table-header">Status</th>
              <th class="table-header">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="table-cell">
                <div class="text-sm font-medium text-gray-900">{{ invoice.id }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ invoice.client }}</div>
                <div class="text-sm text-gray-500">{{ invoice.billingType }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ invoice.period }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ formatDate(invoice.issueDate) }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">{{ formatDate(invoice.dueDate) }}</div>
              </td>
              <td class="table-cell">
                <div class="text-sm font-medium text-gray-900">${{ invoice.amount.toFixed(2) }}</div>
                <div class="text-sm text-gray-500" v-if="invoice.ticketCount">{{ invoice.ticketCount }} tickets</div>
              </td>
              <td class="table-cell">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                  invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                ]">
                  {{ invoice.status }}
                </span>
              </td>
              <td class="table-cell">
                <div class="flex space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View</button>
                  <button class="text-green-600 hover:text-green-900 text-sm font-medium">Download</button>
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
const { invoices, properties } = useData()

const showGenerateModal = ref(false)
const invoiceForm = ref({
  client: '',
  period: 'current',
  fromDate: '',
  toDate: '',
  billingType: 'per-ticket',
  flatRate: 1500
})

const generateInvoice = () => {
  // Here you would typically send the data to your backend
  console.log('Generating invoice with:', invoiceForm.value)
  
  // For demo purposes, we'll just close the modal
  showGenerateModal.value = false
  
  // Reset form
  invoiceForm.value = {
    client: '',
    period: 'current',
    fromDate: '',
    toDate: '',
    billingType: 'per-ticket',
    flatRate: 1500
  }
  
  // You could show a success message here
  alert('Invoice generated successfully!')
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>