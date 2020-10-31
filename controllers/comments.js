let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res)=> {
    res.redirect('/');
})

router.post('/', (req,res)=> {
    //console.log('article id', req.body.articleId);
    // db.comment.create({
    //     name: req.body.name,
    //     content: req.body.content,
    //     articleId: req.body.articleId
    // })
    // .then(createdComment=> {
    //     console.log('YOUR NEW COMMENT', createdComment);
    //     res.redirect(`/articles/${req.body.articleId}`);
    // })

    //above code works but this one is able to assign the comment an articleId by association, while the above is hard coded in
    db.article.findOne({
        where: {id: req.body.articleId}
    })
    .then(foundArticle=> {
        foundArticle.createComment({
            name: req.body.name,
            content: req.body.content
        })
        .then(createdComment=> {
            //console.log('your new comment', createdComment);
            res.redirect(`/articles/${req.body.articleId}`);
        })
    })
})

module.exports = router


//IS THIS BETTER PRACTICE 
// db.article.findOne({
//     where: {id: req.body.articleId}
// })
// .then(foundArticle=> {
//     foundArticle.createComment({
//         name: req.body.name,
//         content: req.body.content
//     })
//     .then(createdComment=> {
//         console.log('your new comment', createdComment);
//         res.redirect(`/articles/${req.body.articleId}`);
//     })
// })
