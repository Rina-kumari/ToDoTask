FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -la dist

FROM node:20-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist/ToDoApp/browser ./dist
RUN ls -la ./dist
CMD ["sh", "-c", "http-server dist -p 8080"]