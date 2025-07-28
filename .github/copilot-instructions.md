# EventHub - GitHub Copilot Instructions

## Project Overview
EventHub is a Nuxt 3 event ticketing platform with role-based access (user/organizer/admin) using a hybrid UI component approach with Nuxt UI + Shadcn UI integration.

## Key Architecture Patterns

### Hybrid UI Component Strategy
- **Nuxt UI**: Primary components (`UButton`, `UCard`, `UInput`) - use for standard UI elements
- **Shadcn UI**: Enhanced components in `components/ui/` - use for complex interactions requiring accessibility
- Components auto-imported via `nuxt.config.ts` configuration
- Use `cn()` utility from `lib/utils.ts` for conditional classes with Shadcn components

### State Management & Auth
- **Pinia stores**: `stores/auth.ts` and `stores/events.ts` with TypeScript interfaces
- **Auth flow**: Mock authentication with role-based demo accounts (`admin@example.com`, `organizer@example.com`, `user@example.com` / `password`)
- **Middleware protection**: Route guards in `middleware/` (auth, admin, organizer, guest)
- **Page metadata**: Use `definePageMeta({ middleware: ['auth', 'admin'] })` for protected routes

### Form Validation Pattern
- **Standard approach**: `useFormValidation()` composable with Vee-Validate + Zod schemas
- **Implementation**: `const { form, createField, handleSubmit } = useFormValidation(schema, initialValues)`
- **Field creation**: `const email = createField('email')` with reactive validation

### Theming System
- **CSS custom properties**: Defined in `assets/css/main.css` with light/dark mode support
- **Color system**: Use semantic tokens (`hsl(var(--primary))`) not hardcoded colors
- **Tailwind config**: Extended in `nuxt.config.ts` to map CSS variables to Tailwind classes

## Development Workflows

### Component Development
```bash
# Run dev server (binds to all interfaces for Docker)
bun dev

# Test components with theme integration
bun test
bun test:run  # CI mode

# Docker development (alternative)
docker-compose -f docker-compose.dev.yml up
```

### Adding Shadcn Components
1. Install: `bunx shadcn-ui@latest add [component-name]`
2. Convert to Vue 3 `<script setup>` syntax
3. Add TypeScript interfaces
4. Test light/dark themes
5. Write tests in `components/ui/[component].test.ts`

### Project Structure Conventions
- **Pages**: File-based routing with dynamic routes (`[id].vue`)
- **Components**: Auto-imported, PascalCase naming (`UButton`, custom Shadcn)
- **Middleware**: Role-based protection chains (`['auth', 'admin']`)
- **SEO**: Use `useHead()` for meta tags on each page
- **Global state**: Toast notifications provided via `app.vue`

### Docker Deployment
- **Development**: `docker-compose.dev.yml` with hot-reload and volume mounts
- **Production**: `docker-compose.prod.yml` with optimized builds and security
- **Environment-specific**: Separate configs for dev/prod with appropriate resource limits

### Performance Optimizations
- **Manual chunks**: Shadcn components split into separate bundles (`nuxt.config.ts`)
- **Tree-shaking**: Terser configuration removes console logs in production
- **Dependency optimization**: CVA, clsx, tailwind-merge pre-bundled
- **Lazy loading**: Complex components (Dialog, Select) loaded on-demand via `lib/component-loader.ts`
- **Bundle analysis**: Use `node scripts/bundle-analysis.js` to monitor performance

## Testing Conventions
- **Vitest + Happy DOM**: Component testing with `@vue/test-utils`
- **Test files**: Co-located with components (`button.test.ts`)
- **Coverage focus**: Variants, accessibility, theme integration
- **Mock patterns**: Auth store mocking for protected component testing

## File Organization
```
components/ui/          # Shadcn components with tests
stores/                 # Pinia stores with TypeScript
middleware/             # Route protection logic
pages/                  # File-based routing with middleware
  auth/                 # Authentication pages (signin, signup)
  events/               # Event listing and details ([id].vue)
  admin/                # Admin dashboard pages
  organizer/            # Organizer dashboard pages
composables/            # Reusable composition functions
lib/utils.ts           # Shadcn utility functions
assets/css/main.css    # Theme variables and base styles
.kiro/                 # Project specifications and steering docs
```

## Core Features & User Roles
- **User**: Browse events, create bookings, view event details
- **Organizer**: Create/manage own events + all user capabilities  
- **Admin**: Full system access including user management and all events
- **Event Management**: CRUD operations with capacity/booking validation
- **Personal Dashboards**: Role-specific interfaces for different user types

## Critical Dependencies
- **Runtime**: Bun (package manager and dev server)
- **UI Libraries**: `@nuxt/ui` + local Shadcn components
- **Validation**: `vee-validate` + `@vee-validate/zod`
- **Styling**: Tailwind with CSS custom properties
- **State**: Pinia with TypeScript support

## Component Selection Guide
- **Use Nuxt UI**: Standard forms, quick prototypes, existing working components
- **Use Shadcn UI**: Complex interactions, enhanced accessibility, multiple variants
- **Migration path**: Replace Nuxt UI with Shadcn when enhanced functionality needed
- **Decision matrix**: Check `docs/component-guidelines.md` for detailed component comparison
- **Lazy loading**: Use Suspense boundaries for complex components (Dialog, Select)

## Troubleshooting Common Issues
- **Shadcn components not rendering**: Verify `lib/utils.ts` and check import paths (`~/components/ui/`)
- **Theme issues**: Ensure CSS custom properties in `assets/css/main.css` and test light/dark modes
- **TypeScript errors**: Run `bun run postinstall` to regenerate Nuxt types
- **Styling conflicts**: Use explicit imports and `cn()` utility for conditional classes
- **Performance**: Monitor bundle size with `node scripts/bundle-analysis.js`

When contributing, follow the established patterns for auth flows, component testing, and the hybrid UI approach. Always test both light/dark themes and ensure TypeScript compliance.
