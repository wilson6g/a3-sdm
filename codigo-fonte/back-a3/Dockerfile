FROM node:alpine
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install -g nodemon && npm install
COPY . .
ENTRYPOINT ["npm", "run", "dev"]
