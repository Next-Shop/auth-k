FROM node:current-alpine
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install --only=prod
COPY . .

CMD [ "npm", "start" ]