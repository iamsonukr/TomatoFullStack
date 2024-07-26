import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({setShowLogin}) => {
    const [menu,setMenu]=useState("home");
    const {getCartItemsLength}=useContext(StoreContext);
  return (
    <div className='navbar'>
        {/* link to open home in navbar */}
        <Link to={'/'}> <img src={assets.logo} alt="" className="logo" /></Link>

        {/* navbar menu */}
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu('home')} className={menu==='home'?"active":""} >home</Link>
            <a href='#explore-menu' onClick={()=>setMenu('menu')} className={menu==='menu'?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu('mobile-app')} className={menu==='mobile-app'?"active":""}>mobile-app</a>
            <a href='#footer' onClick={()=>setMenu('contact-us')} className={menu==='contact-us'?"active":""}>contact us</a>
        </ul>

        {/* right navbar */}
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to={'/cart'}><img src={assets.bag_icon} alt="" /></Link>
                {
                    getCartItemsLength()===0
                    ?<></>
                    :<div className="dot"></div>
                }
                
            </div>
            {/* setting up the showLogin value  */}
            <button onClick={()=>setShowLogin(true)}>sign in</button>
        </div>
    </div>
  )
}

export default Navbar