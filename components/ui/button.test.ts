import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './button.vue'

describe('Button Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(Button, {
        slots: {
          default: 'Click me'
        }
      })
      
      expect(wrapper.text()).toBe('Click me')
      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.classes()).toContain('inline-flex')
    })

    it('renders as child component when asChild is true', () => {
      const wrapper = mount(Button, {
        props: {
          asChild: true
        },
        slots: {
          default: '<a href="/test">Link</a>'
        }
      })
      
      expect(wrapper.element.tagName).toBe('SLOT')
    })
  })

  describe('Variants', () => {
    it('applies default variant classes', () => {
      const wrapper = mount(Button, {
        props: { variant: 'default' },
        slots: { default: 'Default' }
      })
      
      expect(wrapper.classes()).toContain('bg-primary')
      expect(wrapper.classes()).toContain('text-primary-foreground')
    })

    it('applies destructive variant classes', () => {
      const wrapper = mount(Button, {
        props: { variant: 'destructive' },
        slots: { default: 'Delete' }
      })
      
      expect(wrapper.classes()).toContain('bg-destructive')
      expect(wrapper.classes()).toContain('text-destructive-foreground')
    })

    it('applies outline variant classes', () => {
      const wrapper = mount(Button, {
        props: { variant: 'outline' },
        slots: { default: 'Outline' }
      })
      
      expect(wrapper.classes()).toContain('border')
      expect(wrapper.classes()).toContain('bg-background')
    })

    it('applies secondary variant classes', () => {
      const wrapper = mount(Button, {
        props: { variant: 'secondary' },
        slots: { default: 'Secondary' }
      })
      
      expect(wrapper.classes()).toContain('bg-secondary')
      expect(wrapper.classes()).toContain('text-secondary-foreground')
    })

    it('applies ghost variant classes', () => {
      const wrapper = mount(Button, {
        props: { variant: 'ghost' },
        slots: { default: 'Ghost' }
      })
      
      expect(wrapper.classes()).toContain('hover:bg-accent')
    })

    it('applies link variant classes', () => {
      const wrapper = mount(Button, {
        props: { variant: 'link' },
        slots: { default: 'Link' }
      })
      
      expect(wrapper.classes()).toContain('text-primary')
      expect(wrapper.classes()).toContain('underline-offset-4')
    })
  })

  describe('Sizes', () => {
    it('applies default size classes', () => {
      const wrapper = mount(Button, {
        props: { size: 'default' },
        slots: { default: 'Default Size' }
      })
      
      expect(wrapper.classes()).toContain('h-9')
      expect(wrapper.classes()).toContain('px-4')
      expect(wrapper.classes()).toContain('py-2')
    })

    it('applies small size classes', () => {
      const wrapper = mount(Button, {
        props: { size: 'sm' },
        slots: { default: 'Small' }
      })
      
      expect(wrapper.classes()).toContain('h-8')
      expect(wrapper.classes()).toContain('px-3')
      expect(wrapper.classes()).toContain('text-xs')
    })

    it('applies large size classes', () => {
      const wrapper = mount(Button, {
        props: { size: 'lg' },
        slots: { default: 'Large' }
      })
      
      expect(wrapper.classes()).toContain('h-10')
      expect(wrapper.classes()).toContain('px-8')
    })

    it('applies icon size classes', () => {
      const wrapper = mount(Button, {
        props: { size: 'icon' },
        slots: { default: '🔥' }
      })
      
      expect(wrapper.classes()).toContain('h-9')
      expect(wrapper.classes()).toContain('w-9')
    })
  })

  describe('Disabled State', () => {
    it('applies disabled attribute when disabled prop is true', () => {
      const wrapper = mount(Button, {
        props: { disabled: true },
        slots: { default: 'Disabled' }
      })
      
      expect(wrapper.attributes('disabled')).toBeDefined()
      expect(wrapper.classes()).toContain('disabled:pointer-events-none')
      expect(wrapper.classes()).toContain('disabled:opacity-50')
    })

    it('does not emit click event when disabled', async () => {
      const wrapper = mount(Button, {
        props: { disabled: true },
        slots: { default: 'Disabled' }
      })
      
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Click Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(Button, {
        slots: { default: 'Click me' }
      })
      
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('passes click event data', async () => {
      const wrapper = mount(Button, {
        slots: { default: 'Click me' }
      })
      
      await wrapper.trigger('click')
      const clickEvents = wrapper.emitted('click')
      expect(clickEvents).toBeTruthy()
      expect(clickEvents![0][0]).toBeInstanceOf(MouseEvent)
    })
  })

  describe('Attribute Forwarding', () => {
    it('forwards attributes to the button element', () => {
      const wrapper = mount(Button, {
        attrs: {
          'data-testid': 'test-button',
          'aria-label': 'Test button'
        },
        slots: { default: 'Test' }
      })
      
      expect(wrapper.attributes('data-testid')).toBe('test-button')
      expect(wrapper.attributes('aria-label')).toBe('Test button')
    })
  })

  describe('Combination of Props', () => {
    it('applies multiple variant and size combinations correctly', () => {
      const wrapper = mount(Button, {
        props: {
          variant: 'outline',
          size: 'lg'
        },
        slots: { default: 'Large Outline' }
      })
      
      // Variant classes
      expect(wrapper.classes()).toContain('border')
      expect(wrapper.classes()).toContain('bg-background')
      
      // Size classes
      expect(wrapper.classes()).toContain('h-10')
      expect(wrapper.classes()).toContain('px-8')
    })

    it('handles destructive small button correctly', () => {
      const wrapper = mount(Button, {
        props: {
          variant: 'destructive',
          size: 'sm'
        },
        slots: { default: 'Delete' }
      })
      
      // Variant classes
      expect(wrapper.classes()).toContain('bg-destructive')
      expect(wrapper.classes()).toContain('text-destructive-foreground')
      
      // Size classes
      expect(wrapper.classes()).toContain('h-8')
      expect(wrapper.classes()).toContain('text-xs')
    })
  })

  describe('Accessibility', () => {
    it('has proper focus styles', () => {
      const wrapper = mount(Button, {
        slots: { default: 'Focus me' }
      })
      
      expect(wrapper.classes()).toContain('focus-visible:outline-none')
      expect(wrapper.classes()).toContain('focus-visible:ring-1')
      expect(wrapper.classes()).toContain('focus-visible:ring-ring')
    })

    it('maintains button semantics', () => {
      const wrapper = mount(Button, {
        slots: { default: 'Button' }
      })
      
      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.element.getAttribute('type')).toBeNull() // Should be 'button' by default in browsers
    })
  })
})