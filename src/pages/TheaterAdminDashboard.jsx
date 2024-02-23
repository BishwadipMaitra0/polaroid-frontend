import Loader from '../components/Loader'
import AdminNavbar from '../components/TheaterAdminNavbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import '../styles/AdminDashboard.css'
import { useNavigate } from 'react-router'
import axios from 'axios'

const TheaterAdminDashboard = (props) => {

    const { theatreAdminLogin, setTheatreAdminLogin, setTheatreAdminName, theatreAdminName } = props
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [movieData, setMovieData] = useState([])

    const getInfo = async () => {
        setLoading(true)
        axios.post("http://localhost:3500/theatreadmin/info", {
            username: theatreAdminName
        })
            .then((data) => {
                console.log(data.data)
                setMovieData(data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const deleteTiming = async (location, movieName, timing) => {
        axios.post("http://localhost:3500/theatreadmin/show", {
            location: location,
            movieName: movieName,
            timing: timing
        })
        .then((data) => {
            console.log(data.data)
            let tempData = movieData
            for (let i=0; i<tempData.length; i++) {
                if (tempData[i].location === location) {
                    for (let j=0; j<tempData[i].movieInfo.length; j++) {
                        if (tempData[i].movieInfo[j].movieName === movieName) {
                            tempData[i].movieInfo[j].timings = tempData[i].movieInfo[j].timings.filter((x) => {
                                return x.timing !== timing
                            })
                        }
                    }
                }
            }

            console.log(tempData)
            setMovieData(tempData)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const deleteMovie = async (location, movieName) => {
        axios.post("http://localhost:3500/theatreadmin/movie", {
            location: location,
            movieName: movieName
        })
        .then((data) => {
            console.log(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const deleteLocation = async (location) => {
        axios.post("http://localhost:3500/theatreadmin/location", {
            location: location,
            adminName: theatreAdminName
        })
        .then((data) => {
            console.log(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (!theatreAdminLogin) {
            navigate('/theater_admin/login')
        }
        getInfo()
    }, [])

    return (
        <>
            {loading ?
                <>
                    <Loader />
                </>
                :
                <>
                    <AdminNavbar theatreAdminLogin={theatreAdminLogin} setTheatreAdminLogin={setTheatreAdminLogin} setTheatreAdminName={setTheatreAdminName} />
                    <p style={{ color: "white" }}>Logged in as {theatreAdminName} </p>
                    <div class="admin_main">
                        <table class="admin_table">
                            <tr>
                                <th class="admin_th">Name of Theatre</th>
                                <th class="admin_th">No. of movies</th>
                                <th class="admin_th"> </th>
                            </tr>
                            {movieData?.map((location, index) =>
                                <tr>
                                    <td class="admin_td">
                                        <details class="admin_details">
                                            <summary class="admin_summary"> {location?.location} </summary>
                                            <hr class="admin_summary" />
                                            <ul>
                                                {location?.movieInfo?.map((movie, index2) =>
                                                    <li>
                                                        <details class="admin_details">
                                                            <summary class="admin_summary"> {movie?.movieName} <button class="admin_button" type="button" onClick={async (e) => await deleteMovie(location?.location, movie?.movieName)}>Delete</button></summary>
                                                            <hr class="admin_summary" />
                                                            <ul>
                                                                {movie?.timings?.map((timing, index3) =>
                                                                    <li><p> {timing?.timing} <button class="admin_button" type="button" onClick={async (e) => await deleteTiming(location?.location, movie?.movieName, timing?.timing)}>Delete</button></p></li>
                                                                )}
                                                            </ul>
                                                        </details>
                                                    </li>
                                                )}
                                            </ul>
                                        </details>
                                    </td>
                                    <td class="admin_td"> {location?.movieInfo?.length} </td>
                                    <td class="admin_td delete_column"><button class="admin_button" type="button" onClick={async (e) => await deleteLocation(location?.location)}>Delete</button></td>
                                </tr>
                            )}
                        </table>
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}
export default TheaterAdminDashboard
