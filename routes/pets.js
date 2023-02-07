var express = require('express');
var router = express.Router();
const petsController = require('../controllers/petsController');
const verifyToken = require('../middleware/auth');
//add
router.post('/add',verifyToken,petsController.addPets);
router.delete('/delete/:id',verifyToken,petsController.delete);



module.exports = router;