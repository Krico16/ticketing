<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Organizer Dashboard</h1>
        <p class="text-gray-600">Manage your events and track performance</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-100">
              <Icon name="heroicons:calendar-days" class="w-6 h-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Events</p>
              <p class="text-2xl font-bold text-gray-900">{{ organizerEvents.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-green-100">
              <Icon name="heroicons:users" class="w-6 h-6 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Attendees</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalAttendees }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-purple-100">
              <Icon name="heroicons:currency-dollar" class="w-6 h-6 text-purple-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Revenue</p>
              <p class="text-2xl font-bold text-gray-900">${{ totalRevenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-orange-100">
              <Icon name="heroicons:star" class="w-6 h-6 text-orange-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Avg. Rating</p>
              <p class="text-2xl font-bold text-gray-900">4.8</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions Bar -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8">
        <UButton @click="showCreateModal = true" size="lg">
          <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
          Create New Event
        </UButton>
        <UButton variant="outline" @click="refreshData">
          <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
          Refresh
        </UButton>
      </div>

      <!-- Events Table -->
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div class="px-6 py-4 border-b">
          <h2 class="text-lg font-semibold text-gray-900">Your Events</h2>
        </div>
        
        <div v-if="organizerEvents.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="event in organizerEvents" :key="event.id" class="hover:bg-gray-50">
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
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ (event.attendees * event.price).toLocaleString() }}
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

        <div v-else class="p-12 text-center">
          <Icon name="heroicons:calendar-x-mark" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No events yet</h3>
          <p class="text-gray-600 mb-4">Create your first event to get started</p>
          <UButton @click="showCreateModal = true">
            <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
            Create Event
          </UButton>
        </div>
      </div>
    </div>

    <!-- Create Event Modal -->
    <UModal v-model="showCreateModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Create New Event</h3>
        </template>

        <form @submit.prevent="createEvent" class="space-y-4">
          <UFormGroup label="Event Title" required>
            <UInput v-model="newEvent.title" placeholder="Enter event title" />
          </UFormGroup>

          <UFormGroup label="Description" required>
            <UTextarea v-model="newEvent.description" placeholder="Describe your event" rows="3" />
          </UFormGroup>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup label="Date" required>
              <UInput v-model="newEvent.date" type="date" />
            </UFormGroup>

            <UFormGroup label="Time" required>
              <UInput v-model="newEvent.time" type="time" />
            </UFormGroup>
          </div>

          <UFormGroup label="Location" required>
            <UInput v-model="newEvent.location" placeholder="Event location" />
          </UFormGroup>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UFormGroup label="Category" required>
              <USelect v-model="newEvent.category" :options="categoryOptions" />
            </UFormGroup>

            <UFormGroup label="Price ($)" required>
              <UInput v-model="newEvent.price" type="number" min="0" step="0.01" />
            </UFormGroup>

            <UFormGroup label="Max Attendees" required>
              <UInput v-model="newEvent.maxAttendees" type="number" min="1" />
            </UFormGroup>
          </div>

          <UFormGroup label="Event Image URL">
            <UInput v-model="newEvent.image" placeholder="https://example.com/image.jpg" />
          </UFormGroup>

          <div class="flex items-center">
            <UCheckbox v-model="newEvent.featured" label="Feature this event" />
          </div>
        </form>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" @click="showCreateModal = false">Cancel</UButton>
            <UButton @click="createEvent" :loading="creating">
              Create Event
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth', 'organizer']
})

const { user } = useAuthStore()
const { events, getEventsByOrganizer, addEvent, updateEvent, deleteEvent } = useEventsStore()

const showCreateModal = ref(false)
const creating = ref(false)

const newEvent = ref({
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
  price: 0,
  category: 'Technology',
  maxAttendees: 100,
  featured: false
})

const categoryOptions = [
  { label: 'Technology', value: 'Technology' },
  { label: 'Music', value: 'Music' },
  { label: 'Business', value: 'Business' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Arts', value: 'Arts' }
]

const organizerEvents = computed(() => {
  return getEventsByOrganizer(user.value?.id || '2')
})

const totalAttendees = computed(() => {
  return organizerEvents.value.reduce((sum, event) => sum + event.attendees, 0)
})

const totalRevenue = computed(() => {
  return organizerEvents.value.reduce((sum, event) => sum + (event.attendees * event.price), 0)
})

const createEvent = async () => {
  creating.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    addEvent({
      ...newEvent.value,
      organizerId: user.value?.id || '2',
      organizerName: user.value?.name || 'Event Organizer',
      attendees: 0,
      status: 'upcoming'
    })

    // Reset form
    newEvent.value = {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 0,
      category: 'Technology',
      maxAttendees: 100,
      featured: false
    }

    showCreateModal.value = false
  } finally {
    creating.value = false
  }
}

const refreshData = () => {
  // Simulate data refresh
  console.log('Refreshing data...')
}

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
      label: 'Delete',
      icon: 'heroicons:trash',
      click: () => {
        if (confirm('Are you sure you want to delete this event?')) {
          deleteEvent(event.id)
        }
      }
    }]
  ]
}

useHead({
  title: 'Organizer Dashboard - EventHub',
  meta: [
    { name: 'description', content: 'Manage your events and track performance from your organizer dashboard.' }
  ]
})
</script>