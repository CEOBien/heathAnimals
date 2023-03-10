const transactionsPaypal = require('../controllers/payPalController');
var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/auth');
const {checkRole} = require('../middleware/authorization');

router.post('/pay', transactionsPaypal.pay);
router.get('/success',transactionsPaypal.success);
router.get('/cancel',transactionsPaypal.cancel);


module.exports = router;