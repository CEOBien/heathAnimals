const menuController = require('../controllers/menuController');
var express = require('express');
var router = express.Router();


router.get('/allmenu',menuController.getAll);



module.exports = router;

