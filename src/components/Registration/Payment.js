import React, { useState } from 'react';
import mail_sender from './mail_sender';
import './Payment.css';

const Payment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const eventTypes = [
    { id: 'workshop', name: 'Workshop', price: 499 },
    { id: 'conference', name: 'Conference', price: 999 },
    { id: 'hackathon', name: 'Hackathon', price: 1499 }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


  const sendDataToSpreadsheet = async (paymentId, amount) => {
    try {
      const selectedEvent = eventTypes.find(event => event.id === formData.eventType);
      
      const response = await fetch("https://api.apispreadsheets.com/data/L3iLWLGjJEevfkjP/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data": {
            "Name": formData.name,
            "Type": selectedEvent?.name,
            "Email": formData.email,
            "Amount": amount,
            "PaymentID": paymentId,
            "phone number": formData.phone
          }
        }),
      });

      if (response.status === 201) {
        console.log('Email data sent successfully');
       
      } else {
        throw new Error('Failed to send email data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration successful but email confirmation failed. Please contact support.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      if (!res) {
        throw new Error('Razorpay SDK लोड नहीं हो सका');
      }

      const selectedEvent = eventTypes.find(event => event.id === formData.eventType);
      const amount = selectedEvent ? selectedEvent.price * 100 : 0; // Converting to paise

      const options = {
        key: 'rzp_test_1Lr0R5X91pKV9F',
        currency: 'INR',
        amount: amount,
        name: 'E-Summit LNMIIT',
        description: `Registration for ${selectedEvent?.name}`,
        handler: async function(response) {
          try {
            await mail_sender(
              formData.email, 
              'E-Summit LNMIIT Registration', 
              'Registration successful!'
            );
            await sendDataToSpreadsheet(response.razorpay_payment_id, amount/100);
            alert('Registration successful! You will receive a confirmation email shortly.');
          } catch (error) {
            console.error('Error:', error);
            alert('Payment successful but there was an error in processing. Please contact support.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#2761c3'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setError('भुगतान शुरू करने में त्रुटि। कृपया पुनः प्रयास करें।');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>🎯 Event Registration</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">
              <i className="fas fa-user"></i> Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <i className="fas fa-phone"></i> Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="10-digit mobile number"
              required
              pattern="[0-9]{10}"
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventType">
              <i className="fas fa-calendar-alt"></i> Event Type *
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Event</option>
              {eventTypes.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name} - ₹{event.price}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Processing...
              </>
            ) : (
              <>
                <i className="fas fa-check-circle"></i> Register & Pay
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
