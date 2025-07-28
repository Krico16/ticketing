# Component Usage Guidelines

This document provides detailed guidelines for choosing between Nuxt UI and Shadcn UI components in the EventHub project.

## Overview

EventHub uses a hybrid approach with two UI component libraries:
- **Nuxt UI**: Primary component library for standard UI elements
- **Shadcn UI**: Enhanced components for specific use cases requiring better accessibility or customization

## Decision Framework

### Use Nuxt UI When:

1. **Standard Functionality**: The component provides standard functionality without complex requirements
2. **Rapid Development**: You need to quickly prototype or implement basic UI elements
3. **Existing Integration**: The component is already well-integrated with your current codebase
4. **Simple Styling**: Basic styling and theming requirements are sufficient
5. **Global Availability**: You benefit from auto-imported, globally available components

**Examples:**
- Basic buttons for simple actions
- Standard form layouts
- Navigation components
- Simple cards for content display
- Basic modals and notifications

### Use Shadcn UI When:

1. **Enhanced Accessibility**: You need components with superior ARIA support and keyboard navigation
2. **Complex Interactions**: The component requires advanced interactive features
3. **Custom Styling**: You need fine-grained control over component appearance and behavior
4. **Multiple Variants**: The component needs to support many different visual states or variants
5. **Form Integration**: Advanced form components that integrate better with validation libraries

**Examples:**
- Buttons with multiple variants and states
- Complex form inputs with validation integration
- Searchable select dropdowns
- Modal dialogs with complex content
- Data tables with sorting and filtering

## Component Comparison Matrix

| Component Type | Nuxt UI | Shadcn UI | Recommendation |
|----------------|---------|-----------|----------------|
| **Button** | `UButton` | `Button` | Use Shadcn for multiple variants, Nuxt UI for simple cases |
| **Input** | `UInput` | `Input` | Use Shadcn for forms with validation, Nuxt UI for basic inputs |
| **Card** | `UCard` | `Card` | Use Shadcn for complex layouts, Nuxt UI for simple content cards |
| **Modal/Dialog** | `UModal` | `Dialog` | Use Shadcn for accessibility-critical modals |
| **Select** | `USelect` | `Select` | Use Shadcn for searchable/complex selects, Nuxt UI for simple dropdowns |
| **Navigation** | `UNavigation` | N/A | Use Nuxt UI (no Shadcn equivalent) |
| **Notifications** | `UNotification` | N/A | Use Nuxt UI (integrated with toast system) |
| **Avatar** | `UAvatar` | N/A | Use Nuxt UI (no Shadcn equivalent) |
| **Badge** | `UBadge` | N/A | Use Nuxt UI (simple component) |

## Implementation Guidelines

### Nuxt UI Components

```vue
<template>
  <!-- Auto-imported, no explicit import needed -->
  <UButton @click="handleClick">
    Click me
  </UButton>
  
  <UCard>
    <template #header>
      <h3>Card Title</h3>
    </template>
    <p>Card content</p>
  </UCard>
</template>
```

**Characteristics:**
- Auto-imported globally
- Consistent with Nuxt ecosystem
- Built-in theme integration
- Simpler API surface

### Shadcn UI Components

```vue
<template>
  <Button variant="outline" size="lg" @click="handleClick">
    Click me
  </Button>
  
  <Card>
    <CardHeader>
      <h3>Card Title</h3>
    </CardHeader>
    <CardContent>
      <p>Card content</p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
</script>
```

**Characteristics:**
- Explicit imports required
- More granular control
- Better TypeScript support
- Enhanced accessibility features

## Migration Strategy

### When to Migrate from Nuxt UI to Shadcn

1. **Accessibility Requirements**: When you need better screen reader support or keyboard navigation
2. **Design System Evolution**: When your design requires more variants or customization
3. **Form Enhancement**: When integrating with advanced form validation
4. **User Feedback**: When users report usability issues with existing components

### Migration Process

1. **Assess Impact**: Identify all usages of the component to be replaced
2. **Create Shadcn Component**: Add the Shadcn component to your project
3. **Update Gradually**: Replace components one page/feature at a time
4. **Test Thoroughly**: Verify functionality, accessibility, and styling
5. **Update Documentation**: Document the change and update guidelines

### Example Migration

**Before (Nuxt UI):**
```vue
<template>
  <UButton color="primary" size="lg" @click="submit">
    Submit Form
  </UButton>
</template>
```

**After (Shadcn UI):**
```vue
<template>
  <Button variant="default" size="lg" @click="submit">
    Submit Form
  </Button>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
</script>
```

## Best Practices

### Component Selection

1. **Start with Nuxt UI**: Begin with Nuxt UI for rapid development
2. **Upgrade When Needed**: Move to Shadcn when you hit limitations
3. **Be Consistent**: Use the same component type across similar use cases
4. **Document Decisions**: Record why you chose one over the other

### Development Workflow

1. **Check Existing**: Always check if a component already exists before creating new ones
2. **Follow Patterns**: Use established patterns from existing components
3. **Test Accessibility**: Verify components work with screen readers and keyboard navigation
4. **Validate Themes**: Test components in both light and dark modes

### Code Organization

```
components/
├── ui/                    # Shadcn components
│   ├── button.vue
│   ├── card.vue
│   └── input.vue
├── custom/                # Custom components
│   ├── EventCard.vue
│   └── UserProfile.vue
└── [nuxt-ui-components]   # Auto-imported Nuxt UI components
```

## Performance Considerations

### Bundle Size Impact

- **Nuxt UI**: Included in base bundle, minimal additional cost
- **Shadcn UI**: Only includes components you actually use (tree-shaking)

### Runtime Performance

- **Nuxt UI**: Optimized for Nuxt's rendering pipeline
- **Shadcn UI**: May have slightly higher overhead due to additional features

### Recommendations

1. **Monitor Bundle Size**: Use tools like `nuxt analyze` to track impact
2. **Lazy Load Complex Components**: Use dynamic imports for heavy Shadcn components
3. **Prefer Nuxt UI for Simple Cases**: Avoid over-engineering simple components

## Troubleshooting

### Common Issues

**Component Not Found**
```bash
# For Shadcn components, ensure they're properly imported
import { Button } from '~/components/ui/button'
```

**Styling Conflicts**
```vue
<!-- Use explicit classes to override conflicts -->
<Button class="custom-button-override">
  Custom Button
</Button>
```

**TypeScript Errors**
```typescript
// Ensure proper typing for component props
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}
```

### Getting Help

1. **Check Documentation**: Refer to component-specific documentation
2. **Review Examples**: Look at existing implementations in the codebase
3. **Test in Isolation**: Create minimal reproduction cases
4. **Ask for Review**: Get team feedback on component choices

## Future Considerations

### Roadmap

1. **Gradual Migration**: Slowly replace Nuxt UI components where Shadcn provides clear benefits
2. **Custom Components**: Develop project-specific components using Shadcn as a base
3. **Design System**: Evolve toward a unified design system using the best of both libraries

### Evaluation Criteria

- **User Experience**: Does the component improve usability?
- **Developer Experience**: Is it easier to work with?
- **Maintenance**: Does it reduce long-term maintenance burden?
- **Performance**: Does it impact application performance?
- **Accessibility**: Does it improve accessibility compliance?