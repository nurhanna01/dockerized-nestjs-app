FROM node:24.1.0

WORKDIR /my-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=15s --start-period=5s --retries=3\
  CMD curl -f http://localhost:3000/health/ || exit 1

CMD ["node","dist/main"]
