import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img  className='footer-logo' src={assets.logo} alt=""  />
          <p> Whether you’re craving a piping hot pizza, a juicy burger, fresh sushi, or a healthy salad, we’ve got you covered. Here’s why Tomato is your go-to destination for online food ordering:</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>

        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacty Policy</li>
          </ul>

        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 890 983 0091</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
      Copyright {new Date().getFullYear()} Tomato.com - All Right Reserved
      </p>

    </div>
  )
}

export default Footer