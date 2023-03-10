var express = require('express');
var router = express.Router();
const InfoUserController = require('../controllers/infoUserController');
const verifyToken = require('../middleware/auth');
const uploadCloud = require('../config/cloudinary.config');
const {checkRole} = require('../middleware/authorization');
//add
router.post('/add',verifyToken,checkRole('user'),uploadCloud.single('image'),InfoUserController.addPets);
router.delete('/delete/:id',checkRole('admin'),verifyToken,InfoUserController.delete);
router.put('/update/:id',verifyToken,checkRole('user'),uploadCloud.single('image'),InfoUserController.update);
router.get('/findinfouser/:id',verifyToken,InfoUserController.findInfoId);
router.get('/allinfouser',verifyToken,checkRole('admin'), InfoUserController.AllInfo);



module.exports = router;