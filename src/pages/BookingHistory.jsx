import React, { useState, useEffect } from 'react'
import "../styles/Ongoing.css"
import "../styles/BookingHistory.css"
import axios from 'axios'
import getMovieByName from '../api/getMovieByName'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router'

const BookingHistory = () => {

    const user = useAppSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.isLoggedIn) navigate('/user/login')
    }, [])

    return (
        <>
            <Navbar />
            <div class="searchpage_main_container">
                <div class="main_searchpage">
                        <div class="header">
                            <div class="header-description">Booking History</div>
                        </div>
                        <div class="element-container">
                            <div class="content-container">
                               <div class="film-image-container">
                                   <img class="film-image" src={"https://image.tmdb.org/t/p/original"} alt="image" />
                               </div>
                               <div class="film-content">
                                   <div class="film-header">
                                       <a class="film-name" href={"/"} > Avatar 2 </a>
                                       <div class="film-year"> 2023 </div>
                                   </div>
                                   <div class="film-desc">
                                       <ul class="booking-details">
                                           <li><b>Date:</b> 22nd March 2024</li>
                                           <li><b>Time:</b> 11:00 AM to 1:00PM</li>
                                           <li><b>No. of tickets:</b> 4</li>
                                           <li><b>Seats:</b> G4, G5, G6, G7</li>
                                       </ul>
                                   </div>
                               </div>
                            </div>
                            <div class="button-container">
                                <button type="button" class="button cancel-button">Cancel</button>
                                <button type="button" class="button resend-button">Resend</button>
                            </div>
                        </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default BookingHistory
