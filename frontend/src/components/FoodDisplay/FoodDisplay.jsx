import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodDisplayItem from '../FoodDisplayItem/FoodDisplayItem'

const FoodDisplay = ({ category }) => {

    // getting the food_list from the Context
    const { food_list } = useContext(StoreContext)
    
    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near you</h2>
            <div className="food-display-list">
                {
                    food_list.map((item, index) => {
      
                        // for each  item if category is all every item is display or if the item passes the second condition it will be displayed
                        if(category==="All" || category===item.category)
                        return ( 
                            // passing valus and id which will be used to add ,remove particular item from the Cart
                            <FoodDisplayItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay