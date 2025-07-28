import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './input.vue'

describe('Input Component - Simple Tests', () => {
  it('renders correctly', () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
  })

  it('displays error message', () => {
    const wrapper = mount(Input, {
      props: { errorMessage: 'Test error' }
    })
    const errorDiv = wrapper.find('.text-destructive')
    expect(errorDiv.exists()).toBe(true)
    expect(errorDiv.text()).toBe('Test error')
  })
})