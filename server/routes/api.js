const router = require('express').Router();
var user = require("../controllers/user")
const checkAuth = require('../Middleware/auth')
var image = require("../controllers/image")

/////User
router.post('/newUser', user.createUser);
router.get('/login/:email/:password', user.login)
router.post('/createImage/:user', checkAuth, user.createImage)

////Image
router.post('/newImageUser/:user', checkAuth, image.newImageUser)
router.get('/getAllimage/:user', checkAuth, image.getAllimage)
router.post('/getImageToday/:user', checkAuth, image.getImageToday)
router.get('/getImagebyId/:id', image.getImagebyId)


module.exports = router;
