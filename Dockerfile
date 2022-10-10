# build application
FROM node:16-alpine3.15 as build-stage

WORKDIR /app

COPY ./nginx.conf /nginx.conf
COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

# serve only compiled app with nginx
FROM nginx:1.22

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf