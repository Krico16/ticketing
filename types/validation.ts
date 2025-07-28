import { z } from 'zod'

// Base validation schemas
export const userRoleSchema = z.enum(['user', 'organizer', 'admin'])
export const eventStatusSchema = z.enum(['draft', 'upcoming', 'ongoing', 'completed', 'cancelled'])
export const bookingStatusSchema = z.enum(['confirmed', 'cancelled', 'refunded'])
export const paymentStatusSchema = z.enum(['pending', 'completed', 'failed', 'refunded'])
export const notificationTypeSchema = z.enum(['booking_confirmed', 'event_updated', 'event_cancelled', 'event_reminder'])

// User validation schema
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  role: userRoleSchema,
  avatar: z.string().url('Invalid avatar URL').optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

// Base event schema without refinements
const baseEventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description must be less than 2000 characters'),
  date: z.string().datetime('Invalid date format'),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  location: z.string().min(5, 'Location must be at least 5 characters').max(200, 'Location must be less than 200 characters'),
  image: z.string().url('Invalid image URL'),
  price: z.number().min(0, 'Price cannot be negative').max(10000, 'Price cannot exceed $10,000'),
  category: z.string().min(2, 'Category must be at least 2 characters').max(50, 'Category must be less than 50 characters'),
  organizerId: z.string().uuid(),
  organizerName: z.string().min(2, 'Organizer name must be at least 2 characters'),
  attendees: z.number().min(0, 'Attendees cannot be negative'),
  maxAttendees: z.number().min(1, 'Maximum attendees must be at least 1').max(10000, 'Maximum attendees cannot exceed 10,000'),
  status: eventStatusSchema,
  featured: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  tags: z.array(z.string().min(1).max(30)).max(10, 'Maximum 10 tags allowed').optional(),
  requirements: z.string().max(1000, 'Requirements must be less than 1000 characters').optional(),
  refundPolicy: z.string().max(1000, 'Refund policy must be less than 1000 characters').optional()
})

// Event validation schema with refinements
export const eventSchema = baseEventSchema.refine((data) => {
  const eventDate = new Date(`${data.date}T${data.time}`)
  const now = new Date()
  return eventDate > now || data.status === 'completed' || data.status === 'cancelled'
}, {
  message: 'Event date must be in the future for upcoming events',
  path: ['date']
}).refine((data) => data.attendees <= data.maxAttendees, {
  message: 'Current attendees cannot exceed maximum attendees',
  path: ['attendees']
})

// Attendee info validation schema
export const attendeeInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format').optional()
})

// Base booking schema without refinements
const baseBookingSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  eventId: z.string().uuid(),
  status: bookingStatusSchema,
  bookingDate: z.string().datetime(),
  attendeeCount: z.number().min(1, 'Must book at least 1 attendee').max(10, 'Cannot book more than 10 attendees'),
  totalAmount: z.number().min(0, 'Total amount cannot be negative'),
  paymentStatus: paymentStatusSchema,
  attendeeInfo: z.array(attendeeInfoSchema).min(1, 'At least one attendee required')
})

// Booking validation schema with refinements
export const bookingSchema = baseBookingSchema.refine((data) => data.attendeeInfo.length === data.attendeeCount, {
  message: 'Attendee info count must match attendee count',
  path: ['attendeeInfo']
})

// Notification validation schema
export const notificationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: notificationTypeSchema,
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters'),
  read: z.boolean(),
  createdAt: z.string().datetime(),
  relatedEventId: z.string().uuid().optional(),
  relatedBookingId: z.string().uuid().optional()
})

// Form validation schemas (for creating/updating)
export const createEventSchema = baseEventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  attendees: true,
  organizerId: true,
  organizerName: true
}).refine((data) => {
  const eventDate = new Date(`${data.date}T${data.time}`)
  const now = new Date()
  return eventDate > now
}, {
  message: 'Event date must be in the future',
  path: ['date']
})

export const updateEventSchema = baseEventSchema.partial().omit({
  id: true,
  createdAt: true,
  organizerId: true
})

export const createBookingSchema = baseBookingSchema.omit({
  id: true,
  bookingDate: true
}).refine((data) => data.attendeeInfo.length === data.attendeeCount, {
  message: 'Attendee info count must match attendee count',
  path: ['attendeeInfo']
})

export const createNotificationSchema = notificationSchema.omit({
  id: true,
  createdAt: true
})

// Export types inferred from schemas
export type UserValidation = z.infer<typeof userSchema>
export type EventValidation = z.infer<typeof eventSchema>
export type BookingValidation = z.infer<typeof bookingSchema>
export type NotificationValidation = z.infer<typeof notificationSchema>
export type CreateEventValidation = z.infer<typeof createEventSchema>
export type UpdateEventValidation = z.infer<typeof updateEventSchema>
export type CreateBookingValidation = z.infer<typeof createBookingSchema>
export type CreateNotificationValidation = z.infer<typeof createNotificationSchema>