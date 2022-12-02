FROM node:latest
ENV NODE_ENV=prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production --silent && mv node_modules ../
# Bundle app source
COPY . .
RUN chown -R node /usr/src/app
USER node
CMD ["node", "src/index.js"]