FROM node:18.0 As development
WORKDIR /app
COPY *.json ./
RUN npm install --force --only=development
COPY . ./
RUN npm run build

FROM nginx:latest As production
COPY --from=development /app/build /usr/share/nginx/html
COPY _nginx_/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80