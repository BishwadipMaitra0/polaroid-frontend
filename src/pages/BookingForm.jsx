import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/BookingForm.css'
import { useNavigate } from 'react-router';

const BookingForm = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [mobileno, setMobileno] = useState()
  const [name, setName] = useState()
  const [gender, setGender] = useState()
  const [address, setAddress] = useState()
  const [nopeople, setNoPeople] = useState(0)
  const [submitDisabled, setSubmitDisabled] = useState()

  const submitHandler = () => {
    localStorage.setItem("email", email)
    localStorage.setItem("mobileno", mobileno)
    localStorage.setItem("name", name)
    localStorage.setItem("gender", gender)
    localStorage.setItem("address", address)
    localStorage.setItem("nopeople", nopeople)

    navigate(`/booking/${nopeople}`)
  }


  return (
    <>
      <Navbar />
      <div class="booking-main">
        <form class="booking-main-container" onSubmit={submitHandler}>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-email">Enter your email ID</label>
            <input class="booking-email-box" onChange={(e) => setEmail(e.target.value)} type="text" id="booking-email" placeholder='example@gmail.com' required />
          </div>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-mobileno">Enter your mobile no</label>
            <input class="booking-email-box" onChange={(e) => setMobileno(e.target.value)} type="text" id="booking-mobileno" placeholder='(+91) 1239874506' required />
          </div>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-name">Enter your name</label>
            <input class="booking-email-box" onChange={(e) => setName(e.target.value)} type="text" id="booking-name" placeholder='John Alex' required />
          </div>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-gender">Select your gender</label>
            <select class="booking-email-box booking-personal-info" onChange={(e) => setGender(e.target.value)} id="booking-gender" required >
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="dwts">Don't want to say</option>
            </select>
          </div>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-no-people">Enter the number of people</label>
            <input class="booking-email-box" onChange={(e) => setNoPeople(e.target.value)} type="number" id="booking-no-people" min={1} max={4} required placeholder='1' />
          </div>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-address">Enter your address</label>
            {/* <input class="booking-email-box" onChange={(e) => setName(e.target.value)} type="text" id="booking-address" placeholder='Address' required /> */}
            <textarea id="booking-address" onChange={(e) => setAddress(e.target.value)} class="booking-address-box" placeholder='Address' required></textarea>
          </div>
          <div class="booking-control-div">
            <button
              type="submit"
              className="btn btn-outline-info"
              style={{ width: "100%" }}
              id="submit-button"
              disabled={submitDisabled}
            >
              Continue
            </button>
          </div>

        </form>
      </div>

      <Footer />
    </>
  );
};

export default BookingForm;
