import express from 'express'
import cors from 'cors'
import connectDB from './config/db.connect.js'
import foodRouter from './routes/food.route.js'
import userRouter from './routes/user.route.js'
import 'dotenv/config'
import cartRouter from './routes/cart.route.js'
import orderRouter from './routes/order.route.js'


// app config
const app=express()
const port=5000


// middleware
//the request recening from the front end will be parsed using this middleware
app.use(express.json()) 

// can access backed from frontend
app.use(cors())

connectDB()

//routes | api endpoints
app.use('/api/food',foodRouter)

app.use('/api/user',userRouter)

app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouter)

//expose the image folder on the browser
app.use('/images',express.static('uploads'))

app.get('/',(req,res)=>{
    res.send("<h1>Foodies backend is running </h1>")
})


app.listen(port,()=>{
    console.log('server started')
})