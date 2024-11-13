import React, { useState } from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  const [contactMethod, setContactMethod] = useState('email');
  const [contactValue, setContactValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    // Simulated submission
    setTimeout(() => {
      setIsAnimating(false);
      setContactValue('');

      alert('Download link sent successfully!');
    }, 2000);
  };

  return (
    <div className="app-download-container">
      <div className="app-info">
        <div className="phones-container">
          <img 
            src={assets.app_mock}
            alt="FoodiesFusion app interface" 
            className="phone-mockup"
          />
        </div>
        
        <div className="download-content">
          <h1>Get the FoodiesFusion app</h1>
          <p>We will send you a link, open it on your phone to download the app</p>
          
          <form onSubmit={handleSubmit} className="download-form">
            <div className="radio-group">
              <label className={`radio-label ${contactMethod === 'email' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={contactMethod === 'email'}
                  onChange={(e) => setContactMethod(e.target.value)}
                />
                <span className="radio-text">Email</span>
              </label>
              
              <label className={`radio-label ${contactMethod === 'phone' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={contactMethod === 'phone'}
                  onChange={(e) => setContactMethod(e.target.value)}
                />
                <span className="radio-text">Phone</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type={contactMethod === 'email' ? 'email' : 'tel'}
                placeholder={contactMethod === 'email' ? 'Email' : 'Phone number'}
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className={`share-button ${isAnimating ? 'animating' : ''}`}
              >
                {isAnimating ? 'Sending...' : 'Share App Link'}
              </button>
            </div>
          </form>

          <div className="download-options">
            <p>Download app from</p>
            <div className="store-buttons">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="store-button"
              >
                <img src={assets.play_store} alt="Get it on Google Play" />
              </a>
              <a 
                href='#explore-menu'
                target="_blank" 
                rel="noopener noreferrer"
                className="store-button"
              >
                <img src={assets.app_store} alt="Download on the App Store" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;