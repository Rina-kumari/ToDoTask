FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration production

FROM node:20-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist/ToDoApp/browser ./dist
EXPOSE 8080
CMD ["http-server", "dist", "-p", "8080"]
