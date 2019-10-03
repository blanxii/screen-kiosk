FROM node:8 as production

COPY ./src/server /opt/app

WORKDIR /opt/app

RUN npm install

ENTRYPOINT npm start index.js