const router = require('express').Router()
const postingController = require('../controller/postingController')
const tagController = require('../controller/tagController')
const images = require('../middlewares/images')
const access = require('../middlewares/access')
const isAuthor = require('../middlewares/isAuthor')
const findOneOrCreateTags = require('../middlewares/findOrCreateTag')
const googleController = require('../controller/googleController')

router.get('/postings', postingController.findAll)

router.patch('/postings/:id', access, isAuthor,  images.multer.single('image'), 
images.sendUploadToGCS, findOneOrCreateTags, postingController.update)

router.post('/postings/' ,access,images.multer.single('image'), 
images.sendUploadToGCS, findOneOrCreateTags, postingController.create)

router.get('/postings/user', access, postingController.findByAuthor)

router.delete('/postings/:id',access,isAuthor, postingController.delete)

router.get('/tags',tagController.allTag )

// router.post('/translate', googleController.getTranslate)


module.exports = router