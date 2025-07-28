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
    },
    {
      id: '4',
      title: 'Art Gallery Opening',
      description: 'Discover contemporary art from emerging artists at this exclusive gallery opening with wine and appetizers.',
      date: '2025-04-10',
      time: '19:00',
      location: 'Modern Art Gallery Downtown',
      image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 45,
      category: 'Art',
      organizerId: '3',
      organizerName: 'Cultural Events Co',
      attendees: 85,
      maxAttendees: 120,
      status: 'upcoming',
      featured: false
    },
    {
      id: '5',
      title: 'Startup Pitch Competition',
      description: 'Watch innovative startups pitch their ideas to top investors and compete for funding opportunities.',
      date: '2025-05-08',
      time: '10:00',
      location: 'Innovation Hub Auditorium',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 75,
      category: 'Business',
      organizerId: '4',
      organizerName: 'Startup Accelerator',
      attendees: 320,
      maxAttendees: 400,
      status: 'upcoming',
      featured: true
    },
    {
      id: '6',
      title: 'Cooking Workshop: Italian Cuisine',
      description: 'Learn to prepare authentic Italian dishes from a professional chef in this hands-on cooking experience.',
      date: '2025-03-22',
      time: '15:00',
      location: 'Culinary Institute Kitchen',
      image: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 95,
      category: 'Food',
      organizerId: '5',
      organizerName: 'Culinary Masters',
      attendees: 18,
      maxAttendees: 24,
      status: 'upcoming',
      featured: false
    },
    {
      id: '7',
      title: 'Marathon Training Camp',
      description: 'Intensive training program for marathon runners with professional coaches and nutrition guidance.',
      date: '2025-04-05',
      time: '06:00',
      location: 'City Sports Complex',
      image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 150,
      category: 'Sports',
      organizerId: '6',
      organizerName: 'Athletic Performance Center',
      attendees: 65,
      maxAttendees: 80,
      status: 'upcoming',
      featured: false
    },
    {
      id: '8',
      title: 'Photography Exhibition',
      description: 'Stunning landscape photography from around the world showcased by award-winning photographers.',
      date: '2025-05-15',
      time: '11:00',
      location: 'Photography Museum',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 25,
      category: 'Art',
      organizerId: '7',
      organizerName: 'Photography Society',
      attendees: 240,
      maxAttendees: 300,
      status: 'upcoming',
      featured: true
    },
    {
      id: '9',
      title: 'Wine Tasting Evening',
      description: 'Sample premium wines from renowned vineyards paired with gourmet cheese and charcuterie.',
      date: '2025-03-30',
      time: '17:30',
      location: 'Vineyard Estate Tasting Room',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 65,
      category: 'Food',
      organizerId: '8',
      organizerName: 'Wine Connoisseurs Club',
      attendees: 42,
      maxAttendees: 60,
      status: 'upcoming',
      featured: false
    },
    {
      id: '10',
      title: 'Digital Marketing Summit',
      description: 'Learn the latest digital marketing strategies and trends from industry experts and successful entrepreneurs.',
      date: '2025-06-12',
      time: '08:30',
      location: 'Business Conference Center',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 199,
      category: 'Business',
      organizerId: '9',
      organizerName: 'Marketing Professionals Association',
      attendees: 380,
      maxAttendees: 450,
      status: 'upcoming',
      featured: true
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