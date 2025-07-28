<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Events
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Connect with your community through unforgettable experiences
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" class="bg-white text-blue-600 hover:bg-gray-50" @click="navigateTo('/events')">
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5 mr-2" />
              Browse Events
            </Button>
            <Button v-if="!isAuthenticated" size="lg" variant="outline" class="border-white text-white hover:bg-white hover:text-blue-600" @click="navigateTo('/auth/signup')">
              <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Events -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Events</h2>
          <p class="text-lg text-gray-600">Don't miss out on these amazing upcoming events</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="event in featuredEvents" :key="event.id" class="overflow-hidden hover:shadow-lg transition-shadow">
            <img :src="event.image" :alt="event.title" class="w-full h-48 object-cover" />
            <CardContent class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-blue-600 font-semibold">{{ event.category }}</span>
                <span class="text-sm text-gray-500">${{ event.price }}</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ event.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ event.description }}</p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <Icon name="heroicons:calendar-days" class="w-4 h-4 mr-1" />
                <span class="mr-4">{{ formatDate(event.date) }}</span>
                <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                <span>{{ event.location }}</span>
              </div>
              <NuxtLink :to="`/events/${event.id}`" class="block">
                <Button class="w-full">
                  View Details
                </Button>
              </NuxtLink>
            </CardContent>
          </Card>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/events">
            <Button size="lg" variant="outline">
              View All Events
              <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2" />
            </Button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-gray-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-blue-400 mb-2">{{ allEvents.length }}+</div>
            <div class="text-lg text-gray-300">Events Hosted</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-blue-400 mb-2">10k+</div>
            <div class="text-lg text-gray-300">Happy Attendees</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-blue-400 mb-2">500+</div>
            <div class="text-lg text-gray-300">Event Organizers</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-blue-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Ready to Host Your Event?</h2>
        <p class="text-lg text-gray-600 mb-8">Join thousands of organizers who trust EventHub to manage their events</p>
        <Button v-if="!isAuthenticated" size="lg" @click="navigateTo('/auth/signup')">
          Get Started Today
        </Button>
        <Button v-else-if="hasRole('organizer') || hasRole('admin')" size="lg" @click="navigateTo('/organizer')">
          Go to Dashboard
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup>
const { isAuthenticated, hasRole } = useAuthStore()
const { events: allEvents, getFeaturedEvents } = useEventsStore()

const featuredEvents = computed(() => getFeaturedEvents())

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: 'EventHub - Discover Amazing Events',
  meta: [
    { name: 'description', content: 'Discover and manage amazing events in your community. Connect with people through unforgettable experiences.' }
  ]
})
</script>