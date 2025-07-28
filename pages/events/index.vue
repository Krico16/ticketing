<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">All Events</h1>
        <p class="text-lg text-gray-600">Discover amazing events happening in your area</p>
      </div>

      <!-- Filters -->
      <Card class="mb-8">
        <CardContent class="pt-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="relative">
              <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input v-model="searchQuery" placeholder="Search events..." class="pl-10" />
            </div>
            <USelect v-model="selectedCategory" :options="categoryOptions" placeholder="All Categories" />
            <Input v-model="selectedDate" type="date" />
            <Button @click="clearFilters" variant="outline">
              <Icon name="heroicons:x-mark" class="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Events Grid -->
      <div v-if="filteredEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="event in filteredEvents" :key="event.id" class="overflow-hidden hover:shadow-lg transition-shadow">
          <img :src="event.image" :alt="event.title" class="w-full h-48 object-cover" />
          <CardContent class="p-6">
            <div class="flex items-center justify-between mb-2">
              <UBadge :color="getCategoryColor(event.category)" variant="subtle">
                {{ event.category }}
              </UBadge>
              <span class="text-lg font-bold text-green-600">${{ event.price }}</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ event.title }}</h3>
            <p class="text-gray-600 mb-4 line-clamp-2">{{ event.description }}</p>
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm text-gray-500">
                <Icon name="heroicons:calendar-days" class="w-4 h-4 mr-2" />
                <span>{{ formatDate(event.date) }} at {{ event.time }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <Icon name="heroicons:map-pin" class="w-4 h-4 mr-2" />
                <span>{{ event.location }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <Icon name="heroicons:users" class="w-4 h-4 mr-2" />
                <span>{{ event.attendees }}/{{ event.maxAttendees }} attendees</span>
              </div>
            </div>
            <NuxtLink :to="`/events/${event.id}`" class="block">
              <Button class="w-full">
                View Details
              </Button>
            </NuxtLink>
          </CardContent>
        </Card>
      </div>

      <!-- No Events Found -->
      <div v-else class="text-center py-12">
        <Icon name="heroicons:calendar-x-mark" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
        <p class="text-gray-600">Try adjusting your search criteria or check back later for new events.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedDate = ref('')

const categoryOptions = [
  { label: 'All Categories', value: '' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Music', value: 'Music' },
  { label: 'Business', value: 'Business' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Arts', value: 'Arts' }
]

const filteredEvents = computed(() => {
  const { events } = useEventsStore()

  let filtered = [...events]

  if(searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((event) => 
    event.title.toLowerCase().includes(query) ||
    event.description.toLowerCase().includes(query) ||
    event.location.toLowerCase().includes(query)
   )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(event => event.category === selectedCategory.value)
  }

  if (selectedDate.value) {
    filtered = filtered.filter(event => event.date === selectedDate.value)
  }

  return filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedDate.value = ''
}

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

useHead({
  title: 'All Events - EventHub',
  meta: [
    { name: 'description', content: 'Browse all available events and find the perfect experience for you.' }
  ]
})
</script>