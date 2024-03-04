import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Failure.css"

const Failure = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="failurepage_container1">
      <div className="failurepage_card1">
        <div className="failurepage_circle1">
          <i className="failurepage_crossmark">✗</i>
        </div>
        <h1>Failure</h1>
        <p>
          You payment has failed! <br /> Please Try Again
        </p>
        <button className="failurepage_home-button" onClick={handleHomeClick}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Failure;
