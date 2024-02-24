import React, { useEffect, useState, useRef } from 'react'
import "../styles/Login.css"
import "../styles/TheaterTimeSelection.css"
import { useNavigate, useParams } from 'react-router'
import axios, { all } from 'axios'
import Loader from '../components/Loader'

const TheaterTimeSelection = () => {

    const navigate = useNavigate()
    const { movieid } = useParams()

    const [locTime, setlocTime] = useState()
    const [theater, setTheater] = useState("")
    const [timing, setTiming] = useState([])
    const [price, setPrice] = useState(0)

    const [alltheaters, setAllTheaters] = useState([])
    const [alltimings, setAllTimings] = useState([])
    const [allPrice, setAllPrice] = useState([])

    const [renderedtimings, setRenderedTimings] = useState()

    const [loading, setLoading] = useState(false)

    const [sbDisabled, setDisabled] = useState(false)

    const altert1Ref = useRef(null)
    const altert2Ref = useRef(null)

    const submitHandler = async (e) => {
        localStorage.setItem("theater", theater)
        localStorage.setItem("timing", timing)

        navigate('/bookingform')
    }

    const convertDateToString = (startTimeString, endTimeString) => {
        // Create Date objects from the given strings
        const startTime = new Date(startTimeString);
        const endTime = new Date(endTimeString);

        // Custom formatting function for time
        const formatTime = (date) => {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        // Format the date strings
        const formattedStartDate = startTime.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

        // Create the final string
        const finalString = `${formattedStartDate}, ${formattedStartTime} to ${formattedEndTime}`;

        return finalString
    }

    const parseJSONData = (data) => {
        const locTimeMap = new Map()
        let loctimkeys = []
        data.forEach((entry) => {
            const { location, timings } = entry

            if (!locTimeMap.has(location)) {
                locTimeMap.set(location, Array.from([]))
            }

            let temp = locTimeMap.get(location)
            temp.push({ timings })

            locTimeMap.set(location, temp)

        })

        for (let key of locTimeMap.keys()) {
            loctimkeys.push(key)
        }

        // console.log(loctimkeys)
        setAllTheaters(loctimkeys)
        // console.log(locTimeMap)
        setlocTime(locTimeMap)
        // console.log(locTimeMap.keys().next().value)
        return locTimeMap.keys().next().value.toString()
        // setTheater(locTimeMap.keys().next().value.toString())
    }

    const fetchData = async () => {
        axios.get(`http://localhost:3500/loctim/${movieid}`)
            .then((data) => {
                // console.log("hello")
                console.log(data.data)
                let initialTheater = parseJSONData(data.data)

                setTheater(initialTheater)
                updateTimings()
                updatePrice()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const updateTimings = () => {
        // console.trace()
        let allStringtimings = []
        let allStringPrice = []

        // console.log(theater)
        console.log(theater)
        // console.log(locTime)
        locTime.get(theater).forEach((entry) => {
            const { startTiming, endTiming, price } = entry.timings

            // console.log(entry.timings)
            allStringtimings.push(convertDateToString(startTiming, endTiming))
            allStringPrice.push(price)
        })

        // console.log(allStringtimings)

        setAllTimings(allStringtimings)
        setAllPrice(allStringPrice)

        setTiming(allStringtimings[0])
        setPrice(+(allStringPrice[0]))

        console.log(alltimings)
    }

    const updatePrice = () => {
        let index = alltimings.indexOf(timing)
        setPrice(allPrice[index])
    }

    useEffect(() => {
        setLoading(true)
        document.title = "Book a show"
        fetchData()
        setLoading(false)
    }, [])

    useEffect(() => {
        if (theater !== "") updateTimings()
    }, [theater, alltheaters])

    useEffect(() => {
        updatePrice()
    }, [timing, alltimings])

    return (
        <>
            {loading ?
                <Loader />
                :
                <div class="main-register">
                    <div class="div-container">
                        <img src="/assets/Logo.png" onClick={() => navigate('/')} class="logoreg" />
                        <div class="text-div">
                            <form id="registerForm" onSubmit={submitHandler}>
                                <div class="head-div">Book Tickets</div>

                                <div class="select-div">
                                    <label htmlFor="theater-select" class="email-label" style={{ opacity: "70%" }}>Theater</label><br />
                                    <select name="" id="theater-select" class="select-box" onClick={(e) => setTheater(e.target.value)} required autoComplete="off">
                                        {alltheaters.map((item, index) => (
                                            <option value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>

                                <div class="select-div">
                                    <label htmlFor="timing-select" class="email-label" style={{ opacity: "70%" }}>Timing</label><br />
                                    <select name="" id="timing-select" class="select-box" onClick={(e) => setTiming(e.target.value)} required autoComplete="off">
                                        {alltimings.map((item, index) => (
                                            <option value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>

                                <div class="select-div">
                                    <div class="email-label" id="price-zone">Price: {price} per ticket</div>
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
                </div>}
        </>

    )
}

export default TheaterTimeSelection
