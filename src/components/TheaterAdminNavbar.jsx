import React, { useState } from 'react'
import "../styles/Nav.css"
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router'

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import { fetchOutUser } from '../features/userSlice';

const TheaterAdminNavbar = (props) => {

  const { theatreAdminLogin, setTheatreAdminLogin, setTheatreAdminName } = props

  const navigate = useNavigate()

  const logoutHandler = () => {
    setTheatreAdminLogin(false)
    setTheatreAdminName("")
    navigate('/theater_admin/login')
  }

  return (
    <nav>
      <div> <a href="/"> <img src="/assets/Logo.png" height="45px" /> </a> </div>
      <div id="navElementsDiv">
        <ul id="navElements">
          <li class="navbar-list-element">
            <a class="navbar-anchor" onClick={() => navigate('/theater_admin/dashboard')} id="theater_admin_dashboard">Dashboard</a>
          </li>
          <li class="navbar-list-element">
            <a class="navbar-anchor" onClick={() => navigate('/theater_admin/timing')} id="theater_admin_timing">Add timing</a>
          </li>
          <li class="navbar-list-element">
            <a class="navbar-anchor" onClick={() => navigate('/theater_admin/theater_revenue')} id="theater_admin_timing">Theatre Revenue</a>
          </li>
          <li class="navbar-list-element">
            <a class="navbar-anchor" onClick={() => navigate('/theater_admin/movie_revenue')} id="theater_admin_timing">Movie Revenue</a>
          </li>
          <li class="navbar-list-element">
            <a class="navbar-anchor" onClick={logoutHandler} id="home">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default TheaterAdminNavbar
