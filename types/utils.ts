import { z } from 'zod'
import type { 
  Event, 
  Booking, 
  Notification, 
  User,
  ValidationError,
  CreateEventData,
  UpdateEventData,
  CreateBookingData,
  CreateNotificationData
} from './index'
import {
  eventSchema,
  bookingSchema,
  notificationSchema,
  userSchema,
  createEventSchema,
  updateEventSchema,
  createBookingSchema,
  createNotificationSchema
} from './validation'

// Validation result type
export interface ValidationResult<T = any> {
  success: boolean
  data?: T
  errors?: ValidationError[]
}

// Generic validation function
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const validatedData = schema.parse(data)
    return {
      success: true,
      data: validatedData
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationError[] = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code
      }))
      return {
        success: false,
        errors
      }
    }
    return {
      success: false,
      errors: [{
        field: 'unknown',
        message: 'Validation failed',
        code: 'unknown_error'
      }]
    }
  }
}

// Specific validation functions
export const validateUser = (data: unknown): ValidationResult<User> =>
  validateData(userSchema, data)

export const validateEvent = (data: unknown): ValidationResult<Event> =>
  validateData(eventSchema, data)

export const validateBooking = (data: unknown): ValidationResult<Booking> =>
  validateData(bookingSchema, data)

export const validateNotification = (data: unknown): ValidationResult<Notification> =>
  validateData(notificationSchema, data)

export const validateCreateEvent = (data: unknown): ValidationResult<CreateEventData> =>
  validateData(createEventSchema, data)

export const validateUpdateEvent = (data: unknown): ValidationResult<UpdateEventData> =>
  validateData(updateEventSchema, data)

export const validateCreateBooking = (data: unknown): ValidationResult<CreateBookingData> =>
  validateData(createBookingSchema, data)

export const validateCreateNotification = (data: unknown): ValidationResult<CreateNotificationData> =>
  validateData(createNotificationSchema, data)

// Data transformation utilities
export function generateId(): string {
  // Use Node.js crypto module or fallback for browser
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  
  // Fallback UUID v4 implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString()
}

export function formatEventDate(date: string, time: string): string {
  const eventDate = new Date(`${date}T${time}`)
  return eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

export function calculateTotalAmount(price: number, attendeeCount: number): number {
  return price * attendeeCount
}

export function isEventUpcoming(date: string, time: string): boolean {
  const eventDateTime = new Date(`${date}T${time}`)
  return eventDateTime > new Date()
}

export function isEventOngoing(date: string, time: string, durationHours: number = 3): boolean {
  const eventDateTime = new Date(`${date}T${time}`)
  const eventEndTime = new Date(eventDateTime.getTime() + (durationHours * 60 * 60 * 1000))
  const now = new Date()
  return now >= eventDateTime && now <= eventEndTime
}

export function getEventStatus(date: string, time: string, currentStatus?: Event['status']): Event['status'] {
  if (currentStatus === 'cancelled' || currentStatus === 'draft') {
    return currentStatus
  }
  
  if (isEventOngoing(date, time)) {
    return 'ongoing'
  }
  
  if (isEventUpcoming(date, time)) {
    return 'upcoming'
  }
  
  return 'completed'
}

// Event capacity utilities
export function isEventAtCapacity(attendees: number, maxAttendees: number): boolean {
  return attendees >= maxAttendees
}

export function getAvailableSpots(attendees: number, maxAttendees: number): number {
  return Math.max(0, maxAttendees - attendees)
}

export function canBookAttendees(currentAttendees: number, maxAttendees: number, requestedAttendees: number): boolean {
  return (currentAttendees + requestedAttendees) <= maxAttendees
}

// Booking utilities
export function canCancelBooking(bookingDate: string, eventDate: string, eventTime: string): boolean {
  const event = new Date(`${eventDate}T${eventTime}`)
  const hoursUntilEvent = (event.getTime() - Date.now()) / (1000 * 60 * 60)
  
  // Allow cancellation up to 24 hours before event
  return hoursUntilEvent > 24
}

export function shouldSendReminder(eventDate: string, eventTime: string): boolean {
  const event = new Date(`${eventDate}T${eventTime}`)
  const hoursUntilEvent = (event.getTime() - Date.now()) / (1000 * 60 * 60)
  
  // Send reminder 24 hours before event
  return hoursUntilEvent <= 24 && hoursUntilEvent > 0
}

// Data sanitization utilities
export function sanitizeString(input: string): string {
  return input.trim().replace(/\s+/g, ' ')
}

export function sanitizeEventData(data: Partial<CreateEventData>): Partial<CreateEventData> {
  return {
    ...data,
    title: data.title ? sanitizeString(data.title) : data.title,
    description: data.description ? sanitizeString(data.description) : data.description,
    location: data.location ? sanitizeString(data.location) : data.location,
    requirements: data.requirements ? sanitizeString(data.requirements) : data.requirements,
    refundPolicy: data.refundPolicy ? sanitizeString(data.refundPolicy) : data.refundPolicy,
    tags: data.tags?.map(tag => sanitizeString(tag).toLowerCase())
  }
}

// Error formatting utilities
export function formatValidationErrors(errors: ValidationError[]): Record<string, string> {
  return errors.reduce((acc, error) => {
    acc[error.field] = error.message
    return acc
  }, {} as Record<string, string>)
}

export function getFirstValidationError(errors: ValidationError[]): string | null {
  return errors.length > 0 ? errors[0].message : null
}

// Type guards
export function isValidEvent(data: unknown): data is Event {
  return validateEvent(data).success
}

export function isValidBooking(data: unknown): data is Booking {
  return validateBooking(data).success
}

export function isValidNotification(data: unknown): data is Notification {
  return validateNotification(data).success
}

export function isValidUser(data: unknown): data is User {
  return validateUser(data).success
}