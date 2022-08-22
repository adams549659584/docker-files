FROM adams549659584/darkhttpd:latest

COPY web /var/www/html
COPY config /var/www/html/config

ENTRYPOINT ["/darkhttpd","/var/www/html"]

CMD ["--port","9002","--ipv6"]

EXPOSE 9002