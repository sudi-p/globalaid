FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["nodemon", "index.js"]
