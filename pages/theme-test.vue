<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="container mx-auto p-8 space-y-8">
      <!-- Header with theme toggle -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Theme Compatibility Test</h1>
          <p class="text-muted-foreground">Testing Shadcn components in light and dark themes</p>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm">Current theme: {{ $colorMode.value }}</span>
          <Button @click="toggleTheme" variant="outline">
            {{ $colorMode.value === 'dark' ? '☀️ Light' : '🌙 Dark' }}
          </Button>
        </div>
      </div>

      <!-- CSS Custom Properties Display -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">CSS Custom Properties</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="color in colorProperties" :key="color.name" class="space-y-2">
            <div class="text-sm font-medium">{{ color.name }}</div>
            <div 
              class="h-12 rounded border"
              :style="{ backgroundColor: color.value }"
            ></div>
            <div class="text-xs text-muted-foreground font-mono">{{ color.value }}</div>
          </div>
        </div>
      </section>

      <!-- Button Component Theme Test -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Button Component</h2>
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-medium mb-3">All Variants</h3>
            <div class="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-3">All Sizes</h3>
            <div class="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔥</Button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Disabled States</h3>
            <div class="flex flex-wrap gap-3">
              <Button disabled>Default Disabled</Button>
              <Button variant="destructive" disabled>Destructive Disabled</Button>
              <Button variant="outline" disabled>Outline Disabled</Button>
            </div>
          </div>
        </div>
      </section>

      <!-- Card Component Theme Test -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Card Component</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card class="p-6">
            <CardHeader>
              <h3 class="text-lg font-semibold">Basic Card</h3>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">This is a basic card with header and content.</p>
            </CardContent>
          </Card>

          <Card class="p-6">
            <CardHeader>
              <h3 class="text-lg font-semibold">Card with Footer</h3>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">This card includes a footer section.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card class="p-6 border-destructive">
            <CardHeader>
              <h3 class="text-lg font-semibold text-destructive">Error Card</h3>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">This card shows error styling.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Input Component Theme Test -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Input Component</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Input States</h3>
            <div class="space-y-3">
              <Input v-model="testInputs.normal" placeholder="Normal input" />
              <Input v-model="testInputs.error" placeholder="Error input" error-message="This field has an error" />
              <Input v-model="testInputs.disabled" placeholder="Disabled input" disabled />
              <Input v-model="testInputs.readonly" placeholder="Readonly input" readonly />
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium">Input Sizes</h3>
            <div class="space-y-3">
              <Input v-model="testInputs.small" size="sm" placeholder="Small input" />
              <Input v-model="testInputs.default" size="default" placeholder="Default input" />
              <Input v-model="testInputs.large" size="lg" placeholder="Large input" />
            </div>
          </div>
        </div>
      </section>

      <!-- Theme Transition Test -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Theme Transition Test</h2>
        <div class="space-y-4">
          <p class="text-muted-foreground">
            Click the theme toggle button multiple times to test smooth transitions between themes.
          </p>
          <div class="flex gap-4">
            <Button @click="toggleTheme" variant="default">Toggle Theme</Button>
            <Button @click="setLightTheme" variant="outline">Force Light</Button>
            <Button @click="setDarkTheme" variant="outline">Force Dark</Button>
          </div>
          <div class="p-4 border rounded-lg bg-card">
            <p class="text-card-foreground">
              This card should smoothly transition between light and dark themes.
              Current theme: <span class="font-mono">{{ $colorMode.value }}</span>
            </p>
          </div>
        </div>
      </section>

      <!-- Color Contrast Test -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Color Contrast Test</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-3">
            <div class="p-4 bg-primary text-primary-foreground rounded">
              Primary background with primary foreground text
            </div>
            <div class="p-4 bg-secondary text-secondary-foreground rounded">
              Secondary background with secondary foreground text
            </div>
            <div class="p-4 bg-destructive text-destructive-foreground rounded">
              Destructive background with destructive foreground text
            </div>
          </div>
          <div class="space-y-3">
            <div class="p-4 bg-muted text-muted-foreground rounded">
              Muted background with muted foreground text
            </div>
            <div class="p-4 bg-accent text-accent-foreground rounded">
              Accent background with accent foreground text
            </div>
            <div class="p-4 bg-card text-card-foreground border rounded">
              Card background with card foreground text
            </div>
          </div>
        </div>
      </section>

      <!-- Test Results -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Test Results</h2>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="w-4 h-4 rounded-full" :class="themeTests.cssProperties ? 'bg-green-500' : 'bg-red-500'"></span>
            <span>CSS Custom Properties Applied: {{ themeTests.cssProperties ? 'PASS' : 'FAIL' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-4 h-4 rounded-full" :class="themeTests.themeToggle ? 'bg-green-500' : 'bg-red-500'"></span>
            <span>Theme Toggle Functionality: {{ themeTests.themeToggle ? 'PASS' : 'FAIL' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-4 h-4 rounded-full" :class="themeTests.componentStyling ? 'bg-green-500' : 'bg-red-500'"></span>
            <span>Component Theme Styling: {{ themeTests.componentStyling ? 'PASS' : 'FAIL' }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button.vue'
import Card from '~/components/ui/card.vue'
import CardHeader from '~/components/ui/card-header.vue'
import CardContent from '~/components/ui/card-content.vue'
import CardFooter from '~/components/ui/card-footer.vue'
import Input from '~/components/ui/input.vue'

// Page meta
useHead({
  title: 'Theme Test - EventHub'
})

// Test inputs
const testInputs = ref({
  normal: '',
  error: 'Error value',
  disabled: 'Disabled value',
  readonly: 'Readonly value',
  small: '',
  default: '',
  large: ''
})

// Color properties for display
const colorProperties = computed(() => {
  if (process.client) {
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    
    return [
      { name: 'Background', value: `hsl(${computedStyle.getPropertyValue('--background')})` },
      { name: 'Foreground', value: `hsl(${computedStyle.getPropertyValue('--foreground')})` },
      { name: 'Primary', value: `hsl(${computedStyle.getPropertyValue('--primary')})` },
      { name: 'Primary Foreground', value: `hsl(${computedStyle.getPropertyValue('--primary-foreground')})` },
      { name: 'Secondary', value: `hsl(${computedStyle.getPropertyValue('--secondary')})` },
      { name: 'Secondary Foreground', value: `hsl(${computedStyle.getPropertyValue('--secondary-foreground')})` },
      { name: 'Destructive', value: `hsl(${computedStyle.getPropertyValue('--destructive')})` },
      { name: 'Destructive Foreground', value: `hsl(${computedStyle.getPropertyValue('--destructive-foreground')})` },
      { name: 'Muted', value: `hsl(${computedStyle.getPropertyValue('--muted')})` },
      { name: 'Muted Foreground', value: `hsl(${computedStyle.getPropertyValue('--muted-foreground')})` },
      { name: 'Accent', value: `hsl(${computedStyle.getPropertyValue('--accent')})` },
      { name: 'Accent Foreground', value: `hsl(${computedStyle.getPropertyValue('--accent-foreground')})` },
      { name: 'Card', value: `hsl(${computedStyle.getPropertyValue('--card')})` },
      { name: 'Card Foreground', value: `hsl(${computedStyle.getPropertyValue('--card-foreground')})` },
      { name: 'Border', value: `hsl(${computedStyle.getPropertyValue('--border')})` },
      { name: 'Input', value: `hsl(${computedStyle.getPropertyValue('--input')})` },
      { name: 'Ring', value: `hsl(${computedStyle.getPropertyValue('--ring')})` }
    ]
  }
  return []
})

// Theme functions
const toggleTheme = () => {
  $colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'
  runThemeTests()
}

const setLightTheme = () => {
  $colorMode.preference = 'light'
  runThemeTests()
}

const setDarkTheme = () => {
  $colorMode.preference = 'dark'
  runThemeTests()
}

// Test results
const themeTests = ref({
  cssProperties: false,
  themeToggle: false,
  componentStyling: false
})

// Run theme tests
const runThemeTests = () => {
  if (process.client) {
    nextTick(() => {
      // Test 1: CSS Properties Applied
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)
      const backgroundValue = computedStyle.getPropertyValue('--background').trim()
      themeTests.value.cssProperties = backgroundValue !== ''

      // Test 2: Theme Toggle Functionality
      const isDark = document.documentElement.classList.contains('dark')
      const colorModeValue = $colorMode.value
      themeTests.value.themeToggle = (isDark && colorModeValue === 'dark') || (!isDark && colorModeValue === 'light')

      // Test 3: Component Styling
      const buttonElement = document.querySelector('button')
      if (buttonElement) {
        const buttonStyles = getComputedStyle(buttonElement)
        const backgroundColor = buttonStyles.backgroundColor
        themeTests.value.componentStyling = backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent'
      }
    })
  }
}

// Run tests on mount and theme change
onMounted(() => {
  runThemeTests()
})

watch(() => $colorMode.value, () => {
  runThemeTests()
})
</script>