# Use the official Nginx base image
FROM nginx

# Install Certbot and SSL dependencies
RUN apt-get update && \
    apt-get install -y certbot python3-certbot-nginx

# Copy the Nginx configuration file
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80
EXPOSE 443

# Run Certbot to obtain and renew SSL certificate
RUN certbot --nginx --non-interactive --agree-tos --email rohanraj9645@gmail.com -d connectout.online -d www.connectout.online -d user.connectout.online -d www.user.connectout.online -d admin.connectout.online -d www.admin.connectout.online

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
