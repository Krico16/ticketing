export const useToast = () => {
  const notifications = ref([])

  const add = (notification) => {
    const id = Date.now().toString()
    const toast = {
      id,
      ...notification,
      timeout: notification.timeout || 5000
    }
    
    notifications.value.push(toast)

    if (toast.timeout > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.timeout)
    }

    return toast
  }

  const remove = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clear = () => {
    notifications.value = []
  }

  return {
    notifications: readonly(notifications),
    add,
    remove,
    clear
  }
}