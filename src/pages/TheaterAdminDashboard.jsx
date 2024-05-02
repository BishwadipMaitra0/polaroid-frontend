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
        axios.post("https://polaroid-backend.onrender.com/theatreadmin/info", {
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

    const deleteTiming = async (location, movieName, startTiming, endTiming, runDate) => {
        axios.post("https://polaroid-backend.onrender.com/theatreadmin/show", {
            location: location,
            movieName: movieName,
            startTiming: startTiming,
            endTiming: endTiming,
            runDate, runDate
        })
            .then((data) => {
                console.log(data.data)
                let tempData = movieData
                for (let i = 0; i < tempData.length; i++) {
                    if (tempData[i].location === location) {
                        for (let j = 0; j < tempData[i].movieInfo.length; j++) {
                            if (tempData[i].movieInfo[j].movieName === movieName) {
                                tempData[i].movieInfo[j].timings = tempData[i].movieInfo[j].timings.filter((x) => {
                                    console.log(x.startTiming, startTiming, typeof (x.startTiming), typeof (startTiming))
                                    console.log(x.startTiming === startTiming)
                                    return x.startTiming !== startTiming && x.endTiming !== endTiming && x.runDate !== runDate
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
        axios.post("https://polaroid-backend.onrender.com/theatreadmin/movie", {
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
        axios.post("https://polaroid-backend.onrender.com/theatreadmin/location", {
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

    const convertDateToString = (startTimeString, endTimeString) => {
        // Create Date objects from the given strings
        const startTime = new Date(startTimeString);
        const endTime = new Date(endTimeString);

        // Custom formatting function for time
        const formatTime = (date) => {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        // Format the date strings
        const formattedStartDate = startTime.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

        // Create the final string
        const finalString = `${formattedStartDate}, ${formattedStartTime} to ${formattedEndTime}`;

        return finalString
    }

    useEffect(() => {
        if (!theatreAdminLogin) {
            navigate('/theater_admin/login')
        }
        getInfo()
    }, [])

    useEffect(() => {
        document.title = "Theater Admin Dashboard"
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
                    <div class="admin_main">
                        <div class="admin-header-bar">
                            <div> Logged in as Theater Admin: <strong>{theatreAdminName}</strong></div>
                        </div>
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
                                                                    <li><p> {convertDateToString(timing?.startTiming, timing?.endTiming)} <button class="admin_button" type="button" onClick={async (e) => await deleteTiming(location?.location, movie?.movieName, timing?.startTiming, timing?.endTiming, timing?.runDate)}>Delete</button></p></li>
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
