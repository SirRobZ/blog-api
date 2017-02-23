const chai = require('chai');
const chaiHTTP = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHTTP);

describe('Blog Posts', function() {

	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	it('should list all blog posts on GET', function() {
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body.length.should.be.at.least(1);

			const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
			res.body.forEach(function(item) {
				item.should.be.a('object');
				item.should.include.keys(expectedKeys);
			});
		});
	});

	it('should add blog post on POST with publishDate', function() {
		const date = Date.now();
		const newItem = {title: 'test post', content: 'test content', author: 'tester', publishDate: date};
		return chai.request(app)
		.post('/blog-posts')
		.send(newItem)
		.then(function(res) {
			res.should.have.status(201);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
			res.body.id.should.not.be.null;
			res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
		});
	});

	it('should add blog post on POST without publishDate', function() {
		const newItem = {title: 'test post', content: 'test content', author: 'tester'};
		return chai.request(app)
		.post('/blog-posts')
		.send(newItem)
		.then(function(res) {
			res.should.have.status(201);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
			res.body.id.should.not.be.null;
			res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id, publishDate: res.body.publishDate}));
		});
	});

	it('Should update blog post on PUT', function() {

	})
})





















