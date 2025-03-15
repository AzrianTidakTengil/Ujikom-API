const Payment = require('../models').Payment


async function Status(req, res, next) {
    try{
        const payment = await Payment.findAll(
            {
                where: {
                    status: 'pending'
                }
            }
        )
        
        payment.map((order) => {
            fetch(`https://api.sandbox.midtrans.com/v2/${order.order_id}/status`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Basic U0ItTWlkLXNlcnZlci1reUt5dmVYX1RGQ3VnbGxIQ19WZDE1WVQ6'
                }
            }).then(res => res.json()).then(data => {
                Payment.update(
                    {
                        status: data.transaction_status
                    }, {
                        where:{
                            order_id: order.order_id
                        },
                    }
                )
            })
        })
    } catch(err) {
        res.status(404).json({
            status: 'error',
            message: 'Order Not Found'
        })
    }
}

module.exports = {
    Status
}