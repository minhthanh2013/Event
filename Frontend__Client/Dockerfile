FROM node:14.18.0-alpine

COPY package.json /usr/src/app/Frontend__Client/

RUN cd /usr/src/app/Frontend__Client \
    && yarn

COPY . /usr/src/app/Frontend__Client

WORKDIR /usr/src/app/Frontend__Client

CMD [ "yarn", "dev" ] 