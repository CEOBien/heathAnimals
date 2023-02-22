var express = require('express');
var router = express.Router();
const bookingController = require('../controllers/bookingController');


//localhost:3000//booking/add/16814173123132
router.post('/add/:id',bookingController.add);






module.exports = router;