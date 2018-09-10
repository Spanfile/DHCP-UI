FROM alpine:latest

RUN apk add \
    python3 \
    python3-dev \
    bind-tools \
    dhcp \
    build-base \
    yaml-dev

WORKDIR /dhcp-ui
COPY requirements.txt ./

ENV PYTHONUNBUFFERED 1
RUN /usr/bin/python3 -m pip install -r requirements.txt

COPY src/ src

ENV FLASK_APP src/dhcp-ui.py
ENV FLASK_ENV development

EXPOSE 5000

CMD /usr/bin/python3 /dhcp-ui/src/dhcp-ui.py