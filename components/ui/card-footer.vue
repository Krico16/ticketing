<template>
  <div :class="cardFooterClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/lib/utils'

// TypeScript interface
interface CardFooterProps {
  class?: string
}

// Props definition
const props = withDefaults(defineProps<CardFooterProps>(), {})

// Card footer styles
const cardFooterClass = computed(() => {
  return cn('flex items-center p-6 pt-0', props.class)
})
</script>