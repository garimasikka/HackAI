import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_KEY)

//@desc create order
//@route POST /api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order Items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//@desc get order by id
//@route GET /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order) {
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc get User Orders
//@route GET /api/orders/myorders
//@access private
const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})

    if(orders) {
        res.status(200).json(orders)
    } else {
        res.status(404)
        throw new Error('Orders not found')
    }
})

//@desc get all orders
//@route GET /api/orders
//@access private/admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name email')

    if(orders) {
        res.status(200).json(orders)
    } else {
        res.status(404)
        throw new Error('Orders not found')
    }
})

//@desc pay order
//@route POST /api/orders/:id/pay
//@access private
const payOrder = asyncHandler(async (req, res) => {
    const {totalPrice, _id} = req.body

    const line_items = [
        {
            price_data: {
            currency: 'inr',
            product_data: {
                name: 'E-Mart',
                description: 'Happy Shopping :)',
            },
            unit_amount: Math.round(totalPrice)*100
            },
            quantity: 1,
        },
        ]

    const session = await stripe.checkout.sessions.create({
        line_items,
        phone_number_collection: {
            enabled: true,
        },
        mode: 'payment',
        metadata: {
            orderId: _id,
        },
        success_url: `${process.env.APP_URL}/orders/${req.body._id}`,
        cancel_url: `${process.env.APP_URL}/orders/${req.body._id}?failed=true`,
        consent_collection: {
            terms_of_service: 'required',
        },
      })
    
      res.status(200).json({url: session.url})
})

//@desc update order to delivered
//@route PUT /api/orders/:id/deliver
//@access private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error("Order not found!")
    }
})

export {
    addOrderItems,
    getOrderById,
    getUserOrders,
    getAllOrders,
    payOrder,
    updateOrderToDelivered
}