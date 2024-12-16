import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";
import axios from 'axios'

// createing the context it is important to 
export const StoreContext = createContext(null)


// creating StoreContextProvider To Wrap the Main Component
const StoreContextProvider = (prop) => {

    // store the items added in cart --- adding each item as key value pair in object as ID:Quantity
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState('')
    const [food_list, setFoodList] = useState([])
    const [userId, setUserId] = useState(null)
    // const url='http://localhost:5000'
    const url = 'https://foodfusionfullstack.onrender.com'



    // function to add value in cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            // pushing the itemid to the api that will send the data to the database
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
        console.log("Itenm added to cart", cartItems)
    }

    // function to remove from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            // pushing the itemid to the api that will send the data to the database
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    // storing each contextvalue in an object 
    // Helper function to clean ID strings
    const cleanId = (id) => id.trim().replace(/['"]/g, '');

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        // console.log("Inside the context");
        // console.log("Cart Items:", cartItems);
        // console.log("Food List:", food_list);

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Clean both IDs before comparison
                const cleanedItemId = cleanId(item);
                const itemInfo = food_list.find(product => cleanId(product._id) === cleanedItemId);


                if (itemInfo) {
                    totalAmount += (itemInfo.price * cartItems[item]);
                } else {
                    console.log(`Item not found for ID: ${cleanedItemId}`);
                }
            }
        }

        setTimeout(() => {
            console.log("Outside the context");
        }, 2000);

        return totalAmount;
    };

    // fetch the fooditem from database and store it in the variabale 
    const fetchFoodlist = async (req, res) => {
        const response = await axios.get(`${url}/api/food/listfood`)
        // console.log(response.data.data)
        // console.log()
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        // console.log(response)
        setCartItems(response.data.data)

    }

    // this function is to stay logged in even after reloading the page
    useEffect(() => {

        async function loadData() {
            await fetchFoodlist()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])

    const getCartItemsLength = () => {
        return Object.keys(cartItems).length;
    };


    const contextValue = {
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
    useEffect(() => {
        fetchFoodlist()

    }, [])

    return (
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