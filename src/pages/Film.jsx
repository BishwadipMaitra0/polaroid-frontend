import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import getMovieById from "../api/getMovieById"
import getMovieCredits from "../api/getMovieCredits"
import getWatchProviders from "../api/getWatchProviders"
import getSimilarMovies from "../api/getSimilarMovies"
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Loader from '../components/Loader'
import axios from 'axios'
import "../styles/Film.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router'
import { fetchUserDetails } from '../features/userSlice'

const Film = () => {

    const navigate = useNavigate()

    const { id } = useParams()
    const [isLoading, setLoading] = useState(true)
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const [data, setData] = useState()
    const [cast, setCast] = useState()
    const [watchProviders, setWatchProviders] = useState()
    const [reviews, setReviews] = useState()
    const [errorReview, setErrorReview] = useState("")
    const [similar, setSimilar] = useState()
    const [lists, setLists] = useState([])
    const [isFavourite, setIsFavourite] = useState(false)
    const [isWatched, setIsWatched] = useState(false)
    const [isWatchlist, setIsWatchlist] = useState(false)
    const [moviename, setMoviename] = useState("")

    const [stars, setStars] = useState(0)
    const [review, setReview] = useState("")

    const getData = async () => {
        setLoading(true)
        const movieData = await getMovieById(id)

        console.log(movieData)
        setData(movieData)

        const cast = await getMovieCredits(id)
        setCast(cast)

        const watch = await getWatchProviders(id)
        setWatchProviders(watch.results.IN)

        const similar = await getSimilarMovies(id)
        setSimilar(similar)

        const reviews = await axios.get(`https://polaroid-backend.onrender.com/filmreviews/${id}`)
        console.log(reviews)
        setReviews(reviews.data)

        console.log(user.data.isLoggedIn)

        if (user.data.isLoggedIn) {
            const listsData = await axios.post(`https://polaroid-backend.onrender.com/getmylists`, {
                username: user.data.username
            })
            await listsData.data
            console.log(listsData.data)
            setLists(listsData.data)

            for (let i = 0; i < user?.data?.favourites?.length; i++) {
                if (user.data.favourites[i].id === id) {
                    setIsFavourite(true)
                }
            }

            for (let i = 0; i < user?.data?.planToWatch?.length; i++) {
                if (user.data.planToWatch[i].id === id) {
                    setIsWatchlist(true)
                }
            }

            for (let i = 0; i < user?.data?.watched?.length; i++) {
                if (user.data.watched[i].id === id) {
                    setIsWatched(true)
                }
            }
        }

        setLoading(false)

        setMoviename(() => movieData.title)
    }

    const addToFavs = async () => {
        try {
            const res = await axios.post(`https://polaroid-backend.onrender.com/addtofavs/${id}`, {
                email: user.data.email
            })
            await res.data
            console.log(res)

            if (res.status < 400) {
                setIsFavourite(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const removeFromFavs = async () => {
        try {
            const res = await axios.post(`https://polaroid-backend.onrender.com/removefromfavs/${id}`, {
                email: user.data.email
            })
            await res.data
            console.log(res)

            if (res.status < 400) {
                setIsFavourite(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addToWatchlist = async () => {
        try {
            const res = await axios.post(`https://polaroid-backend.onrender.com/addtowatchlist/${id}`, {
                email: user.data.email
            })
            await res.data
            console.log(res)

            if (res.status < 400) {
                setIsWatchlist(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const removeFromWatchlist = async () => {
        try {
            const res = await axios.post(`https://polaroid-backend.onrender.com/removefromwatchlist/${id}`, {
                email: user.data.email
            })
            await res.data
            console.log(res)

            if (res.status < 400) {
                setIsWatchlist(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addToWatched = async () => {
        try {
            const res = await axios.post(`https://polaroid-backend.onrender.com/addtowatched/${id}`, {
                email: user.data.email
            })
            await res.data
            console.log(res)

            if (res.status < 400) {
                setIsWatched(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const removeFromWatched = async () => {
        try {
            const res = await axios.post(`https://polaroid-backend.onrender.com/removefromwatched/${id}`, {
                email: user.data.email
            })
            await res.data
            console.log(res)

            if (res.status < 400) {
                setIsWatched(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addToList = async (listName) => {
        console.log(listName)

        try {
            const res = await axios.post("https://polaroid-backend.onrender.com/user/addtolist", {
                listItem: id,
                listName: listName
            })
            await res.data

            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
        // document.title = `${moviename}`
    }, [, user])

    useEffect(() => {
        document.title = `${moviename}`
    }, [, moviename])

    const submitReview = async (e) => {
        e.preventDefault()
        const res = await axios.post(`https://polaroid-backend.onrender.com/film/${id}`, {
            rating: stars,
            body: review
        })
            .then((data) => {
                console.log(data)
                console.log("Review done!!")
            })
            .catch((data) => {
                console.log(data)
                setErrorReview(data.response.data.error)
            })
    }

    return (
        !isLoading ?
            <>
                <Navbar />
                <div class="film_film-page">
                    {data.backdrop_path ?
                        <div class="image">
                            <div className="inner-image" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${data.backdrop_path}')` }}></div>
                        </div>
                        :
                        <></>
                    }
                    <div class="main_filmpage">
                        <div class="movieheading">
                            <h1 class="moviename">
                                {data.title}
                            </h1>
                            <p class="year">
                                {data.release_date.slice(0, 4)}
                            </p>
                            <p class="directedBy">
                                Directed by {data.director}
                            </p>
                        </div>
                        <div class="content_filmpage">
                            <div class="wheretowatch">
                                <div class="wtw-poster">
                                    <img width="100%" src={"https://image.tmdb.org/t/p/original" + data.poster_path} />
                                </div>
                                <table>
                                    <tr>
                                        <td>
                                            <div class="wtw">
                                                <div class="wtw-left">
                                                    WHERE TO WATCH
                                                </div>
                                                <div class="wtw-right">
                                                    Trailer
                                                    <img src="/assets/movie.png" height="16px" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {watchProviders && watchProviders.buy ?
                                        watchProviders.buy.map((item, index) =>
                                            <tr>
                                                <td>
                                                    <a>
                                                        <img src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} height="16px" />
                                                        {item.provider_name}
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <></>
                                    }
                                    {!watchProviders ?
                                        <tr>
                                            <td>
                                                --None--
                                            </td>
                                        </tr>
                                        :
                                        <>
                                        </>
                                    }
                                </table>
                            </div>
                            <div class="centre">
                                <p class="catchphrase">
                                    {data.tagline.toUpperCase()}
                                </p>
                                <p class="description">
                                    {data.overview}
                                </p>
                                <p class="genres">
                                    GENRES
                                </p>
                                <div class="castDiv">
                                    {data && data.genres.slice(0, 10).map((genre, index) =>
                                        <div key={index} className="castBlock">
                                            {genre.name}
                                        </div>
                                    )}
                                </div>
                                <p class="genres">
                                    CAST
                                </p>
                                <div class="castDiv">
                                    {cast.cast.slice(0, 10).map((actor, index) => (
                                        <div key={index} className="castBlock">
                                            {actor.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div class="right-side">
                                {user.data.isLoggedIn ?
                                    <>
                                        <div class="add-to-fav">
                                            <div class="add-to-fav-title">Add to favorites:</div>
                                            <div class="add-to-fav-icon">
                                                {!isFavourite ?
                                                    <button type="button" onClick={() => addToFavs()}>
                                                        {/* <a href={"/addtofavs/" + data.id} > */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="IndianRed" class="bi bi-suit-heart" viewBox="0 0 16 16">
                                                            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                                                        </svg>
                                                        {/* </a> */}
                                                    </button>
                                                    // <% } %>
                                                    :
                                                    <button type="button" onClick={() => removeFromFavs()}>
                                                        {/* <a href={"/removefromfavs/" + data.id}> */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="IndianRed" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                                        </svg>
                                                        {/* </a> */}
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        <div class="add-to-fav">
                                            <div class="add-to-fav-title">Add to watchlist:</div>
                                            <div class="add-to-fav-icon">
                                                {!isWatchlist ?
                                                    <button type="button" onClick={() => addToWatchlist()}>
                                                        {/* <a href={'/addtowatchlist/' + data.id}> */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="whitesmoke" class="bi bi-calendar" viewBox="0 0 16 16">
                                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                                        </svg>
                                                        {/* </a> */}
                                                    </button>
                                                    :
                                                    <button type="button" onClick={() => removeFromWatchlist()}>
                                                        {/* <a href={'/removefromwatchlist/' + data.id}> */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="wheat" class="bi bi-calendar-check-fill" viewBox="0 0 16 16">
                                                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                                        </svg>
                                                        {/* </a> */}
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        <div class="add-to-fav">
                                            <div class="add-to-fav-title">Watched:</div>
                                            <div class="add-to-fav-icon">
                                                {!isWatched ?
                                                    <button type="button" onClick={() => addToWatched()}>
                                                        {/* <a href={'/addtowatched/' + data.id}> */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="DimGrey" class="bi bi-toggle-off" viewBox="0 0 16 16">
                                                            <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" />
                                                        </svg>
                                                        {/* </a> */}
                                                    </button>
                                                    :
                                                    <button type="button" onClick={() => removeFromWatched()}>
                                                        {/* <a href={'/removefromwatched/' + data.id}> */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="DodgerBlue" class="bi bi-toggle-on" viewBox="0 0 16 16">
                                                            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                                                        </svg>
                                                        {/* </a> */}
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        <div class="add-to-list-section">
                                            <label for="add-to-list">Add to List&nbsp;:</label>
                                            <select id="add-to-list" class="list-selector" autocomplete="off"
                                                oninvalid="this.setCustomValidity('Please select a date')"
                                                oninput="this.setCustomValidity('')"
                                                onchange="location = this.value;">
                                                <option value="">--Select a list--</option>
                                                {lists.map((item, index) =>
                                                    <option value="" onClick={() => addToList(item.listName)}>  {item.listName} </option>
                                                )}
                                            </select>
                                        </div>
                                    </>
                                    :
                                    <></>
                                }
                                {!user.data.isLoggedIn ?
                                    <a href="/user/login">
                                        <button class="sign-in">
                                            Sign in to rate or review
                                        </button>
                                    </a>
                                    :
                                    <></>
                                }
                                {/* {user.data.isLoggedIn ?
                                    <button class="bookTickets" onClick={navigate('/booking')}>
                                        Book Tickets
                                    </button>
                                    :
                                    <></>
                                } */}
                                <p class="genres" style={{ marginBottom: "25px" }}>
                                    RATING
                                </p>
                                {reviews !== undefined && reviews.avg === undefined ?
                                    <p class="notReviewed">
                                        This movie has not been rated yet!
                                    </p>
                                    :
                                    <p class="ratingAns">
                                        {reviews !== undefined && reviews.avg} &nbsp;⭐
                                    </p>
                                }
                            </div>
                        </div>
                        <div class="bottom-content">
                            <div></div>
                            <div class="rightBottom">
                                <p class="genres">
                                    RECENT REVIEWS
                                </p>
                                <p class="reviewComment">
                                    {reviews !== undefined && reviews.comment}
                                </p>
                                {reviews.reviews.map((item, index) =>
                                    <>
                                        <div class="review-header">
                                            <div class="reviewName">
                                                Review by
                                                <a class="profileLink" href={'/profile/' + item.username.split(" ").join("%20")}>
                                                    <span class="reviewN">
                                                        {item.username}
                                                    </span>
                                                </a>
                                                <span class="starsReview">
                                                    {item.stars} ⭐
                                                </span>
                                            </div>
                                        </div>

                                        <p class="reviewMain">
                                            {item.body}
                                        </p>
                                    </>
                                )
                                }
                                {user.data.isLoggedIn ?
                                    <form class="addReview" onSubmit={submitReview}>
                                        <p class="reviewAdd">Add your review: </p>
                                        <div class="star-rating">
                                            <input type="radio" id="5-stars" name="rating" value="5" onClick={() => setStars(5)} required />
                                            <label for="5-stars" class="star">&#9733;</label>
                                            <input type="radio" id="4-stars" name="rating" value="4" onClick={() => setStars(4)} />
                                            <label for="4-stars" class="star">&#9733;</label>
                                            <input type="radio" id="3-stars" name="rating" value="3" onClick={() => setStars(3)} />
                                            <label for="3-stars" class="star">&#9733;</label>
                                            <input type="radio" id="2-stars" name="rating" value="2" onClick={() => setStars(2)} />
                                            <label for="2-stars" class="star">&#9733;</label>
                                            <input type="radio" id="1-star" name="rating" value="1" onClick={() => setStars(1)} />
                                            <label for="1-star" class="star">&#9733;</label>
                                        </div>
                                        <textarea name="body" onChange={(e) => setReview(e.target.value)} value={review} rows="7" class="inputReview" required autocomplete="off"></textarea>
                                        <button type="submit" class="submitReview btn btn-outline-info" onClick={submitReview}>Submit Review</button>
                                        <p class="errorReview">
                                            {errorReview}
                                        </p>
                                    </form>
                                    :
                                    <>
                                    </>
                                }
                            </div>
                        </div>
                        <div class="bottom-content">
                            <div></div>
                            <div class="rightBottom">
                                <p class="genres">
                                    RELATED FILMS
                                </p>
                                <div class="relFilms">
                                    {similar.results.slice(0, Math.min(similar.results.length, 10)).map((item, index) => (
                                        <img
                                            key={index}
                                            onClick={() => { window.location.href = `/film/${item.id}`; }}
                                            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                                            width="18%"
                                            height="auto"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
            :
            <Loader />
    )
}

export default Film