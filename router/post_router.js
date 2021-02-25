const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('posts/new', { pageTitle: 'Blog | nowy post' });
});

module.exports = router;