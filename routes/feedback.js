var express = require('express');
var router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/add/:id',feedbackController.addFeedback);
router.put('/update/:id',feedbackController.updateFeedback);

module.exports = router;