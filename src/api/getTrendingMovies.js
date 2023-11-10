import axios from 'axios'
import { api_key } from '../config'

const getTrendingMovies = async () => {
    console.log("hello")
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`, {
        withCredentials: false
    })
    await movieDetails.data

    return movieDetails.data
}

export default getTrendingMovies