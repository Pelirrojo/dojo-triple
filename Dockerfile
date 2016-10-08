# Dockerfile for microservice clans
#

FROM mhart/alpine-node:6.2

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . /app

CMD ['npm start']
