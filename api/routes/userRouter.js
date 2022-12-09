const { authJwt } = require('../middleware');
const userController = require('../controllers/userController.js')
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

router.get('/all', [authJwt.verifyToken], userController.getAllUser)

router.get('/permission', [authJwt.verifyToken, authJwt.isAdmin], userController.getUserWithRole)

// dynamic

router.get('/:id', [authJwt.verifyToken], userController.getUser)

router.put('/admin/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.makeAdmin)

router.get('/fav/:id', [authJwt.verifyToken], likefavContoller.getUserFav)

router.get('/comment/:id', [authJwt.verifyToken], commentController.getUserComment)

router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.updateUser)

router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser)

module.exports = router