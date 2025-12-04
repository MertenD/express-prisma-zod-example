# syntax=docker/dockerfile:1

# Base Image
FROM node:20-alpine AS base

WORKDIR /app

# Build Stage
FROM base AS build

# System dependencies for Prisma
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src

RUN npm run build
RUN npm prune --production

# Runtime Stage
FROM base AS runtime

ENV NODE_ENV=production

# System dependencies for Prisma
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/server.js"]
