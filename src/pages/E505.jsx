import { React, useEffect } from 'react'
import "../styles/505.css"

const E505 = () => {

  useEffect(() => {
    document.title = "Network Error"
  }, [])

  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>505</h1>
        </div>
        <h2>Internal server error</h2>
        <p>A technical error occurred.</p>
        <a href="/">Home</a>
      </div>
    </div>
  )
}

export default E505