<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black/50 transition-opacity"
      @click="handleBackdropClick"
    />
    
    <!-- Dialog Content -->
    <div 
      class="relative bg-background rounded-lg shadow-lg max-w-md w-full mx-4 p-6"
      role="dialog"
      :aria-labelledby="titleId"
      :aria-describedby="descriptionId"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

interface DialogProps {
  open?: boolean
  modal?: boolean
}

const props = withDefaults(defineProps<DialogProps>(), {
  open: false,
  modal: true
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
}>()

// Generate unique IDs for accessibility
const titleId = computed(() => `dialog-title-${Math.random().toString(36).substr(2, 9)}`)
const descriptionId = computed(() => `dialog-description-${Math.random().toString(36).substr(2, 9)}`)

// Handle backdrop click
const handleBackdropClick = () => {
  if (props.modal) {
    emit('update:open', false)
    emit('close')
  }
}

// Handle escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.open) {
    emit('update:open', false)
    emit('close')
  }
}

// Lifecycle hooks for keyboard handling
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

// Provide context for child components
provide('dialogTitleId', titleId)
provide('dialogDescriptionId', descriptionId)
</script>