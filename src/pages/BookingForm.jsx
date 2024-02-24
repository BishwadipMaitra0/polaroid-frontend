import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/BookingForm.css'
import { useNavigate } from 'react-router';
import { useAppSelector } from '../app/hooks';

const BookingForm = () => {

  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!user.isLoggedIn) navigate('/user/login')
  }, [])

  const emailRef = useRef()
  const mobilenoRef = useRef()

  const [email, setEmail] = useState()
  const [mobileno, setMobileno] = useState()
  const [name, setName] = useState()
  const [gender, setGender] = useState()
  const [address, setAddress] = useState()
  const [nopeople, setNoPeople] = useState(0)

  const [submitDisabled, setSubmitDisabled] = useState(true)

  const emailValidator = (val) => {
    let isvalid = true
    let emailRegex = /^\S+@\S+\.\S+$/;

    if (val === '') {
      isvalid = false;
    }
    else if (!val.match(emailRegex)) {
      isvalid = false;
    }
    else {
      isvalid = true;
    }

    if (!isvalid) {
      emailRef.current.style.outline = "2px solid red"
      emailRef.current.style.backgroundColor = "#eb9898"
      setSubmitDisabled(true)
    }
    else {
      emailRef.current.style.outline = "none"
      emailRef.current.style.backgroundColor = "#a3d4ec"

      setEmail(() => val)
      setSubmitDisabled(false)
    }
  }

  const mobilenoValidator = (val) => {
    let isvalid = true
    var mobileRegex = /^(\+\d{2}[- ]?)?\d{10}$/;

    if (val === '') {
      isvalid = false;
    }
    else if (!val.match(mobileRegex)) {
      isvalid = false;
    }
    else {
      isvalid = true;
    }

    if (!isvalid) {
      mobilenoRef.current.style.outline = "2px solid red"
      mobilenoRef.current.style.backgroundColor = "#eb9898"
      setSubmitDisabled(true)
    }
    else {
      mobilenoRef.current.style.outline = "none"
      mobilenoRef.current.style.backgroundColor = "#a3d4ec"

      setMobileno(() => val)
      setSubmitDisabled(false)
    }
  }

  const rangeValidator = (val) => {
    let isvalid = true
    let count = +val

    if ((count >= 1) && (count <= 4)) {
      isvalid = true
    }
    else {
      isvalid = false
    }

    if (!isvalid) {
      setSubmitDisabled(true)
    }
    else {
      setNoPeople(() => count)
      setSubmitDisabled(false)
    }
  }

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
            <input class="booking-email-box" ref={emailRef} onChange={(e) => emailValidator(e.target.value)} type="text" id="booking-email" placeholder='example@gmail.com' required />
          </div>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-mobileno">Enter your mobile no</label>
            <input class="booking-email-box" ref={mobilenoRef} onChange={(e) => mobilenoValidator(e.target.value)} type="text" id="booking-mobileno" placeholder='(+91) 1239874506' required />
          </div>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-name">Enter your name</label>
            <input class="booking-email-box" onChange={(e) => setName(e.target.value)} type="text" id="booking-name" placeholder='John Alex' required
              onInvalid={(e) => e.target.setCustomValidity('Name can not be empty')}
              onInput={(e) => e.target.setCustomValidity('')} />
          </div>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-gender">Select your gender</label>
            <select class="booking-email-box booking-personal-info" onChange={(e) => { setGender(e.target.value) }} id="booking-gender" required
              onInvalid={(e) => e.target.setCustomValidity('Please select the gender')}
              onInput={(e) => e.target.setCustomValidity('')} >
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="dwts">Don't want to say</option>
            </select>
          </div>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-no-people">Enter the number of people</label>
            <input class="booking-email-box" onChange={(e) => rangeValidator(e.target.value)} type="number" id="booking-no-people" min={1} max={4} required placeholder='1' />
          </div>
          <div class="booking-email-div">
            <label class="booking-email-label" htmlFor="booking-address">Enter your address</label>
            {/* <input class="booking-email-box" onChange={(e) => setName(e.target.value)} type="text" id="booking-address" placeholder='Address' required /> */}
            <textarea id="booking-address" onChange={(e) => setAddress(e.target.value)} class="booking-address-box" placeholder='Address' required
              onInvalid={(e) => e.target.setCustomValidity('Adress can not be empty')}
              onInput={(e) => e.target.setCustomValidity('')}></textarea>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg>
            </button>
          </div>

        </form>
      </div>

      <Footer />
    </>
  );
};

export default BookingForm;
