# Dockerfile for microservice clans
# docker build -t ninja-clan:latest .

FROM mhart/alpine-node:6.2

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . /

CMD ['npm start']
