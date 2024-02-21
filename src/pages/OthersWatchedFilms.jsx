import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/WatchedFilms.css"
import axios from 'axios'
import { useParams } from 'react-router'
import Loader from '../components/Loader'

const OthersWatchedFilms = () => {

    const user = useAppSelector((state) => state.user)
    const { username } = useParams()

    const [thisUserData, setThisUserData] = useState({})
    const [loading, setLoading] = useState(true)

    const getUserData = async () => {
        setLoading(true)
        const res = await axios.post("http://localhost:3500/user/getuser", {
            username: username
        })
            .then((data) => {
                const userData = data.data
                setThisUserData(userData)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        document.title = "Watched Films"
        getUserData()
    }, [, user])

    return (
        <>
            {loading ?
                <>
                    <Loader />
                </>
                :
                <div class="wfmain">
                    <Navbar />
                    <div class="wf-main">
                        <div class="wfheader">
                            <div> {thisUserData?.user?.username}'s watched films</div>
                            {/* <label class="switch">
                        <input type="checkbox" class="grid-num-control" autocomplete="off" onclick="changeGridLayout()"
                            id="grid-checkbox" />
                        <span class="slider round"></span>
                    </label> */}
                        </div>
                        <div class="wfgrid-container" id="wfgrid-container">
                            {thisUserData?.user?.watched?.map((film) => (
                                <div key={film.id} className="wfgrid-img-container">
                                    <div className="wfgrid-img-elements">
                                        <a href={`/film/${film.id}`}>
                                            <img
                                                className="wfgrid-img"
                                                src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                                                alt="image"
                                            />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    )
}

export default OthersWatchedFilms