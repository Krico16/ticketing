<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Icon name="heroicons:calendar-days" class="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or 
          <NuxtLink to="/auth/signup" class="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </NuxtLink>
        </p>
      </div>

      <Card>
        <CardContent class="pt-6">
          <form @submit.prevent="handleSignIn" class="space-y-6">
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium text-foreground">Email address *</label>
              <Input 
                id="email"
                v-model="form.email" 
                type="email" 
                placeholder="Enter your email"
                :error-message="errors.email"
              />
            </div>

            <div class="space-y-2">
              <label for="password" class="text-sm font-medium text-foreground">Password *</label>
              <Input 
                id="password"
                v-model="form.password" 
                type="password" 
                placeholder="Enter your password"
                :error-message="errors.password"
              />
            </div>

            <div class="flex items-center justify-between">
              <UCheckbox v-model="form.remember" label="Remember me" />
              <a href="#" class="text-sm text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>

            <div>
              <Button 
                type="submit" 
                class="w-full"
                size="lg"
                :disabled="loading"
              >
                <span v-if="loading" class="mr-2">
                  <Icon name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
                </span>
                Sign in
              </Button>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Demo Accounts</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                class="w-full"
                @click="signInAs('admin')"
                :disabled="loading"
              >
                <Icon name="heroicons:shield-check" class="w-4 h-4 mr-2" />
                Sign in as Admin
              </Button>
              <Button 
                variant="outline" 
                class="w-full"
                @click="signInAs('organizer')"
                :disabled="loading"
              >
                <Icon name="heroicons:building-office" class="w-4 h-4 mr-2" />
                Sign in as Organizer
              </Button>
              <Button 
                variant="outline" 
                class="w-full"
                @click="signInAs('user')"
                :disabled="loading"
              >
                <Icon name="heroicons:user" class="w-4 h-4 mr-2" />
                Sign in as User
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'guest'
})

const { login } = useAuthStore()
const toast = useToast()

const loading = ref(false)
const form = ref({
  email: '',
  password: '',
  remember: false
})

const errors = ref({
  email: '',
  password: ''
})

const handleSignIn = async () => {
  // Reset errors
  errors.value = { email: '', password: '' }

  // Basic validation
  if (!form.value.email) {
    errors.value.email = 'Email is required'
    return
  }
  if (!form.value.password) {
    errors.value.password = 'Password is required'
    return
  }

  loading.value = true

  try {
    await login(form.value.email, form.value.password)
    
    toast.add({
      title: 'Welcome back!',
      description: 'You have been signed in successfully.',
      color: 'green'
    })

    await navigateTo('/')
  } catch (error) {
    toast.add({
      title: 'Sign in failed',
      description: 'Invalid email or password.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

const signInAs = async (role) => {
  const demoAccounts = {
    admin: { email: 'admin@example.com', password: 'password' },
    organizer: { email: 'organizer@example.com', password: 'password' },
    user: { email: 'user@example.com', password: 'password' }
  }

  const account = demoAccounts[role]
  form.value.email = account.email
  form.value.password = account.password
  
  await handleSignIn()
}

useHead({
  title: 'Sign In - EventHub',
  meta: [
    { name: 'description', content: 'Sign in to your EventHub account to manage events and bookings.' }
  ]
})
</script>