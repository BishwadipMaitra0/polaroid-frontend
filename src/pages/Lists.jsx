import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import "../styles/List.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const Lists = () => {

    const [loading, setLoading] = useState(false)
    const [lists, setLists] = useState([])

    const getLists = async () => {
        setLoading(true)
        const res = await axios.get("http://localhost:3500/lists")
        .then((data) => {
            console.log(data.data)
            setLists(data.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        getLists()
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
                    <div class="alllists_main">
                        <div class="alllists_section-header">
                            <div class="alllists_section-header-description">Trending Lists</div>
                        </div>
                        <div class="alllists_list-card-group" id="alllists_card-group">
                            <div class="alllists_list-card">
                                <a href="/trending/week">
                                    <div class="alllists_img-container"><img src="https://i.etsystatic.com/34708433/r/il/15fb83/4498029997/il_570xN.4498029997_cjib.jpg" alt="Avatar" /></div>
                                    <div class="alllists_description-container">
                                        <div class="alllists_description-header">Trending This Week</div>
                                        <div class="alllists_description-content">Discover the top, most popular movies available now!</div>
                                    </div>
                                </a>
                            </div>
                            <div class="alllists_list-card">
                                <a href="/trending/day">
                                    <div class="alllists_img-container"><img src="https://assets-prd.ignimgs.com/2023/02/08/jw4-2025x3000-online-character-1sht-keanu-v187-1675886090936.jpg" alt="Avatar" /></div>
                                    <div class="alllists_description-container">
                                        <div class="alllists_description-header">Trending Today</div>
                                        <div class="alllists_description-content">Discover the top, most popular movies available now!</div>
                                    </div>
                                </a>
                            </div>
                        </div>



                        <div class="alllists_section-header">
                            <div class="alllists_section-header-description">User Lists</div>
                        </div>
                        {lists?.length === 0 &&
                            <p>There are no lists created by any user!</p>
                        }
                        <div class="alllists_list-card-group" id="alllists_card-group">
                            {lists?.slice(0, Math.min(lists?.length, 12)).map((list, index) => (
                                <div className="alllists_list-card" key={index}>
                                    <a href={`list/${list.createdBy.split(" ").join("%20")}/${list.listName.split(" ").join("%20")}`}>
                                        {list.items.length > 0 ? (
                                            <div className="alllists_img-container">
                                                <img src={`https://image.tmdb.org/t/p/original${list.items[0].poster_path}`} alt="Avatar" />
                                            </div>
                                        ) : (
                                            <div className="alllists_img-container">
                                                <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" alt="Avatar" />
                                            </div>
                                        )}
                                        <div className="alllists_description-container">
                                            <div className="alllists_description-header">{list.listName}</div>
                                            <div className="alllists_description-content">{"by " + list.createdBy}</div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default Lists