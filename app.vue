<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup>
// Global composables available to all pages
const toast = useToast()

// Provide toast globally
provide('toast', toast)
</script>