import React, { useEffect, useState, useRef } from 'react'
import "../styles/Login.css"
import "../styles/TheaterTimeSelection.css"
import { useAppSelector } from '../app/hooks'
import axios from 'axios'
import { useNavigate } from 'react-router'

const TheaterTimeSelection = (props) => {

    const { theatreAdminLogin, setTheatreAdminLogin, theatreAdminName } = props
    const navigate = useNavigate()

 //   useEffect(() => {
 //       if (!theatreAdminLogin) {
 //           navigate('/theater_admin/login')
 //       }
 //   }, [])

    const [error, setError] = useState("")
    const [error2, setError2] = useState("")

    const [location, setLocation] = useState("")
    const [mname, setMName] = useState("")
    const [timing, setTiming] = useState("")

    const [sbDisabled, setDisabled] = useState(false)

    const mnameRef = useRef(null)
    const locationRef = useRef(null)
    const timingRef = useRef(null)

    const altert1Ref = useRef(null)
    const altert2Ref = useRef(null)
    
//    useEffect(() => {
//        if (!theatreAdminLogin) {
//            navigate('/theater_admin/login')
//        }
//    }, [])

    

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

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(location, mname, timing)

        axios.post("http://localhost:3500/theatreadmin/addshow", {
            location: location,
            movieName: mname,
            timings: [timing],
            adminName: theatreAdminName
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
                        <div class="head-div">Book Tickets</div>

                        <div class="select-div">
                            <label htmlFor="select-input" class="email-label" style={{ opacity: "70%" }}>Theater</label><br/>
                            <select name="timing" id="select-input" class="select-box" required autoComplete="off">
                                <option value="vr">VR Chennai</option>
                                <option value="phoenix">Phoenix Mall</option>
                                <option value="marina">Marina Mall</option>
                            </select>
                        </div>

                        <div class="select-div">
                            <label htmlFor="select-input" class="email-label" style={{ opacity: "70%" }}>Timing</label><br/>
                            <select name="timing" id="select-input" class="select-box" required autoComplete="off">
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
                    <div class="header-line"></div>
                    <div class="error-div" ref={altert1Ref} id="alert-zone-1"> {error} </div>
                    <div class="error-div" ref={altert2Ref} id="alert-zone-2"> {error2} </div>
                </div>
                <div class="img-div"></div>
            </div>
        </div>
    )
}

export default TheaterTimeSelection
