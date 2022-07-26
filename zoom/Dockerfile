FROM node:14.18.0-alpine

COPY package.json yarn.lock /usr/src/app/zoom/

RUN cd /usr/src/app/zoom \
    && yarn

COPY . /usr/src/app/zoom

WORKDIR /usr/src/app/zoom

CMD [ "yarn", "start:dev" ] 