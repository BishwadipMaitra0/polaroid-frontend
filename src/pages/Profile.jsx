import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import axios from 'axios'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/Profile.css"

const Profile = ({ currentUser }) => {

  const user = useAppSelector((state) => state.user)

  const [loading, setLoading] = useState(true)
  const [listLength, setListLength] = useState(0)

  const getUserData = async () => {
    setLoading(true)
    const res = await axios.get("http://localhost:3500/getuser")
    await res.data

    setListLength(res.data.lists)
    setLoading(false)
  }

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {

  }, [user])

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
                    <div class="profile-name"> {user?.data?.username} </div>
                    {!currentUser ?
                      <button class="followButton">FOLLOW</button>
                      :
                      <></>
                    }
                  </div>
                </div>
                <div class="profile-social-metadata">
                  <div class="social-component">
                    <div class="social-component-counter">  {user?.data?.watched?.length} </div>
                    <a href="/user/watchedfilms" class="social-component-name">films</a>
                  </div>
                  <div class="social-component">
                    <div class="social-component-counter"> {listLength} </div>
                    <a href="/user/list" class="social-component-name">lists</a>
                  </div>
                  <div class="social-component">
                    <div class="social-component-counter"> {user?.data?.following?.length} </div>
                    <a href={"/following/" + user?.data?.username?.split("%20").join(" ")} class="social-component-name">following</a>
                  </div>
                  <div class="social-component">
                    <div class="social-component-counter"> {user?.data?.followers?.length} </div>
                    <a href={"/followers/" + user?.data?.username?.split("%20").join(" ")} class="social-component-name">followers</a>
                  </div>
                </div>
              </div>
              <div class="select-section">
                <div class="profile_nav-link">
                  <a href="/user/profile" class="section-name  active">profile</a>
                </div>
                <div class="profile_nav-link">
                  <a href="/user/watchedfilms" class="section-name">watched films</a>
                </div>
                <div class="profile_nav-link">
                  <a href="/user/watchlist" class="section-name">watchlist</a>
                </div>
                <div class="profile_nav-link">
                  <a href="/user/list" class="section-name">list</a>
                </div>
                <div class="profile_nav-link">
                  <a href="/user/followers" class="section-name">network</a>
                </div>
              </div>

              <div class="profile_section-heading">favorite films</div>
              {user?.data?.favourites?.length === 0 ?
                <p style={{ color: "white" }}>No favourites added yet!</p>
                :
                <></>
              }
              <div class="profile_grid-container">
                {/* <% for (let i=0; i<data.favourites.length; i++) { %> */}
                {user?.data?.favourites?.map((item) => (
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
                {/* <div class="grid-img-container"> <a href={"/film/" + user.data.favourites[i].id}> <img class="grid-img" src={"https://image.tmdb.org/t/p/original/" + data.favourites[i].poster_path} alt="image" /> </a> </div> */}
                {/* <% } %> */}
              </div>

              <div class="profile_section-heading">recently watched</div>
              {/* <% if (data.watched.length===0) { %> */}
              {user?.data?.watched?.length === 0 ?
                <p style={{ color: "white" }}>No movies added to watched yet!</p>
                :
                <></>
              }
              {/* <% } %> */}
              <div class="profile_grid-container">
                {/* <% for (let i=0; i<Math.min(data.watched.length, 6); i++) { %>
      <div class="grid-img-container"> <a href=<%= "/film/"+data.watched[i].id %>> <img class="grid-img" src=<%= "https://image.tmdb.org/t/p/original/"+data.watched[i].poster_path %> alt="image"> </a> </div>
    <% } %> */}
                {user?.data?.watched?.slice(0, Math.min(user?.data?.watched?.length, 6)).map((item) => (
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

export default Profile