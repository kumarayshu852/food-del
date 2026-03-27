import React, { useContext } from 'react';
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from 'react';

const Cart =() =>{
    const [loading, setLoading] =useState(true);
     const {cartItems, food_list, removeFromCart, getTotalCartAmount,url }=useContext(StoreContext);

    const navigate =useNavigate();


    useEffect(() => {
  const loadData = async () => {
    setLoading(true);

    // simulate ya real API
    await new Promise(res => setTimeout(res, 1000)); // testing

    setLoading(false);
  };

  loadData();
}, []);

if (loading) {
  return (
    <div className="cart-skeleton">
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
    </div>
  );
}
   
    return(
        <div>
            <div className='cart-items'>
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {food_list.map((item, index)=>{
                    if (cartItems[item._id]>0){
                        return(
                            <div>

                            <div className='cart-items-title cart-items-item'>
                                <img src={item.image} alt=''/>
                                <p>{item.name}</p>
                                <p>₹{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>₹{item.price*cartItems[item._id]}</p>
                                <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                                
                            </div>
                            <hr/>
                            </div>
                        )
                    }
                })}
            </div>
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p className='free'>Free</p>
                        </div>
                        <hr/>
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+0}</b>
                        
                        </div>
                        <button onClick={()=>navigate('/order')}>PROCEED TO CHECkOUT</button>
                        </div>
                        
                </div>
            </div>
            </div>

       
    )
}
export default Cart