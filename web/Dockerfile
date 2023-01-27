FROM node:18-buster-slim as build-stage

# create work direction
RUN mkdir -p /usr/src/weather

WORKDIR /usr/src/weather

COPY . .

RUN npm config set registry https://registry.npmmirror.com
RUN npm install
RUN npm install @quasar/cli -g

RUN quasar build

EXPOSE 9001

FROM nginx:1.23.3-alpine-slim

COPY --from=build-stage /usr/src/weather/dist /usr/share/nginx/html
COPY --from=build-stage /usr/src/weather/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# start
CMD ["nginx", "-g", "daemon off;"]