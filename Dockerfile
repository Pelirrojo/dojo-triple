# Dockerfile for microservice clans

FROM mhart/alpine-node

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . /app

CMD ['npm start']
