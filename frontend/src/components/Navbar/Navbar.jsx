import React, { useContext, useState } from "react";
import './Navbar.css';
import { assets } from '../../assets/assets'
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("menu");
    const [sidebar, setSidebar] = useState(false);

    const { getTotalCartAmount,token, setToken } = useContext(StoreContext);

    const navigate =useNavigate();

    const logout=()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    return (
        <>
            <div className="navbar">
                <img src={assets.logo} alt="" className="logo"/>

                {/* Desktop Menu */}
                <ul className="navbar-menu">
                    <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
                    <a href="#explore-menu" onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
                    <a href="#app-download" onClick={()=>setMenu("Mobile App")} className={menu==="Mobile App"?"active":""}>Mobile App</a>
                    <a href="#footer" onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact us</a>
                </ul>

                <div className="navbar-right">
                    <img src={assets.search_icon} alt=""/>

                    <div className="navbar-search-icon">
                        <Link to="/cart">
                            <img src={assets.basket_icon} alt=""/>
                        </Link>
                        <div className={getTotalCartAmount()===0?"":"dot"}></div>
                    </div>
                    {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
                    :<div className="navbar-profile">
                        <img src={assets.profile_icon} alt=""/>
                        <ul className="nav-profile-dropdown">
                            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon}alt=""/>Orders</li>
                            <hr/>
                            <li onClick={logout}><img src={assets.logout_icon} alt=""/>Logout</li>
                        </ul>
                        
                        </div>}

                   

                    

                    {/* Hamburger */}
                    <div className="hamburger" onClick={()=>setSidebar(true)}>☰</div>
                </div>
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${sidebar ? "active" : ""}`}>

                <div className="close-btn" onClick={()=>setSidebar(false)}>✕</div>

                <Link to="/" onClick={()=>setSidebar(false)}>Home</Link>
                <a href="#explore-menu" onClick={()=>setSidebar(false)}>Menu</a>
                <a href="#app-download" onClick={()=>setSidebar(false)}>Mobile App</a>
                <a href="#footer" onClick={()=>setSidebar(false)}>Contact us</a>

                {/* Chat button inside sidebar */}
                <Link to="/chat" onClick={()=>setSidebar(false)} className="sidebar-chat">
                    Chattyfiy
                </Link>
                <Link to="/chatbot" onClick={()=>setSidebar(false)} className="sidebar-chat">InvertisEatAI Chatbot</Link>

            </div>

            {sidebar && <div className="overlay" onClick={()=>setSidebar(false)}></div>}
        </>
    )
}

export default Navbar