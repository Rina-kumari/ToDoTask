FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist/ToDoApp/browser /app/dist
CMD ["sh", "-c", "http-server /app/dist -p 8080 -a 0.0.0.0 -d false"]