<template>
  <div class="space-y-2">
    <input
      :id="inputId"
      ref="inputRef"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="inputClass"
      :value="modelValue"
      v-bind="$attrs"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <div v-if="errorMessage" class="text-sm text-destructive">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { cn } from '~/lib/utils'
import { cva } from 'class-variance-authority'

// Input variants using class-variance-authority
const inputVariants = cva(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive'
      },
      size: {
        default: 'h-9',
        sm: 'h-8 text-xs',
        lg: 'h-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

// TypeScript interfaces
interface InputProps {
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  variant?: 'default' | 'error'
  size?: 'default' | 'sm' | 'lg'
  errorMessage?: string
  id?: string
}

// Props definition
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  variant: 'default',
  size: 'default',
  disabled: false,
  readonly: false
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
}>()

// Refs
const inputRef = ref<HTMLInputElement>()

// Computed properties
const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)

const inputClass = computed(() => {
  const variant = props.errorMessage ? 'error' : props.variant
  return cn(inputVariants({ variant, size: props.size }))
})

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
  emit('input', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// Expose input ref for parent components
defineExpose({
  inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>