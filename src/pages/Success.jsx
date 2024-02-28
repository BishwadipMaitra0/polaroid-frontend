import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Success.css"

const Success = () => {
  const navigate = useNavigate(); 
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="successpage_container">
      <div className="successpage_card">
        <div className="successpage_circle">
          <i className="successpage_checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>
          You have successfully booked your ticket! <br /> We will send it to you soon.
        </p>
        <div className='successpage_flex'>
          <button className="successpage_home-button1" onClick={handleHomeClick}>
            Go to Home
          </button>
          <button className="successpage_home-button1" onClick={() => navigate('/user/bookinghistory')}>
            Check Booking History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
