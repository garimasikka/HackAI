import express from 'express'
const router = express.Router()
import {updateOrder} from '../controllers/webhookController.js'

router.post('/webhook', express.raw({type: 'application/json'}), updateOrder)

export default router