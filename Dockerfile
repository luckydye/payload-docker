FROM node:16-alpine

RUN apk add --update alpine-sdk build-base

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN mkdir -p /app
WORKDIR /app

COPY . .

WORKDIR /app/payload
RUN npm install
RUN npm run build

EXPOSE 3000
EXPOSE 8000

CMD [ "npm", "run", "start" ]