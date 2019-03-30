FROM node:8
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
RUN mkdir -p /usr/src/app && cd /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g http-server

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm rebuild node-sass --force
RUN npm run build
RUN rm -rf ./build
RUN rm -rf ./test
ENV PORT=8000
EXPOSE 8000
CMD [ "npm", "run", "serve" ]