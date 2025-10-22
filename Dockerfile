# Stage 1: Dependencies
FROM node:22-alpine AS deps
RUN apk update && apk upgrade && apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
RUN npm install --only=production --legacy-peer-deps

# Stage 2: Builder
FROM node:22-alpine AS builder
RUN apk update && apk upgrade
WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Stage 3: Runner
FROM node:22-alpine AS runner
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

CMD ["node", ".next/standalone/server.js"]
