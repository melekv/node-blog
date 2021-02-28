const express = require('express');
const Post = require('../src/models/post');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('posts/new', {
        pageTitle: 'Blog | nowy post',
        post: new Post(),
        error: {
            title: '',
            description: ''
        }
    });
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    let titleErr = false;
    let descErr = false;

    let post = new Post();

    // validation
    if (title.length <= 3) {
        titleErr = true;
    } else {
        post.title = title;
    }

    if (description.length <= 3) {
        descErr = true;
    } else {
        post.description = description;
    }

    if (titleErr || descErr) {
        res.render('posts/new', {
            pageTitle: 'Blog | nowy post',
            post: post,
            error: {
                title: 'Error title',
                description: ''
            }
        });
        return;
    }

    post.description = description;
    await post.save();
    res.redirect('/');
});

module.exports = router;