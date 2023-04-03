const historyTransactionSchema = require('../models/historyTransactionSchema');
const paypal = require('paypal-rest-sdk');
const payPal = require('../config/paypal.config');
const Wallet = require('../models/walletSchema');

const transactionsPaypal = {
    pay: async (req,res) => {
        // const {coin,monney} = req.body;
        const coin = req.body.cost;
        const monney = req.body.monney;
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
                        "price": monney,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": monney
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
                        "total": monney
                    }
                }]
            };
            paypal.payment.execute(paymentId, execute_payment_json,async function(error, payment) {
                if (error) {
                    console.log(error.response);
                    throw error;
                } else {
                    console.log(JSON.stringify(payment));
                    const addPayPal = new historyTransactionSchema({ coin, monney,userId:req.userId });
                    addPayPal.save(); // save the transaction
                    const walletUpdate = await Wallet.findOneAndUpdate({userId:req.userId},{coin:coin},{new:true})
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