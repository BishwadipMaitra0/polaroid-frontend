import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import axios from 'axios'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/Profile.css"
import { useNavigate, useParams } from 'react-router'

const OthersProfile = ({ currentUser }) => {

    const { username } = useParams()

    const user = useAppSelector((state) => state.user)
    const navigate = useNavigate()

    const [thisUserData, setThisUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [listLength, setListLength] = useState(0)
    const [followingThisUser, setFollowingThisUser] = useState(false)

    const getUserData = async () => {
        setLoading(true)
        const res = await axios.post("http://localhost:3500/user/getuser", {
            username: username
        })
            .then((data) => {
                const userData = data.data
                for (let i=0; i<userData?.user?.followers?.length; i++) {
                    if (userData?.user?.followers[i] === user?.data?.email) {
                        setFollowingThisUser(true)
                        break
                    }
                }
                setThisUserData(userData)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const followHandler = async () => {
        if (!user.isLoggedIn) {
            navigate('/user/login')
        }

        let res
        if (followingThisUser) {
            res  = await axios.post(`http://localhost:3500/profile/unfollow/${username}`)
            setFollowingThisUser(false)
        }
        else {
            res = await axios.post(`http://localhost:3500/profile/follow/${username}`)
            setFollowingThisUser(true)
        }
        console.log(res.data)
    }

    const checkIfMe = () => {
        if (user.data.username === username) {
            navigate('/user/profile')
        }
    }

    useEffect(() => {
        checkIfMe()
        getUserData()
    }, [, user])

    useEffect(() => {

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
                    <div class="profile_main-div">
                        <div class="main_profilepage">
                            <div class="profile-header">
                                <div class="profile-data">
                                    <img src="/assets/cat.jpg" height="100px" class="dp" />
                                    <div class="profile-metadata">
                                        <div class="profile-name"> {username} </div>
                                        {!currentUser ?
                                            <button class="followButton" onClick={followHandler}> {followingThisUser ? "FOLLOWING ✅" : "FOLLOW"} </button>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                                <div class="profile-social-metadata">
                                    <div class="social-component">
                                        <div class="social-component-counter">  {user?.data?.watched?.length} </div>
                                        <a href={`/watchedfilms/${username}`} class="social-component-name">films</a>
                                    </div>
                                    <div class="social-component">
                                        <div class="social-component-counter"> {listLength} </div>
                                        <a href={`/lists/${username}`} class="social-component-name">lists</a>
                                    </div>
                                    <div class="social-component">
                                        <div class="social-component-counter"> {user?.data?.following?.length} </div>
                                        <a href={"/following/" + username} class="social-component-name">following</a>
                                    </div>
                                    <div class="social-component">
                                        <div class="social-component-counter"> {user?.data?.followers?.length} </div>
                                        <a href={"/followers/" + username} class="social-component-name">followers</a>
                                    </div>
                                </div>
                            </div>
                            <div class="select-section">
                                <div class="profile_nav-link">
                                    <a href={"/profile/"+username} class="section-name  active">profile</a>
                                </div>
                                <div class="profile_nav-link">
                                    <a href={"/watchedfilms/"+username} class="section-name">watched films</a>
                                </div>
                                <div class="profile_nav-link">
                                    <a href={"/watchlist/"+username} class="section-name">watchlist</a>
                                </div>
                                <div class="profile_nav-link">
                                    <a href={"/lists/"+username} class="section-name">lists</a>
                                </div>
                                <div class="profile_nav-link">
                                    <a href={"/followers/"+username} class="section-name">network</a>
                                </div>
                            </div>

                            <div class="profile_section-heading">favorite films</div>
                            {thisUserData?.user?.favourites?.length === 0 ?
                                <p style={{ color: "white" }}>No favourites added yet!</p>
                                :
                                <></>
                            }
                            <div class="profile_grid-container">
                                {/* <% for (let i=0; i<data.favourites.length; i++) { %> */}
                                {thisUserData?.user?.favourites?.map((item) => (
                                    <div className="grid-img-container" key={item.id}>
                                        <a href={`/film/${item.id}`}>
                                            <img
                                                className="grid-img"
                                                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                                alt="image"
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div class="profile_section-heading">recently watched</div>
                            {/* <% if (data.watched.length===0) { %> */}
                            {thisUserData?.user?.watched?.length === 0 ?
                                <p style={{ color: "white" }}>No movies added to watched yet!</p>
                                :
                                <></>
                            }
                            {/* <% } %> */}
                            <div class="profile_grid-container">
                                {/* <% for (let i=0; i<Math.min(data.watched.length, 6); i++) { %>
      <div class="grid-img-container"> <a href=<%= "/film/"+data.watched[i].id %>> <img class="grid-img" src=<%= "https://image.tmdb.org/t/p/original/"+data.watched[i].poster_path %> alt="image"> </a> </div>
    <% } %> */}
                                {thisUserData?.user?.watched?.slice(0, Math.min(thisUserData?.user?.watched?.length, 6)).map((item) => (
                                    <div className="grid-img-container" key={item.id}>
                                        <a href={`/film/${item.id}`}>
                                            <img
                                                className="grid-img"
                                                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                                alt="image"
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Footer />
                </>
            }
        </>
    )
}

export default OthersProfile