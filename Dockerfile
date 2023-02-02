# BUILD
# Use a Node 16 base image
FROM node:19-alpine as build

ARG API_URL=https://api.login.no

WORKDIR /app
COPY . /app

ENV REACT_APP_API_URL=${API_URL}

RUN npm ci 
RUN npm run build

# SERVE
FROM nginx:1.23-alpine

COPY --from=build /app/build/ /usr/share/nginx/html
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
