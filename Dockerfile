FROM node:4.4
MAINTAINER ingee.kim@sk.com

LABEL RUN "sudo docker run --rm -e API_SERVER=$API_SERVER_IP -p 8000:8000 ingee/hello-nodejs"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./app/ ./
RUN npm install

CMD ["node", "app.js"]
