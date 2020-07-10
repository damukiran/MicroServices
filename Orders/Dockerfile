FROM node:9-slim

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 2022
CMD [ "npm", "start" ]

