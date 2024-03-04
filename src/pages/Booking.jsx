import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/Booking.css'
import { useAppSelector } from '../app/hooks';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { stripe_public_key } from '../config';

const Booking = () => {

    const user = useAppSelector((state) => state.user)
    const navigate = useNavigate()

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
        let tempbookedSeats = bookedSeats
        let tempseatMatrix = seatMatrix

        console.log("first")
        console.log(tempbookedSeats)

        if (tempseatMatrix[row][col] === 1) {
            tempseatMatrix[row][col]++

            tempbookedSeats.push([row, col])

            e.target.style.backgroundColor = "#1f8a70";
            console.log(e.target.style.backgroundColor)

            setSelectedSeats((n) => { return n + 1 })
        }
        else if (tempseatMatrix[row][col] === 2) {
            tempseatMatrix[row][col]--

            let index
            for (index = 0; index < tempbookedSeats.length; index++) {
                let temp = tempbookedSeats[index]
                if (temp[0] === row && temp[1] === col)
                    break
            }

            tempbookedSeats.splice(index, 1);

            e.target.style.backgroundColor = "#bad7e9";
            console.log(e.target.style.backgroundColor)

            setSelectedSeats((n) => { return n - 1 })
        }

        setBookedSeats(tempbookedSeats)
        setSeatMatrix(tempseatMatrix)
    }

    const submitHandler = () => {
        console.log("hi")
        localStorage.setItem("seatArray", bookedSeats)

        const movieName = localStorage.getItem("movieId")
        const customerName = localStorage.getItem("name")
        const customerEmail = localStorage.getItem("email")
        const runDate = localStorage.getItem("runDate")
        const startTiming = localStorage.getItem("startTiming")
        const endTiming = localStorage.getItem("endTiming")
        const location = localStorage.getItem("theater")
        const dateString = localStorage.getItem("timing")
        const email = user.data.email

        console.log(bookedSeats)
        axios.post("http://localhost:3500/confirmticket", {
            ticketNumbers: bookedSeats,
            movieName: movieName,
            customerName: customerName,
            customerEmail: customerEmail,
            runDate: runDate,
            startTiming: startTiming,
            endTiming: endTiming,
            location: location,
            email: user.data.email,
            dateString: dateString
        })
            .then(async (data) => {
                // console.log(data.data)
                makePayment()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const makePayment = async () => {
        const stripe = await loadStripe(stripe_public_key);

        const strPrice = localStorage.getItem("price")
        const price = +strPrice

        const strQuantity = localStorage.getItem("nopeople")
        const quantity = +strQuantity

        const body = {
            price: price,
            quantity: quantity
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch("http://localhost:3500/api/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }
    }

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
                for (let i = 0; i < apiResponse.length; i++) {
                    if (apiResponse[i].location === location) {
                        console.log("found location!")
                        console.log(apiResponse[i].timings.runDate, typeof (apiResponse[i].timings.runDate))
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

    //   useEffect(() => {
    //     if (!user.isLoggedIn) navigate('/user/login')
    //   }, [])

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
