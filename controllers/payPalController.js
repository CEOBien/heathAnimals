const historyTransactionSchema = require('../models/historyTransactionSchema');
const paypal = require('paypal-rest-sdk');
const payPal = require('../config/paypal.config');

const transactionsPaypal = {
    pay: async (req,res) => {
        // const {coin,monney} = req.body;
        const coin = req.body.cost;
        const monney = 200000.00;
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/paypal/success?monney=" + monney,
                "cancel_url": "http://localhost:3000/paypal/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": coin,
                        "sku": "1",
                        "price": "25.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                },
                "description": "you cant not cancer if u was accept"
            }]
        };
        try {
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href);
                        }
                    }
        
                }
            });
            
        } catch (err) {
            console.log(err);
        }
        
    },
    success: async (req,res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const coin = 9000.00;
        const monney = req.query.monney;
        console.log(
            monney
        );

        try {
            const execute_payment_json = {
                "payer_id": payerId,
                "transactions": [{
                    "amount": {
                        "currency": "USD",
                        "total": "25.00"
                    }
                }]
            };
            paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
                if (error) {
                    console.log(error.response);
                    throw error;
                } else {
                    console.log(JSON.stringify(payment));
                    const addPayPal = new historyTransactionSchema({ coin, monney,userId:'63fa0aaa5c858509e30e2d15' });
                    addPayPal.save(); // save the transaction
                    res.send('Giao dich thanh cong');
                }
            });
         
        } catch (err) {
            console.log(err);
        }
        
    },

    cancel: async (req,res) =>{
        res.status(401).json('giao dich khong thanh cong');
    }
};

module.exports = transactionsPaypal;