import Loader from '../components/Loader'
import AdminNavbar from '../components/TheaterAdminNavbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import '../styles/AdminDashboard.css'
import '../styles/TheaterRevenue.css'
import { useNavigate } from 'react-router'
import axios from 'axios'

const TheatreRevenue = (props) => {

    const { theatreAdminLogin, setTheatreAdminLogin, setTheatreAdminName, theatreAdminName } = props
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [movieData, setMovieData] = useState([])
    const [filter, setFilter] = useState("")

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

    const getInfo = async () => {
        setLoading(true)
        axios.post(`http://localhost:3500/theatreadmin/locationstats/${filter}`, {
            theatreAdminUsername: theatreAdminName
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

    useEffect(() => {
        document.title = "Revenue Per Theatre"
        if (!theatreAdminLogin) {
            navigate('/theater_admin/login')
        }
        getInfo()
    }, [])

    useEffect(() => {
        getInfo()
    }, [filter])

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
                            <div> Logged in as <strong>{theatreAdminName}</strong></div>
                        </div>
                        <div class="revenue-select-div">
                            <label htmlFor="history-select" class="email-label" style={{ opacity: "70%" }}>Filter by:</label>
                            <select name="" id="history-select" value={filter} class="revenue-select-box" required autoComplete="off" onChange={(e) => setFilter(e.target.value)}>
                                <option value="">All</option>
                                <option value="week">Last Week</option>
                                <option value="month">Last Month</option>
                            </select>
                        </div>
                        <table class="admin_table">
                            <tr>
                                <th class="admin_th">Name of Theatre</th>
                                <th class="admin_th">No. of Tickets Sold</th>
                                <th class="admin_th">Total Revenue</th>
                            </tr>
                            {movieData?.map((location, index) =>
                                <tr>
                                    <td class="admin_td"> {location.location} </td>
                                    <td class="admin_td"> {location.totalTicketsSold} </td>
                                    <td class="admin_td"> {location.totalRevenue} </td>
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

export default TheatreRevenue