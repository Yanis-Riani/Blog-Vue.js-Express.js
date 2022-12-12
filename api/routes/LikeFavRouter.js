const { authJwt } = require('../middleware');
const likefavContoller = require('../controllers/likeFavController.js')

const router = require('express').Router()

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/', [authJwt.verifyToken], likefavContoller.getLikeGlobal)

router.post('/', [authJwt.verifyToken], likefavContoller.addLikeFav)

// dynamic

router.put('/:userid/:articleid', [authJwt.verifyToken], likefavContoller.CreateupdateLikeFav)

module.exports = router