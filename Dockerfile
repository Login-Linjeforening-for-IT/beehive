# BUILD
# Use a Node 16 base image
FROM node:19-alpine as build

ARG API_URL=API_URL_PLACEHOLDER
ARG IMAGE_VERSION

WORKDIR /app
COPY . /app

ENV REACT_APP_API_URL=${API_URL}
ENV REACT_APP_FRONTEND_VERSION=${IMAGE_VERSION}

RUN npm ci 
RUN npm run build

# SERVE
FROM nginx:1.23-alpine

# Copy the script into the image
COPY docker-entrypoint.sh /docker-entrypoint.d/40-replace_api_url.sh

# Make sure the script is executable
RUN chmod +x /docker-entrypoint.d/40-replace_api_url.sh

COPY --from=build /app/build/ /usr/share/nginx/html
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
