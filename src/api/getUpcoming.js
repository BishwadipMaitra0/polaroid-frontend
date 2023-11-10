import axios from 'axios'
import { api_key } from '../config'

const getUpcoming = async () => {
    const movieDetails = await axios.get(`
    https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`, {
        withCredentials: false
    })
    await movieDetails.data

    return movieDetails.data
}

export default getUpcoming