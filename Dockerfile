# Builder
FROM oven/bun:alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Runtime
FROM oven/bun:alpine
WORKDIR /app

RUN apk add --no-cache varnish \
    && addgroup -S app && adduser -S app -G app
USER app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

COPY default.vcl /etc/varnish/default.vcl

ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["sh", "-c", "varnishd -a :3000 -f /etc/varnish/default.vcl -s malloc,1g & bun server.js"]