const transactionsPaypal = require('../controllers/payPalController');
var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/auth');
const {checkRole} = require('../middleware/authorization');

router.post('/pay',verifyToken, transactionsPaypal.pay);
router.get('/success',verifyToken,transactionsPaypal.success);
router.get('/cancel',verifyToken,transactionsPaypal.cancel);



module.exports = router;