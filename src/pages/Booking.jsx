import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/Booking.css'

function Booking() {

  const { count } = useParams()
  let seatcount = +count

  const zone = useRef()
  const btn = useRef()

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
      btn.current.disabled = true
    }
    else {
      zone.current.style.color = "LimeGreen"
      btn.current.disabled = false
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
    setBookedSeats(tempbookedSeats)
    setSeatMatrix(tempseatMatrix)
  }


  // keep these under fetchData() handler
  let tempbookedSeats = []
  let tempseatMatrix = seatMatrix

  useEffect(() => {
    document.title = "Book you seat"
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
        <button type="button" class="btn btn-outline-success" ref={btn} id="submit-button" onClick={(e) => { submitHandler() }} disabled>Proceed to Payment</button>
      </div>
      <Footer />
    </>
  );
}

export default Booking;
