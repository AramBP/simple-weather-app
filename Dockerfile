FROM node:21

#set working directory
WORKDIR /app

#copy package.json and package-lock.json to the working directory
COPY package*.json ./

# install dependencies
RUN npm install

#copy rest of application to /app
COPY . .

#expose a port to communicate with react app
EXPOSE 5173

#start app
CMD ["npm", "run", "dev"]

