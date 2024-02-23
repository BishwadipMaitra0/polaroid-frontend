import React, { useState, useEffect } from 'react'
import "../styles/Search.css"
import "../styles/Ongoing.css"
import axios from 'axios'
import getMovieByName from '../api/getMovieByName'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const OngoingMovies = () => {

    return (
        <>
            <Navbar />
            <div class="searchpage_main_container">
                <div class="main_searchpage">
                        <div class="header">
                            <div class="header-description">Ongoing Films</div>
                        </div>
                        <div class="element-container">
                            <div class="film-image-container">
                                <img class="film-image" src={"https://image.tmdb.org/t/p/original"} alt="image" />
                            </div>
                            <div class="film-content">
                                <div class="film-header">
                                    <a class="film-name" href={"/"} > Avatar 2 </a>
                                    <div class="film-year"> 2023 </div>
                                </div>
                                <div class="film-desc">
                                    Directed By
                                    <div class="film-director"> Some Guy </div>
                                </div>
                            </div>
                        </div>
                        <div class="element-container">
                            <div class="film-image-container">
                                <img class="film-image" src={"https://image.tmdb.org/t/p/original"} alt="image" />
                            </div>
                            <div class="film-content">
                                <div class="film-header">
                                    <a class="film-name" href={"/"} > Godzilla minus 1 </a>
                                    <div class="film-year"> 2023 </div>
                                </div>
                                <div class="film-desc">
                                    Directed By
                                    <div class="film-director"> Some Other Guy </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default OngoingMovies
