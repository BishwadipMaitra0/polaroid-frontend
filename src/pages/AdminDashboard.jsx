
import Loader from '../components/Loader'
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'

import '../styles/AdminDashboard.css'

const AdminDashboard = () => {

    return (
    <>
        <AdminNavbar/>
        <div class="admin_main">
        <table class="admin_table">
            <tr>
                <th class="admin_th">Name of Admin</th>
                <th class="admin_th">No. of theaters</th> 
                <th class="admin_th"> </th>
            </tr>
            <tr>
            <td class="admin_td">
                <details class="admin_details">
                <summary class="admin_summary">Arka</summary>
                <hr class="admin_summary"/>
                <ul>
                    <li>VR Chennai</li>
                    <li>Phoenix Marketcity</li>
                </ul>
                </details>
            </td>
            <td class="admin_td">36</td> 
            <td class="admin_td delete_column"><button class="admin_button"type="button">Delete</button></td>
            </tr>
            <tr>
            <td class="admin_td">
                <details class="admin_details">
                <summary class="admin_summary">Orko</summary>
                <hr class="admin_summary"/>
                <ul>
                    <li>Cinepolis</li>
                    <li>Rajhans</li>
                </ul>
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
export default AdminDashboard
