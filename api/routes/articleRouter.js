const { authJwt } = require('../middleware');
const articleController = require('../controllers/articleController.js')
const likefavContoller = require('../controllers/likeFavController.js')
const commentController = require('../controllers/commentController.js')


const router = require('express').Router()

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get('/', articleController.getAllArticle)

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], articleController.addArticle)

// dynamic

router.get('/:id', articleController.getArticle)

router.get('/likes/:id', likefavContoller.getArticleLike)

router.get('/comments/:id', commentController.getArticleComment)

router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], articleController.updateArticle)

router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], articleController.deleteArticle)

module.exports = router
