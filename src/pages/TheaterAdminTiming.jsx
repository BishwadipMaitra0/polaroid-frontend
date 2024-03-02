import React, { useEffect, useState, useRef } from 'react'
import "../styles/Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const TheatreAdminTiming = (props) => {

    const { theatreAdminLogin, setTheatreAdminLogin, theatreAdminName } = props
    const navigate = useNavigate()

    useEffect(() => {
        if (!theatreAdminLogin) {
            navigate('/theater_admin/login')
        }
    }, [])

    const [error, setError] = useState("")
    const [error2, setError2] = useState("")

    const [location, setLocation] = useState("")
    const [mname, setMName] = useState("")
    const [timing, setDate] = useState()
    const [starttime, setStartTime] = useState()
    const [endtime, setEndTime] = useState()
    const [price, setPrice] = useState(0)

    const [sbDisabled, setDisabled] = useState(false)

    const mnameRef = useRef(null)
    const locationRef = useRef(null)
    const timingRef = useRef(null)
    const startTime = useRef()
    const endTime = useRef()

    const altert1Ref = useRef(null)
    const altert2Ref = useRef(null)

    useEffect(() => {
        if (!theatreAdminLogin) {
            navigate('/theater_admin/login')
        }
    }, [])



    function onFocusoutMName() {
        mnameRef.current.style.backgroundColor = "#a3d4ec";
    }

    function onFocusoutLocation() {
        locationRef.current.style.backgroundColor = "#a3d4ec";
    }

    function onFocusoutDate() {
        timingRef.current.style.backgroundColor = "#a3d4ec";
    }

    function onFocusoutStartTime() {
        startTime.current.style.backgroundColor = "#a3d4ec"
    }

    function onFocusoutEndTiming() {
        endTime.current.style.backgroundColor = "#a3d4ec"
    }

    function onFocusinMName() {
        mnameRef.current.style.outline = "none";
        mnameRef.current.style.backgroundColor = "white";
    }

    function onFocusinLocation() {
        locationRef.current.style.outline = "none";
        locationRef.current.style.backgroundColor = "white";
    }

    function onFocusinDate() {
        timingRef.current.style.outline = "none";
        timingRef.current.style.backgroundColor = "white";
    }

    function onFocusinStartTiming() {
        startTime.current.style.outline = "none";
        startTime.current.style.backgroundColor = "white";
    }

    function onFocusinEndTiming() {
        endTime.current.style.outline = "none";
        endTime.current.style.backgroundColor = "white";
    }

    const validateID = () => {
        let movieIDRegex = /^[0-9]+$/

        if (mname !== '' && !mname.match(movieIDRegex)) {
            setError("Enter a valid movie ID")
            return false
        }
        else {
            setError("")
            return true
        }
    }

    const validateTiming = () => {
        if (starttime !== '' && starttime >= endtime) {
            setError("Start Time can not be greater than or equal to End Time")
            return false
        }
        else {
            setError("")
            return true
        }
    }

    const validatePrice = () => {
        if (price >= 0) {
            setError("")
            return true
        }
        else {
            setError("Price must be greater than equal to 0")
            return false
        }
    }

    const validate = () => {
        if (validateID() && validateTiming() && validatePrice()) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }

    useEffect(() => {
        document.title = "Add a movie timings"
    }, [])

    useEffect(() => {
        validate()
    }, [price, starttime, endtime, mname])

    const submitHandler = async (e) => {
        e.preventDefault()

        axios.post("http://localhost:3500/theatreadmin/addshow", {
            location: location,
            movieName: mname,
            startTime: starttime,
            endTime: endtime,
            runDate: timing,
            adminName: theatreAdminName,
            price: +(price)
        })
            .then((res) => {
                console.log(res.data)
                navigate('/theater_admin/dashboard')
            })
            .catch((err) => {
                console.log(err)
            })
    }

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
                            <label htmlFor="name-input" class="email-label" style={{ opacity: "70%" }}>Movie ID</label>
                            <input type="username" ref={mnameRef} value={mname} onChange={(e) => setMName(e.target.value)} name="mname" class="email-box" placeholder="951348" id="name-input" required autoComplete="off"
                                onFocus={onFocusinMName}
                                onBlur={onFocusoutMName}
                                onInvalid={(e) => e.target.setCustomValidity('Movie name can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                        </div>

                        <div class="email-div">
                            <label htmlFor="name-input" class="email-label" style={{ opacity: "70%" }}>Date</label>
                            <input type="date" ref={timingRef} value={timing} onChange={(e) => setDate(e.target.value)} name="date" class="email-box" required autoComplete="off"
                                onFocus={onFocusinDate}
                                onBlur={onFocusoutDate}
                                onInvalid={(e) => e.target.setCustomValidity('Date can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                        </div>

                        <div class="email-div">
                            <label htmlFor="name-input" class="email-label" style={{ opacity: "70%" }}>Start Timing</label>
                            <input type="time" ref={startTime} value={starttime} onChange={(e) => setStartTime(e.target.value)} name="starttiming" class="email-box" required autoComplete="off"
                                onFocus={onFocusinStartTiming}
                                onBlur={onFocusoutStartTime}
                                onInvalid={(e) => e.target.setCustomValidity('Time can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                        </div>

                        <div class="email-div">
                            <label htmlFor="name-input" class="email-label" style={{ opacity: "70%" }}>End Timing</label>
                            <input type="time" ref={endTime} value={endtime} onChange={(e) => setEndTime(e.target.value)} name="endtiming" class="email-box" required autoComplete="off"
                                onFocus={onFocusinEndTiming}
                                onBlur={onFocusoutEndTiming}
                                onInvalid={(e) => e.target.setCustomValidity('Time can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                        </div>

                        <div class="email-div">
                            <label htmlFor="fare-input" class="email-label" style={{ opacity: "70%" }}>Ticket Price</label>
                            <InputGroup className="mb-3" id="fare-label">
                                <InputGroup.Text style={{ backgroundColor: "#abc", outline: "none" }} >Rs.</InputGroup.Text>
                                <Form.Control style={{ backgroundColor: "#a3d4ec", outline: "none" }} value={price} onChange={(e) => setPrice(e.target.value)} />
                                <InputGroup.Text style={{ backgroundColor: "#abc", outline: "none" }}>.00</InputGroup.Text>
                            </InputGroup>
                        </div>

                        <button type="submit" class="btn btn-outline-info" style={{ width: "100%" }} id="submit-button" disabled={sbDisabled}>
                            Add Timing
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </button>
                        <button type="button" class="btn btn-outline-warning" style={{ width: "100%", marginTop: "15px" }} id="submit-button" onClick={() => navigate('/theater_admin/dashboard')} >
                            Go Back!
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

export default TheatreAdminTiming
