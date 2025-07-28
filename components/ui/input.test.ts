import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './input.vue'

describe('Input Component', () => {
  it('renders with default props', () => {
    const wrapper = mount(Input)
    
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text')
    expect(input.classes()).toContain('flex')
    expect(input.classes()).toContain('h-9')
    expect(input.classes()).toContain('w-full')
  })

  it('displays error message when provided', () => {
    const errorMessage = 'This field is required'
    const wrapper = mount(Input, {
      props: { errorMessage }
    })
    
    const errorDiv = wrapper.find('.text-destructive')
    expect(errorDiv.exists()).toBe(true)
    expect(errorDiv.text()).toBe(errorMessage)
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    
    await input.setValue('new value')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
  })
})