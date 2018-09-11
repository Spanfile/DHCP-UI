# This Dockerfile, and the accompanying docker-compose.yml, are meant for building a local development environment

FROM alpine:latest

RUN apk add \
    python3 \
    python3-dev \
    bind-tools \
    dhcp \
    build-base \
    yaml-dev

WORKDIR /dhcp-ui
COPY src/ src/
COPY requirements.txt ./
COPY DHCPUI_SETTINGS.dockerdev.cfg ./

ENV FLASK_APP src/dhcp-ui.py
ENV FLASK_ENV development
ENV DHCPUI_SETTINGS ../DHCPUI_SETTINGS.dockerdev.cfg

ENV PYTHONUNBUFFERED 1
RUN /usr/bin/python3 -m pip install -r requirements.txt

COPY sample/dhcpd.conf /etc/dhcpd.conf
RUN touch /var/lib/dhcp/dhcpd.leases
# COPY sample/dhcpd.leases /var/lib/dhcp/
RUN sh /etc/init.d/dhcpd start

EXPOSE 5000
ENTRYPOINT python3 -m flask run --host 0.0.0.0