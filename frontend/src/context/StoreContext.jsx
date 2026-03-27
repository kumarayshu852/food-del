import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import { useContext } from "react";

export const StoreContext = createContext(null)




const StoreContextProvider =(props)=>{
    


    const [cartItems, setCartItems] =useState({});
    const url ="https://food-del-8e58.onrender.com"
    const [token,setToken]=useState("")
    const [food_list,setFoodList] =useState([]);

    const addToCart =async(itemId)=>{
        const itemInfo= food_list.find(item=> item._id === itemId);
        if (!cartItems[itemId]){
             
            setCartItems((prev)=>({...prev,[itemId]:1}))
            toast.success(`${itemInfo?.name} added to Cart`);
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart =async(itemId)=>{
        const itemInfo = food_list.find(item => item._id === itemId);
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        toast.error(`${itemInfo?.name} removed from Cart`);
        if(token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {

   let totalAmount = 0;

   for(const item in cartItems){

      const itemInfo = food_list.find(
         (product)=> product._id === item
      )

      if(itemInfo && cartItems[item] > 0){
         totalAmount += itemInfo.price * cartItems[item]
      }

   }

   return totalAmount
}

   

    const fetchFoodList =async()=>{
        const response =await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData =async (token) =>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }
    useEffect(()=>{
        
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }    
        }
        loadData();
    },[]);

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        ToastContainer
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
