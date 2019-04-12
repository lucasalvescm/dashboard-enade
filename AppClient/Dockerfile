
FROM node:8

RUN mkdir -p /usr/src/app && cd /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g http-server


COPY . .
RUN npm rebuild node-sass --force
RUN npm run build
RUN rm -rf ./build
RUN rm -rf ./test
ENV PORT=8000
EXPOSE 8000
CMD [ "npm", "run", "serve" ]