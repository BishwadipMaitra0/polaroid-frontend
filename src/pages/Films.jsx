import "../styles/Films.css"
import React, { useEffect, useState } from 'react'
import getTrendingMovies from "../api/getTrendingMovies"
import getNowPlaying from "../api/getNowPlaying"
import getUpcoming from "../api/getUpcoming"
import getTrendingThisWeek from "../api/getTrendingThisWeek"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'

const Films = () => {

  const [latest, setLatest] = useState()
  const [nowPlaying, setNowPlaying] = useState()
  const [upcomingData, setUpcomingData] = useState()
  const [popularThisWeek, setPopularThisWeek] = useState()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)

    const latestData = await getTrendingMovies()
    setLatest(latestData.results)
    console.log(latestData.results)

    const nowPlayingData = await getNowPlaying()
    setNowPlaying(nowPlayingData.results)

    const upcoming_Data = await getUpcoming()
    setUpcomingData(upcoming_Data.results)
    console.log(upcoming_Data.results)

    const popularThisWeekData = await getTrendingThisWeek()
    setPopularThisWeek(popularThisWeekData.results)

    setLoading(false)
  }

  useEffect(() => {
    document.title = "Films"
    fetchData()
  }, [])

  // const upcomingDataDisplay = upcomingData.map((item) =>
  //   <a href={"/film/" + item.id}> <img class="grid-img" src={"https://image.tmdb.org/t/p/original" + item.poster_path} alt="image" /> </a>
  // )

  return (
    <>
      {loading ?
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Loader />
        </div>
        :
        <>
          <Navbar />
          <div class="films_body">
            <div class="films_header">
              <div>films</div>
            </div>
            <div class="header-bar"> Explore to your heart's content </div>

            <div class="grid-container-films" id="grid-container">


              {upcomingData.map((item) =>
                <div class="grid-img-container"> <a href={"/film/" + item.id}> <img class="grid-img" src={"https://image.tmdb.org/t/p/original" + item.poster_path} alt="image" /> </a> </div>
              )}

              {latest.map((item) =>
                <div class="grid-img-container"> <a href={"/film/" + item.id}> <img class="grid-img" src={"https://image.tmdb.org/t/p/original" + item.poster_path} alt="image" /> </a> </div>
              )}

              {nowPlaying.map((item) =>
                <div class="grid-img-container"> <a href={"/film/" + item.id}> <img class="grid-img" src={"https://image.tmdb.org/t/p/original" + item.poster_path} alt="image" /> </a> </div>
              )}

            </div>
          </div >
          <Footer />
        </>
      }
    </>
  )
}

export default Films