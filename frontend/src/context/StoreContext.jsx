import { createContext, useState,useEffect } from "react";
import { food_list } from "../assets/assets";

// createing the context it is important to 
export const StoreContext=createContext(null)


// creating StoreContextProvider To Wrap the Main Component
const StoreContextProvider=(prop)=>{

    // store the items added in cart --- adding each item as key value pair in object as ID:Quantity
    const [cartItems,setCartItems]=useState({});


    // function to add value in cart
    const addToCart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    // function to remove from cart
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    // storing each contextvalue in an object 

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item);
                totalAmount+=itemInfo.price* cartItems[item];
            }
        }

        return totalAmount;

    }

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
        getCartItemsLength
    }


    //\
    useEffect(()=>{
        console.log(cartItems)
      },[cartItems])

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