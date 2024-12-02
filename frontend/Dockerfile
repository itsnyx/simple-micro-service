FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm update > /dev/null 2>&1

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
