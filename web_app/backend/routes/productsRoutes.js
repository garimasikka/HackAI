import express from 'express'
const router = express.Router()
import {createProduct, createProductReview, deleteProduct, getAllProducts, getProduct, getTopProducts, updateProduct} from '../controllers/productController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'

router.route('/').get(getAllProducts).post(protect, isAdmin, createProduct)

router.route('/top').get(getTopProducts)

router.route('/:id') .get(getProduct).delete(protect, isAdmin, deleteProduct).put(protect, isAdmin, updateProduct)

router.route('/:id/reviews').post(protect, createProductReview)

export default router