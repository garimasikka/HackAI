import express  from 'express'
const router = express.Router()
import {loginUser, registerUser, getUserProfile, getAllUsers, updateUserProfile, deleteUser, getUserById, updateUser} from '../controllers/userController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'

//desc register user
//route POST /api/users
//access public
router.route('/').post(registerUser).get(protect, isAdmin, getAllUsers)
    
router.route('/login').post(loginUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser).delete(protect, isAdmin, deleteUser)

export default router