FROM node

WORKDIR /client

COPY package*.json /client/
COPY webpack.config.js /client/

RUN npm install

COPY . /client/

EXPOSE 8080

CMD ["npm", "start"]