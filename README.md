[![Build Status](https://app.travis-ci.com/joki20/editor-backend.svg?branch=master)](https://app.travis-ci.com/joki20/editor-backend)

# Backend editor

Backend API with Express, Node.js and MongoDB Atlas.

## Folder structure

-   db: database connection configurations
-   src: CRUD operations GET, POST, UPDATE
-   routes: route files, activated by app.use() function in app.js

## Installation

1. Move to folder in terminal
2. git clone https://github.com/joki20/editor-backend
3. npm install
4. npm start
5. Create config.json in db folder with properties "username" and "password" for MongoDB Atlas

## Routes

-   List all documents with localhost:1337/list
-   Create new document with localhost:1337/create?title=customTitle%content=customContent
-   Update document with localhost:1337/update?title=customTitle&content=customContent

customId, customTitle and customContent is free of choice, but customId has to be one of existing 24 char id already inside list.

## Test

-   Build passed with Travis
-   Code coverage with nyc. See terminal after npm test, and folder /coverage