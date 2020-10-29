let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { authors: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment],
  })
  .then((article) => {
    if (!article) throw Error()
    //console.log('ARTICLE, LOOK FOR ID', article);
    //console.log('ARTICLE.AUTHOR', article.author);
    //console.log('ARTICLE.COMMENTS', article.comments); //has to be plural? why //answer: sequelize knows that the relationship between article and comments is one to many, while relationship of article to author is one to one 
    res.render('articles/show', { article: article, comments: article.comments })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

module.exports = router

