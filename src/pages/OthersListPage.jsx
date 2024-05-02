import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAppSelector } from '../app/hooks'
import Loader from '../components/Loader'
import "../styles/ListPage.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const OthersListPage = ({ isTrending }) => {

    const { username, listName } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const getListData = async () => {
        setLoading(true)
        const res = await axios.get(`https://polaroid-backend.onrender.com/list/${username}/${listName}`)
            .then((data) => {
                console.log(data.data)
                setData(data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        document.title = `${username}'s "${listName}" Page`
        getListData()
    }, [])

    return (
        <>
            {loading ?
                <>
                    <Loader />
                </>
                :
                <>
                    <Navbar />
                    <div class="listpage_main">
                        <div class="listpage_meta-data">
                            <div class="listpage_div-classifier">
                                {"created by " + username}
                            </div>
                            <div class="listpage_div-time-since-update">
                                {data?.createdAt}
                            </div>
                            <div class="listpage_div-list-tagline">
                                {data?.listName}
                            </div>
                            <div class="listpage_div-list-description">
                                {isTrending ?
                                    <>
                                        Discover the top, most popular movies available now!<br />
                                        Across theaters, streaming, and on-demand, these are the movies Polaroid users are checking out at this very moment.<br />
                                        We hope you will enjoy your time watching the movies.
                                    </>
                                    :
                                    <>
                                        {data?.description}
                                    </>
                                }
                            </div>
                        </div>
                        {isTrending ?
                            <div class="listpage_grid-container" id="listpage_grid-container">
                                {data?.results?.map((item, index) =>
                                    <div class="listpage_grid-img-container"> <a href={"/film/" + data?.results[index].id}> <img class="listpage_grid-img" src={"https://image.tmdb.org/t/p/original" + data?.results[index].poster_path} alt="image" /> </a></div>
                                )}
                            </div>
                            :
                            <div class="listpage_grid-container" id="listpage_grid-container">
                                {data?.items?.map((item, index) =>
                                    <div class="listpage_grid-img-container">
                                        <div class="listpage_grid-img-elements">
                                            <div class="listpage_grid-img-container"> <a href={"/film/" + data?.items[index].id}> <img class="listpage_grid-img" src={"https://image.tmdb.org/t/p/original" + data?.items[index].poster_path} alt="image" /> </a></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default OthersListPage