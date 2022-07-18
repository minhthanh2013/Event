FROM node:14.18.0-alpine

COPY package.json yarn.lock /usr/src/app/payment/

RUN cd /usr/src/app/payment \
    && yarn

COPY . /usr/src/app/payment

WORKDIR /usr/src/app/payment

CMD [ "yarn", "start:dev" ] 