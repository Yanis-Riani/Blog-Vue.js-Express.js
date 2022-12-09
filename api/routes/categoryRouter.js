const { authJwt } = require('../middleware');
const categoryController = require('../controllers/categoryController.js')

const router = require('express').Router()

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get('/all', categoryController.getAllCategory)

router.post('/add', [authJwt.verifyToken, authJwt.isAdmin], categoryController.addCategory)

// dynamic

router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], categoryController.updateCategory)

router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], categoryController.deleteCategory)

module.exports = router
