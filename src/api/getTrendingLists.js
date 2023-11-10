import axios from "axios"
import { api_key } from "../config"

const getTrendingListsWeek = async () => {
    const listDetailsWeek = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`)
    await listDetailsWeek.data

    return listDetailsWeek.data
}

export const getTrendingListsToday = async () => {
    const listDetailsDay = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${variables.api_key}`)
    await listDetailsDay.data

    return listDetailsDay.data
}

export default getTrendingListsWeek