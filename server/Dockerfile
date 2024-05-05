# Layer 1: Telling Docker to use the node:17-alpine image as the base image for the container.
FROM node:17-alpine

# Layer 2: We use nodemon to restart the server every time there's a change
RUN npm install -g nodemon

# Layer 3: Setting the working directory inside the container to /app
WORKDIR /app

# Layer 4: Copying the package.json file from the root of the project to the /app directory in the container.
COPY package.json .

# Layer 5: Installing the dependencies listed in the package.json file.
RUN npm install

# Layer 6: Copying all the files from the root of the project to the /app directory in the container.
COPY . .

# Layer 7: Exposing port 3001 on the container to allow communication with the backend server.
EXPOSE 3001

# Layer 8: Using the script specified in the package.json file to start the server.
CMD ["npm", "run", "dev"]
