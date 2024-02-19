import Loader from '../components/Loader'
import AdminNavbar from '../components/TheaterAdminNavbar'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import '../styles/AdminDashboard.css'
import { useNavigate } from 'react-router'

const TheaterAdminDashboard = (props) => {

    const { theatreAdminLogin, setTheatreAdminLogin } = props
    const navigate = useNavigate()

    useEffect(() => {
        if (!theatreAdminLogin) {
            navigate('/theater_admin/login')
        }
    }, [])

    return (
    <>
        <AdminNavbar theatreAdminLogin={theatreAdminLogin} setTheatreAdminLogin={setTheatreAdminLogin} />
        <div class="admin_main">
        <table class="admin_table">
            <tr>
                <th class="admin_th">Name of Theatre</th>
                <th class="admin_th">No. of movies</th> 
                <th class="admin_th"> </th>
            </tr>
            <tr>
            <td class="admin_td">
                <details class="admin_details">
                <summary class="admin_summary">VR Mall</summary>
                <hr class="admin_summary"/>
                <p>Timing: 10:00 AM to 10:00PM</p>
                </details>
            </td>
            <td class="admin_td">36</td> 
            <td class="admin_td delete_column"><button class="admin_button"type="button">Delete</button></td>
            </tr>
            <tr>
            <td class="admin_td">
                <details class="admin_details">
                <summary class="admin_summary">Phoenix Mall</summary>
                <hr class="admin_summary"/>
                <p>Timing: 10:00 AM to 10:00PM</p>
                </details>
            </td>
            <td class="admin_td">69</td> 
            <td class="admin_td delete_column"><button class="admin_button"type="button">Delete</button></td>
            </tr>
        </table>

        </div>
        <Footer/>
     </>
    )
}
export default TheaterAdminDashboard
