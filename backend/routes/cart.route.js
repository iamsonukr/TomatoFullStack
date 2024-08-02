import express from 'express'
import { addToCart, getUserCart, removeFromCart } from '../controllers/cart.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'


const cartRouter=express.Router()

cartRouter.post('/add',authMiddleware,addToCart)
cartRouter.post('/remove',authMiddleware,removeFromCart)
cartRouter.post('/get',authMiddleware,getUserCart)

export default cartRouter