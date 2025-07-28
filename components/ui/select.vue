<template>
  <div class="relative">
    <button
      ref="triggerRef"
      type="button"
      :class="selectClass"
      :disabled="disabled"
      @click="toggleOpen"
      @keydown="handleKeydown"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
    >
      <span class="block truncate">{{ displayValue || placeholder }}</span>
      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto"
      role="listbox"
    >
      <div
        v-for="(option, index) in options"
        :key="option.value"
        class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-accent hover:text-accent-foreground"
        :class="{ 'bg-accent text-accent-foreground': index === highlightedIndex }"
        @click="selectOption(option)"
        role="option"
        :aria-selected="modelValue === option.value"
      >
        <span class="block truncate">{{ option.label }}</span>
        <span
          v-if="modelValue === option.value"
          class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { cn } from '~/lib/utils'

interface SelectOption {
  value: string | number
  label: string
}

interface SelectProps {
  modelValue?: string | number
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  placeholder: 'Select an option...',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

// Refs
const triggerRef = ref<HTMLButtonElement>()
const isOpen = ref(false)
const highlightedIndex = ref(-1)

// Computed
const selectClass = computed(() => {
  return cn(
    'relative w-full cursor-default rounded-md border border-input bg-background py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm',
    props.disabled && 'cursor-not-allowed opacity-50',
    props.class
  )
})

const displayValue = computed(() => {
  const selected = props.options.find(option => option.value === props.modelValue)
  return selected?.label || ''
})

// Methods
const toggleOpen = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      highlightedIndex.value = props.options.findIndex(option => option.value === props.modelValue)
    }
  }
}

const selectOption = (option: SelectOption) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
  highlightedIndex.value = -1
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (isOpen.value && highlightedIndex.value >= 0) {
        selectOption(props.options[highlightedIndex.value])
      } else {
        toggleOpen()
      }
      break
    case 'Escape':
      isOpen.value = false
      highlightedIndex.value = -1
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        toggleOpen()
      } else {
        highlightedIndex.value = Math.min(highlightedIndex.value + 1, props.options.length - 1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (isOpen.value) {
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      }
      break
  }
}

const handleClickOutside = (event: Event) => {
  if (triggerRef.value && !triggerRef.value.contains(event.target as Node)) {
    isOpen.value = false
    highlightedIndex.value = -1
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>