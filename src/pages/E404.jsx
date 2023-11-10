import React from 'react'
import "../styles/404.css"
import { useNavigate } from 'react-router'

const E404 = () => {

  const navigate = useNavigate()

  return (
    <div class="card">
        <div class="star top">
            <div align="center">
                <a href="/">
                    <img class="imgg" src='/assets/Logo.png' />
                </a>
            </div>
        </div>
        <div class="container flex">
            <div class="error">
                <span>Error
                    404</span>
                <p>This page does not exist.</p>


                <button className='button-404' onClick={() => navigate('/')}>Home</button>
            </div>
            <div class="img">
                <img src="/assets/red_cross.svg" />
            </div>
        </div>
    </div>
  )
}

export default E404