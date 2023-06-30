# Dockerfile

# Use the official Nginx base image
FROM nginx:alpine

# Copy the Nginx configuration file
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
