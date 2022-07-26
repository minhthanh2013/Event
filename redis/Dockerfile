FROM node:14.18.0-alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "start:dev" ] 