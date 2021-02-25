require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./src/models/post');
const postRouter = require('./router/post_router');
const Article = require('./src/models/post');
const app = express();

mongoose.connect(process.env.LOCAL_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const posts = await Post.find({});
    res.render('index', { pageTitle: 'Blog | głowna', posts: posts });
});

app.use('/post', postRouter);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});