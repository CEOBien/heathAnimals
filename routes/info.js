var express = require('express');
var router = express.Router();
const InfoController = require('../controllers/infoController');
const verifyToken = require('../middleware/auth');
const uploadCloud = require('../config/cloudinary.config');
const {checkRole} = require('../middleware/authorization');
//add
router.post('/add',verifyToken,checkRole('admin'),uploadCloud.single('image'),InfoController.addPets);

router.patch('/update/:id',verifyToken,checkRole(['parter', 'admin']),uploadCloud.single('image'),InfoController.update);
router.get('/findinfo/:id',verifyToken,InfoController.findInfoId);
router.get('/allinfo', verifyToken,InfoController.findAll);
router.get('/filter',verifyToken, InfoController.fillter);



module.exports = router;