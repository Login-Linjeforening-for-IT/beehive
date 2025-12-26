FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache varnish

COPY package*.json ./

RUN npm install

COPY default.vcl /etc/varnish/default.vcl

COPY entrypoint.sh ./entrypoint.sh

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["/bin/sh", "/app/entrypoint.sh"]
