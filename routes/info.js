var express = require('express');
var router = express.Router();
const InfoController = require('../controllers/InfoController');
const verifyToken = require('../middleware/auth');
const uploadCloud = require('../config/cloudinary.config');
//add
router.post('/add',uploadCloud.single('image'),InfoController.addPets);
router.delete('/delete/:id',verifyToken,InfoController.delete);
router.put('/update/:id',uploadCloud.single('image'),InfoController.update);
router.get('/findinfo/:id',InfoController.findInfoId);
router.get('/allinfo', InfoController.findAll);
router.get('/filter',InfoController.fliter);



module.exports = router;