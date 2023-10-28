# :strawberry: POF - Planty of Food

REST API for manage purchasing group

## :question: Why

This project is the final practice for start2impact Node.js course.

## :bulb: How it works

This API has three data Schemas:

- Users: data of the subscripted users
- Products: data of the products
- Orders: data on which users and which products they have inserted in the specific order

Using the correct [endpoints](#endpoints) you can Create, Read, Update ore Delete (CRUD) what do you want.
Finally, you can search through the intervals with some queries.
For this project where used Node.js (with Express framework) and MongoDB database.

## :books: Libraries

- Express
- Mongoose
- dotenv (loads environment variables from a .env file into process.env)
- Morgan (Morgan is another HTTP request logger middleware for Node. js. )
- Express-mongo-sanitize (middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.)
- Express-rate-limit (Basic IP rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.)
- Helmet (Helmet helps secure Express apps by setting HTTP response headers.)
- Hpp (Express middleware to protect against HTTP Parameter Pollution attacks)
- Validator (A library of string validators and sanitizers. For strings only .)
- Xss-clean (Data sanitazation agains XSS Deprecate but working)

## :floppy_disk: Installation

First of all, you need Node.js installed.  
If you don't have it, you can download it here:
[Node.js](https://nodejs.org/it/download/)  
After the installation, you're ready to go.

### 1 - Clone the repository

`git clone https://github.com/boobaGreen/S2INodeJsPOF`

### 2 - Install the dependencies

`npm install`

### 3 - Start it

add this scripts at your "package.json" file :

```
"scripts": {
"start": "nodemon server.js",
"start:prod": "SET NODE_ENV=production&&nodemon server.js",
"debug": "ndb server.js"
}
```

`npm start` - start in DEV mode default (error's message are set for developers)
`npm start:prod ` - start in PROD mode (error's messages are set for clients)

### 4 - Connect your MongoDB database

Create, if don't exist, a `config.env` file and the insert an enviroment variable named `DB` with your MongoDB connection string. Set a `PORT` , in the example is "3000" , if not set the default is 5000.

EXAMPLE "config.env" :

```
PORT=3000
DB=mongodb://localhost:27017/NodePOFLocal
```

in the example above it is a local MongoDb database but you can also connect one in the cloud , the string will be approximately :

```
mongodb+srv://claudiodallara77:cA3K32LqwPsvsqWs@cluster0.3dfdb4w.mongodb.net/POF-S2I-NodeJs?retryWrites=true&w=majority
```

### 5 - Extra - Import already packaged data for Testing

The dev-data folder contains sample data to help test your project: orders.json, products.json, and user.json.
There is also a file utility `import-dev-data.js` that is used to import sample files with one click or delete the entire database.

from the terminal in the main project folder launch the following command to import the files:

```
node dev-data\data\import-dev-data.js --import
```

to delete use instead:

```
node dev-data\data\import-dev-data.js --delete
```

### 6 - Test it with a client

Using something like Postman, you can start using this API on the the same port (in the example : 3000).

For convenience, with the button below you can access the entire collection relating to the project on postman with all the queries already ready to be tested.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/29686969-8160f5f1-20a3-46ab-9f91-eeae9e858ef1?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29686969-8160f5f1-20a3-46ab-9f91-eeae9e858ef1%26entityType%3Dcollection%26workspaceId%3D876f4699-cfab-4d6d-a566-22ea8c0045e9)

## :open_file_folder: Endpoints

### Users

You can get the entire users list with a GET request:

`/users`

or GET data for a specific user:

`/users/:userID`

:userID must be a valid MongoDB id.  
You can PATCH or DELETE user data with the same endpoint.

Finally, you can add a new user with a POST request:

`/users`

```json
{
    "name": "insert an alphanumeric string, min 2 characters",
    "surname": "insert an alphanumeric string, min 2 characters"
    "email": "insert a valid email"
}
```

### Targets

You can get the entire targets list with a GET request:

`/targets`

or GET data for a specific target:

`/targets/:targetID`

:targetID must be a valid MongoDB id.  
You can PATCH or DELETE a target with the same endpoint.

Finally, you can add a new target with a POST request:

`/targets`

```json
{
    "title": "insert a, min 2 characters, max 30",
    "description": "insert a string, min 2 characters, max 300"
    "days": "insert a number"
}
```

### Intervals

You can get all the available targets with a GET request

`/intervals`

or GET data for a specific interval:

`/intervals/:intervalID`

You can PATCH or DELETE a target with the same endpoint.

For a new interval, use a POST request:

`/intervals`

```json
{
  "owner": "insert a valid mongoID that rappresent the interval user owner",
  "startdate": "insert a valid ISO date",
  "enddate": "insert a valid ISO date, greater than the startdate"
}
```

You can filter through the intervals with a SEARCH query:

`/intervals/search`

Filter parameters:

- startdate: insert a valid ISO start date (e.g. 2018-05-22), returns intervals with a greater start date
- enddate: insert a valid ISO end date (e.g. 2020-03-10), return intervals with a lower end date
- target: insert a valid MongoDB Id that rappresent a target
- owner: inser a valid MongoDB Id that rappresent an user

example: `/intervals/search?target=6335c098bb3ddb89f54cd3d6&startdate=2022-08-01`

## Intervals / Targets

You can join an intervals to a target with a PATCH request on this endpoint:

`/targets/:targetID/intervals`

```json
{
  "target": "insert a valid MongoDB Id of a target"
}
```

## :page_with_curl: License

[MIT](https://choosealicense.com/licenses/mit/)

## :e-mail: Contact Me

Any questions? Send me an e-mail here: claudiodallara77@gmail.com <br>
You can find my Linkedin profile here: https://www.linkedin.com/in/claudio-dall-ara-244816175/
