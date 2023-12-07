import React, { useState } from 'react'
import "../styles/Search.css"
import axios from 'axios'
import getMovieByName from '../api/getMovieByName'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Search = () => {

    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const searchHandler = async (e) => {
        console.log(searchQuery)
        e.preventDefault()
        const res = await getMovieByName(searchQuery)
        console.log(res)
        setData(res)
    }

    return (
        <>
            <Navbar />
            <div class="searchpage_main_container">
                <div class="main_searchpage">
                    <form class="search-box" onSubmit={searchHandler}>
                        <input type="text" name="name" class="search-text-box" placeholder="Search Anything" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autocomplete="off" />
                        <button type="submit" class="search" id="search-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="whitesmoke" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </form>
                    {data && data.results ?
                        <div class="section-heading-search"> Enter your search query above </div>
                        :
                        <div class="section-heading-search">found {data.length} matches for "{searchQuery}" </div>
                    }
                    {data && data.map((item, index) =>
                        <div class="element-container">
                            <div class="film-image-container">
                                <img class="film-image" src={"https://image.tmdb.org/t/p/original" + item.poster_path} alt="image" />
                            </div>
                            <div class="film-content">
                                <div class="film-header">
                                    <a class="film-name" href={"/film/" + item.id} > {item.title} </a>
                                    <div class="film-year"> {item.release_date.slice(0, 4)} </div>
                                </div>
                                <div class="film-desc">
                                    Directed By
                                    <div class="film-director"> {item.director} </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Search