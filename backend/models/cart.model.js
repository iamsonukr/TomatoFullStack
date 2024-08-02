import mongoose,{Schema,Model,model} from 'mongoose'


const cartSchema=new mongoose.Schema({
    item:{type:String},
    title:{type:String},
    price:{type:Number},
    quantity:{type:Number},
    total:{type:Number}
})

const cartModel=mongoose.model.carts || mongoose.model('carts',cartSchema)
export default cartModel