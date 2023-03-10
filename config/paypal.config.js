const paypal = require('paypal-rest-sdk');

const payPal = paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQ_GK5LZOx4Ld466bcEKi4t7vI-nsF0Tob5IF4FA86MfDDbEF8I9H5V3R2Pa2QL_tZiVFLqgEG_B0Hvv',
    'client_secret': 'EEQnJJ_9mDhaMvKh5oMeMmbquhnWEx6Ml9e1JLnbmPib9xu3oYeCeEBZ1wKWt0ghsMGvJBsXD97zRoEE'
});

module.exports = payPal;