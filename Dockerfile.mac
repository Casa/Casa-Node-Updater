# specify the node base image with your desired version node:<version>
FROM node

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

# On mac, download and install docker compose inside the manager image
RUN curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

LABEL casa=persist

EXPOSE 3001
CMD [ "npm", "start" ]
