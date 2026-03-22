import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets.js";
import { format } from "timeago.js";

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);
    const [timeUpdate, setTimeUpdate] = useState(0);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/list");
            if (response.data.success) {
                // Reverse isliye taaki naya order hamesha top par dikhe
                setOrders(response.data.data.reverse());
            } else {
                toast.error("Error fetching orders");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        })
        if (response.data.success) {
            await fetchAllOrders();
        }
    }

    useEffect(() => {
        fetchAllOrders();

        // Har 30 second mein UI refresh hogi
        const interval = setInterval(() => {
            fetchAllOrders(); 
            setTimeUpdate(prev => prev + 1); 
        }, 30000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="order add">
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, i) => (
                                    i === order.items.length - 1 
                                    ? item.name + " x" + item.quantity 
                                    : item.name + " x" + item.quantity + ", "
                                ))}
                            </p>
                            <p className="order-item-name">
                                {order.address.firstName + " " + order.address.lastName}
                            </p>
                            <div className="order-item-address">
                                <p>ID: {order.address.studentId}</p>
                                <p>{order.address.department}, {order.address.section}</p>
                                <br />
                                <p><strong>Cafe:</strong> {order.cafe}</p>
                            </div>
                            <p className="order-item-phone">{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>₹{order.amount}</p>
                        
                        {/* THE FIX IS HERE: 'order.createdAt' use karein, 'orders' nahi */}
                        <p className="order-time">
                       {format(new Date(order.createdAt || order.data))}
                        </p>

                        <p className="payment-status">
                            Payment: {order.payment ? "Paid Online" : "Cash on Delivery"}
                        </p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders;