# Node image with Alpine Linux
FROM node:lts-alpine

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
