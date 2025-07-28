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
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or 
          <NuxtLink to="/auth/signin" class="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </NuxtLink>
        </p>
      </div>

      <Card>
        <CardContent class="pt-6">
          <form @submit.prevent="handleSignUp" class="space-y-6">
            <div class="space-y-2">
              <label for="name" class="text-sm font-medium text-foreground">Full name *</label>
              <Input 
                id="name"
                v-model="form.name" 
                placeholder="Enter your full name"
                :error-message="errors.name"
              />
            </div>

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
                placeholder="Create a password"
                :error-message="errors.password"
              />
            </div>

            <div class="space-y-2">
              <label for="confirmPassword" class="text-sm font-medium text-foreground">Confirm password *</label>
              <Input 
                id="confirmPassword"
                v-model="form.confirmPassword" 
                type="password" 
                placeholder="Confirm your password"
                :error-message="errors.confirmPassword"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Account type</label>
              <URadioGroup 
                v-model="form.role"
                :options="roleOptions"
              />
            </div>

            <div class="flex items-start">
              <UCheckbox 
                v-model="form.acceptTerms" 
                :error="errors.acceptTerms"
              />
              <div class="ml-3 text-sm">
                <label class="text-gray-600">
                  I agree to the 
                  <a href="#" class="text-blue-600 hover:text-blue-500">Terms of Service</a>
                  and 
                  <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                </label>
              </div>
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
                Create account
              </Button>
            </div>
          </form>
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

const { register } = useAuthStore()
const toast = useToast()

const loading = ref(false)
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user',
  acceptTerms: false
})

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: ''
})

const roleOptions = [
  { value: 'user', label: 'Event Attendee' },
  { value: 'organizer', label: 'Event Organizer' }
]

const handleSignUp = async () => {
  // Reset errors
  errors.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: ''
  }

  // Validation
  let hasErrors = false

  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
    hasErrors = true
  }

  if (!form.value.email) {
    errors.value.email = 'Email is required'
    hasErrors = true
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    hasErrors = true
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required'
    hasErrors = true
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    hasErrors = true
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
    hasErrors = true
  }

  if (!form.value.acceptTerms) {
    errors.value.acceptTerms = 'You must accept the terms and conditions'
    hasErrors = true
  }

  if (hasErrors) return

  loading.value = true

  try {
    await register(form.value.name, form.value.email, form.value.password)
    
    toast.add({
      title: 'Account created!',
      description: 'Welcome to EventHub! Your account has been created successfully.',
      color: 'green'
    })

    await navigateTo('/')
  } catch (error) {
    toast.add({
      title: 'Sign up failed',
      description: 'There was an error creating your account. Please try again.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Sign Up - EventHub',
  meta: [
    { name: 'description', content: 'Create your EventHub account to start discovering and managing events.' }
  ]
})
</script>