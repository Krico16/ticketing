import { defineStore } from 'pinia'

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'organizer' | 'admin'
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock user data based on email
    let mockUser: User
    if (email === 'admin@example.com') {
      mockUser = { id: '1', email, name: 'Admin User', role: 'admin' }
    } else if (email === 'organizer@example.com') {
      mockUser = { id: '2', email, name: 'Event Organizer', role: 'organizer' }
    } else {
      mockUser = { id: '3', email, name: 'Regular User', role: 'user' }
    }
    
    user.value = mockUser
    return mockUser
  }

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user'
    }
    
    user.value = newUser
    return newUser
  }

  const logout = () => {
    user.value = null
  }

  const hasRole = (role: string) => {
    return user.value?.role === role
  }

  const hasPermission = (permission: string) => {
    if (!user.value) return false
    
    const rolePermissions = {
      admin: ['create', 'read', 'update', 'delete', 'manage_users', 'manage_events'],
      organizer: ['create', 'read', 'update', 'delete', 'manage_own_events'],
      user: ['read', 'create_bookings']
    }
    
    return rolePermissions[user.value.role]?.includes(permission) || false
  }

  return {
    user: readonly(user),
    isAuthenticated,
    login,
    register,
    logout,
    hasRole,
    hasPermission
  }
})