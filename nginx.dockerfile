worker_processes auto;
error_log /var/log/nginx/error.log;
pid /var/run/nginx.pid;

events {
  worker_connections 1024;
}

http {
  server {
    listen 80;
    server_name example.com;

    location /app1 {
      proxy_pass http://13.48.44.26:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }

    location /app2 {
      proxy_pass http://13.48.44.26:4000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
      proxy_pass http://13.48.44.26:8000/api/admin/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}