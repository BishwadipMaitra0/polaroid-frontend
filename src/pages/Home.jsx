import React, { useEffect, useState } from 'react'
import "../styles/Home.css"
import { useAppSelector } from '../app/hooks'
import getTrendingMovies from "../api/getTrendingMovies"
import getNowPlaying from "../api/getNowPlaying"
import getUpcoming from "../api/getUpcoming"
import getTrendingThisWeek from "../api/getTrendingThisWeek"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {

    const [latest, setLatest] = useState()
    const [nowPlaying, setNowPlaying] = useState()
    const [upcomingData, setUpcomingData] = useState()
    const [popularThisWeek, setPopularThisWeek] = useState()
    const [loading, setLoading] = useState(true)

    const user = useAppSelector((state) => state.user)

    const fetchData = async () => {
        setLoading(true)

        const latestData = await getTrendingMovies()
        setLatest(latestData.results)
        console.log(latestData.results)

        const nowPlayingData = await getNowPlaying()
        setNowPlaying(nowPlayingData.results)

        const upcomingData = await getUpcoming()
        setUpcomingData(upcomingData.results)

        const popularThisWeekData = await getTrendingThisWeek()
        setPopularThisWeek(popularThisWeekData.results)

        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Navbar />

            {loading ? <></> : 

            <div class="body">

            <div class="backdrop-image-container">
                <div class="backdrop-image"></div>
            </div>
            <h2 class="headline">
                Track films you've watched.
                <br />
                Save those you want to see.
                <br />
                Tell your friends what's good.
            </h2>
            {!user.isLoggedIn &&
                <button type="button" class="getstarted-button" onClick="location.href='/user/register'">
                    <div>get started &mdash; it's free!</div>
                </button>
            }
            <div class="top-text-div">
                The social network for film lovers.
                {!user.isLoggedIn &&
                    <>
                        Already a member?
                        <a href="/user/login">Sign in</a>
                    </>
                }
            </div>
            <div class="grid-container1" id="header-list">
                <div class="grid-img-container1"> <a href={"/film/" + latest[0].id}  > <img class="grid-img1" src={"https://image.tmdb.org/t/p/original/" + latest[0].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container1"> <a href={"/film/" + latest[1].id}  > <img class="grid-img1" src={"https://image.tmdb.org/t/p/original/" + latest[1].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container1"> <a href={"/film/" + latest[2].id}  > <img class="grid-img1" src={"https://image.tmdb.org/t/p/original/" + latest[2].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container1"> <a href={"/film/" + latest[3].id}  > <img class="grid-img1" src={"https://image.tmdb.org/t/p/original/" + latest[3].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container1"> <a href={"/film/" + latest[4].id}  > <img class="grid-img1" src={"https://image.tmdb.org/t/p/original/" + latest[4].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container1"> <a href={"/film/" + latest[5].id}  > <img class="grid-img1" src={"https://image.tmdb.org/t/p/original/" + latest[5].poster_path} alt="image" /> </a> </div>
            </div>

            <div class="feature-container">
                <div class="feature-tag-line-container">
                    <h2 class="feature-tag-line">polaroid lets you...</h2>
                </div>
                <div class="feature-elements-container">
                    <div class="element element1">
                        <div class="element-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                        </div>
                        <div class="elementfeature-description">
                            <div>
                                Keep track of every flim you've ever watched
                                (or just start from the day you join)
                            </div>
                        </div>
                    </div>
                    <div class="element element2">
                        <div class="element-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>
                        </div>
                        <div class="elementfeature-description">
                            <div>
                                Show some love for your favorite films,
                                lists and reviews with a “like”
                            </div>
                        </div>
                    </div>
                    <div class="element element3">
                        <div class="element-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-list-columns-reverse" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z" />
                            </svg>
                        </div>
                        <div class="elementfeature-description">
                            <div>
                                Write and share reviews, and follow friends
                                and other members to read theirs
                            </div>
                        </div>
                    </div>
                    <div class="element element1">
                        <div class="element-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </div>
                        <div class="elementfeature-description">
                            <div>
                                Rate each film on a five-star scale (with halves)
                                to record and share your reaction
                            </div>
                        </div>
                    </div>
                    <div class="element element2">
                        <div class="element-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-calendar-fill" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </div>
                        <div class="elementfeature-description">
                            <div>
                                Keep a diary of your film watching (and upgrade to
                                <strong>Pro</strong> for comprehensive stats)
                            </div>
                        </div>
                    </div>
                    <div class="element element3">
                        <div class="element-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-grid-fill" viewBox="0 0 16 16">
                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                            </svg>
                        </div>
                        <div class="elementfeature-description">
                            <div>
                                Compile and share lists of films on any topic and
                                keep a watchlist of films to see
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header">in theatres</div>
            <div class="grid-container">
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[0].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[0].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[1].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[1].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[2].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[2].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[3].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[3].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[4].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[4].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[5].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[5].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[6].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[6].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[7].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[7].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[8].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[8].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[9].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[9].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[10].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[10].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container2"> <a href={"/film/" + nowPlaying[11].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + nowPlaying[11].poster_path} alt="image" /> </a> </div>
            </div>
            <div class="header">upcoming</div>
            <div class="grid-container">
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[0].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[0].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[1].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[1].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[2].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[2].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[3].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[3].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[4].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[4].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[5].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[5].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[6].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[6].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[7].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[7].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[8].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[8].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[9].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[9].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[10].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[10].poster_path} alt="image" /> </a> </div>
                <div class="grid-img-container3"> <a href={"/film/" + upcomingData[11].id} > <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + upcomingData[11].poster_path} alt="image" /> </a> </div>
            </div>
            <div class="">
                <h2 class="mid-header">
                    Write and share reviews. Compile your own lists.
                    Share your life in film.
                </h2>
                <div class="mid-description">
                    Below are some popular reviews and lists from this week.
                </div>
                <div class="mid-description">
                    {!user.isLoggedIn &&
                        <>
                            <a href="register.html">Sign up</a>&nbsp; to create your own.
                        </>
                    }
                </div>
            </div>
            <div class="section-heading">
                <div>popular this week</div>
                <a href="/films">more</a>
            </div>
            {/* // <% for( let index = 0; index < 3; index++ ) { %> */}
            <div class="element-container">
                <div class="film-image-container">
                    <img class="film-image" src={"https://image.tmdb.org/t/p/original/" + popularThisWeek[0].poster_path} alt="image" />
                </div>
                <div class="film-content">
                    <div class="film-header">
                        <a class="film-name" href={'/film/' + popularThisWeek[0].id} > {popularThisWeek[0].title} </a>
                        <div class="film-year"> {popularThisWeek[0].release_date.slice(0, 4)} </div>
                    </div>
                    <div class="film-desc">
                        Directed by
                        <div class="film-director"> {popularThisWeek.directors[0]} </div>
                    </div>
                </div>
            </div>

            <div class="element-container">
                <div class="film-image-container">
                    <img class="film-image" src={"https://image.tmdb.org/t/p/original/" + popularThisWeek[1].poster_path} alt="image" />
                </div>
                <div class="film-content">
                    <div class="film-header">
                        <a class="film-name" href={'/film/' + popularThisWeek[1].id} > {popularThisWeek[1].title} </a>
                        <div class="film-year"> {popularThisWeek[1].release_date.slice(0, 4)} </div>
                    </div>
                    <div class="film-desc">
                        Directed by
                        <div class="film-director"> {popularThisWeek.directors[1]} </div>
                    </div>
                </div>
            </div>

            <div class="element-container">
                <div class="film-image-container">
                    <img class="film-image" src={"https://image.tmdb.org/t/p/original/" + popularThisWeek[2].poster_path} alt="image" />
                </div>
                <div class="film-content">
                    <div class="film-header">
                        <a class="film-name" href={'/film/' + popularThisWeek[2].id} > {popularThisWeek[2].title} </a>
                        <div class="film-year"> {popularThisWeek[2].release_date.slice(0, 4)} </div>
                    </div>
                    <div class="film-desc">
                        Directed by
                        <div class="film-director"> {popularThisWeek.directors[2]} </div>
                    </div>
                </div>
            </div>
            {/* <% } %> */}

            </div>

            }
            <Footer />
        </>
    )
}

export default Home