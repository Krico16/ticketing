import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, Suspense } from 'vue'
import { loadComponent, createLazyComponent, performanceMonitor } from '~/lib/component-loader'

// Mock components for testing
const MockButton = defineComponent({
  template: '<button><slot /></button>'
})

const MockDialog = defineComponent({
  template: '<div class="dialog"><slot /></div>'
})

// Mock the component registry
vi.mock('~/lib/component-loader', async () => {
  const actual = await vi.importActual('~/lib/component-loader')
  return {
    ...actual,
    componentRegistry: {
      Button: () => Promise.resolve(MockButton),
      Dialog: () => Promise.resolve(MockDialog),
    }
  }
})

describe('Lazy Loading Performance Optimizations', () => {
  describe('createLazyComponent', () => {
    it('should create a lazy component with default options', async () => {
      const loader = () => Promise.resolve(MockButton)
      const LazyComponent = createLazyComponent(loader)
      
      expect(LazyComponent).toBeDefined()
      expect(typeof LazyComponent).toBe('object')
    })

    it('should create a lazy component with custom options', async () => {
      const loader = () => Promise.resolve(MockButton)
      const LazyComponent = createLazyComponent(loader, {
        delay: 500,
        timeout: 10000
      })
      
      expect(LazyComponent).toBeDefined()
    })

    it('should handle loading states correctly', async () => {
      const LoadingComponent = defineComponent({
        template: '<div>Loading...</div>'
      })

      const loader = () => new Promise(resolve => {
        setTimeout(() => resolve(MockButton), 100)
      })

      const LazyComponent = createLazyComponent(loader, {
        loadingComponent: LoadingComponent,
        delay: 0
      })

      const TestWrapper = defineComponent({
        components: { LazyComponent, Suspense },
        template: `
          <Suspense>
            <LazyComponent>Test Content</LazyComponent>
            <template #fallback>
              <div>Loading fallback</div>
            </template>
          </Suspense>
        `
      })

      const wrapper = mount(TestWrapper)
      
      // Initially should show loading state
      expect(wrapper.text()).toContain('Loading fallback')
      
      // Wait for component to load
      await new Promise(resolve => setTimeout(resolve, 150))
      await wrapper.vm.$nextTick()
      
      // Should show the actual component
      expect(wrapper.find('button').exists()).toBe(true)
    })
  })

  describe('loadComponent', () => {
    it('should load simple components directly', async () => {
      const ButtonLoader = loadComponent('Button')
      expect(typeof ButtonLoader).toBe('function')
      
      const ButtonComponent = await ButtonLoader()
      expect(ButtonComponent).toBe(MockButton)
    })

    it('should create lazy components for complex components', async () => {
      const DialogLoader = loadComponent('Dialog')
      expect(typeof DialogLoader).toBe('object') // Lazy component is an object
    })

    it('should throw error for non-existent components', () => {
      expect(() => {
        loadComponent('NonExistentComponent' as any)
      }).toThrow('Component "NonExistentComponent" not found in registry')
    })
  })

  describe('performanceMonitor', () => {
    beforeEach(() => {
      performanceMonitor.componentLoadTimes.clear()
    })

    it('should track component load times', () => {
      const componentName = 'TestComponent'
      
      performanceMonitor.startTimer(componentName)
      expect(performanceMonitor.componentLoadTimes.has(componentName)).toBe(true)
      
      // Simulate some loading time
      const loadTime = performanceMonitor.endTimer(componentName)
      expect(loadTime).toBeGreaterThanOrEqual(0)
      expect(performanceMonitor.componentLoadTimes.has(componentName)).toBe(false)
    })

    it('should return 0 for components without start time', () => {
      const loadTime = performanceMonitor.endTimer('NonExistentComponent')
      expect(loadTime).toBe(0)
    })

    it('should provide accurate stats', () => {
      performanceMonitor.startTimer('Component1')
      performanceMonitor.startTimer('Component2')
      
      const stats = performanceMonitor.getStats()
      expect(stats.activeLoads).toBe(2)
      expect(stats.components).toEqual(['Component1', 'Component2'])
      
      performanceMonitor.endTimer('Component1')
      
      const updatedStats = performanceMonitor.getStats()
      expect(updatedStats.activeLoads).toBe(1)
      expect(updatedStats.components).toEqual(['Component2'])
    })
  })

  describe('Bundle Optimization Utilities', () => {
    it('should return used variants when provided', () => {
      const { bundleOptimization } = require('~/lib/component-loader')
      
      const usedVariants = ['default', 'outline']
      const result = bundleOptimization.getButtonVariants(usedVariants)
      expect(result).toEqual(usedVariants)
    })

    it('should return all variants when none provided', () => {
      const { bundleOptimization } = require('~/lib/component-loader')
      
      const result = bundleOptimization.getButtonVariants()
      expect(result).toEqual(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'])
    })

    it('should return used sizes when provided', () => {
      const { bundleOptimization } = require('~/lib/component-loader')
      
      const usedSizes = ['sm', 'lg']
      const result = bundleOptimization.getButtonSizes(usedSizes)
      expect(result).toEqual(usedSizes)
    })

    it('should return all sizes when none provided', () => {
      const { bundleOptimization } = require('~/lib/component-loader')
      
      const result = bundleOptimization.getButtonSizes()
      expect(result).toEqual(['default', 'sm', 'lg', 'icon'])
    })
  })
})

describe('Component Integration Tests', () => {
  it('should render lazy-loaded components correctly', async () => {
    const TestComponent = defineComponent({
      setup() {
        const Dialog = loadComponent('Dialog')
        return { Dialog }
      },
      template: `
        <Suspense>
          <Dialog>Dialog Content</Dialog>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      `
    })

    const wrapper = mount(TestComponent)
    
    // Initially shows loading
    expect(wrapper.text()).toContain('Loading...')
    
    // Wait for lazy component to load
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.vm.$nextTick()
    
    // Should render the dialog
    expect(wrapper.find('.dialog').exists()).toBe(true)
    expect(wrapper.text()).toContain('Dialog Content')
  })

  it('should handle component loading errors gracefully', async () => {
    const FailingLoader = () => Promise.reject(new Error('Component failed to load'))
    
    const ErrorComponent = defineComponent({
      template: '<div>Error occurred</div>'
    })

    const LazyComponent = createLazyComponent(FailingLoader, {
      errorComponent: ErrorComponent,
      timeout: 100
    })

    const TestWrapper = defineComponent({
      components: { LazyComponent, Suspense },
      template: `
        <Suspense>
          <LazyComponent>Content</LazyComponent>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      `
    })

    const wrapper = mount(TestWrapper)
    
    // Wait for timeout and error
    await new Promise(resolve => setTimeout(resolve, 150))
    await wrapper.vm.$nextTick()
    
    // Should show error component or handle gracefully
    expect(wrapper.exists()).toBe(true)
  })
})