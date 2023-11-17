import axios from 'axios'
import { api_key } from '../config'

const getWatchProviders = async (id) => {
    const watchProviders = await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${api_key}`, {
        withCredentials: false
    })
    await watchProviders.data

    return watchProviders.data
}

export default getWatchProviders