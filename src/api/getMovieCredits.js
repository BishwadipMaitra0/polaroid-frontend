import axios from 'axios'
import { api_key } from '../config'

const getMovieCredits = async (id) => {
    const movieCredits = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=en-US`, {
        withCredentials: false
    })
    await movieCredits.data

    return movieCredits.data
}

export default getMovieCredits