export default defineNuxtRouteMiddleware((to, from) => {
  const { user, hasRole } = useAuthStore()

  if (!user.value || (!hasRole('organizer') && !hasRole('admin'))) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied. Organizer role required.'
    })
  }
})