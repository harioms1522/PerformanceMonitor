FROM node:alpine
WORKDIR /perLoad/server

COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "start"]