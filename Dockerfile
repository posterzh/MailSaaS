FROM python:3.9-alpine
FROM node:14.4.0-alpine3.10


ENV PYTHONUNBUFFERED=1

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql-client


RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev libffi-dev redis 

RUN pip3 install -r /requirements.txt
RUN mkdir /app
COPY package.json /app/
WORKDIR /app
RUN npm install


COPY . /app/
EXPOSE 3000
RUN adduser -D user

USER user
