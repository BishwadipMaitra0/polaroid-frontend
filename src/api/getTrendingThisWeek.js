import axios from 'axios'
import { api_key } from '../config'

const getTrendingThisWeek = async () => {
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`, {
        withCredentials: false
    })
    await movieDetails.data

    const ids = []
    const directors = []
    for (let i=0; i<3; i++) {
        ids.push(movieDetails.data.results[i].id)
    }

    for (let i=0; i<3; i++) {
        const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${ids[i]}/credits?api_key=${api_key}`, {
            withCredentials: false
        })
        await movieDetails.data
        const director = movieDetails.data.crew.filter(({job}) => job==="Director")
        directors.push(director[0].name)
    }

    movieDetails.data.results.directors = directors
    return movieDetails.data
}

export default getTrendingThisWeek