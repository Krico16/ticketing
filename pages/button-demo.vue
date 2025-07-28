<template>
  <div class="container mx-auto p-8 space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-6">Shadcn Button Component Demo</h1>
      
      <!-- Button Variants -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Button Variants</h2>
        <div class="flex flex-wrap gap-4">
          <Button variant="default" @click="handleClick('default')">Default</Button>
          <Button variant="destructive" @click="handleClick('destructive')">Destructive</Button>
          <Button variant="outline" @click="handleClick('outline')">Outline</Button>
          <Button variant="secondary" @click="handleClick('secondary')">Secondary</Button>
          <Button variant="ghost" @click="handleClick('ghost')">Ghost</Button>
          <Button variant="link" @click="handleClick('link')">Link</Button>
        </div>
      </section>

      <!-- Button Sizes -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Button Sizes</h2>
        <div class="flex flex-wrap items-center gap-4">
          <Button size="sm" @click="handleClick('small')">Small</Button>
          <Button size="default" @click="handleClick('default size')">Default</Button>
          <Button size="lg" @click="handleClick('large')">Large</Button>
          <Button size="icon" @click="handleClick('icon')">🔥</Button>
        </div>
      </section>

      <!-- Disabled State -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Disabled State</h2>
        <div class="flex flex-wrap gap-4">
          <Button disabled @click="handleClick('disabled')">Disabled Default</Button>
          <Button variant="destructive" disabled @click="handleClick('disabled destructive')">Disabled Destructive</Button>
          <Button variant="outline" disabled @click="handleClick('disabled outline')">Disabled Outline</Button>
        </div>
      </section>

      <!-- Combination Examples -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Combinations</h2>
        <div class="flex flex-wrap gap-4">
          <Button variant="destructive" size="sm" @click="handleClick('small destructive')">Small Destructive</Button>
          <Button variant="outline" size="lg" @click="handleClick('large outline')">Large Outline</Button>
          <Button variant="secondary" size="icon" @click="handleClick('secondary icon')">⚙️</Button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import the Button component
import Button from '~/components/ui/button.vue'

// Page meta
useHead({
  title: 'Button Demo - EventHub'
})

// Click handler
const handleClick = (buttonType: string) => {
  console.log(`${buttonType} button clicked!`)
  
  // Show toast notification if available
  const toast = inject('toast') as any
  if (toast) {
    toast.add({
      title: 'Button Clicked',
      description: `You clicked the ${buttonType} button!`,
      timeout: 2000
    })
  }
}
</script>