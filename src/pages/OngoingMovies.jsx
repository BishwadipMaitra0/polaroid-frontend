import React, { useState, useEffect } from 'react'
import "../styles/Search.css"
import "../styles/Ongoing.css"
import axios from 'axios'
import getMovieById from '../api/getMovieById'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router'
import Loader from '../components/Loader'

const OngoingMovies = () => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchData = async () => {
        setLoading(true)
        axios.get("https://polaroid-backend.onrender.com/ongoingshows")
            .then(async (data) => {
                console.log(data.data)
                for (let i = 0; i < data.data.length; i++) {
                    let movieIdData = await getMovieById(data.data[i])
                    console.log(movieIdData)
                    data.data[i] = {
                        movieId: data.data[i],
                        poster_path: movieIdData.poster_path,
                        director: movieIdData.director,
                        title: movieIdData.title,
                        year: movieIdData.release_date.slice(0, 4)
                    }
                }

                setMovies(data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Navbar />
            {loading ?
                <>
                    <Loader />
                </>
                :
                <div class="searchpage_main_container">
                    <div class="main_searchpage">
                        <div class="ongoing-header">
                            <div class="header-description">Ongoing Films</div>
                        </div>
                        {movies.map((movie, index) =>
                            <div class="ongoing-element-container">
                            	<div class="ongoing-content-container">
                                <div class="film-image-container">
                                    <img class="film-image" src={"https://image.tmdb.org/t/p/original" + movie.poster_path} alt="image" />
                                </div>
                                <div class="film-content">
                                    <div class="film-header">
                                        <a class="ongoing-film-name" onClick={() => navigate(`/film/${movie.movieId}`)} > {movie.title} </a>
                                        <div class="film-year"> {movie.year} </div>
                                    </div>
                                    <div class="film-desc">
                                        Directed By
                                        <div class="film-director"> {movie.director} </div>
                                    </div>
                                </div>
                                </div>
                                <div class="ongoing-button-container">
                                    <button type="button" class="ongoing-button ongoing-book-button" onClick={() => navigate(`/theater_selection/${movie.movieId}`)}>Book Now</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default OngoingMovies
