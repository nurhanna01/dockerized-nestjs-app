FROM node:24.1.0

WORKDIR /my-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node","dist/main"]
