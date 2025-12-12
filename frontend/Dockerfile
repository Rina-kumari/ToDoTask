FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist/to-do-app ./dist/to-do-app
EXPOSE 8080
CMD ["http-server", "dist/to-do-app", "-p", "8080"]
