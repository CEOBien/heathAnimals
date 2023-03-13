var express = require('express');
var router = express.Router();
const uploadCloud = require('../config/cloudinary.config');
const verifyToken = require('../middleware/auth');
const rankController = require('../controllers/rankController');
const {checkRole} = require('../middleware/authorization');

//add
router.post('/add',verifyToken,checkRole('admin'),uploadCloud.single('image'),rankController.add);
router.put('/update/:id',verifyToken,checkRole('admin'),uploadCloud.single('image'),rankController.put);
router.delete('/delete/:id',verifyToken,checkRole('admin'),rankController.delete);
router.get('/find/:id',verifyToken,checkRole('admin'),rankController.getId);
router.get('/findall',rankController.getAll);
module.exports = router;