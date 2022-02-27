FROM node:16-alpine
WORKDIR /katana-homework
COPY package.json .
RUN npm install
COPY . .
CMD npm start