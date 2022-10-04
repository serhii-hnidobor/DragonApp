FROM node:16.16.0-alpine as frontend-build
ARG REACT_APP_API_ORIGIN_URL
ENV REACT_APP_API_ORIGIN_URL=$REACT_APP_API_ORIGIN_URL
ARG REACT_APP_SERVER_HOST
ENV REACT_APP_SERVER_HOST=$REACT_APP_SERVER_HOST

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./frontend/package.json ./frontend/

RUN npm pkg set scripts.postinstall="npm run build:shared"
RUN npm ci -w shared -w frontend

COPY ./frontend ./frontend/

RUN npm run build:frontend

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx/nginx.local.conf /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

COPY --from=frontend-build /app/frontend/build/ /usr/share/nginx/html
