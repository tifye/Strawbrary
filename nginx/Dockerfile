FROM nginx:latest
EXPOSE 80
WORKDIR /nginx
# Remove default config file
RUN rm -rf /etc/nginx/nginx.conf
# Copy my config file
COPY ./ /etc/nginx/