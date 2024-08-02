import React, { useContext, useEffect } from 'react'
import './FoodDisplayItem.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

const FoodDisplayItem = ({key,id,name,description,image,price}) => {
  const [itemCount,setItemCount]=useState(0)


  // getting functions form StoreContext
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)
  
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
          {/* giving the proper path of the image */}
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {
              !cartItems[id]
              ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} />
              :<div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">₹{price}</p>
        </div>

    </div>
  )
}

export default FoodDisplayItem