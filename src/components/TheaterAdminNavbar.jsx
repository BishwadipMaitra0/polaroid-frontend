import React, { useState } from 'react'
import "../styles/Nav.css"
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router'

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import { fetchOutUser } from '../features/userSlice';

const TheaterAdminNavbar = () => {

  //const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  //const dispatch = useAppDispatch()
  
  const logoutHandler = () => {
    //dispatch(fetchOutUser())
    navigate('/')
  }

  return (
    <nav>
      <div> <a href="/"> <img src="/assets/Logo.png" height="45px" /> </a> </div>
      <div id="navElementsDiv">
        <ul id="navElements">
          <li class="navbar-list-element">
            <button class="navbar-anchor" onClick={() => navigate('/theater_admin/timing')} id="theater_admin_timing">Add timing</button>
          </li>
          <li class="navbar-list-element">
            <button class="navbar-anchor" onClick={() => navigate('/')} id="home">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default TheaterAdminNavbar
