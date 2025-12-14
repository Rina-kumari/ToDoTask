FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN echo "Contents of dist:" && ls -la dist/
RUN echo "Contents of dist/ToDoApp:" && ls -la dist/ToDoApp/
RUN echo "Contents of dist/ToDoApp/browser:" && ls -la dist/ToDoApp/browser/

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/ToDoApp/browser /usr/share/nginx/html
RUN echo "Contents of nginx html:" && ls -la /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]