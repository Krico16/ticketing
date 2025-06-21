<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:calendar-days" class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-bold text-gray-900">EventHub</span>
            </NuxtLink>
          </div>

          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/events" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Events
            </NuxtLink>

            <template v-if="isAuthenticated">
              <NuxtLink v-if="hasRole('organizer') || hasRole('admin')" to="/organizer" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Dashboard
              </NuxtLink>
              <NuxtLink v-if="hasRole('admin')" to="/admin" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Admin
              </NuxtLink>
              
              <UDropdown :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
                <UAvatar :alt="user?.name" size="sm" class="cursor-pointer" />
              </UDropdown>
            </template>
            
            <template v-else>
              <NuxtLink to="/auth/signin" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Sign In
              </NuxtLink>
              <NuxtLink to="/auth/signup" class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                Sign Up
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:calendar-days" class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-bold">EventHub</span>
            </div>
            <p class="text-gray-400 mb-4">The premier platform for discovering and managing events. Connect with your community through memorable experiences.</p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/events" class="text-gray-400 hover:text-white transition-colors">Browse Events</NuxtLink></li>
              <li><NuxtLink to="/auth/signup" class="text-gray-400 hover:text-white transition-colors">Create Account</NuxtLink></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <ul class="space-y-2">
              <li class="text-gray-400">support@eventhub.com</li>
              <li class="text-gray-400">1-800-EVENTS</li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 EventHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const { user, isAuthenticated, hasRole, logout } = useAuthStore()

const userMenuItems = [
  [{
    label: 'Profile',
    icon: 'heroicons:user',
    click: () => navigateTo('/profile')
  }],
  [{
    label: 'Sign out',
    icon: 'heroicons:arrow-left-on-rectangle',
    click: () => {
      logout()
      navigateTo('/')
    }
  }]
]
</script>