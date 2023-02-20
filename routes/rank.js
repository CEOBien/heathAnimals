var express = require('express');
var router = express.Router();
const uploadCloud = require('../config/cloudinary.config');

const rankController = require('../controllers/rankController');

//add
router.post('/add',uploadCloud.single('image'),rankController.add);
router.put('/update/:id',uploadCloud.single('image'),rankController.put);
router.delete('/delete/:id',rankController.delete);
router.get('/find/:id',rankController.getId);
router.get('/findall',rankController.getAll);
module.exports = router;