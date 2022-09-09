FROM node:14.18.0-alpine

# ENV HOME /usr/src/app/
# WORKDIR HOME

# COPY ["core-api/package.json", "core-api/yarn.lock", "$HOME/core-api/"]
# COPY ["payment/package.json", "payment/yarn.lock", "$HOME/payment/"]
# COPY ["zoom/package.json", "zoom/yarn.lock", "$HOME/zoom/"]

COPY core-api/package.json core-api/yarn.lock /usr/src/app/core-api/

RUN cd /usr/src/app/core-api \
    && yarn

COPY ./core-api /usr/src/app/core-api

RUN cd ..

COPY payment/package.json payment/yarn.lock /usr/src/app/payment/

RUN cd /usr/src/app/payment \
    && yarn

COPY ./payment /usr/src/app/payment

RUN cd ..

COPY zoom/package.json zoom/yarn.lock /usr/src/app/zoom/

RUN cd /usr/src/app/zoom \
    && yarn

COPY ./zoom /usr/src/app/zoom 