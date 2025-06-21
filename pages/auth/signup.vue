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

      <UCard>
        <form @submit.prevent="handleSignUp" class="space-y-6">
          <div>
            <UFormGroup label="Full name" required>
              <UInput 
                v-model="form.name" 
                placeholder="Enter your full name"
                :error="errors.name"
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup label="Email address" required>
              <UInput 
                v-model="form.email" 
                type="email" 
                placeholder="Enter your email"
                :error="errors.email"
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup label="Password" required>
              <UInput 
                v-model="form.password" 
                type="password" 
                placeholder="Create a password"
                :error="errors.password"
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup label="Confirm password" required>
              <UInput 
                v-model="form.confirmPassword" 
                type="password" 
                placeholder="Confirm your password"
                :error="errors.confirmPassword"
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup label="Account type">
              <URadioGroup 
                v-model="form.role"
                :options="roleOptions"
              />
            </UFormGroup>
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
            <UButton 
              type="submit" 
              block 
              size="lg"
              :loading="loading"
            >
              Create account
            </UButton>
          </div>
        </form>
      </UCard>
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