import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            //decoding and verifying token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //setting req.user
            req.user = await User.findById(decoded.id).select('-passsword')
            if(!req.user){
                res.status(401)
                throw new Error('User not found!')
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized!')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized!')
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401)
        throw new Error('Not Authorized as Admin!')
    }
})

export {protect, isAdmin}