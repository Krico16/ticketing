import { defineStore } from 'pinia'

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  price: number
  category: string
  organizerId: string
  organizerName: string
  attendees: number
  maxAttendees: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  featured: boolean
}

export const useEventsStore = defineStore('events', () => {
  const events = ref<Event[]>([
    {
      id: '1',
      title: 'Tech Conference 2025',
      description: 'Join us for the biggest tech conference of the year featuring industry leaders and innovative technologies.',
      date: '2025-03-15',
      time: '09:00',
      location: 'San Francisco Convention Center',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 299,
      category: 'Technology',
      organizerId: '2',
      organizerName: 'Event Organizer',
      attendees: 450,
      maxAttendees: 500,
      status: 'upcoming',
      featured: true
    },
    {
      id: '2',
      title: 'Music Festival Summer',
      description: 'Experience the best live music performances from top artists in a beautiful outdoor setting.',
      date: '2025-06-20',
      time: '14:00',
      location: 'Central Park Amphitheater',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 129,
      category: 'Music',
      organizerId: '2',
      organizerName: 'Event Organizer',
      attendees: 2800,
      maxAttendees: 3000,
      status: 'upcoming',
      featured: true
    },
    {
      id: '3',
      title: 'Business Networking Dinner',
      description: 'Connect with professionals and expand your network at this exclusive business dinner event.',
      date: '2025-02-28',
      time: '18:30',
      location: 'Grand Hotel Ballroom',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 89,
      category: 'Business',
      organizerId: '2',
      organizerName: 'Event Organizer',
      attendees: 180,
      maxAttendees: 200,
      status: 'upcoming',
      featured: false
    }
  ])

  const getEventById = (id: string) => {
    return events.value.find(event => event.id === id)
  }

  const getFeaturedEvents = () => {
    return events.value.filter(event => event.featured)
  }

  const getEventsByOrganizer = (organizerId: string) => {
    return events.value.filter(event => event.organizerId === organizerId)
  }

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    }
    events.value.push(newEvent)
    return newEvent
  }

  const updateEvent = (id: string, updates: Partial<Event>) => {
    const index = events.value.findIndex(event => event.id === id)
    if (index !== -1) {
      events.value[index] = { ...events.value[index], ...updates }
      return events.value[index]
    }
    return null
  }

  const deleteEvent = (id: string) => {
    const index = events.value.findIndex(event => event.id === id)
    if (index !== -1) {
      events.value.splice(index, 1)
      return true
    }
    return false
  }

  return {
    events: readonly(events),
    getEventById,
    getFeaturedEvents,
    getEventsByOrganizer,
    addEvent,
    updateEvent,
    deleteEvent
  }
})