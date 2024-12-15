import { createContext, useState,useEffect } from "react";
import { food_list } from "../assets/assets";
import axios from 'axios'

// createing the context it is important to 
export const StoreContext=createContext(null)


// creating StoreContextProvider To Wrap the Main Component
const StoreContextProvider=(prop)=>{

    // store the items added in cart --- adding each item as key value pair in object as ID:Quantity
    const [cartItems,setCartItems]=useState([]);
    const [token,setToken]=useState('')
    const [food_list,setFoodList]=useState([])
    const [userId, setUserId]=useState(null)
 
    // const url='http://localhost:5000'
    const url='https://foodfusionfullstack.onrender.com'

  



    // function to add value in cart
    const addToCart = async (itemId) => {
        console.log("Inside the add to cart");
        console.log(food_list);
    
        const aboutFood = food_list.find(food => food._id == itemId);
        console.log("The about food is", aboutFood);
    
        if (!aboutFood) {
            console.error("Food item not found");
            return;
        }
    
        setCartItems(prev => {
            const existingItemIndex = prev.findIndex(item => item._id === itemId);
            
            if (existingItemIndex > -1) {
                // Update the quantity of the existing item
                const updatedCart = [...prev];
                updatedCart[existingItemIndex].quantity += 1;
                return updatedCart;
            } else {
                // Add a new item with quantity 1
                return [...prev, { ...aboutFood, quantity: 1 }];
            }
        });
    
        if (token) {
            try {
                // Push the itemId and its details to the API to update the database
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart in the database", error);
            }
        }
        console.log("Items in food are ... ", cartItems)
    };

    // function to remove from cart
    const removeFromCart = async (itemId) => {
        console.log("Inside remove from cart");
    
        setCartItems((prev) => {
            // Find the item in the cart
            const existingItemIndex = prev.findIndex(item => item._id === itemId);
    
            if (existingItemIndex > -1) {
                const updatedCart = [...prev];
                const item = updatedCart[existingItemIndex];
    
                if (item.quantity > 1) {
                    // Decrease the quantity if it's greater than 1
                    item.quantity -= 1;
                } else {
                    // Remove the item completely if quantity becomes 0
                    updatedCart.splice(existingItemIndex, 1);
                }
                return updatedCart;
            }
    
            // If item is not found, return the cart unchanged
            return prev;
        });
    
        if (token) {
            try {
                // Notify the backend about the removal
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart in the database", error);
            }
        }
    
        console.log("Cart after removal: ", cartItems);
    };
    

    // storing each contextvalue in an object 
    // Helper function to clean ID strings
const cleanId = (id) => id.trim().replace(/['"]/g, '');

const getTotalCartAmount = () => {

    if (!Array.isArray(cartItems)) {
        console.error("cartItems is not an array:", cartItems);
        return 0;
    }
    let totalAmount = 0;

    console.log("Calculating total cart amount...");
    console.log("Cart Items:", cartItems);
    console.log("Food List:", food_list);

    // Iterate over the cartItems array
    cartItems.forEach(cartItem => {
        const itemInfo = food_list.find(product => product._id === cartItem._id);

        if (itemInfo) {
            totalAmount += itemInfo.price * cartItem.quantity;
        } else {
            console.warn(`Item with ID ${cartItem._id} not found in food_list`);
        }
    });

    console.log("Total Amount:", totalAmount);
    return totalAmount;
};



    // fetch the fooditem from database and store it in the variabale 
    const fetchFoodlist=async(req,res)=>{
        const response=await axios.get(`${url}/api/food/listfood`)
        console.log(response.data.data)
        console.log()
        setFoodList(response.data.data)
    }

    const loadCartData=async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        console.log(response)
        setCartItems(response.data.data)

    }

    // this function is to stay logged in even after reloading the page
    useEffect(()=>{
       
        async function loadData(){
            await fetchFoodlist()
            if(localStorage.getItem("token"))
                {
                    setToken(localStorage.getItem("token"))
                    await loadCartData(localStorage.getItem("token"))
                }
        }
        loadData()
    },[])

    const getCartItemsLength = () => {
        return Object.keys(cartItems).length;
      };

    
    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getCartItemsLength,
        url,
        token,
        setToken,
        userId,
        setUserId
    }


    //\
    useEffect(()=>{
        fetchFoodlist()
        
      },[])

    return(
        <StoreContext.Provider value={contextValue}>
            {prop.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider

// notes

// if (!cartItems.itemId): This checks if the property itemId exists directly on the cartItems object. 
// It looks for a property literally named itemId (as a string) on the cartItems object.

// if (!cartItems[itemId]):
// This checks if the property with the key stored in the variable itemId exists on the cartItems object.
// It uses the value of the variable itemId to look for a corresponding property on the cartItems object.