# FROM nginx:1.15.8-alpine

# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY . .

# EXPOSE 8888
# CMD [ "nginx" ]

FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

RUN apt-get update && apt-get install -y curl && apt-get clean

EXPOSE 8888