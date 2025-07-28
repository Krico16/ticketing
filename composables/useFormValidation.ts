import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { ZodSchema } from 'zod'

/**
 * Composable for form validation using Vee-Validate and Zod
 * @param schema - Zod validation schema
 * @param initialValues - Initial form values
 */
export function useFormValidation<T extends Record<string, any>>(
  schema: ZodSchema<T>,
  initialValues?: Partial<T>
) {
  // Convert Zod schema to Vee-Validate schema
  const validationSchema = toTypedSchema(schema)

  // Initialize form with validation schema
  const form = useForm({
    validationSchema,
    initialValues
  })

  /**
   * Create a field with validation
   * @param name - Field name
   * @param options - Field options
   */
  function createField(name: keyof T, options?: { 
    validateOnValueUpdate?: boolean
    validateOnMount?: boolean 
  }) {
    const field = useField(name as string, undefined, {
      validateOnValueUpdate: options?.validateOnValueUpdate ?? true,
      validateOnMount: options?.validateOnMount ?? false
    })

    return {
      value: field.value,
      errorMessage: field.errorMessage,
      meta: field.meta,
      setValue: field.setValue,
      setError: field.setErrors,
      resetField: field.resetField
    }
  }

  return {
    // Form methods
    handleSubmit: form.handleSubmit,
    resetForm: form.resetForm,
    setFieldValue: form.setFieldValue,
    setFieldError: form.setFieldError,
    setErrors: form.setErrors,
    setValues: form.setValues,
    
    // Form state
    values: form.values,
    errors: form.errors,
    meta: form.meta,
    isSubmitting: form.isSubmitting,
    
    // Field creation helper
    createField
  }
}

/**
 * Composable for individual field validation
 * @param name - Field name
 * @param schema - Zod schema for the field
 * @param options - Field options
 */
export function useFieldValidation<T>(
  name: string,
  schema?: ZodSchema<T>,
  options?: {
    validateOnValueUpdate?: boolean
    validateOnMount?: boolean
    initialValue?: T
  }
) {
  const validationSchema = schema ? toTypedSchema(schema) : undefined

  const field = useField(name, validationSchema, {
    validateOnValueUpdate: options?.validateOnValueUpdate ?? true,
    validateOnMount: options?.validateOnMount ?? false,
    initialValue: options?.initialValue
  })

  return {
    value: field.value,
    errorMessage: field.errorMessage,
    meta: field.meta,
    setValue: field.setValue,
    setError: field.setErrors,
    resetField: field.resetField
  }
}