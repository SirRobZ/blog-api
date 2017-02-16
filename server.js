const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./model');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));
















app.listen(process.env.PORT || 8080, () => {
	console.log(`your app is listening on ${process.env.PORT || 8080}`);
});