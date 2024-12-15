import React, { useContext, useEffect, useState } from 'react';
import './FoodDisplayItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodDisplayItem = ({ id, name, description, image, price }) => {
  const [quantity, setQuantity] = useState(0);
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // Function to find the quantity of an item in the cart
  const findQuantity = (id) => {
    if (!Array.isArray(cartItems)) {
        console.error("cartItems is not an array:", cartItems);
        return 0;
    }

    const foodItem = cartItems.find((item) => item._id === id);
    return foodItem ? foodItem.quantity : 0;
};

  // Update quantity whenever cartItems or id changes
  useEffect(() => {
    setQuantity(findQuantity(id));
  }, [cartItems, id]);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* Image rendering */}
        <img className="food-item-image" src={`${url}/images/${image}`} alt={name} />
        {
          quantity === 0 ? (
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt="Add to Cart"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="Remove"
              />
              <p>{quantity}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="Add More"
              />
            </div>
          )
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodDisplayItem;
