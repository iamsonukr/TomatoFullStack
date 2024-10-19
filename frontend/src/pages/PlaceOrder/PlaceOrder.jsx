import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Proper import for the logo

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  
  let amount = getTotalCartAmount() * 100; // Razorpay takes amount in paise
  const currency = "INR";
  const receiptId = "ID-TEST-009";

  // Razorpay payment handler
  const paymentHandler = async (e) => {
    e.preventDefault();
    if (amount === 0) {
      alert("Your cart is empty.");
      return;
    }
    
    try {
      const response = await axios.post(`${url}/api/order/place`, {
        amount,
        currency,
        receipt: receiptId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const order = response.data;

      // Razorpay configuration
      const paymentWindowConfig = {
        key: "rzp_test_RakCckTlR6axJb",
        amount: amount,
        currency,
        name: "Acme Corp",
        description: "Payment for food",
        image: logo,
        order_id: order.id,
        handler: async (response) => {
          console.log('Payment Successful', response);
          try {
            const validateRes = await axios.post(`${url}/api/order/verify`, response);
            console.log(validateRes.data);
          } catch (error) {
            console.error("Payment validation failed:", error);
          }
        },
        prefill: {
          name: "Tomato",
          email: "deliveryteam@tomato.com",
          contact: "9000090000",
        },
        notes: {
          address: "Tomato Food Service HQ, Delhi NCR",
        },
        theme: {
          color: "#cc3333",
        },
      };

      // Creating the payment window
      const paymentWindow = new window.Razorpay(paymentWindowConfig);
      paymentWindow.on('payment.failed', function (response) {
        alert("Payment failed: " + response.error.description);
      });
      paymentWindow.open();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error processing payment.");
    }
  };

  // Form State Management
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={paymentHandler} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</p>
            </div>
            <hr />
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
