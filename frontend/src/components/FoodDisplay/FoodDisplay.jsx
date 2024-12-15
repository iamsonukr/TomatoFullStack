import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodDisplayItem from '../FoodDisplayItem/FoodDisplayItem';

const FoodDisplay = ({ category }) => {
    // Getting the food_list from the Context
    const { food_list } = useContext(StoreContext);
    console.log("Food list is: ", food_list);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list && food_list.length > 0 ? (
                    food_list.map((item, index) => {
                        // Display items based on the selected category or show all if category is "All"
                        if (category === "All" || category === item.category) {
                            return (
                                <FoodDisplayItem
                                    key={item._id} // Prefer using unique keys, like `item._id`
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                />
                            );
                        }
                        return null; // Return null if the item does not match the category
                    })
                ) : (
                    <h1 className='foodLoading2'>Food is being loaded...</h1> // Correct JSX for loading state
                )}
            </div>
        </div>
    );
};

export default FoodDisplay;
