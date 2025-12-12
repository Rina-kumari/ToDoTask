FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist/ToDoApp ./dist/ToDoApp
EXPOSE 8080
CMD ["http-server", "dist/ToDoApp", "-p", "8080"]
