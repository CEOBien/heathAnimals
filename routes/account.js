var express = require('express');
var router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const {checkRole} = require('../middleware/authorization');
const verifyToken = require('../middleware/auth');
passport.use(new GooglePlusTokenStrategy({
    clientID: '27360788264-33v6r049vru827g8nso3pvouduoa641d.apps.googleusercontent.com',
    clientSecret: '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'
}, async ( accessToken, refreshToken, profile, next) => {
    try {
        console.log('AT:', accessToken);
        console.log('rT:', refreshToken);
        console.log('pro:', profile);
    } catch (error) {
        console.log(error);
    }
    
}));


//@https://localhost:3000/auth/register
router.post('/resgister', authController.resgister);
//@auth/login
router.post('/login', authController.login);
//get user
router.get('/getuser/:id',checkRole('admin'),authController.getUser);
//get all user
router.get('/getalluser',checkRole('admin'),authController.getAllUser);
router.put('/changepassword/:id',verifyToken,authController.changePassword);
//send email

router.post('/resetpassword',verifyToken,authController.forgotPasswordEmail);

//new password
router.put('/newpassword',verifyToken,authController.newPassword);

//auth google
router.get('/auth/google',verifyToken,passport.authenticate('google-plus-token'));

//delete User
router.delete('/delete',verifyToken,checkRole('admin'),authController.deleteUser);

module.exports = router;