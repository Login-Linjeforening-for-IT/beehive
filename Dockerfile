# Node image with Alpine Linux
FROM node:lts-alpine

# Args
ARG GITLAB_MESSAGE
ARG NEXT_PUBLIC_AUTHENTIK_CLIENT_ID
ARG AUTHENTIK_CLIENT_SECRET
ARG NEXT_PUBLIC_AUTHENTIK_URI
ARG NEXT_PUBLIC_URI
ARG API_URL
ARG CDN_URL

# Env
ENV GITLAB_MESSAGE=$GITLAB_MESSAGE
ENV NEXT_PUBLIC_AUTHENTIK_CLIENT_ID=$NEXT_PUBLIC_AUTHENTIK_CLIENT_ID
ENV AUTHENTIK_CLIENT_SECRET=$AUTHENTIK_CLIENT_SECRET
ENV NEXT_PUBLIC_AUTHENTIK_URI=$NEXT_PUBLIC_AUTHENTIK_URI
ENV NEXT_PUBLIC_URI=$NEXT_PUBLIC_URI
ENV API_URL=$API_URL
ENV CDN_URL=$CDN_URL

# Workdir required for tailwind to compile
WORKDIR /app

# Installs services
RUN apk add --no-cache varnish

# Starts varnish
COPY default.vcl /etc/varnish/default.vcl

# Copies entrypoint
COPY entrypoint.sh ./entrypoint.sh

# Copies package.json and package-lock.json
COPY package*.json ./

# Installs dependencies
RUN npm install

# Copies the rest of the UI source code
COPY . .

RUN npm run build

# Exposes port 3000
EXPOSE 3000

# Starts the application
CMD ["/bin/sh", "/app/entrypoint.sh"]
