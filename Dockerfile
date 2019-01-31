# specify the node base image with your desired version node:<version>
FROM node:8

# Install editor
RUN apt-get update && apt-get install -y vim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

LABEL casa=persist

EXPOSE 3000
CMD [ "npm", "start" ]
