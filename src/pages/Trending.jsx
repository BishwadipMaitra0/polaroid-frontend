import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Loader from '../components/Loader'
import "../styles/ListPage.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import getTrendingMovies from '../api/getTrendingMovies'
import getTrendingThisWeek from '../api/getTrendingThisWeek'

const Trending = ({ duration }) => {
    const navigate = useNavigate()

    const [listData, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        const data = duration==='day' ? await getTrendingMovies() : await getTrendingThisWeek()
        setData(data)
    }

    useEffect(() => {
        fetchData()
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
                                {duration==='week' ? "trending this week" : "trending today"}
                            </div>
                            <div class="listpage_div-time-since-update">
                                Updated 6h ago
                            </div>
                            <div class="listpage_div-list-tagline">
                                {duration==='week' ? "Movies Most Popular This Week" : "Movies Most Popular Today"}
                            </div>
                            <div class="listpage_div-list-description">
                                <>
                                    Discover the top, most popular movies available now!<br />
                                    Across theaters, streaming, and on-demand, these are the movies Polaroid users are checking out at this very moment.<br />
                                    We hope you will enjoy your time watching the movies.
                                </>
                            </div>
                        </div>
                        <div class="listpage_grid-container" id="listpage_grid-container">
                            {listData?.results?.map((item, index) =>
                                <div class="listpage_grid-img-container"> <a href={"/film/" + listData?.results[index].id}> <img class="listpage_grid-img" src={"https://image.tmdb.org/t/p/original" + listData?.results[index].poster_path} alt="image" /> </a></div>
                            )}
                        </div>
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default Trending