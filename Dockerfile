# Stage 1: Dependencies
FROM node:22-alpine AS deps
RUN apk update && apk upgrade && apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

# Copy package files
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Stage 2: Builder
FROM node:22-alpine AS builder
RUN apk update && apk upgrade
WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN yarn build

# Stage 3: Runner
FROM node:22-alpine AS runner
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
