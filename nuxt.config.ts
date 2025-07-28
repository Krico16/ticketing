// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light'
  },
  ui: {
    global: true,
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/components/ui',
      prefix: '',
      pathPrefix: false,
    }
  ],
  // Performance optimizations for Shadcn integration
  build: {
    transpile: ['class-variance-authority', 'clsx', 'tailwind-merge']
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate Shadcn components into their own chunk for better caching
            'shadcn-core': ['~/components/ui/button.vue', '~/components/ui/card.vue', '~/components/ui/input.vue'],
            'shadcn-complex': ['~/components/ui/dialog.vue', '~/components/ui/select.vue'],
            // Separate utility libraries
            'ui-utils': ['class-variance-authority', 'clsx', 'tailwind-merge']
          }
        }
      },
      // Enable tree-shaking
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug']
        }
      }
    },
    optimizeDeps: {
      include: ['class-variance-authority', 'clsx', 'tailwind-merge']
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            card: 'hsl(var(--card))',
            'card-foreground': 'hsl(var(--card-foreground))',
            popover: 'hsl(var(--popover))',
            'popover-foreground': 'hsl(var(--popover-foreground))',
            secondary: 'hsl(var(--secondary))',
            'secondary-foreground': 'hsl(var(--secondary-foreground))',
            muted: 'hsl(var(--muted))',
            'muted-foreground': 'hsl(var(--muted-foreground))',
            accent: 'hsl(var(--accent))',
            'accent-foreground': 'hsl(var(--accent-foreground))',
            destructive: 'hsl(var(--destructive))',
            'destructive-foreground': 'hsl(var(--destructive-foreground))',
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
          },
          borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
          },
        },
      },
    },
  },
})