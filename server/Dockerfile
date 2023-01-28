FROM node:18-buster-slim

# create work direction
RUN mkdir -p /usr/src/server

WORKDIR /usr/src/server

COPY . .

RUN npm config set registry https://registry.npmmirror.com
RUN npm install

RUN npm run build

EXPOSE 3000

# start the server
CMD [ "npm", "run", "start:prod" ]