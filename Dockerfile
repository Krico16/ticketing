# Multi-stage Dockerfile for EventHub Nuxt 3 Application

# Base stage - Common setup with Bun Alpine
FROM oven/bun:1-alpine AS base
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package.json bun.lockb ./

# Development stage - Full development environment
FROM base AS development
# Install all dependencies including dev dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Expose development port
EXPOSE 3000

# Set development environment
ENV NODE_ENV=development
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Start development server
CMD ["bun", "run", "dev"]

# Build stage - Create production build
FROM base AS build
# Install all dependencies for building
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage - Minimal runtime with Node.js
FROM node:18-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxt -u 1001 -G nodejs

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy built application from build stage
COPY --from=build --chown=nuxt:nodejs /app/.output ./.output
COPY --from=build --chown=nuxt:nodejs /app/package.json ./

# Switch to non-root user
USER nuxt

# Expose production port
EXPOSE 3000

# Set production environment variables
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Start production server
CMD ["node", ".output/server/index.mjs"]