const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./model');

BlogPosts.create('First Post', 'This is the first post', 'Saurabh');
BlogPosts.create('Second Post', 'This is the Second post', 'Saurabh');
BlogPosts.create('Third Post', 'This is the Third post', 'Saurabh');

router.post('/blog-posts', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	res.status(201).json(BlogPosts.create(req.body.title, req.body.content, req.body.author));
})

router.get('/blog-posts', (req, res) => {
	res.json(BlogPosts.get());
})

router.get('/blog-posts/:id', (req, res) => {
	res.json(BlogPosts.get(req.params.id));
})

router.put('/blog-posts/:id', jsonParser, (req, res) => {
	const requiredFields = ['id', 'title', 'content', 'author', 'publishDate'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
		    console.error(message);
		    return res.status(400).send(message); 
		}
	}
	if (req.params.id !== req.body.id) {
		const message = (`Request path id (${req.params.id}) and request body id (${req.body.id}) must match`)
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating blog post item \`${req.param.id}\``);
	const updatedItem = BlogPosts.update({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		id: req.params.id
	});
	res.status(204).json(updatedItem);
});

router.delete('/blog-posts/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post item \`${req.params.id})\``);
	res.status(204).end();
})


module.exports = router;