import Order from '../models/orderModel.js'
import stripe from 'stripe'

//@desc update order (stripe webhook)
//@route POST /api/stripe/webhook
//@access private
//stripe webhook
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINT_SECRET

const updateOrder = async (req, res) => {
    const sig = req.headers['stripe-signature'];
  
    let event
    let updatedOrder
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return;
    }
  
    // Handle the event
  
    if(event.type === 'checkout.session.completed'){
      const {orderId} = event.data.object.metadata
      const paymentId = event.data.object.payment_intent
      const status = event.data.object.payment_status
      const order = await Order.findById(orderId)
      if(order) {
          order.isPaid = true
          order.paidAt = Date.now()
          order.paymentResult = {
              id: paymentId,
              status: status,
          }
          updatedOrder = await order.save()
      } else {
          res.status(404)
          throw new Error('Order not found')
      }
    }
    
    // Return a 200 res to acknowledge receipt of the event
    res.send().end()
  }

export {
    updateOrder
}