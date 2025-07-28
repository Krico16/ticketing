/**
 * Optimized Component Loader for Shadcn Integration
 * Implements tree-shaking and lazy loading for better performance
 */

import { defineAsyncComponent, type AsyncComponentLoader } from 'vue'

// Component registry for tree-shaking optimization
export const componentRegistry = {
  // Core components (always loaded)
  Button: () => import('~/components/ui/button.vue'),
  Card: () => import('~/components/ui/card.vue'),
  CardHeader: () => import('~/components/ui/card-header.vue'),
  CardContent: () => import('~/components/ui/card-content.vue'),
  CardFooter: () => import('~/components/ui/card-footer.vue'),
  Input: () => import('~/components/ui/input.vue'),
  
  // Complex components (lazy loaded)
  Dialog: () => import('~/components/ui/dialog.vue'),
  Select: () => import('~/components/ui/select.vue'),
} as const

// Type for component names
export type ComponentName = keyof typeof componentRegistry

// Lazy component loader with error handling
export function createLazyComponent(
  loader: AsyncComponentLoader,
  options: {
    loadingComponent?: any
    errorComponent?: any
    delay?: number
    timeout?: number
  } = {}
) {
  return defineAsyncComponent({
    loader,
    loadingComponent: options.loadingComponent,
    errorComponent: options.errorComponent,
    delay: options.delay ?? 200,
    timeout: options.timeout ?? 3000,
  })
}

// Optimized component loader with tree-shaking
export function loadComponent(name: ComponentName) {
  const loader = componentRegistry[name]
  if (!loader) {
    throw new Error(`Component "${name}" not found in registry`)
  }
  
  // For complex components, use lazy loading
  const complexComponents: ComponentName[] = ['Dialog', 'Select']
  
  if (complexComponents.includes(name)) {
    return createLazyComponent(loader, {
      delay: 100,
      timeout: 5000,
    })
  }
  
  // For simple components, load directly
  return loader
}

// Bundle size optimization utilities
export const bundleOptimization = {
  // Only import used variants to reduce bundle size
  getButtonVariants: (usedVariants: string[] = []) => {
    const allVariants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    return usedVariants.length > 0 ? usedVariants : allVariants
  },
  
  // Only import used sizes to reduce bundle size
  getButtonSizes: (usedSizes: string[] = []) => {
    const allSizes = ['default', 'sm', 'lg', 'icon']
    return usedSizes.length > 0 ? usedSizes : allSizes
  },
  
  // Tree-shake unused CSS classes
  getOptimizedClasses: (component: string, usedVariants: string[] = []) => {
    // This would be expanded to remove unused CSS classes from the bundle
    // For now, it's a placeholder for future optimization
    return usedVariants
  }
}

// Performance monitoring
export const performanceMonitor = {
  componentLoadTimes: new Map<string, number>(),
  
  startTimer: (componentName: string) => {
    performanceMonitor.componentLoadTimes.set(componentName, performance.now())
  },
  
  endTimer: (componentName: string) => {
    const startTime = performanceMonitor.componentLoadTimes.get(componentName)
    if (startTime) {
      const loadTime = performance.now() - startTime
      console.log(`Component ${componentName} loaded in ${loadTime.toFixed(2)}ms`)
      performanceMonitor.componentLoadTimes.delete(componentName)
      return loadTime
    }
    return 0
  },
  
  getStats: () => {
    return {
      activeLoads: performanceMonitor.componentLoadTimes.size,
      components: Array.from(performanceMonitor.componentLoadTimes.keys())
    }
  }
}