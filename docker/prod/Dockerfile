# build environment
FROM node:16.14.0-alpine as build

# set the working directory
WORKDIR /app

# add '/app/node_modules/.bin' to path
ENV PATH /app/node_modules/.bin:$PATH

# copy the dependency files
COPY frontend/package.json ./
COPY frontend/package-lock.json ./

# install the dependencies
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent

# copy the whole frontend directory
COPY frontend/ ./

# build the react application
RUN npm run build

#######################################

# production environment
FROM golang:1.18-alpine

# set the working directory
WORKDIR /app

# copy the dependency files
COPY backend/go.mod ./
COPY backend/go.sum ./

# install the dependencies
RUN go mod download

# copy the whole backend directory
COPY backend ./

# copy the built react application
COPY --from=build /app/build/ ./web/build/

# build the go application
RUN go build -o beehive ./cmd/main.go

# expose the ports
EXPOSE 8080
EXPOSE 4000

# run the server
CMD ["./beehive"]
