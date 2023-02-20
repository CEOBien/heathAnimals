var express = require('express');
var router = express.Router();
const authController = require("../controllers/authController");






//@https://localhost:3000/auth/register
router.post('/resgister', authController.resgister);
//@auth/login
router.post('/login', authController.login);
//get user
router.get('/getuser/:id',authController.getUser);
//get all user
router.get('/getalluser',authController.getAllUser);
router.post('/changepassword/:id',authController.changePassword);
//send email

router.get('/resetpassword',authController.forgotPasswordEmail);

module.exports = router;