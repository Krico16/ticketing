// Enhanced data models for EventHub
export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'organizer' | 'admin'
  avatar?: string
  createdAt: string
  updatedAt: string
}

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
  status: 'draft' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  featured: boolean
  createdAt: string
  updatedAt: string
  tags?: string[]
  requirements?: string
  refundPolicy?: string
}

export interface Booking {
  id: string
  userId: string
  eventId: string
  status: 'confirmed' | 'cancelled' | 'refunded'
  bookingDate: string
  attendeeCount: number
  totalAmount: number
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  attendeeInfo: AttendeeInfo[]
}

export interface AttendeeInfo {
  name: string
  email: string
  phone?: string
}

export interface Notification {
  id: string
  userId: string
  type: 'booking_confirmed' | 'event_updated' | 'event_cancelled' | 'event_reminder'
  title: string
  message: string
  read: boolean
  createdAt: string
  relatedEventId?: string
  relatedBookingId?: string
}

// Utility types
export type EventStatus = Event['status']
export type BookingStatus = Booking['status']
export type PaymentStatus = Booking['paymentStatus']
export type NotificationType = Notification['type']
export type UserRole = User['role']

// Form data types
export type CreateEventData = Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'attendees' | 'organizerId' | 'organizerName'>
export type UpdateEventData = Partial<Omit<Event, 'id' | 'createdAt' | 'organizerId'>>
export type CreateBookingData = Omit<Booking, 'id' | 'bookingDate'>
export type CreateNotificationData = Omit<Notification, 'id' | 'createdAt'>

// API response types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Error types
export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface ApiError {
  status: number
  message: string
  details?: ValidationError[]
}