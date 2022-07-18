FROM node:14.18.0-alpine

COPY package.json yarn.lock /usr/src/app/core-api/

RUN cd /usr/src/app/core-api \
    && yarn

COPY . /usr/src/app/core-api

WORKDIR /usr/src/app/core-api

CMD [ "yarn", "start:dev" ] 