export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated.value) {
    return navigateTo('/')
  }
})