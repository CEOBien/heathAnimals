var express = require('express');
var router = express.Router();
const experienceController = require('../controllers/experienceController');

router.post('/find',experienceController.getId);






module.exports = router;