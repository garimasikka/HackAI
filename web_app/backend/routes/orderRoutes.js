import express  from 'express'
const router = express.Router()
import {protect, isAdmin} from '../middleware/authMiddleware.js'
import {addOrderItems, getAllOrders, getOrderById, getUserOrders, payOrder, updateOrderToDelivered} from'../controllers/orderController.js'


router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getAllOrders)

router.route('/myorders').get(protect, getUserOrders)

router.route('/:id').get(protect, getOrderById)

router.route('/:id/pay').post(protect, payOrder)

router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered)

export default router