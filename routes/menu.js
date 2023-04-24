const menuController = require('../controllers/menuController');
var express = require('express');
var router = express.Router();


router.get('/allllllmenu',menuController.getAll);



module.exports = router;

