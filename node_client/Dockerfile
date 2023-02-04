FROM node:alpine
WORKDIR /perLoad/local-client

COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "start"]