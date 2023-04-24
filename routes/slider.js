var express = require('express');
var router = express.Router();
const sliderController = require('../controllers/sliderController');
const verifyToken = require('../middleware/auth');
const uploadCloud = require('../config/cloudinary.config');
//add
router.post('/add',verifyToken,uploadCloud.single('image'),sliderController.add);
router.delete('/delete/:id',verifyToken,sliderController.delete);
router.put('/update/:id',verifyToken,uploadCloud.single('image'),sliderController.put);
router.get('/find/:id',verifyToken,sliderController.findId);
router.get('/all', verifyToken,sliderController.getAll);
router.get('/filter', verifyToken,sliderController.fliter);



module.exports = router;