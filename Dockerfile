# stage 1: builder
FROM node:24.1.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# stage 2:production
FROM node:24.1.0-slim

WORKDIR /app

# install just prod depedency
COPY package*.json ./

RUN npm install --omit=dev

# get only build result
COPY --from=builder /app/dist/ ./dist

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=15s --start-period=5s --retries=3\
  CMD curl -f http://localhost:3000/health/ || exit 1

CMD ["node","dist/main"]
