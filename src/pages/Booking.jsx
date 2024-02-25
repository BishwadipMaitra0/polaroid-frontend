import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/Booking.css'
import { useAppSelector } from '../app/hooks';
import axios from 'axios';

function Booking() {

    const user = useAppSelector((state) => state.user)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!user.isLoggedIn) navigate('/user/login')
    // }, [])

  let count = localStorage.getItem("nopeople")
  let seatcount = +count

  const zone = useRef()
  
  const [btDis, setBtDis] = useState(true)

  const [selectedSeats, setSelectedSeats] = useState(0)
  const [bookedSeats, setBookedSeats] = useState([])
  const [seatMatrix, setSeatMatrix] = useState(
    [
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 1]
    ]
  );

  useEffect(() => {
    if (seatcount !== selectedSeats) {
      zone.current.style.color = "#eb455f"
      setBtDis(true)
    }
    else {
      zone.current.style.color = "LimeGreen"
      setBtDis(false)
    }

    console.log(selectedSeats)
  }, [selectedSeats])

  const selectCurrentSeat = (row, col, e) => {
    // console.log("selectCurrentSeat" + row + col + " " + Date.now())
    console.log("count" + seatcount)

    if (tempseatMatrix[row][col] === 1) {
      tempseatMatrix[row][col]++
      tempbookedSeats.push("" + row + col)
      e.target.style.backgroundColor = "#1f8a70";
      console.log(e.target.style.backgroundColor)

      setSelectedSeats((n) => { return n + 1 })
    }
    else if (tempseatMatrix[row][col] === 2) {
      tempseatMatrix[row][col]--

      let index = tempseatMatrix.indexOf("" + row + col);
      if (index !== -1)
        tempseatMatrix.splice(index, 1);

      e.target.style.backgroundColor = "#bad7e9";
      console.log(e.target.style.backgroundColor)

      setSelectedSeats((n) => { return n - 1 })
    }
  }

  const submitHandler = () => {
    console.log("hi")
    setBookedSeats(tempbookedSeats)
    setSeatMatrix(tempseatMatrix)

    console.log(tempbookedSeats)
  }


  // keep these under fetchData() handler
  let tempbookedSeats = []
  let tempseatMatrix = seatMatrix

  const getSeatData = async () => {
    const movieId = localStorage.getItem("movieId")
    const location = localStorage.getItem("theater")
    const runDate = localStorage.getItem("runDate")
    const startTiming = localStorage.getItem("startTiming")
    const endTiming = localStorage.getItem("endTiming")

    axios.get(`http://localhost:3500/loctim/${movieId}`)
    .then((data) => {
        const apiResponse = data.data
        
        let show
        for (let i=0; i<apiResponse.length; i++) {
            if (apiResponse[i].location === location) {
                console.log("found location!")
                console.log(apiResponse[i].timings.runDate, typeof(apiResponse[i].timings.runDate))
                if (apiResponse[i].timings.runDate === runDate && apiResponse[i].timings.startTiming === startTiming && apiResponse[i].timings.endTiming === endTiming) {
                    show = apiResponse[i]
                }
            }
        }

        setSeatMatrix(show.timings.seating)
    })
    .catch((err) => {
        console.log(err)
    })
  }

  useEffect(() => {
    document.title = "Seat Selection"
    getSeatData()
  }, [])

  return (
    <>
      <Navbar />
      <div class="seat-booking-main">
        <div class="seat-booking-header-div">
          Please select your seat(s)
        </div>
        <div class="seat-group-div">
          <div class="seat-group">
            <div class="seat"> </div>
            <small>Available</small>
          </div>
          <div class="seat-group">
            <div class="seat selected"> </div>
            <small>Selected</small>
          </div>
          <div class="seat-group">
            <div class="seat Occupied"> </div>
            <small>Occupied</small>
          </div>
        </div>

        <div class="seat-booking-div-container">
          <div class="screen"></div>
          <div class="seat-container" id="seat-container">
            {seatMatrix.map((item, row) => (
              item.map((item, col) => (
                (seatMatrix[row][col] === 0) ?
                  <div class="seat Occupied" key={`${row}${col}`} id={`${row}${col}`} onClickCapture={(e) => selectCurrentSeat(row, col, e)}></div>
                  :
                  <div class="seat" key={`${row}${col}`} id={`${row}${col}`} onClickCapture={(e) => selectCurrentSeat(row, col, e)}></div>
              ))
            ))}
          </div>
        </div>
        <div class="seat-booking-info-zone">
          You have selected&nbsp;<div ref={zone} id="seat-booking-info-zone">{selectedSeats}</div>&nbsp;seats.
        </div>
        <button type="button" class="btn btn-outline-success" id="submit-button" onClick={() => submitHandler()} disabled={btDis}>Proceed to Payment</button>
      </div>
      <Footer />
    </>
  );
}

export default Booking;
