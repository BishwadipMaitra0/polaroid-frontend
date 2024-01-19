import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { api_key } from '../config'
import { useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import "../styles/Network.css"

const Followers = () => {

  const user = useAppSelector((state) => state.user)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)

    if (user.data.username == undefined)
        return
    
    console.log(user.data.username)

    const followers = await axios.get(`http://localhost:3500/followers/${user.data.username}`)
    await followers.data

    setData(followers.data)

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [, user])

  return (
    <>
      {loading ?
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Loader />
        </div>
        :
        <>
          <Navbar />
          <div class="main">
            <div class="select-section">
              <div class="nav-link">
                <a href={"/followers/" + user.data.username.split(" ").join(" %20")} class="section-name active">followers</a>
              </div>
              <div class="nav-link">
                <a href={"/following/" + user.data.username.split(" ").join(" %20")} class="section-name">following</a>
              </div>
            </div >
            <div class="header-line"></div>
            <div>
              {data.map((item, index) => (
                <>
                  <div class="follower-slice">
                    <div class="follower-info">
                      <a href="" class="follower-dp-link"><img src="/assets/cat.jpg" height="50px" class="follower-dp" /></a>
                      <div class="follower-metadata">
                        <a href={"/profile/" + item.username} class="follower-name"> {item.username} </a>
                        <div class="follower-network">
                          <a href={"/followers/" + item.username}> {item.followers}followers</a>,
                          <a href={"/following/" + item.username}> following {item.following}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="follower-social-info">
                    <div class="follower-watched" title="Watched films">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#52c9a0"
                        class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path
                          d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                      <a href={"/watchedfilms/" + item.username} class="follower-watched-count">
                        {item.watched} </a>
                    </div>
                    <div class="follower-list" title="Lists">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#40bcf4"
                        class="bi bi-grid-fill" viewBox="0 0 16 16">
                        <path
                          d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                      </svg>
                      <a href={"/lists/" + item.username} class="follower-list-count"> {item.lists
                        || "0"} </a>
                    </div>
                    <div class="follower-favorite" title="Favorites">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff9010"
                        class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                        <path
                          d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                      </svg>
                      <a href={"/profile/" + item.username} class="follower-favorite-count">
                        {item.favourites}  </a>
                    </div>
                  </div>
                </>
              ))}
            </div >
          </div >
          <Footer />
        </>}
    </>

  )
}

export default Followers