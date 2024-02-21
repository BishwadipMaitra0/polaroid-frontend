import Loader from '../components/Loader'
import AdminNavbar from '../components/TheaterAdminNavbar'
import Footer from '../components/Footer'

import '../styles/AdminDashboard.css'

const TheaterAdminDashboard = () => {

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
                    <ul>
                        <li>
                            <details class="admin_details">
                            <summary class="admin_summary">Avatar 2<button class="admin_button" type="button">Delete</button></summary>
                            <hr class="admin_summary"/>
                            <ul>
                                <li><p>Timing: 10:00 AM to 12:00 PM<button class="admin_button" type="button">Delete</button></p></li>
                                <li><p>Timing: 1:00 PM to 3:00 PM<button class="admin_button" type="button">Delete</button></p></li>
                                <li><p>Timing: 5:00 AM to 7:00 PM<button class="admin_button" type="button">Delete</button></p></li>
                            </ul>
                            </details>
                        </li>
                        <li>
                            <details class="admin_details">
                            <summary class="admin_summary">Godzilla minus 1<button class="admin_button" type="button">Delete</button></summary>
                            <hr class="admin_summary"/>
                            <ul>
                                <li><p>Timing: 9:00 AM to 11:00 AM<button class="admin_button" type="button">Delete</button></p></li>
                                <li><p>Timing: 12:00 PM to 2:00 PM<button class="admin_button" type="button">Delete</button></p></li>
                                <li><p>Timing: 4:00 AM to 6:00 PM<button class="admin_button" type="button">Delete</button></p></li>
                            </ul>
                            </details>
                        </li>
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
export default TheaterAdminDashboard
