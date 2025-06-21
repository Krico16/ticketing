<template>
  <div v-if="event" class="py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <UButton 
        variant="ghost" 
        size="sm" 
        @click="$router.back()" 
        class="mb-6"
      >
        <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
        Back to Events
      </UButton>

      <!-- Event Header -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img :src="event.image" :alt="event.title" class="w-full h-64 md:h-96 object-cover" />
        
        <div class="p-8">
          <div class="flex items-start justify-between mb-6">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <UBadge :color="getCategoryColor(event.category)" variant="subtle">
                  {{ event.category }}
                </UBadge>
                <UBadge :color="getStatusColor(event.status)" variant="subtle">
                  {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
                </UBadge>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ event.title }}</h1>
              <p class="text-lg text-gray-600">{{ event.description }}</p>
            </div>
            <div class="text-right ml-8">
              <div class="text-3xl font-bold text-green-600 mb-2">${{ event.price }}</div>
              <div class="text-sm text-gray-500">per ticket</div>
            </div>
          </div>

          <!-- Event Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div class="space-y-4">
              <div class="flex items-center">
                <Icon name="heroicons:calendar-days" class="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div class="font-semibold">{{ formatDate(event.date) }}</div>
                  <div class="text-sm text-gray-500">{{ event.time }}</div>
                </div>
              </div>
              
              <div class="flex items-center">
                <Icon name="heroicons:map-pin" class="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div class="font-semibold">{{ event.location }}</div>
                  <div class="text-sm text-gray-500">View on map</div>
                </div>
              </div>
              
              <div class="flex items-center">
                <Icon name="heroicons:users" class="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div class="font-semibold">{{ event.attendees }}/{{ event.maxAttendees }} Attendees</div>
                  <div class="text-sm text-gray-500">{{ event.maxAttendees - event.attendees }} spots left</div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center">
                <Icon name="heroicons:user" class="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div class="font-semibold">Organized by</div>
                  <div class="text-sm text-gray-500">{{ event.organizerName }}</div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="font-semibold mb-2">Attendance Progress</h3>
                <div class="bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${(event.attendees / event.maxAttendees) * 100}%` }"
                  ></div>
                </div>
                <div class="text-sm text-gray-600">
                  {{ Math.round((event.attendees / event.maxAttendees) * 100) }}% full
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <UButton 
              size="lg" 
              :disabled="event.attendees >= event.maxAttendees || event.status !== 'upcoming'"
              class="flex-1"
            >
              <Icon name="heroicons:ticket" class="w-5 h-5 mr-2" />
              {{ event.attendees >= event.maxAttendees ? 'Sold Out' : 'Register Now' }}
            </UButton>
            
            <UButton variant="outline" size="lg">
              <Icon name="heroicons:heart" class="w-5 h-5 mr-2" />
              Save Event
            </UButton>
            
            <UButton variant="outline" size="lg">
              <Icon name="heroicons:share" class="w-5 h-5 mr-2" />
              Share
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center py-12">
        <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">Event Not Found</h2>
        <p class="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <UButton to="/events">Back to Events</UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getEventById } = useEventsStore()

const event = computed(() => getEventById(route.params.id))

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCategoryColor = (category) => {
  const colors = {
    'Technology': 'blue',
    'Music': 'purple',
    'Business': 'green',
    'Sports': 'orange',
    'Arts': 'pink'
  }
  return colors[category] || 'gray'
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

useHead(() => ({
  title: event.value ? `${event.value.title} - EventHub` : 'Event Not Found - EventHub',
  meta: [
    { name: 'description', content: event.value?.description || 'Event details not available' }
  ]
}))
</script>