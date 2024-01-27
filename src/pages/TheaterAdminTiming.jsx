import React, { useEffect, useState, useRef } from 'react'
import "../styles/Login.css"
import { useNavigate } from 'react-router'
import { useAppSelector } from '../app/hooks'
import axios from 'axios'

const Register = () => {

    const [error, setError] = useState("")
    const [error2, setError2] = useState("")
    const navigate = useNavigate()

    const [location, setLocation] = useState("")
    const [mname, setMName] = useState("")
    const [timing, setTiming] = useState("")

    const [sbDisabled, setDisabled] = useState(false)

    const mnameRef = useRef(null)
    const locationRef = useRef(null)
    const timingRef = useRef(null)

    const altert1Ref = useRef(null)
    const altert2Ref = useRef(null)

    const User = useAppSelector((state) => state.user)
    
    useEffect(() => {
        // console.log(User)
// TODO: Uncomment this and update it backend part
//        if (User.status === "failed" && User.method === "login") {
//            setError(User.error)
//        }
//        else if (User.status === "succeeded" && User.method === "login") {
//            navigate("/")
//        }
//
//        if (User.isLoggedIn === true) {
//            navigate('/', { replace: true })
//        }
    }, [, User])

    function disableButton() {
//        if (!isPassSame || isInvalidEmail || !isPassStrong) {
//            setDisabled((val) => {
//                val = true
//                return val
//            })
//        }
//        else {
//            setDisabled((val) => {
//                val = false
//                return val
//            })
//        }
    }

    function onFocusoutMName() {
        mnameRef.current.style.backgroundColor = "#a3d4ec";
    }

    function onFocusoutLocation() {
        locationRef.current.style.backgroundColor = "#a3d4ec";
    }

    function onFocusoutTiming() {
        timingRef.current.style.backgroundColor = "#a3d4ec";
    }

    function onFocusinMName() {
        mnameRef.current.style.outline = "none";
        mnameRef.current.style.backgroundColor = "white";
    }

    function onFocusinLocation() {
        locationRef.current.style.outline = "none";
        locationRef.current.style.backgroundColor = "white";
    }

    function onFocusinTiming() {
        timingRef.current.style.outline = "none";
        timingRef.current.style.backgroundColor = "white";
    }

// TODO: Maybe we don't need this?
    function validateForm() {
    //    var emailValidation;
    //    var passValidation;
    //    var passStrength;

    //    emailValidation = checkEmail();
    //    passValidation = CheckPassword();
    //    passStrength = strongPassCheck();

    //    if ((emailValidation === false) && (passValidation === false) && ((passStrength === false) || (passStrength === true))) {
    //        altert1Ref.current.innerHTML = "Please enter a valid email address";
    //        altert2Ref.current.innerHTML = "Password does not match";
    //    }
    //    else if ((emailValidation === false) && (passValidation === true) && (passStrength === false)) {
    //        altert1Ref.current.innerHTML = "Please enter a valid email address";
    //        altert2Ref.current.innerHTML = "Please enter a strong password";
    //    }
    //    else if ((emailValidation === false) && (passValidation === true) && (passStrength === true)) {
    //        altert1Ref.current.innerHTML = "Please enter a valid email address";
    //        altert2Ref.current.innerHTML = "";
    //    }
    //    else if ((emailValidation === true) && (passValidation === false) && ((passStrength === false) || (passStrength === true))) {
    //        altert1Ref.current.innerHTML = "Password does not match";
    //        altert2Ref.current.innerHTML = "";
    //    }
    //    else if (passStrength === false) {
    //        altert1Ref.current.innerHTML = "Please enter a strong password";
    //        altert2Ref.current.innerHTML = "";
    //    }
    //    else {
    //        altert1Ref.current.innerHTML = "";
    //        altert2Ref.current.innerHTML = "";
    //    }

    //    return emailValidation && passValidation && passStrength;
    }

    const submitHandler = async (e) => {
        console.log("hi")
        e.preventDefault()
// TODO: Uncomment this and update it
//        const res = await axios.post("http://localhost:3500/user/register", {
//            mname: mname,
//        })
//            .then((data) => {
//                console.log(data)
//                navigate('/user/login')
//            })
//            .catch((err) => {
//                console.log(err)
//                // setError(err.response.data.error)
//                altert1Ref.current.innerHTML = err.response.data.error
//            })
    }

    useEffect(() => {
        validateForm()
    }, [mname, location, timing])

    return (
        <div class="main-register">
            <div class="div-container">
                <img src="/assets/Logo.png" onClick={() => navigate('/')} class="logoreg" />
                <div class="text-div">
                    <form id="registerForm" onSubmit={submitHandler}>
                        <div class="head-div">Add New Timing</div>

                        <div class="email-div">
                            <label htmlFor="name-input" class="email-label" style={{ opacity: "70%" }}>Location</label>
                            <input type="username" ref={locationRef} value={location} onChange={(e) => setLocation(e.target.value)} name="location" class="email-box" placeholder="VR Chennai" id="name-input" required autoComplete="off"
                                onFocus={onFocusinLocation}
                                onBlur={onFocusoutLocation}
                                onInvalid={(e) => e.target.setCustomValidity('Location can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                        </div>
                        
                        <div class="email-div">
                            <label htmlFor="name-input" class="email-label" style={{ opacity: "70%" }}>Movie Name</label>
                            <input type="username" ref={mnameRef} value={mname} onChange={(e) => setMName(e.target.value)} name="mname" class="email-box" placeholder="Barbie" id="name-input" required autoComplete="off"
                                onFocus={onFocusinMName}
                                onBlur={onFocusoutMName}
                                onInvalid={(e) => e.target.setCustomValidity('Movie name can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                        </div>
                        
                        <div class="email-div">
                            <label htmlFor="name-input" class="email-label" style={{ opacity: "70%" }}>Timing</label>
                            <input type="username" ref={timingRef} value={timing} onChange={(e) => setTiming(e.target.value)} name="timing" class="email-box" placeholder="10:00 AM to 10:00 PM" id="name-input" required autoComplete="off"
                                onFocus={onFocusinTiming}
                                onBlur={onFocusoutTiming}
                                onInvalid={(e) => e.target.setCustomValidity('Location can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                        </div>

                        <button type="submit" class="btn btn-outline-info" style={{ width: "100%" }} id="submit-button" disabled={sbDisabled}>
                            Add Timing 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </button>
                    </form>
                    <div class="header-line"></div>
                    <div class="error-div" ref={altert1Ref} id="alert-zone-1"> {error} </div>
                    <div class="error-div" ref={altert2Ref} id="alert-zone-2"> {error2} </div>
                </div>
                <div class="img-div"></div>
            </div>
        </div>
    )
}

export default Register
