FROM node:latest

WORKDIR /usr/apps/account-service

COPY ./  ./

RUN npm run install-all