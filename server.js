const express = require('express');
const morgan = require('morgan');

const blogPostRouter = require('./blogPostRouter');
const app = express();

app.use(morgan('common'));

app.use('/blog-posts', blogPostRouter);



app.listen(process.env.PORT || 8080, () => {
	console.log(`your app is listening on ${process.env.PORT || 8080}`);
});