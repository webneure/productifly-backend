const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

// instance
var instance = new Razorpay({ key_id: 'rzp_test_D7x72eDr40GU7W', key_secret: 'Up12BxOaUtnpJJYhbY9E6oop' })

// create order
router.post('/order', async(req, res) => {
    var options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    if(!order) return res.status(500).send('somethings went wrong')
    return res.status.apply(200).json(order)
})

// verify and cature the payment 
router.post('/verify',async(req,res)=>{
    try{
         const{
             orderCreateId,
             razorpayPaymentId,
             razorpayOderId,
             razorpaySignature,
             amount,
             currency
         }= req.body
         const signature = crypto.createHmac('sha256','Up12BxOaUtnpJJYhbY9E6oop');
         signature.update(`${orderCreateId}|${razorpayPaymentId}`)
         const digest = signature.digest('hex')
         if(digest !== razorpaySignature ) return res.status(400).json({msg:'something bad error'})

        //  capture the payment
        const response ={
            razorpayPaymentId,
            amount,
            currency
        }
        const captureResponse = await instance.payment.capture(response)
        return res.status(200).json({
            status:'success',
            orderId:razorpayOderId,
            paymentId:razorpayPaymentId,
            captureResponse
        })
    }
    
    catch(err){
        res.status(500).send('bad error')
        console.log(err)
    }
})



// export module router
module.exports = router;