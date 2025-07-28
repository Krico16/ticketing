<template>
  <div :class="cardContentClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/lib/utils'

// TypeScript interface
interface CardContentProps {
  class?: string
}

// Props definition
const props = withDefaults(defineProps<CardContentProps>(), {})

// Card content styles
const cardContentClass = computed(() => {
  return cn('p-6 pt-0', props.class)
})
</script>