let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res)=> {
    res.redirect('/');
})

router.post('/', (req,res)=> {
    //console.log('article id', req.body.articleId);
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        articleId: req.body.articleId
    })
    .then(createdComment=> {
        console.log('YOUR NEW COMMENT', createdComment);
        res.redirect(`/articles/${req.body.articleId}`);
    })
})

module.exports = router