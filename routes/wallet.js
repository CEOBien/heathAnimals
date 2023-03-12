const walletController = require('../controllers/walletController');
var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/auth');
const {checkRole} = require('../middleware/authorization');

router.get('/balance/:id', walletController.balanceCurrent);



module.exports = router;