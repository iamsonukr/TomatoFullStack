import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
  const navigate = useNavigate()
  console.log(cartItems)
  // console.log(food_list)
  // console.log(removeFromCart)

  //item.price => Accessing the value directly from the object through map 
  //cartItems[item._id] => accessing the value through the variable [item._id]
  //    <p>{item.price*cartItems[item._id]}</p>
  return (
    <div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {
            food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                console.log(`hello Value for this ${item._id} id is ${cartItems[item._id]}`)
                return (
                  <div key={item._id}>
                    <div className="cart-items-title cart-items-item" >
                      <img src={item.image} alt="" />
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>₹{item.price * cartItems[item._id]}</p>
                      <p className='cross' onClick={() => removeFromCart(item._id)}>✕</p>
                    </div>
                    <hr />
                  </div>
                )
              }
            })
          }
        </div>

      </div>
      <div className="cart-bottom">
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

          <button onClick={() => navigate('/order')}>Proceed to Checkout</button>

        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code ' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart