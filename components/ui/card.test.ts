import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from './card.vue'
import CardHeader from './card-header.vue'
import CardContent from './card-content.vue'
import CardFooter from './card-footer.vue'

describe('Card Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default classes', () => {
      const wrapper = mount(Card, {
        slots: {
          default: 'Card content'
        }
      })
      
      expect(wrapper.text()).toBe('Card content')
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).toContain('rounded-xl')
      expect(wrapper.classes()).toContain('border')
      expect(wrapper.classes()).toContain('bg-card')
      expect(wrapper.classes()).toContain('text-card-foreground')
      expect(wrapper.classes()).toContain('shadow')
    })

    it('accepts custom class prop', () => {
      const wrapper = mount(Card, {
        props: {
          class: 'custom-class'
        },
        slots: {
          default: 'Card content'
        }
      })
      
      expect(wrapper.classes()).toContain('custom-class')
      expect(wrapper.classes()).toContain('rounded-xl') // Still has base classes
    })

    it('forwards attributes correctly', () => {
      const wrapper = mount(Card, {
        attrs: {
          'data-testid': 'test-card',
          'aria-label': 'Test card'
        },
        slots: {
          default: 'Card content'
        }
      })
      
      expect(wrapper.attributes('data-testid')).toBe('test-card')
      expect(wrapper.attributes('aria-label')).toBe('Test card')
    })
  })

  describe('Slot Content', () => {
    it('renders slot content correctly', () => {
      const wrapper = mount(Card, {
        slots: {
          default: '<p>This is card content</p>'
        }
      })
      
      expect(wrapper.html()).toContain('<p>This is card content</p>')
    })

    it('renders multiple elements in slot', () => {
      const wrapper = mount(Card, {
        slots: {
          default: '<h2>Title</h2><p>Content</p>'
        }
      })
      
      expect(wrapper.html()).toContain('<h2>Title</h2>')
      expect(wrapper.html()).toContain('<p>Content</p>')
    })
  })
})

describe('CardHeader Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default classes', () => {
      const wrapper = mount(CardHeader, {
        slots: {
          default: 'Header content'
        }
      })
      
      expect(wrapper.text()).toBe('Header content')
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).toContain('flex')
      expect(wrapper.classes()).toContain('flex-col')
      expect(wrapper.classes()).toContain('space-y-1.5')
      expect(wrapper.classes()).toContain('p-6')
    })

    it('accepts custom class prop', () => {
      const wrapper = mount(CardHeader, {
        props: {
          class: 'custom-header-class'
        },
        slots: {
          default: 'Header content'
        }
      })
      
      expect(wrapper.classes()).toContain('custom-header-class')
      expect(wrapper.classes()).toContain('flex') // Still has base classes
    })

    it('forwards attributes correctly', () => {
      const wrapper = mount(CardHeader, {
        attrs: {
          'data-testid': 'test-header'
        },
        slots: {
          default: 'Header content'
        }
      })
      
      expect(wrapper.attributes('data-testid')).toBe('test-header')
    })
  })
})

describe('CardContent Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default classes', () => {
      const wrapper = mount(CardContent, {
        slots: {
          default: 'Content text'
        }
      })
      
      expect(wrapper.text()).toBe('Content text')
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).toContain('p-6')
      expect(wrapper.classes()).toContain('pt-0')
    })

    it('accepts custom class prop', () => {
      const wrapper = mount(CardContent, {
        props: {
          class: 'custom-content-class'
        },
        slots: {
          default: 'Content text'
        }
      })
      
      expect(wrapper.classes()).toContain('custom-content-class')
      expect(wrapper.classes()).toContain('p-6') // Still has base classes
    })

    it('forwards attributes correctly', () => {
      const wrapper = mount(CardContent, {
        attrs: {
          'data-testid': 'test-content'
        },
        slots: {
          default: 'Content text'
        }
      })
      
      expect(wrapper.attributes('data-testid')).toBe('test-content')
    })
  })
})

describe('CardFooter Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default classes', () => {
      const wrapper = mount(CardFooter, {
        slots: {
          default: 'Footer content'
        }
      })
      
      expect(wrapper.text()).toBe('Footer content')
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).toContain('flex')
      expect(wrapper.classes()).toContain('items-center')
      expect(wrapper.classes()).toContain('p-6')
      expect(wrapper.classes()).toContain('pt-0')
    })

    it('accepts custom class prop', () => {
      const wrapper = mount(CardFooter, {
        props: {
          class: 'custom-footer-class'
        },
        slots: {
          default: 'Footer content'
        }
      })
      
      expect(wrapper.classes()).toContain('custom-footer-class')
      expect(wrapper.classes()).toContain('flex') // Still has base classes
    })

    it('forwards attributes correctly', () => {
      const wrapper = mount(CardFooter, {
        attrs: {
          'data-testid': 'test-footer'
        },
        slots: {
          default: 'Footer content'
        }
      })
      
      expect(wrapper.attributes('data-testid')).toBe('test-footer')
    })
  })
})

describe('Card Component Composition', () => {
  it('works correctly when all sub-components are used together', () => {
    const CardComposition = {
      components: { Card, CardHeader, CardContent, CardFooter },
      template: `
        <Card>
          <CardHeader>
            <h3>Card Title</h3>
            <p>Card description</p>
          </CardHeader>
          <CardContent>
            <p>This is the main content of the card.</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      `
    }

    const wrapper = mount(CardComposition)
    
    // Check that all components are rendered
    expect(wrapper.html()).toContain('Card Title')
    expect(wrapper.html()).toContain('Card description')
    expect(wrapper.html()).toContain('This is the main content of the card.')
    expect(wrapper.html()).toContain('<button>Action</button>')
    
    // Check structure
    const card = wrapper.find('.rounded-xl')
    expect(card.exists()).toBe(true)
    
    const header = wrapper.find('.flex.flex-col.space-y-1\\.5')
    expect(header.exists()).toBe(true)
    
    const content = wrapper.find('.p-6.pt-0')
    expect(content.exists()).toBe(true)
    
    const footer = wrapper.find('.flex.items-center.p-6.pt-0')
    expect(footer.exists()).toBe(true)
  })

  it('works with partial composition (header and content only)', () => {
    const PartialCard = {
      components: { Card, CardHeader, CardContent },
      template: `
        <Card>
          <CardHeader>
            <h3>Title Only</h3>
          </CardHeader>
          <CardContent>
            <p>Content without footer</p>
          </CardContent>
        </Card>
      `
    }

    const wrapper = mount(PartialCard)
    
    expect(wrapper.html()).toContain('Title Only')
    expect(wrapper.html()).toContain('Content without footer')
    
    // Check that CardFooter component is not present by looking for its specific classes
    expect(wrapper.find('.flex.items-center.p-6.pt-0').exists()).toBe(false)
  })

  it('works with custom classes on all components', () => {
    const CustomCard = {
      components: { Card, CardHeader, CardContent, CardFooter },
      template: `
        <Card class="custom-card">
          <CardHeader class="custom-header">
            <h3>Custom Card</h3>
          </CardHeader>
          <CardContent class="custom-content">
            <p>Custom content</p>
          </CardContent>
          <CardFooter class="custom-footer">
            <button>Custom action</button>
          </CardFooter>
        </Card>
      `
    }

    const wrapper = mount(CustomCard)
    
    expect(wrapper.find('.custom-card').exists()).toBe(true)
    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
  })
})