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

`npm start`

### 4 - Connect your MongoDB database

`LOCAL DATABASE MODE`
Create, if don't exist, a `config.env` file and the insert an enviroment variable named `DATABASE_LOCAL` with your MongoDB connection string. Set a `PORT` , in the example is "3000" , if not set the default is 5000.

To work on the local database, finally make sure that the code block in the server.js file on line 15 is:

const DB = process.env.DATABASE_LOCAL.replace(
'<password>',
process.env.DATABASE_PASSWORD,
);

EXAMPLE LOCAL:
"config.env" file Local Database:
PORT=3000
DATABASE_LOCAL=mongodb://localhost:27017/NodePOFLocal

`CLOUD DATABASE MODE`
Create, if don't exist, a `config.env` file and the insert an enviroment variable named `DATABASE_CLOUD` with your MongoDB connection string.

The string is for example :

DATABASE=mongodb+srv://claudiodallara77:<password>@cluster0.2escc8w.mongodb.net/POF-S2I-NodeJs?retryWrites=true&w=majority

where "POF-S2I-NodeJs" indicates the database name in thi case :"POF-S2I-NodeJs".
I preferred to keep the <password> further separate and must be entered separately in the config.env file

Set a `PORT` , in the example is "3000" , if not set the default is 5000.

To work on the cloud database, finally make sure that the code block in the server.js file on line 15 is:

const DB = process.env.DATABASE_CLOUD.replace(
'<password>',
process.env.DATABASE_PASSWORD,
);

EXAMPLE CLOUD:
"config.env" file Local Database:
PORT=3000
DATABASE_PASSWORD=dB2Q24TvqPvwdqPw
DATABASE_CLOUD=mongodb+srv://claudiodallara77:<password>@cluster0.2efcc6w.mongodb.net/POF-S2I-NodeJs?retryWrites=true&w=majority

### 5 - Test it with a client

Using something like Postman, Thunderclient or Insomnia, you can start using this API on the the same port (in the example : 3000).

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

Any questions? Send me an e-mail here: cristopherturazza@gmail.com <br>
You can find my Linkedin profile here: https://www.linkedin.com/in/cristopher-turazza-0863a026/
