import React, { useState } from 'react'
import "../styles/Nav.css"
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router'

const Navbar = () => {

  const user = useAppSelector((state) => state.user)
  const login = useAppSelector((state) => state.login)
  console.log(user.data)

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
      <div>
        <ul>
          <li class="navbar-list-element">
            <a class="navbar-anchor" href="/" id="home">Home</a>
          </li>
          <li class="navbar-list-element">
            <a class="navbar-anchor" href="/films" id="films">Films</a>
          </li>
          <li class="navbar-list-element">
            <a class="navbar-anchor" href="/lists" id="lists">Lists</a>
          </li>

          {/* <% if (check === false) { %> */}
          {login.login === false ?
            <li class="navbar-list-element">
              <a class="navbar-anchor" href="/user/login" id="sing-in">Sign In</a>
            </li>
            :
            <li class="navbar-list-element" className="nav-item dropdown">
              <div class="dropdown">
                <a class="dropdown-toggle navbar-anchor" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {/* <%= !check ? "Sign In" : username %> */}
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item" href="/user/profile">My Account</a></li>
                  <li><a class="dropdown-item" href="/user/settings">Settings</a></li>
                  <li><a class="dropdown-item" href="/user/list">My Lists</a></li>
                  <li><a class="dropdown-item" href="/user/watchlist">Watchlist</a></li>
                  {/* <!-- <li><a class="dropdown-item" href="/user/bookinghistory">Booking History</a></li> --> */}
                  <li><a class="dropdown-item" href="/user/watchedfilms">Watched Films</a></li>
                  <li><a class="dropdown-item" href={'/followers/' + user.data && user.data.name ? user.data.name.split(" ").join("%20") : ""} >Network</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="/user/logout">Sign Out</a></li>
                </ul>
              </div>
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