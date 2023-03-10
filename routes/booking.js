var express = require('express');
var router = express.Router();
const bookingController = require('../controllers/bookingController');
const {checkRole} = require('../middleware/authorization');
const verifyToken = require('../middleware/auth');
//localhost:3000//booking/add/16814173123132
router.post('/add/:id',verifyToken,checkRole('user'),bookingController.add);






module.exports = router;