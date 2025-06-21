<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Administrator Dashboard</h1>
        <p class="text-gray-600">System overview and management</p>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-100">
              <Icon name="heroicons:calendar-days" class="w-6 h-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Events</p>
              <p class="text-2xl font-bold text-gray-900">{{ allEvents.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-green-100">
              <Icon name="heroicons:users" class="w-6 h-6 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Users</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalUsers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-purple-100">
              <Icon name="heroicons:building-office" class="w-6 h-6 text-purple-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Organizers</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalOrganizers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-orange-100">
              <Icon name="heroicons:currency-dollar" class="w-6 h-6 text-orange-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Platform Revenue</p>
              <p class="text-2xl font-bold text-gray-900">${{ platformRevenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <UTabs :items="tabs" class="w-full">
        <!-- Events Management -->
        <template #events>
          <div class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold text-gray-900">Events Management</h2>
              <div class="flex gap-2">
                <USelect v-model="eventFilter" :options="eventFilterOptions" />
                <UButton variant="outline" @click="refreshEvents">
                  <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
                  Refresh
                </UButton>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="event in filteredEvents" :key="event.id" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <img :src="event.image" :alt="event.title" class="h-10 w-10 rounded-lg object-cover" />
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">{{ event.title }}</div>
                            <div class="text-sm text-gray-500">{{ event.category }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ event.organizerName }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ formatDate(event.date) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ event.attendees }}/{{ event.maxAttendees }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <UBadge :color="getStatusColor(event.status)" variant="subtle">
                          {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
                        </UBadge>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <UDropdown :items="getEventActions(event)">
                          <UButton variant="ghost" size="sm">
                            <Icon name="heroicons:ellipsis-horizontal" class="w-5 h-5" />
                          </UButton>
                        </UDropdown>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <!-- Users Management -->
        <template #users>
          <div class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold text-gray-900">Users Management</h2>
              <UButton @click="showUserModal = true">
                <Icon name="heroicons:plus" class="w-4 h-4 mr-2" />
                Add User
              </UButton>
            </div>

            <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in mockUsers" :key="user.id" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <Icon name="heroicons:user" class="w-6 h-6 text-gray-600" />
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                            <div class="text-sm text-gray-500">{{ user.email }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <UBadge :color="getRoleColor(user.role)" variant="subtle">
                          {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
                        </UBadge>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ user.eventsCount || 0 }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ user.joinedDate }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <UDropdown :items="getUserActions(user)">
                          <UButton variant="ghost" size="sm">
                            <Icon name="heroicons:ellipsis-horizontal" class="w-5 h-5" />
                          </UButton>
                        </UDropdown>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <!-- System Settings -->
        <template #settings>
          <div class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900">System Settings</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg shadow-sm border p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Platform Settings</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <label class="text-sm font-medium text-gray-700">Event Approval Required</label>
                      <p class="text-sm text-gray-500">New events require admin approval</p>
                    </div>
                    <UToggle v-model="settings.eventApprovalRequired" />
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <label class="text-sm font-medium text-gray-700">User Registration</label>
                      <p class="text-sm text-gray-500">Allow new user registrations</p>
                    </div>
                    <UToggle v-model="settings.userRegistrationEnabled" />
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <label class="text-sm font-medium text-gray-700">Email Notifications</label>
                      <p class="text-sm text-gray-500">Send system email notifications</p>
                    </div>
                    <UToggle v-model="settings.emailNotificationsEnabled" />
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm border p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Revenue Settings</h3>
                <div class="space-y-4">
                  <UFormGroup label="Platform Fee (%)">
                    <UInput v-model="settings.platformFeePercentage" type="number" min="0" max="100" step="0.1" />
                  </UFormGroup>
                  
                  <UFormGroup label="Minimum Event Price ($)">
                    <UInput v-model="settings.minimumEventPrice" type="number" min="0" step="0.01" />
                  </UFormGroup>
                  
                  <UFormGroup label="Maximum Attendees Limit">
                    <UInput v-model="settings.maxAttendeesLimit" type="number" min="1" />
                  </UFormGroup>
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <UButton @click="saveSettings" :loading="savingSettings">
                Save Settings
              </UButton>
            </div>
          </div>
        </template>
      </UTabs>
    </div>

    <!-- User Modal -->
    <UModal v-model="showUserModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Add New User</h3>
        </template>

        <form @submit.prevent="addUser" class="space-y-4">
          <UFormGroup label="Name" required>
            <UInput v-model="newUser.name" placeholder="Enter user name" />
          </UFormGroup>

          <UFormGroup label="Email" required>
            <UInput v-model="newUser.email" type="email" placeholder="Enter email address" />
          </UFormGroup>

          <UFormGroup label="Role" required>
            <USelect v-model="newUser.role" :options="roleOptions" />
          </UFormGroup>
        </form>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" @click="showUserModal = false">Cancel</UButton>
            <UButton @click="addUser" :loading="addingUser">
              Add User
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth', 'admin']
})

const { events: allEvents, updateEvent, deleteEvent } = useEventsStore()

const eventFilter = ref('all')
const showUserModal = ref(false)
const addingUser = ref(false)
const savingSettings = ref(false)

const tabs = [
  { key: 'events', label: 'Events' },
  { key: 'users', label: 'Users' },
  { key: 'settings', label: 'Settings' }
]

const eventFilterOptions = [
  { label: 'All Events', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' }
]

const roleOptions = [
  { label: 'User', value: 'user' },
  { label: 'Organizer', value: 'organizer' },
  { label: 'Admin', value: 'admin' }
]

const newUser = ref({
  name: '',
  email: '',
  role: 'user'
})

const settings = ref({
  eventApprovalRequired: false,
  userRegistrationEnabled: true,
  emailNotificationsEnabled: true,
  platformFeePercentage: 5.0,
  minimumEventPrice: 0.00,
  maxAttendeesLimit: 10000
})

const mockUsers = ref([
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    eventsCount: 0,
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Event Organizer',
    email: 'organizer@example.com',
    role: 'organizer',
    eventsCount: 3,
    joinedDate: '2024-02-20'
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    eventsCount: 0,
    joinedDate: '2024-03-10'
  }
])

const totalUsers = computed(() => mockUsers.value.length)
const totalOrganizers = computed(() => mockUsers.value.filter(u => u.role === 'organizer').length)
const platformRevenue = computed(() => {
  return allEvents.value.reduce((sum, event) => {
    return sum + (event.attendees * event.price * 0.05) // 5% platform fee
  }, 0)
})

const filteredEvents = computed(() => {
  if (eventFilter.value === 'all') {
    return allEvents.value
  }
  return allEvents.value.filter(event => event.status === eventFilter.value)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusColor = (status) => {
  const colors = {
    'upcoming': 'green',
    'ongoing': 'blue',
    'completed': 'gray',
    'cancelled': 'red'
  }
  return colors[status] || 'gray'
}

const getRoleColor = (role) => {
  const colors = {
    'admin': 'red',
    'organizer': 'blue',
    'user': 'green'
  }
  return colors[role] || 'gray'
}

const getEventActions = (event) => {
  return [
    [{
      label: 'View',
      icon: 'heroicons:eye',
      click: () => navigateTo(`/events/${event.id}`)
    }, {
      label: 'Edit',
      icon: 'heroicons:pencil',
      click: () => console.log('Edit event', event.id)
    }],
    [{
      label: event.status === 'upcoming' ? 'Cancel' : 'Delete',
      icon: 'heroicons:trash',
      click: () => {
        const action = event.status === 'upcoming' ? 'cancel' : 'delete'
        if (confirm(`Are you sure you want to ${action} this event?`)) {
          if (action === 'cancel') {
            updateEvent(event.id, { status: 'cancelled' })
          } else {
            deleteEvent(event.id)
          }
        }
      }
    }]
  ]
}

const getUserActions = (user) => {
  return [
    [{
      label: 'Edit',
      icon: 'heroicons:pencil',
      click: () => console.log('Edit user', user.id)
    }],
    [{
      label: 'Delete',
      icon: 'heroicons:trash',
      click: () => {
        if (confirm('Are you sure you want to delete this user?')) {
          const index = mockUsers.value.findIndex(u => u.id === user.id)
          if (index !== -1) {
            mockUsers.value.splice(index, 1)
          }
        }
      }
    }]
  ]
}

const refreshEvents = () => {
  console.log('Refreshing events...')
}

const addUser = async () => {
  addingUser.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    mockUsers.value.push({
      id: Date.now().toString(),
      ...newUser.value,
      eventsCount: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    })

    newUser.value = { name: '', email: '', role: 'user' }
    showUserModal.value = false
  } finally {
    addingUser.value = false
  }
}

const saveSettings = async () => {
  savingSettings.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Settings saved:', settings.value)
  } finally {
    savingSettings.value = false
  }
}

useHead({
  title: 'Admin Dashboard - EventHub',
  meta: [
    { name: 'description', content: 'System administration and management dashboard for EventHub.' }
  ]
})
</script>