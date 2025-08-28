# 1. Bağımlılıklar
FROM node:20-bookworm-slim AS deps
WORKDIR /app

# root ile çalış
USER root

# package.json ve yarn.lock kopyala
COPY package.json yarn.lock ./

# Sadece production bağımlılıklarını yükle
RUN yarn install --frozen-lockfile --production=false

# 2. Build aşaması
FROM node:20-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Build için root kullanıcısını kullan
USER root

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# .next dizinini oluştur ve izinleri ayarla
RUN mkdir -p .next && chown -R node:node /app

# Build işlemini node kullanıcısı ile yap
USER node

# ESLint olmadan build yap
RUN yarn build --no-lint

# 3. Çalıştırma / Prod
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

USER node

# Gerekli dosyaları kopyala
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/next.config.mjs ./next.config.mjs
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "start", "-H", "0.0.0.0"]