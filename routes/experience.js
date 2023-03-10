var express = require('express');
var router = express.Router();
const experienceController = require('../controllers/experienceController');
const verifyToken = require('../middleware/auth');
const {checkRole} = require('../middleware/authorization');
router.post('/find',verifyToken,checkRole(['parter', 'admin']),experienceController.getId);






module.exports = router;