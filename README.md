# EventHub - Event Ticketing & Management Platform

EventHub is a modern event ticketing and management platform built with Nuxt 3. The application enables users to discover, book, and manage events while providing organizers with tools to create and manage their events.

## Features

- **Event Discovery**: Browse and search events with filtering capabilities
- **User Authentication**: Role-based access control (user, organizer, admin)
- **Event Management**: Create, update, and manage events (organizers/admins)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback
- **Modern UI Components**: Integration of Nuxt UI and Shadcn UI components

## Technology Stack

- **Framework**: Nuxt 3 with Vue 3 Composition API
- **Runtime**: Bun
- **Styling**: Tailwind CSS with custom CSS variables
- **UI Libraries**: 
  - Nuxt UI (primary component library)
  - Shadcn UI (enhanced components for specific use cases)
- **State Management**: Pinia with TypeScript support
- **Form Validation**: Vee-Validate with Zod schemas
- **Icons**: Heroicons
- **Theme**: Dark/light mode support

## User Roles & Demo Accounts

- **Admin**: Full system access (`admin@example.com` / `password`)
- **Organizer**: Event management capabilities (`organizer@example.com` / `password`)
- **User**: Browse and book events (`user@example.com` / `password`)

## Setup

Make sure to install the dependencies:

```bash
# Using npm (recommended)
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## UI Components

This project uses a hybrid approach with two UI component libraries:

### Nuxt UI (Primary)
- Main component library for standard UI elements
- Built on Headless UI and Tailwind CSS
- Provides components like `UButton`, `UCard`, `UInput`, etc.
- Automatically imported and available globally

### Shadcn UI (Enhanced Components)
- Used for specific components requiring enhanced functionality
- Copy-and-paste components built on Radix UI
- Located in `components/ui/` directory
- Provides better accessibility and customization options

## Component Usage Guidelines

### When to Use Nuxt UI
- Standard form elements and basic interactions
- Quick prototyping and standard layouts
- Components that don't require complex customization
- Existing components that are working well

### When to Use Shadcn UI
- Components requiring enhanced accessibility features
- Complex interactive components (dialogs, selects with search)
- When you need more control over styling and behavior
- Components with multiple variants and states

### Available Shadcn Components
- `Button` - Enhanced button with multiple variants
- `Card` - Flexible card component with composition
- `Input` - Form input with better validation integration
- `Dialog` - Modal dialog with proper accessibility (planned)
- `Select` - Dropdown with search capabilities (planned)

## Project Structure

```
├── components/
│   ├── ui/                 # Shadcn UI components
│   └── [other components]  # Custom and Nuxt UI components
├── pages/                  # File-based routing
├── stores/                 # Pinia state management
├── middleware/             # Route protection
├── assets/css/             # Global styles and CSS variables
├── lib/                    # Utility functions (including Shadcn utils)
└── types/                  # TypeScript type definitions
```

## Development Guidelines

### Component Development
- Use Vue 3 Composition API with `<script setup>`
- Implement proper TypeScript interfaces
- Follow existing naming conventions
- Test components with both light and dark themes

### Styling
- Use Tailwind CSS utility classes
- Leverage CSS custom properties for theming
- Maintain consistency with existing design system
- Test responsive behavior on mobile and desktop

### State Management
- Use Pinia stores for global state
- Implement proper TypeScript typing
- Follow established patterns for auth and data management

## Testing

Run the test suite:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Troubleshooting

### Common Issues

**Shadcn Components Not Rendering**
- Ensure `lib/utils.ts` is properly configured
- Check that Tailwind CSS is processing the component styles
- Verify component imports are correct

**Theme Issues**
- Check CSS custom properties in `assets/css/main.css`
- Ensure components use the established color system
- Test in both light and dark modes

**TypeScript Errors**
- Run `npm run postinstall` to regenerate Nuxt types
- Check component prop interfaces
- Verify imports are using correct paths

**Component Conflicts**
- Use explicit imports when naming conflicts occur
- Follow the component selection guidelines above
- Check for duplicate component registrations

For more detailed troubleshooting, see the [Component Integration Guide](#component-integration-guide) below.

## Component Integration Guide

### Adding New Shadcn Components

1. **Install the component**:
   ```bash
   npx shadcn-ui@latest add [component-name]
   ```

2. **Configure for Nuxt**:
   - Update component to use Vue 3 syntax
   - Add proper TypeScript interfaces
   - Test with existing theme system

3. **Integration checklist**:
   - [ ] Component renders in light/dark themes
   - [ ] TypeScript interfaces are properly defined
   - [ ] Component is accessible (ARIA attributes, keyboard navigation)
   - [ ] Unit tests are written and passing
   - [ ] Component follows project naming conventions

### Migrating from Nuxt UI to Shadcn

When replacing a Nuxt UI component with Shadcn:

1. **Assess the need**: Ensure Shadcn provides clear benefits
2. **Update imports**: Change from `U[Component]` to the Shadcn equivalent
3. **Update props**: Map Nuxt UI props to Shadcn component props
4. **Test thoroughly**: Verify functionality and styling
5. **Update documentation**: Document the change and reasoning

### Custom Component Development

For components not available in either library:

1. **Check both libraries first**: Avoid reinventing existing components
2. **Follow established patterns**: Use existing components as templates
3. **Implement accessibility**: Include proper ARIA attributes and keyboard support
4. **Add to component library**: Place in appropriate directory with documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Test your changes thoroughly
5. Submit a pull request with clear description

## Documentation

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/guide/)
- [Nuxt UI Documentation](https://ui.nuxt.com/)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is licensed under the MIT License.
