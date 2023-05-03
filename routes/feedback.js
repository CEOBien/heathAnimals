var express = require('express');
var router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const {checkRole} = require('../middleware/authorization');
const verifyToken = require('../middleware/auth');
router.post('/add/:id',verifyToken,checkRole(['user', 'admin']),feedbackController.addFeedback);
router.put('/update/:id',verifyToken,checkRole('user'),feedbackController.updateFeedback);
router.delete('/delete:id',verifyToken,checkRole(['user', 'admin']),feedbackController.deleteFeedback);
router.get('/findall',verifyToken,feedbackController.findAll);
router.get('/avgRate/:id',verifyToken, feedbackController.avgRate);

module.exports = router;