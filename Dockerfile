FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p storage/images

EXPOSE 5001

CMD ["npm", "start"]