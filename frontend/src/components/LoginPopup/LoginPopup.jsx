import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'

const LoginPopup = ({setShowLogin}) => {

  // this form is using two state One to show / hide login form -> Second to switch between login and sign in form
  const [currState,setCurrState]=useState("Login")
  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        
        <div className="login-popup-input">
          {currState==="Sign Up"? <input type="text" placeholder='Your Name' required />:<></>}
          <input type="email" placeholder='Your Email' required />
          <input type="password" placeholder='Password' required />
        </div>

        <button>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing to this I agree to the terms of use & privacy policy</p>
        </div>
        {
          currState==="Login"
          ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
          :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>

        }

      </form>        
    </div>
  )
}

export default LoginPopup