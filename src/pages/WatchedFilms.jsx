import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/WatchedFilms.css"
import axios from 'axios'

const WatchedFilms = ({ editable }) => {

    const user = useAppSelector((state) => state.user)

    const removedFromWatched = async (id) => {
        const res = await axios.post(`http://localhost:3500/user/watched/${id}`, {
            email: user?.data?.email
        })
        const resData = await res.data
    }

    useEffect(() => {
        document.title = "Watched Films"
    }, [, user])

    return (
        <div class="wfmain">
            <Navbar />
            <div class="wf-main">
                <div class="wfheader">
                    <div> {user?.data?.username}'s watched films</div>
                    {/* <label class="switch">
                        <input type="checkbox" class="grid-num-control" autocomplete="off" onclick="changeGridLayout()"
                            id="grid-checkbox" />
                        <span class="slider round"></span>
                    </label> */}
                </div>
                <div class="wfgrid-container" id="wfgrid-container">
                    {user?.data?.watched?.map((film) => (
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
                                    <form>
                                        <button type="submit" className="wfdelete-film-button" onClick={() => removedFromWatched(film.id)}>
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

export default WatchedFilms