import React, { useState } from 'react'
import "../styles/Nav.css"
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router'

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { fetchOutUser } from '../features/userSlice';

const Navbar = () => {

  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const logoutHandler = () => {
    dispatch(fetchOutUser())
    navigate('/')
  }

  return (
    <nav>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox" id="icon">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
      <div> <a href="/"> <img src="/assets/Logo.png" height="45px" /> </a> </div>
      <div id="navElementsDiv">
        <ul id="navElements">
          <li class="navbar-list-element">
            <a class="navbar-anchor" href="/" id="home">Home</a>
          </li>
          <li class="navbar-list-element">
            <a class="navbar-anchor" href="/films" id="films">Films</a>
          </li>
          {/* <li class="navbar-list-element">
            <a class="navbar-anchor" href="/lists" id="lists">Lists</a>
          </li> */}

          {/* <% if (check === false) { %> */}
          {!user.isLoggedIn ?
            <li class="navbar-list-element">
              <a class="navbar-anchor" href="/user/login" id="sing-in">Sign In</a>
            </li>
            :
            <li class="navbar-list-element" className="nav-item dropdown">
              <Nav>
                <NavDropdown
                  title={user.data && user.data.username}
                  id="navbar-anchor-id"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/user/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user/settings">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user/list">
                    My Lists
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user/watchlist">
                    Watchlist
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user/watchedfilms">
                    Watched Films
                  </NavDropdown.Item>
                  <NavDropdown.Item href={'/followers/' + user.data && user.data.username}>
                    Network
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logoutHandler()}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </li>
          }
          <li class="navbar-list-element" id="searchButtonLi">
            <a class="navbar-anchor" href="/search">
              <button id="searchButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#8291A5" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar