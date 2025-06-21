export default defineNuxtRouteMiddleware((_to: any, _from: any) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated.value) {
    return navigateTo('/auth/signin')
  }
})