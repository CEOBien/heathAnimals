var express = require('express');
var router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const {checkRole} = require('../middleware/authorization');
const verifyToken = require('../middleware/auth');


var passport = require('../middleware/passport');


//@https://localhost:3000/auth/register
router.post('/resgister', authController.resgister);
//@auth/login
router.post('/login', authController.login);
//get user
router.get('/getuser/:id',verifyToken,checkRole('admin'),authController.getUser);
//get all user
router.get('/getalluser',verifyToken,checkRole('admin'),authController.getAllUser);
router.put('/changepassword/:id',verifyToken,authController.changePassword);
//send email

router.post('/resetpassword',verifyToken,authController.forgotPasswordEmail);

//new password
router.put('/newpassword',verifyToken,authController.newPassword);

//auth google
router.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
router.get('/auth/google/callback', passport.authenticate('google'),authController.loginGoogleSuccess);

//delete User
router.delete('/delete',verifyToken,checkRole('admin'),authController.deleteUser);

//logout
router.post('/logout',verifyToken,authController.logout);

//search
router.get('/search',verifyToken,checkRole('admin'),authController.searchUser);

//refresh token
router.post("/refresh",authController.requestRefreshToken);

//update
router.put("/update/:id",verifyToken,checkRole('admin'),authController.updateUser);

module.exports = router;