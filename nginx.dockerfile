# Dockerfile

# Use the official Nginx base image
FROM nginx

# Install Certbot
RUN apt-get update && \
    apt-get install -y certbot

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
