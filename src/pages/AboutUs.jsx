import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/AboutUs.css"

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div class="main_abtus">
        <article>
          <h2>About Us</h2>
          <hr />
          <p>We are blah blah..Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.</p>
          <h2>Developers</h2>
          <hr />
          <ul>
            <li>
              <h3>Prasad</h3>
              <p>He did blah bah blah</p>
            </li>
            <li>
              <h3>Arka</h3>
              <p>He did blah bah blah</p>
            </li>
            <li>
              <h3>Urjasvi</h3>
              <p>He did blah bah blah</p>
            </li>
            <li>
              <h3>Kalyan</h3>
              <p>He did blah bah blah</p>
            </li>
            <li>
              <h3>Biswadip</h3>
              <p>He did blah bah blah</p>
            </li>
          </ul>
        </article>
      </div>
      <Footer />
    </>
  )
}

export default AboutUs