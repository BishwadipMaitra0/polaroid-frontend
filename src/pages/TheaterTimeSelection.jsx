import React, { useEffect, useState, useRef } from 'react'
import "../styles/Login.css"
import "../styles/TheaterTimeSelection.css"
import { useAppSelector } from '../app/hooks'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import Loader from '../components/Loader'

const TheaterTimeSelection = () => {

    const navigate = useNavigate()
    const user = useAppSelector((state) => state.user)

    // useEffect(() => {
    //     if (!user.isLoggedIn) navigate('/user/login')
    // }, [user])
    const { movieid } = useParams()

    const [locTime, setlocTime] = useState()
    const [theater, setTheater] = useState("")
    const [timing, setTiming] = useState([])
    const [mapObject, setMapObject] = useState({})
    const [price, setPrice] = useState(0)
    const [currentStartTiming, setCurrentStartTiming] = useState("")
    const [currentEndTiming, setCurrentEndTiming] = useState("")
    const [currentRunDate, setCurrentRunDate] = useState("")

    const [noTheatres, setNoTheatres] = useState(false)

    const [alltheaters, setAllTheaters] = useState([])
    const [alltimings, setAllTimings] = useState([])
    const [allPrice, setAllPrice] = useState([])

    const [renderedtimings, setRenderedTimings] = useState()

    const [loading, setLoading] = useState(false)

    const [sbDisabled, setDisabled] = useState(false)

    const altert1Ref = useRef(null)
    const altert2Ref = useRef(null)

    const convertStringToTiming = (timeString) => {
        const monthsMap = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
        }

        console.log(timeString)
        let [day, month, date, year, startHour, to, endHour] = timeString.split(' ')
        console.log(day, month, date, year, startHour, to, endHour)

        let dateString = date.toString().slice(0, 2)
        let yearString = year.toString().slice(0, 4)

        let startHourSplit = startHour.toString().split(':')
        startHour = startHourSplit[0]
        let startMinute = startHourSplit[1]

        let endHourSplit = endHour.toString().split(':')
        endHour = endHourSplit[0]
        let endMinute = endHourSplit[1]

        console.log(month, dateString, yearString, startHour, startMinute, endHour, endMinute)

        const numericMonth = monthsMap[month]
        console.log(numericMonth)

        const runDate = new Date(Date.UTC(Number(yearString), numericMonth, Number(dateString), 0, 0, 0))
        const startTiming = new Date(Date.UTC(Number(yearString), numericMonth, Number(dateString), Number(startHour), Number(startMinute), 0))
        const endTiming = new Date(Date.UTC(Number(yearString), numericMonth, Number(dateString), Number(endHour), Number(endMinute), 0))

        console.log(runDate, typeof (runDate))
        console.log(startTiming, typeof (startTiming))
        console.log(endTiming, typeof (endTiming))

        console.log(runDate.toISOString(), typeof (runDate.toISOString()))
        console.log(startTiming.toISOString())
        console.log(endTiming.toISOString())
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        localStorage.setItem("theater", theater)
        localStorage.setItem("timing", timing)
        localStorage.setItem("startTiming", currentStartTiming)
        localStorage.setItem("endTiming", currentEndTiming)
        localStorage.setItem("runDate", currentRunDate)
        localStorage.setItem("price", price)

        convertStringToTiming(timing.toString())

        navigate('/bookingform')
    }

    const convertDateToString = (startTimeString, endTimeString) => {
        const startTime = new Date(startTimeString);
        const endTime = new Date(endTimeString);

        const formatTime = (date) => {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        const formattedStartDate = startTime.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

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

        setAllTheaters(loctimkeys)
        setlocTime(locTimeMap)
        return locTimeMap.keys().next().value.toString()
    }

    const fetchData = async () => {
        axios.get(`http://localhost:3500/loctim/${movieid}`)
            .then((data) => {
                // console.log("hello")
                console.log(data.data)
                if (data.data.length === 0) {
                    console.log("No theatres found!")
                    setNoTheatres(true)
                }
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
        let allStringtimings = []
        let allStringPrice = []

        console.log(theater)
        let mapObj = {}
        locTime.get(theater).forEach((entry) => {
            const { startTiming, endTiming, price, runDate } = entry.timings
            let curStringTime = convertDateToString(startTiming, endTiming)
            allStringtimings.push({
                stringTime: curStringTime,
                startTiming: startTiming,
                endTiming: endTiming,
                runDate: runDate
            })

            mapObj[curStringTime] = [startTiming, endTiming, runDate]

            allStringPrice.push(price)
        })

        setMapObject(mapObj)
        setAllTimings(allStringtimings)
        setAllPrice(allStringPrice)
        setTiming(allStringtimings[0].stringTime)
        setCurrentStartTiming(allStringtimings[0].startTiming)
        setCurrentEndTiming(allStringtimings[0].endTiming)
        setCurrentRunDate(allStringtimings[0].runDate)
        setPrice(+(allStringPrice[0]))

        console.log(alltimings)
    }

    const updatePrice = () => {
        let index = -1
        for (let i = 0; i < alltimings.length; i++) {
            if (alltimings[i].stringTime === timing) {
                index = i
                break
            }
        }
        setPrice(allPrice[index])
    }

    const setTimingFunction = (e) => {
        let val = e.target.value
        setTiming(val)
        setCurrentStartTiming(mapObject[val][0])
        setCurrentEndTiming(mapObject[val][1])
        setCurrentRunDate(mapObject[val][2])
    }

    useEffect(() => {
        setLoading(true)
        localStorage.clear()
        localStorage.setItem("movieId", movieid)
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
                noTheatres ?
                    <>
                        <p>No ongoing shows for this movie!</p>
                    </>
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
                                        <select name="" id="timing-select" class="select-box" onClick={(e) => setTimingFunction(e)} required autoComplete="off">
                                            {alltimings.map((item, index) => (
                                                <option value={item.stringTime}>{item.stringTime}</option>
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
