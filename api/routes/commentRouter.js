const { authJwt } = require('../middleware');
const commentController = require('../controllers/commentController.js')

const router = require('express').Router()

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/:articleid', [authJwt.verifyToken], commentController.addComment)

// dynamic

router.put('/:id', [authJwt.verifyToken], commentController.updateComment)

router.delete('/:id', [authJwt.verifyToken], commentController.deleteComment)


module.exports = router