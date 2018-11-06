FROM python:3.7-alpine as build
LABEL maintainer "Angad Garg <angad.garg3@gmail.com>"

COPY requirements.txt ./
RUN apk update && \
    apk add --virtual build-deps gcc musl-dev && \
    apk add postgresql-dev && \
    rm -rf /var/cache/apk/*

RUN pip install -r requirements.txt

RUN apk del build-deps gcc musl-dev
COPY . /app
WORKDIR /app
ENV FLASK_ENV=prod
EXPOSE 5000
ENTRYPOINT [ "gunicorn", "-b", "0.0.0.0:5000", "--log-level", "INFO", "--timeout", "3000", "manage:app" ]