import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAppSelector } from '../app/hooks'
import Loader from '../components/Loader'
import "../styles/ListPage.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MyListPage = ({ isTrending }) => {

    const { listName } = useParams()
    const navigate = useNavigate()

    const user = useAppSelector((state) => state.user)

    const [listData, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const getListData = async () => {
        setLoading(true)
        const res = await axios.get(`http://localhost:3500/list/${user?.data?.username}/${listName}`)
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

    const deleteItemHandler = async (e, item) => {
        e.preventDefault()
        console.log(listData)
        const res = await axios.post('http://localhost:3500/user/delete/list', {
            username: user.data.username,
            listName: listData.listName,
            listItem: item.id
        })
        .then((data) => {
            console.log(data.data)
            let tempData = listData

            console.log(tempData)

            tempData.items = tempData.items.filter((x) => {
                return x.id !== item.id
            })

            console.log(tempData)

            setData(tempData)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        !isTrending && getListData()
    }, [, user])

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
                                {"created by " + user?.data?.username}
                            </div>
                            <div class="listpage_div-time-since-update">
                                {listData?.createdAt}
                            </div>
                            <div class="listpage_div-list-tagline">
                                {listData?.listName}
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
                                        {listData?.description}
                                    </>
                                }
                            </div>
                        </div>
                        {isTrending ?
                            <div class="listpage_grid-container" id="listpage_grid-container">
                                {listData?.results?.map((item, index) =>
                                    <div class="listpage_grid-img-container"> <a href={"/film/" + listData?.results[index].id}> <img class="listpage_grid-img" src={"https://image.tmdb.org/t/p/original" + listData?.results[index].poster_path} alt="image" /> </a></div>
                                )}
                            </div>
                            :
                            <div class="listpage_grid-container" id="listpage_grid-container">
                                {listData?.items?.map((item, index) =>
                                    <div class="listpage_grid-img-container">
                                        <div class="listpage_grid-img-elements">
                                            <div class="listpage_grid-img-container"> <a href={"/film/" + listData?.items[index].id}> <img class="listpage_grid-img" src={"https://image.tmdb.org/t/p/original" + listData?.items[index].poster_path} alt="image" /> </a></div>
                                            <form onSubmit={(e) => deleteItemHandler(e, item)}>
                                                <button type="submit" class="listpage_delete-film-button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#456" class="bi bi-trash-fill delete-film-button-icon" viewBox="0 0 16 16" opacity="0.8">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                    </svg>
                                                </button>
                                            </form>
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

export default MyListPage