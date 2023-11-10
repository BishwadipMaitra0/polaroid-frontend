import axios from "axios"
import { api_key } from "../config"

const getMovieById = async (id) => {
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`)
    await movieDetails.data

    const movieCredits = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`)
    await movieCredits.data
    let director
    if (movieCredits.data.crew.filter(({job}) => job==="Director") && movieCredits.data.crew.filter(({job}) => job==="Director")[0]) {
        director = movieCredits.data.crew.filter(({job}) => job==="Director")[0].name
    }

    movieDetails.data.director = director

    return movieDetails.data
}

export default getMovieById