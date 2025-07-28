# Shadcn Integration Troubleshooting Guide

This guide helps resolve common issues when working with Shadcn UI components in the EventHub Nuxt 3 application.

## Installation Issues

### Problem: Shadcn CLI Not Working

**Symptoms:**
- `npx shadcn-ui@latest add` commands fail
- Components not generating correctly
- Configuration errors

**Solutions:**

1. **Verify Node.js Version**
   ```bash
   node --version  # Should be 16+ 
   npm --version   # Should be 8+
   ```

2. **Clear npm Cache**
   ```bash
   npm cache clean --force
   npx clear-npx-cache
   ```

3. **Check components.json Configuration**
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "default",
     "rsc": false,
     "tsx": false,
     "tailwind": {
       "config": "tailwind.config.js",
       "css": "assets/css/main.css",
       "baseColor": "slate",
       "cssVariables": true
     },
     "aliases": {
       "components": "~/components",
       "utils": "~/lib/utils",
       "ui": "~/components/ui"
     }
   }
   ```

### Problem: Dependencies Not Installing

**Symptoms:**
- Missing packages like `clsx`, `tailwind-merge`, `class-variance-authority`
- Import errors for utility functions

**Solutions:**

1. **Install Required Dependencies**
   ```bash
   npm install clsx tailwind-merge class-variance-authority
   npm install -D @types/node
   ```

2. **Verify Package.json**
   ```json
   {
     "dependencies": {
       "clsx": "^2.0.0",
       "tailwind-merge": "^2.0.0",
       "class-variance-authority": "^0.7.0"
     }
   }
   ```

## Component Issues

### Problem: Components Not Rendering

**Symptoms:**
- Blank components or missing styles
- Console errors about missing imports
- Components appear unstyled

**Solutions:**

1. **Check Import Paths**
   ```vue
   <!-- Correct import -->
   <script setup lang="ts">
   import { Button } from '~/components/ui/button'
   </script>
   
   <!-- Incorrect import -->
   <script setup lang="ts">
   import { Button } from '@/components/ui/button' // Wrong alias
   </script>
   ```

2. **Verify Component File Structure**
   ```
   components/
   └── ui/
       ├── button.vue
       ├── card.vue
       └── input.vue
   ```

3. **Check lib/utils.ts Configuration**
   ```typescript
   import { type ClassValue, clsx } from 'clsx'
   import { twMerge } from 'tailwind-merge'
   
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs))
   }
   ```

### Problem: TypeScript Errors

**Symptoms:**
- Type errors in component props
- Missing type definitions
- Import resolution errors

**Solutions:**

1. **Regenerate Nuxt Types**
   ```bash
   npm run postinstall
   # or
   npx nuxi prepare
   ```

2. **Check Component Prop Types**
   ```vue
   <script setup lang="ts">
   interface ButtonProps {
     variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
     size?: 'default' | 'sm' | 'lg' | 'icon'
     asChild?: boolean
   }
   
   const props = withDefaults(defineProps<ButtonProps>(), {
     variant: 'default',
     size: 'default',
     asChild: false
   })
   </script>
   ```

3. **Update tsconfig.json Paths**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "~/*": ["./*"],
         "@/*": ["./*"]
       }
     }
   }
   ```

## Styling Issues

### Problem: Components Not Following Theme

**Symptoms:**
- Components don't switch between light/dark modes
- Colors don't match the design system
- CSS custom properties not working

**Solutions:**

1. **Verify CSS Custom Properties**
   ```css
   /* assets/css/main.css */
   :root {
     --background: 0 0% 100%;
     --foreground: 222.2 84% 4.9%;
     --primary: 222.2 47.4% 11.2%;
     --primary-foreground: 210 40% 98%;
     /* ... other properties */
   }
   
   .dark {
     --background: 222.2 84% 4.9%;
     --foreground: 210 40% 98%;
     --primary: 210 40% 98%;
     --primary-foreground: 222.2 47.4% 11.2%;
     /* ... other properties */
   }
   ```

2. **Check Tailwind Configuration**
   ```javascript
   // tailwind.config.js
   module.exports = {
     content: [
       "./components/**/*.{js,vue,ts}",
       "./layouts/**/*.vue",
       "./pages/**/*.vue",
       "./plugins/**/*.{js,ts}",
       "./nuxt.config.{js,ts}",
       "./app.vue"
     ],
     theme: {
       extend: {
         colors: {
           border: "hsl(var(--border))",
           input: "hsl(var(--input))",
           ring: "hsl(var(--ring))",
           background: "hsl(var(--background))",
           foreground: "hsl(var(--foreground))",
           primary: {
             DEFAULT: "hsl(var(--primary))",
             foreground: "hsl(var(--primary-foreground))",
           },
           // ... other colors
         }
       }
     }
   }
   ```

3. **Test Theme Switching**
   ```vue
   <template>
     <div>
       <Button @click="toggleColorMode">
         Toggle Theme
       </Button>
     </div>
   </template>
   
   <script setup lang="ts">
   import { Button } from '~/components/ui/button'
   
   const colorMode = useColorMode()
   
   const toggleColorMode = () => {
     colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
   }
   </script>
   ```

### Problem: Styling Conflicts with Nuxt UI

**Symptoms:**
- Components have conflicting styles
- Unexpected visual behavior
- CSS specificity issues

**Solutions:**

1. **Use Scoped Styles**
   ```vue
   <template>
     <div class="shadcn-wrapper">
       <Button variant="outline">Shadcn Button</Button>
     </div>
   </template>
   
   <style scoped>
   .shadcn-wrapper {
     /* Isolate Shadcn component styles */
   }
   </style>
   ```

2. **Increase CSS Specificity**
   ```vue
   <template>
     <Button class="custom-shadcn-button">
       Custom Button
     </Button>
   </template>
   
   <style>
   .custom-shadcn-button {
     /* Override with higher specificity */
     @apply bg-primary text-primary-foreground !important;
   }
   </style>
   ```

3. **Use CSS Layers (Advanced)**
   ```css
   /* assets/css/main.css */
   @layer base, nuxt-ui, shadcn, utilities;
   
   @layer shadcn {
     /* Shadcn component styles */
   }
   ```

## Runtime Issues

### Problem: Hydration Mismatches

**Symptoms:**
- Console warnings about hydration
- Components behaving differently on client vs server
- Flash of unstyled content

**Solutions:**

1. **Use ClientOnly for Interactive Components**
   ```vue
   <template>
     <ClientOnly>
       <Dialog>
         <DialogContent>
           <!-- Complex interactive content -->
         </DialogContent>
       </Dialog>
       <template #fallback>
         <div>Loading...</div>
       </template>
     </ClientOnly>
   </template>
   ```

2. **Check for Browser-Only Code**
   ```vue
   <script setup lang="ts">
   import { Button } from '~/components/ui/button'
   
   // Avoid direct DOM access in setup
   onMounted(() => {
     // Browser-only code here
     if (process.client) {
       // Safe to access window, document, etc.
     }
   })
   </script>
   ```

### Problem: Components Not Interactive

**Symptoms:**
- Click events not working
- Form inputs not responding
- Keyboard navigation broken

**Solutions:**

1. **Check Event Binding**
   ```vue
   <template>
     <!-- Correct event binding -->
     <Button @click="handleClick">
       Click me
     </Button>
     
     <!-- Incorrect - missing @ -->
     <Button click="handleClick">
       Won't work
     </Button>
   </template>
   ```

2. **Verify Component Props**
   ```vue
   <script setup lang="ts">
   import { Button } from '~/components/ui/button'
   
   const handleClick = () => {
     console.log('Button clicked')
   }
   
   // Make sure function is defined before template
   </script>
   ```

3. **Test Accessibility**
   ```vue
   <template>
     <Button
       :disabled="isLoading"
       :aria-label="buttonLabel"
       @click="handleClick"
     >
       {{ isLoading ? 'Loading...' : 'Submit' }}
     </Button>
   </template>
   ```

## Performance Issues

### Problem: Large Bundle Size

**Symptoms:**
- Slow page loads
- Large JavaScript bundles
- Poor performance metrics

**Solutions:**

1. **Use Dynamic Imports**
   ```vue
   <script setup lang="ts">
   // Instead of direct import
   // import { Dialog } from '~/components/ui/dialog'
   
   // Use dynamic import for heavy components
   const Dialog = defineAsyncComponent(() => import('~/components/ui/dialog'))
   </script>
   ```

2. **Analyze Bundle Size**
   ```bash
   npm run build
   npx nuxi analyze
   ```

3. **Tree Shake Unused Components**
   ```javascript
   // nuxt.config.ts
   export default defineNuxtConfig({
     build: {
       transpile: ['@headlessui/vue']
     },
     optimization: {
       treeShake: true
     }
   })
   ```

### Problem: Slow Component Rendering

**Symptoms:**
- Laggy interactions
- Slow component updates
- Poor user experience

**Solutions:**

1. **Use v-memo for Expensive Renders**
   ```vue
   <template>
     <div v-memo="[expensiveData]">
       <ComplexShadcnComponent :data="expensiveData" />
     </div>
   </template>
   ```

2. **Optimize Component Props**
   ```vue
   <script setup lang="ts">
   // Use computed for derived values
   const computedProps = computed(() => ({
     variant: props.type === 'danger' ? 'destructive' : 'default',
     size: props.large ? 'lg' : 'default'
   }))
   </script>
   ```

## Development Workflow Issues

### Problem: Hot Reload Not Working

**Symptoms:**
- Changes not reflecting in browser
- Need to manually refresh
- Development server issues

**Solutions:**

1. **Restart Development Server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Clear Nuxt Cache**
   ```bash
   rm -rf .nuxt
   npm run dev
   ```

3. **Check File Watchers**
   ```bash
   # Increase file watcher limit (Linux/Mac)
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

### Problem: Component Auto-Import Issues

**Symptoms:**
- Shadcn components not auto-importing
- Need explicit imports every time
- IDE not recognizing components

**Solutions:**

1. **Configure Nuxt Auto-Imports**
   ```javascript
   // nuxt.config.ts
   export default defineNuxtConfig({
     components: [
       {
         path: '~/components',
         pathPrefix: false,
       },
       {
         path: '~/components/ui',
         prefix: 'Ui'
       }
     ]
   })
   ```

2. **Use Explicit Imports for Shadcn**
   ```vue
   <!-- Shadcn components should be explicitly imported -->
   <script setup lang="ts">
   import { Button } from '~/components/ui/button'
   import { Card, CardContent } from '~/components/ui/card'
   </script>
   ```

## Testing Issues

### Problem: Components Failing Tests

**Symptoms:**
- Unit tests throwing errors
- Components not rendering in test environment
- Mock issues with Shadcn components

**Solutions:**

1. **Configure Test Environment**
   ```javascript
   // vitest.config.ts
   export default defineConfig({
     test: {
       environment: 'happy-dom',
       setupFiles: ['./test/setup.ts']
     }
   })
   ```

2. **Mock Utility Functions**
   ```typescript
   // test/setup.ts
   import { vi } from 'vitest'
   
   vi.mock('~/lib/utils', () => ({
     cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
   }))
   ```

3. **Test Component Props**
   ```typescript
   // components/ui/button.test.ts
   import { mount } from '@vue/test-utils'
   import { Button } from '~/components/ui/button'
   
   describe('Button', () => {
     it('renders with correct variant', () => {
       const wrapper = mount(Button, {
         props: { variant: 'destructive' }
       })
       expect(wrapper.classes()).toContain('bg-destructive')
     })
   })
   ```

## Getting Additional Help

### Resources

1. **Official Documentation**
   - [Shadcn UI Docs](https://ui.shadcn.com/)
   - [Nuxt 3 Docs](https://nuxt.com/docs)
   - [Vue 3 Docs](https://vuejs.org/)

2. **Community Support**
   - [Shadcn UI GitHub](https://github.com/shadcn-ui/ui)
   - [Nuxt Discord](https://discord.com/invite/nuxt)
   - [Vue Discord](https://discord.com/invite/vue)

3. **Debugging Tools**
   - Vue DevTools
   - Nuxt DevTools
   - Browser Developer Tools

### Reporting Issues

When reporting issues, include:

1. **Environment Information**
   ```bash
   node --version
   npm --version
   npx nuxi info
   ```

2. **Minimal Reproduction**
   - Create a minimal example that reproduces the issue
   - Include relevant code snippets
   - Describe expected vs actual behavior

3. **Error Messages**
   - Full error messages from console
   - Stack traces when available
   - Browser network tab information if relevant

### Best Practices for Prevention

1. **Regular Updates**
   ```bash
   npm update
   npx shadcn-ui@latest diff
   ```

2. **Code Reviews**
   - Review component implementations
   - Check for accessibility compliance
   - Verify theme compatibility

3. **Testing Strategy**
   - Write unit tests for custom components
   - Test in multiple browsers
   - Verify mobile responsiveness

4. **Documentation**
   - Document component usage patterns
   - Keep troubleshooting guide updated
   - Share solutions with team members