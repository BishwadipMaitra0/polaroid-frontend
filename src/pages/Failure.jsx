import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Failure.css"

const Failure = () => {
  const navigate = useNavigate(); 
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="container1">
      <div className="card1">
        <div className="circle1">
          <i className="crossmark">✗</i>
        </div>
        <h1>Failure</h1>
        <p>
          You payment has failed! <br /> Please Try Again or Contact Us at "polaroid@proton.me"
        </p>
        <button className="home-button" onClick={handleHomeClick}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Failure;
