import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/WatchedFilms.css"
import axios from 'axios'
import { fetchUserDetails } from '../features/userSlice'
import { useNavigate } from 'react-router'

const Watchlist = ({ editable }) => {

    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const removedFromWatchlist = async (e, id) => {
        e.preventDefault()
        console.log(user.data.email)
        try {
            const res = await axios.post(`http://localhost:3500/user/watchlistdelete/${id}`, {
                email: user.data.email
            })
            const resData = await res.data

            console.log(resData)
        }
        catch (err) {
            console.log(err)
        }
        dispatch(fetchUserDetails({}))
    }

    useEffect(() => {
        document.title = "Watchlist"
    }, [, user])

    useEffect(() =>{
        dispatch(fetchUserDetails({}))
        if (!user.isLoggedIn) navigate('/user/login')
    }, [])

    return (
        <div class="wfmain">
            <Navbar />
            <div class="wf-main">
                <div class="wfheader">
                    <div> {user?.data?.username}'s watchlist</div>
                    {/* <label class="switch">
                        <input type="checkbox" class="grid-num-control" autocomplete="off" onclick="changeGridLayout()"
                            id="grid-checkbox" />
                        <span class="slider round"></span>
                    </label> */}
                </div>
                <div class="wfgrid-container" id="wfgrid-container">
                    {user?.data?.planToWatch?.map((film) => (
                        <div key={film.id} className="wfgrid-img-container">
                            <div className="wfgrid-img-elements">
                                <a href={`/film/${film.id}`}>
                                    <img
                                        className="wfgrid-img"
                                        src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                                        alt="image"
                                    />
                                </a>
                                {editable && (
                                    <form onSubmit={(e) => removedFromWatchlist(e, film.id)}>
                                        <button type="submit" className="wfdelete-film-button">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                fill="#456"
                                                className="bi bi-trash-fill delete-film-button-icon"
                                                viewBox="0 0 16 16"
                                                opacity="0.8"
                                            >
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Watchlist