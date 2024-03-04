import React, { useState } from 'react'
import "../styles/Nav.css"
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router'

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import { fetchOutUser } from '../features/userSlice';

const AdminNavbar = (props) => {

  const { adminLogin, setAdminLogin } = props

  //const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  //const dispatch = useAppDispatch()

  const logoutHandler = () => {
    setAdminLogin(false)
    navigate('/admin/login')
  }

  return (
    <nav>
      <div> <a href="/"> <img src="/assets/Logo.png" height="45px" /> </a> </div>
      <div id="navElementsDiv">
        <ul id="navElements">
          <li class="navbar-list-element">
            <a class="navbar-anchor" onClick={() => navigate('/admin/dashboard')} id="admin_register">Dashboard</a>
          </li>
          <li class="navbar-list-element">
            <a class="navbar-anchor" onClick={() => navigate('/admin/addtadmin')} id="admin_register">Add theatre admin</a>
          </li>
          <li class="navbar-list-element">
            <a class="navbar-anchor" onClick={() => logoutHandler()} id="home">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default AdminNavbar
