<template>
  <div :class="cardHeaderClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/lib/utils'

// TypeScript interface
interface CardHeaderProps {
  class?: string
}

// Props definition
const props = withDefaults(defineProps<CardHeaderProps>(), {})

// Card header styles
const cardHeaderClass = computed(() => {
  return cn('flex flex-col space-y-1.5 p-6', props.class)
})
</script>