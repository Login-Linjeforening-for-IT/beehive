FROM oven/bun:alpine

WORKDIR /app

RUN apk add --no-cache varnish

COPY package.json bun.lock* ./

RUN bun install --frozen-lockfile

COPY default.vcl /etc/varnish/default.vcl

COPY entrypoint.sh ./entrypoint.sh

COPY . .

RUN bun run build

EXPOSE 3000

CMD ["/bin/sh", "/app/entrypoint.sh"]
