# This Dockerfile, and the accompanying docker-compose.yml, are meant for building a local development environment

FROM alpine:latest

RUN apk add \
    python3 \
    python3-dev \
    bind \
    dhcp \
    build-base \
    yaml-dev

WORKDIR /dhcp-ui

COPY requirements.txt ./
ENV PYTHONUNBUFFERED 1
RUN /usr/bin/python3 -m pip install -r requirements.txt

COPY entrypoint.sh ./
COPY DHCPUI_SETTINGS.dockerdev.cfg ./

ENV FLASK_APP src/dhcp-ui.py
ENV FLASK_ENV development
ENV DHCPUI_SETTINGS ../DHCPUI_SETTINGS.dockerdev.cfg

COPY sample/dhcpd.conf /etc/dhcpd.conf
RUN touch /var/lib/dhcp/dhcpd.leases
# COPY sample/dhcpd.leases /var/lib/dhcp/

# COPY src/ src/

EXPOSE 5000
ENTRYPOINT ["/dhcp-ui/entrypoint.sh"]