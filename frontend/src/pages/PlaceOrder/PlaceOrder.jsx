import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'
import axios from 'axios'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)

  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangehandler=(event)=>{
    event.preventDefault()
    const name=event.target.name;
    const value=event.target.value;
    setData((prevData)=>({...prevData,[name]:value}))
  }
  
  const placeOrder=async(event)=>{
    event.preventDefault()
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    let response = await axios.post(url+'/api/order/place',orderData,{headers:{token}})
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url)
    }else{
      alert("Error")
    }
    console.log(orderItems)
  }

  useEffect(()=>{
    console.log(data)
  },[data])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangehandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangehandler}  value={data.lastName} type="text" placeholder='Last name' />
        </div>

        <input required name='email' onChange={onChangehandler}  value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangehandler}  value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangehandler}   value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangehandler}  value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangehandler}  value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangehandler}  value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangehandler} value={data.phone} type="telphone" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount() + 40}</p>
            </div>
            <hr />
          </div>
          <button type='submit' >Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder