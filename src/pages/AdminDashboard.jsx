
import Loader from '../components/Loader'
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'

import '../styles/AdminDashboard.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const AdminDashboard = (props) => {

    const {adminLogin, setAdminLogin} = props

    const [admins, setAdmins] = useState([])
    
    const navigate = useNavigate()

    const getAdminData = async () => {
        console.log('hi')
        const res = await axios.get("http://localhost:3500/admin/getadmindetails")
        const data = await res.data

        console.log(data)

        setAdmins(data)
    }

    const deleteTheatreAdmin = async (adminName) => {
        try {
            const res = await axios.post("http://localhost:3500/admin/deletetheatreadmin", {
                adminName: adminName
            })
            const data = await res.data

            let updatedAdmins = admins
            updatedAdmins = updatedAdmins.filter((x) => {
                return x.adminName !== adminName
            })

            setAdmins(updatedAdmins)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!adminLogin) {
            navigate('/admin/login')
        }
        getAdminData()
    }, [])

    return (
        <>
            <AdminNavbar />
            <div class="admin_main">
                <table class="admin_table">
                    <tr>
                        <th class="admin_th">Name of Theatre Admin</th>
                        <th class="admin_th">No. of theaters</th>
                        <th class="admin_th"> </th>
                    </tr>
                    {admins.map((item, index) => 
                        <tr>
                            <td class="admin_td">
                                <details class="admin_details">
                                    <summary class="admin_summary"> {item.username} </summary>
                                    <hr class="admin_summary" />
                                    <ul>
                                        {item.locations.map((item2, index2) => 
                                            <li> {item2} </li>
                                        )}
                                    </ul>
                                </details>
                            </td>
                            <td class="admin_td"> {item.locations.length} </td>
                            <td class="admin_td delete_column"><button class="admin_button" type="button" onClick={(e) => deleteTheatreAdmin(item.username)}>Delete</button></td>
                        </tr>
                    )}
                </table>

            </div>
            <Footer />
        </>
    )
}
export default AdminDashboard
