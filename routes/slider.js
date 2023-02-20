var express = require('express');
var router = express.Router();
const sliderController = require('../controllers/sliderController');
const verifyToken = require('../middleware/auth');
const uploadCloud = require('../config/cloudinary.config');
//add
router.post('/add',uploadCloud.single('image'),sliderController.add);
router.delete('/delete/:id',sliderController.delete);
router.put('/update/:id',uploadCloud.single('image'),sliderController.put);
router.get('/find/:id',sliderController.findId);
router.get('/all', sliderController.getAll);
router.get('/filter', sliderController.fliter);



module.exports = router;