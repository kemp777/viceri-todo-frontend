FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build -- --configuration production

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/dist/viceri-todo-frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
