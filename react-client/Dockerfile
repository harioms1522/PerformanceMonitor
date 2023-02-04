FROM node:alpine as builder
WORKDIR /perLoad/react-client
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
COPY --from=builder perLoad/react-client/build /usr/share/nginx/html