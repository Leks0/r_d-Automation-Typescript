FROM alpine:latest

# Встановлюємо curl та sed
RUN apk add --no-cache curl sed

# Завантажуємо офіційний docker-compose.yml у тимчасову директорію
RUN mkdir -p /tmp/reportportal && \
    curl -o /tmp/reportportal/docker-compose.yml https://raw.githubusercontent.com/reportportal/reportportal/master/docker-compose.yml && \
    sed -i '/^\s*uat:$/,/^\s*[^ ]/ s/environment:/environment:\n      RP_INITIAL_ADMIN_PASSWORD: ${RP_INITIAL_ADMIN_PASSWORD}/' /tmp/reportportal/docker-compose.yml

# Копіюємо результат у змонтований об'єм при запуску контейнера
CMD ["sh", "-c", "cp /tmp/reportportal/docker-compose.yml /export/"]

