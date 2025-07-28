<template>
  <div class="container mx-auto p-8 space-y-12">
    <div>
      <h1 class="text-3xl font-bold mb-6">Shadcn Components Demo</h1>
      <p class="text-muted-foreground mb-8">
        Demonstration of Shadcn UI components integrated with Nuxt 3, including form validation with Vee-Validate and Zod.
      </p>
    </div>

    <!-- Input Component Demo -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold">Input Component</h2>
      
      <!-- Basic Input Examples -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Basic Inputs</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Default Input</label>
            <Input v-model="basicInputs.default" placeholder="Enter text..." />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Email Input</label>
            <Input v-model="basicInputs.email" type="email" placeholder="Enter email..." />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Password Input</label>
            <Input v-model="basicInputs.password" type="password" placeholder="Enter password..." />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Number Input</label>
            <Input v-model="basicInputs.number" type="number" placeholder="Enter number..." />
          </div>
        </div>
      </div>

      <!-- Input Sizes -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Input Sizes</h3>
        <div class="space-y-3">
          <Input v-model="sizeInputs.small" size="sm" placeholder="Small input" />
          <Input v-model="sizeInputs.default" size="default" placeholder="Default input" />
          <Input v-model="sizeInputs.large" size="lg" placeholder="Large input" />
        </div>
      </div>

      <!-- Input States -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Input States</h3>
        <div class="space-y-3">
          <Input v-model="stateInputs.normal" placeholder="Normal state" />
          <Input v-model="stateInputs.error" placeholder="Error state" error-message="This field has an error" />
          <Input v-model="stateInputs.disabled" placeholder="Disabled state" disabled />
          <Input v-model="stateInputs.readonly" placeholder="Readonly state" readonly />
        </div>
      </div>
    </section>

    <!-- Form Validation Demo -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold">Form Validation with Vee-Validate & Zod</h2>
      
      <div class="max-w-md">
        <form @submit="onSubmit" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Name *</label>
            <Input 
              v-model="nameField.value.value"
              :error-message="nameField.errorMessage.value"
              placeholder="Enter your full name"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Email *</label>
            <Input 
              v-model="emailField.value.value"
              :error-message="emailField.errorMessage.value"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Age</label>
            <Input 
              v-model="ageField.value.value"
              :error-message="ageField.errorMessage.value"
              type="number"
              placeholder="Enter your age"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Password *</label>
            <Input 
              v-model="passwordField.value.value"
              :error-message="passwordField.errorMessage.value"
              type="password"
              placeholder="Enter password"
            />
          </div>
          
          <div class="flex gap-2">
            <Button type="submit" :disabled="!meta.valid">
              Submit Form
            </Button>
            <Button type="button" variant="outline" @click="resetForm">
              Reset
            </Button>
          </div>
          
          <div v-if="formSubmitted" class="p-4 bg-green-50 border border-green-200 rounded-md">
            <p class="text-green-800 text-sm">Form submitted successfully!</p>
            <pre class="text-xs mt-2 text-green-700">{{ JSON.stringify(submittedData, null, 2) }}</pre>
          </div>
        </form>
      </div>
    </section>

    <!-- Button Component Demo -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold">Button Component</h2>
      
      <!-- Button Variants -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Button Variants</h3>
        <div class="flex flex-wrap gap-4">
          <Button variant="default" @click="handleClick('default')">Default</Button>
          <Button variant="destructive" @click="handleClick('destructive')">Destructive</Button>
          <Button variant="outline" @click="handleClick('outline')">Outline</Button>
          <Button variant="secondary" @click="handleClick('secondary')">Secondary</Button>
          <Button variant="ghost" @click="handleClick('ghost')">Ghost</Button>
          <Button variant="link" @click="handleClick('link')">Link</Button>
        </div>
      </div>

      <!-- Button Sizes -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Button Sizes</h3>
        <div class="flex flex-wrap items-center gap-4">
          <Button size="sm" @click="handleClick('small')">Small</Button>
          <Button size="default" @click="handleClick('default size')">Default</Button>
          <Button size="lg" @click="handleClick('large')">Large</Button>
          <Button size="icon" @click="handleClick('icon')">🔥</Button>
        </div>
      </div>

      <!-- Disabled State -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Disabled State</h3>
        <div class="flex flex-wrap gap-4">
          <Button disabled @click="handleClick('disabled')">Disabled Default</Button>
          <Button variant="destructive" disabled @click="handleClick('disabled destructive')">Disabled Destructive</Button>
          <Button variant="outline" disabled @click="handleClick('disabled outline')">Disabled Outline</Button>
        </div>
      </div>
    </section>

    <!-- Lazy-Loaded Components Demo -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold">Lazy-Loaded Components</h2>
      <p class="text-muted-foreground">
        These components are loaded on-demand for better performance.
      </p>
      
      <!-- Dialog Component Demo -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Dialog Component</h3>
        <div class="flex gap-4">
          <Button @click="showDialog = true" variant="outline">
            Open Dialog
          </Button>
        </div>
        
        <Suspense>
          <template #default>
            <Dialog v-model:open="showDialog">
              <div class="space-y-4">
                <h3 class="text-lg font-semibold">Lazy-Loaded Dialog</h3>
                <p class="text-muted-foreground">
                  This dialog component was loaded on-demand when you first clicked the button.
                  This helps reduce the initial bundle size.
                </p>
                <div class="flex gap-2 justify-end">
                  <Button variant="outline" @click="showDialog = false">
                    Cancel
                  </Button>
                  <Button @click="showDialog = false">
                    Confirm
                  </Button>
                </div>
              </div>
            </Dialog>
          </template>
          <template #fallback>
            <div class="text-sm text-muted-foreground">Loading dialog...</div>
          </template>
        </Suspense>
      </div>

      <!-- Select Component Demo -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Select Component</h3>
        <div class="max-w-xs">
          <Suspense>
            <template #default>
              <Select 
                v-model="selectedOption" 
                :options="selectOptions" 
                placeholder="Choose an option..."
                @change="handleSelectChange"
              />
            </template>
            <template #fallback>
              <div class="text-sm text-muted-foreground">Loading select...</div>
            </template>
          </Suspense>
        </div>
        <div v-if="selectedOption" class="text-sm text-muted-foreground">
          Selected: {{ selectOptions.find(opt => opt.value === selectedOption)?.label }}
        </div>
      </div>
    </section>

    <!-- Values Display -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Current Values</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-medium mb-2">Basic Inputs</h3>
          <pre class="text-xs bg-gray-100 p-3 rounded">{{ JSON.stringify(basicInputs, null, 2) }}</pre>
        </div>
        <div>
          <h3 class="text-lg font-medium mb-2">Form Values</h3>
          <pre class="text-xs bg-gray-100 p-3 rounded">{{ JSON.stringify(values, null, 2) }}</pre>
        </div>
        <div>
          <h3 class="text-lg font-medium mb-2">Lazy Component Values</h3>
          <pre class="text-xs bg-gray-100 p-3 rounded">{{ JSON.stringify({ selectedOption, showDialog }, null, 2) }}</pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import Button from '~/components/ui/button.vue'
import Input from '~/components/ui/input.vue'
import { loadComponent } from '~/lib/component-loader'

// Lazy load complex components for better performance
const Dialog = loadComponent('Dialog')
const Select = loadComponent('Select')

// Page meta
useHead({
  title: 'Components Demo - EventHub'
})

// Basic input examples
const basicInputs = ref({
  default: '',
  email: '',
  password: '',
  number: 0
})

const sizeInputs = ref({
  small: '',
  default: '',
  large: ''
})

const stateInputs = ref({
  normal: '',
  error: 'This has an error',
  disabled: 'Cannot edit this',
  readonly: 'Read only value'
})

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  age: z.number().min(13, 'Must be at least 13 years old').max(120, 'Must be less than 120 years old').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be less than 100 characters')
})

// Form validation setup
const { handleSubmit, resetForm, values, meta, createField } = useFormValidation(formSchema, {
  name: '',
  email: '',
  age: undefined,
  password: ''
})

// Create form fields
const nameField = createField('name')
const emailField = createField('email')
const ageField = createField('age')
const passwordField = createField('password')

// Form submission
const formSubmitted = ref(false)
const submittedData = ref({})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values)
  formSubmitted.value = true
  submittedData.value = values
  
  // Show success toast
  const toast = useToast()
  toast.add({
    title: 'Form Submitted',
    description: 'Your form has been submitted successfully!',
    color: 'green'
  })
  
  // Reset form after 3 seconds
  setTimeout(() => {
    formSubmitted.value = false
    resetForm()
  }, 3000)
})

// Lazy-loaded component state
const showDialog = ref(false)
const selectedOption = ref('')
const selectOptions = ref([
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
])

// Button click handler
const handleClick = (buttonType: string) => {
  console.log(`${buttonType} button clicked!`)
  
  const toast = useToast()
  toast.add({
    title: 'Button Clicked',
    description: `You clicked the ${buttonType} button!`,
    timeout: 2000
  })
}

// Select change handler
const handleSelectChange = (value: string | number) => {
  console.log('Select changed:', value)
  
  const toast = useToast()
  toast.add({
    title: 'Selection Changed',
    description: `You selected: ${selectOptions.value.find(opt => opt.value === value)?.label}`,
    timeout: 2000
  })
}
</script>