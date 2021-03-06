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

router.post('/new', async (req, res) => {
    const { title, description } = req.body;
    let titleErr = false;
    let descErr = false;

    let post = new Post();

    // validation
    if (title.length < 3) {
        titleErr = true;
    } else {
        post.title = title;
    }

    if (description.length < 3) {
        descErr = true;
    } else {
        post.description = description;
    }

    if (titleErr || descErr) {
        res.render('posts/new', {
            pageTitle: 'Blog | nowy post',
            post: post,
            error: {
                title: titleErr ? 'Tytuł powinien być dłuższy niż 3 znaki' : '',
                description: descErr ? 'Treść powinna być dłuższa niż 3 znaki' : ''
            }
        });
        return;
    }

    await post.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('posts/edit', {
        pageTitle: 'Blog | edytuj',
        post: post,
        error: {
            title: '',
            description: ''
        }
    });
});

router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    let titleErr = false;
    let descErr = false;

    let post = new Post();

    // validation
    if (title.length < 3) {
        titleErr = true;
    } else {
        post.title = title;
    }

    if (description.length < 3) {
        descErr = true;
    } else {
        post.description = description;
    }

    if (titleErr || descErr) {
        res.render('posts/new', {
            pageTitle: 'Blog | nowy post',
            post: post,
            error: {
                title: titleErr ? 'Tytuł powinien być dłuższy niż 3 znaki' : '',
                description: descErr ? 'Treść powinna być dłuższa niż 3 znaki' : ''
            }
        });
        return;
    }

    await post.save();
    res.redirect('/');
});

module.exports = router;