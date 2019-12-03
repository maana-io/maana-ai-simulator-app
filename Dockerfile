# base image
FROM mhart/alpine-node:latest as build-stage

# install git for private packages
RUN apk add --update \
  git \
  && rm -rf /var/cache/apk/*

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm install
RUN npm install react-scripts@3.0.1 -g

COPY ./ /app/
COPY ./.env.prod /app/.env
COPY ./nginx.conf /nginx.conf

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf