import React, { useContext, useEffect, useState } from "react";
import './Placeorder.css';
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [cafe, setCafe] = useState("AB2");

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        studentId: "",
        department: "",
        section: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {

            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 0,
            cafe: cafe
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            alert("Order Placed Successfully (Cash on Delivery)");
            navigate("/myorders");
        }
        else {
            alert("Error");
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])




    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
                </div>

                <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
                <input required name="studentId" onChange={onChangeHandler} value={data.studentId} type="text" placeholder=" Students ID" />
                <div className="multi-fields">
                    <input required name="department" onChange={onChangeHandler} value={data.department} type="text" placeholder="Department" />
                    <input required name="section" onChange={onChangeHandler} value={data.section} type="text" placeholder="Section" />
                </div>
                <div className="multi-fields">
                    <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
                    <input type="text" value="Bareilly" readOnly />
                </div>
                <input type="text" value="Invertis University, Bareilly" readOnly />
            </div>
            <div className="place-order-right">
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p className="free">Free</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>₹{getTotalCartAmount() + 0}</b>
                        </div>
                        <button type="submit">PROCEED TO PAYMENT</button>
                        <div className="choose-cafe">
                            <p>Choose The Cafe</p>
                            <hr />
                            <select onChange={(e) => setCafe(e.target.value)}>
                                <option value="AB2">AB2 Cafe</option>
                                <option value="AB3">AB3 Cafe</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </form>



    )
}
export default PlaceOrder