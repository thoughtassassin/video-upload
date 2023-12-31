FROM rickydunlop/nodejs-ffmpeg:latest

MAINTAINER David Krause

ENV NODE_ENV=production
ENV PORT=3000

COPY . /var/www
WORKDIR /var/www

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]