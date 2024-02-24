import React, { useEffect, useState, useRef } from 'react'
import "../styles/Login.css"
import "../styles/TheaterTimeSelection.css"
import { useNavigate } from 'react-router'
import { useAppSelector } from '../app/hooks'

const TheaterTimeSelection = () => {

    const navigate = useNavigate()
    const user = useAppSelector((state) => state.user)

    useEffect(() => {
        if (!user.isLoggedIn) navigate('/user/login')
    }, [])

    const [theater, setTheater] = useState()
    const [timing, setTiming] = useState()

    const [sbDisabled, setDisabled] = useState(false)

    const altert1Ref = useRef(null)
    const altert2Ref = useRef(null)

    const submitHandler = async (e) => {
        localStorage.setItem("theater", theater)
        localStorage.setItem("timing", timing)

        navigate('/bookingform')
    }

    useEffect(() => {
        document.title = "Book a show"
    }, [])

    return (
        <div class="main-register">
            <div class="div-container">
                <img src="/assets/Logo.png" onClick={() => navigate('/')} class="logoreg" />
                <div class="text-div">
                    <form id="registerForm" onSubmit={submitHandler}>
                        <div class="head-div">Book Tickets</div>

                        <div class="select-div">
                            <label htmlFor="theater-select" class="email-label" style={{ opacity: "70%" }}>Theater</label><br />
                            <select name="theater" id="theater-select" class="select-box" onClick={(e) => setTheater(e.target.value)} required autoComplete="off">
                                <option value="vr">VR Chennai</option>
                                <option value="phoenix">Phoenix Mall</option>
                                <option value="marina">Marina Mall</option>
                            </select>
                        </div>

                        <div class="select-div">
                            <label htmlFor="timing-select" class="email-label" style={{ opacity: "70%" }}>Timing</label><br />
                            <select name="timing" id="timing-select" class="select-box" onClick={(e) => setTiming(e.target.value)} required autoComplete="off">
                                <option value="morning">9:00 AM to 11:00 PM</option>
                                <option value="afternoon">2:30 PM to 4:30 PM</option>
                                <option value="evening">6:00 PM to 8:00 PM</option>
                                <option value="night">9:30 PM to 11:30 PM</option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-outline-info" style={{ width: "100%" }} id="submit-button" disabled={sbDisabled}>
                            Continue
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </button>
                    </form>
                </div>
                <div class="img-div"></div>
            </div>
        </div>
    )
}

export default TheaterTimeSelection
