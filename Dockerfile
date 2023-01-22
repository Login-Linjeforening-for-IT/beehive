# BUILD
# Use a Node 16 base image
FROM node:19-alpine as build

WORKDIR /app
COPY . /app

RUN npm ci 
RUN npm run build

# SERVE
FROM nginx:1.23-alpine

ENV NODE_ENV=production

COPY --from=build /app/build/ /usr/share/nginx/html
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
