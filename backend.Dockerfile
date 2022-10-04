FROM node:16.16.0-slim as backend-build

RUN apt-get update
RUN apt-get install -y openssl
RUN apt-get install -y ca-certificates wget

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./backend ./backend

RUN npm ci -w shared -w backend

RUN npm run build:backend
RUN rm -rf ./backend/core/src
RUN rm -rf ./shared/src

EXPOSE $PORT

CMD npm start -w backend
