FROM node:16

WORKDIR /code

COPY . .

RUN npm ci --only=production

ENTRYPOINT [ "npm", "run", "start" ]