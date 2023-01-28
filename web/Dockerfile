FROM node:18-buster-slim as build-stage

# create work direction
RUN mkdir -p /usr/src/web

WORKDIR /usr/src/web

COPY . .

RUN npm config set registry https://registry.npmmirror.com
RUN npm install
RUN npm install @quasar/cli -g

RUN quasar build

FROM nginx:1.23.3-alpine-slim as production-stage

COPY --from=build-stage /usr/src/web/dist /usr/share/nginx/html
COPY --from=build-stage /usr/src/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# start
CMD ["nginx", "-g", "daemon off;"]