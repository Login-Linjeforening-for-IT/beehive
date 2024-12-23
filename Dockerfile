FROM node:20-alpine as build
COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_API_URL=${API_URL}
ENV REACT_APP_FRONTEND_VERSION=${IMAGE_VERSION}
EXPOSE 3000
RUN npm run build
CMD npm start

