server {
    listen 80;
    
    location / {
        root /usr/share/nginx/html;
        try_files $uri /index.html;
    }
}