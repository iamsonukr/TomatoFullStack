import express, { Route, Router } from 'express'
import { loginUser,registerUser } from '../controllers/user.controller.js'

const userRouter=new Router()

userRouter.post('/register',registerUser)

userRouter.post('/login',loginUser)

export default userRouter;

