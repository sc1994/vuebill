FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8089

CMD [ "npm", "run","dev" ]

