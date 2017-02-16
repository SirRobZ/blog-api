const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./model');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

BlogPosts.create('First Post', 'This is the first post', 'Saurabh');
BlogPosts.create('Second Post', 'This is the Second post', 'Saurabh');
BlogPosts.create('Third Post', 'This is the Third post', 'Saurabh');

app.post('/blog-posts', jsonParser, (req, res) => {
	const {title, content, author} = req.body
	res.status(201).json(BlogPosts.create(title, content, author));

})

app.get('/blog-posts', (req, res) => {
	res.json(BlogPosts.get());
})

app.get('/blog-posts/:id', (req, res) => {
	res.json(BlogPosts.get(req.params.id));
})













app.listen(process.env.PORT || 8080, () => {
	console.log(`your app is listening on ${process.env.PORT || 8080}`);
});