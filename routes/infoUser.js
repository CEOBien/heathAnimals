var express = require('express');
var router = express.Router();
const InfoUserController = require('../controllers/infoUserController');
const verifyToken = require('../middleware/auth');
const uploadCloud = require('../config/cloudinary.config');
//add
router.post('/add',uploadCloud.single('image'),InfoUserController.addPets);
router.delete('/delete/:id',verifyToken,InfoUserController.delete);
router.put('/update/:id',uploadCloud.single('image'),InfoUserController.update);
router.get('/findinfouser/:id',InfoUserController.findInfoId);
router.get('/allinfouser', InfoUserController.AllInfo);



module.exports = router;