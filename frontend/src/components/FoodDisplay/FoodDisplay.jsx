import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodDisplayItem from '../FoodDisplayItem/FoodDisplayItem';

const FoodDisplay = ({ category }) => {
    // Getting the food_list from the Context
    const { food_list } = useContext(StoreContext);
    console.log("Food list is: ", food_list);

    return (
        <div className="food-display" id="food-display">
            <h2>Top Dishes Near You</h2>

            {food_list && food_list.length > 0 ? (
                <div className="food-display-list">
                    {
                        food_list.map((item, index) => {
                            // For each item, display it if the category is "All" or matches the item's category
                            if (category === "All" || category === item.category) {
                                return (
                                    <FoodDisplayItem
                                        key={index}
                                        id={item._id}
                                        name={item.name}
                                        description={item.description}
                                        price={item.price}
                                        image={item.image}
                                    />
                                );
                            }
                            return null; // Skip items that don't match the condition
                        })
                    }
                </div>
            ) : (
                <div className='food-loading'>Food is loading please wait...</div>
            )}
        </div>
    );
};

export default FoodDisplay;
