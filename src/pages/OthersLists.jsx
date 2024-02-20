import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../components/Loader'
import "../styles/List.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const OthersLists = () => {

    const { username } = useParams()

    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)
        const res = await axios.get(`http://localhost:3500/lists/${username}`)
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
        getData()
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
                            <div class="alllists_section-header-description">{username}'s Lists</div>
                        </div>
                        {lists.length === 0 &&
                            <p style={{ color: "red" }}>No lists found!!</p>
                        }
                        <div class="alllists_list-card-group" id="alllists_card-group">
                            {lists?.slice(0, Math.min(lists.length, 12)).map((list, index) => (
                                <div key={index} className="alllists_list-card">
                                    <a href={`/list/${list.createdBy.split(" ").join("%20")}/${list.listName.split(" ").join("%20")}`}>
                                        {list.items.length > 0 ? (
                                            <div className="alllists_img-container"><img src={`https://image.tmdb.org/t/p/original${list.items[0].poster_path}`} alt="Avatar" /></div>
                                        ) : (
                                            <div className="alllists_img-container"><img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" alt="Avatar" /></div>
                                        )}
                                        <div className="alllists_description-container">
                                            <div className="alllists_description-header">{list.listName}</div>
                                            <div className="alllists_description-content">{`by ${list.createdBy}`}</div>
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

export default OthersLists