# Hearthstone-GraphQL-App

## UNDER DEVELOPMENT

<!-- TABLE OF CONTENTS -->
## Table of Contents
* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Contact](#contact)
 
 
 
<!-- ABOUT THE PROJECT -->
## About The Project
Hearthstone GraphQL App is an application built for GraphQL, Apollo, Node, MongoDB, Redux, Webpack and Docker learning purpose. 
 
### Built With

I have built this application using:

## Client

* [ECMAScript 6+](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources) 
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Redux](https://redux.js.org/)
* [GraphQL](https://graphql.org/)
* [Apollo Client](https://www.apollographql.com/docs/react/)
* [Webpack](https://webpack.js.org/)
* [Material UI](https://material-ui.com/)
* [Redux-thunk](https://github.com/reduxjs/redux-thunk)
* [SASS](https://sass-lang.com/e)
* [React Router](https://reactrouter.com/)
* [Docker](https://www.docker.com/)
* [Docker-compose](https://docs.docker.com/compose/)

## Server

* [Node](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose(https://mongoosejs.com/)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [GraphQL](https://graphql.org/)
* [Docker](https://www.docker.com/)
* [Docker-compose](https://docs.docker.com/compose/)
 
<!-- GETTING STARTED -->
## Getting Started
 
How to use application

### Usage
 
### Installation and running on localhost (by docker-compose)
 
1. Download this repository.
2. If you are using Windows run below commands.
- ```docker-machine start default```
- ```docker-machine env```
3. In project's root directory run ```docker-compose build``` command.
4. Then run ```docker-compose up``` 

If step 4 will somehow fail run below commands in exactly the same order
- ```docker-compose up -d mongo```
- ```docker-compose up -d server```
- ```docker-compose up -d client```

Client will run on: 192.168.99.100:8080
Server will run on: 192.168.99.100:4000

### Installation and running on localhost (by npm)
 
1. Download this repository.
2. Go to /client directory and run ```npm install``` command.
3. Go to /server directory and run ```npm install``` command.
3. Run ```npm start``` in both directories and have fun!

Client is run on: localhost:8080
Server is run on: localhost:4000
 
<!-- CONTACT -->
## Contact
 
My Email - bartekh1998@op.pl
 
Project Link: [https://github.com/bartek3pl/Hearthstone-GraphQL-App](https://github.com/bartek3pl/Hearthstone-GraphQL-App)
