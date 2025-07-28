<template>
  <div :class="cardClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/lib/utils'

// TypeScript interface
interface CardProps {
  class?: string
}

// Props definition
const props = withDefaults(defineProps<CardProps>(), {})

// Base card styles
const cardClass = computed(() => {
  return cn(
    'rounded-xl border bg-card text-card-foreground shadow',
    props.class
  )
})
</script>