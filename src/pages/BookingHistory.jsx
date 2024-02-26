import React, { useState, useEffect } from 'react'
import "../styles/Ongoing.css"
import "../styles/BookingHistory.css"
import axios from 'axios'
import getMovieByName from '../api/getMovieByName'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router'
import getMovieById from '../api/getMovieById'

const BookingHistory = () => {

    const user = useAppSelector((state) => state.user)
    const navigate = useNavigate()

    const [bookingHistory, setBookingHistory] = useState([])

    const getBookingHistory = async () => {
        console.log(user.data.email)
        axios.post(`http://localhost:3500/user/bookinghistory`, {
            email: user?.data?.email
        })
        .then(async (data) => {
            for (let i=0; i<data.data.length; i++) {
                const movieData = await getMovieById(data.data[i].movieName)
                data.data[i].poster_path = movieData.poster_path
                data.data[i].director = movieData.director
                data.data[i].release_date = movieData.release_date
                data.data[i].title = movieData.title
            }
            console.log(data.data)
            setBookingHistory(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
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

    const ticketMapping = {
        9: 'A',
        8: 'B',
        7: 'C',
        6: 'D',
        5: 'E',
        4: 'F',
        3: 'G',
        2: 'H',
        1: 'I',
        0: 'J'
    }
    
    const mapTicketsToString = (ticketsArray) => {
        let str = ""
        for (let i=0; i<ticketsArray.length; i++) {
            if (i !== ticketsArray.length - 1) {
                str += "" + ticketMapping[ticketsArray[i][0]] + ticketsArray[i][1] + ", "
            }
            else {
                str += "" + ticketMapping[ticketsArray[i][0]] + ticketsArray[i][1]
            }
        }
    
        return str
    }

    const cancelTicket = (item) => {
        
    }

    useEffect(() => {
        // if (!user.isLoggedIn) navigate('/user/login')
        getBookingHistory()
    }, [, user])

    return (
        <>
            <Navbar />
            <div class="searchpage_main_container">
                <div class="main_searchpage">
                        <div class="header">
                            <div class="header-description">Booking History</div>
                        </div>
                        {bookingHistory.map((item, index) => 
                            <div class="book-history-element-container">
                                <div class="book-history-content-container">
                                <div class="film-image-container">
                                    <img class="film-image" src={"https://image.tmdb.org/t/p/original/"+item.poster_path} alt="image" />
                                </div>
                                <div class="film-content">
                                    <div class="film-header">
                                        <a class="film-name" href={"/"} > {item.title} </a>
                                        <div class="film-year"> {item.release_date.toString().slice(0, 4)} </div>
                                    </div>
                                    <div class="film-desc">
                                        <ul class="booking-details">
                                            <li><b>Location :</b> {item.location}</li>
                                            <li><b>Date and Time :</b> {convertDateToString(item.startTiming, item.endTiming)}</li>
                                            <li><b>No. of tickets:</b> {item.ticketNumbers.length} </li>
                                            <li><b>Seats:</b> {mapTicketsToString(item.ticketNumbers)} </li>
                                        </ul>
                                    </div>
                                </div>
                                </div>
                                <div class="book-history-button-container">
                                    <button type="button" class="book-history-button book-history-cancel-button" onClick={cancelTicket(item)}>Cancel</button>
                                    {/* <button type="button" class="book-history-button book-history-resend-button">Resend</button> */}
                                </div>
                            </div>
                        )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BookingHistory
