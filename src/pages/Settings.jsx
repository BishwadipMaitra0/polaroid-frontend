import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import Navbar from "../components/Navbar"
import "../styles/Settings.css"
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Settings = () => {

  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [canSubmit, setCanSubmit] = useState(false)

  const [username, setUsername] = useState(user.data.username)
  const [originalPassword, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatNewPassword, setRepeatNewPassword] = useState("")

  function checkPassword() {
    if (newPassword !== repeatNewPassword) {
      return false
    }
    else {
      return true
    }
  }

  function strongPassCheck(pass) {
    var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;

    if ((pass != "") && !pass.match(passRegex)) {
      return false;
    }
    else
      return true;
  }

  function validateForm() {
    var passValidation = checkPassword()
    var passStrength = strongPassCheck(newPassword)

    if (passValidation === false) {
      setError("Password does not match")
    }
    else if (passStrength === false) {
      setError("Please enter strong password")
    }
    else {
      setError("")
    }

    setCanSubmit(passValidation && passStrength)
    return passValidation && passStrength;
  }

  useEffect(() => {
    setUsername(user.data.username)
  }, [user])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!checkPassword) return
    if (!validateForm) return

    console.log(username, originalPassword, newPassword, user.data.email)

    const res = await axios.post("http://localhost:3500/user/settings", {
      username: username,
      originalPassword: originalPassword,
      newPassword: newPassword,
      email: user.data.email
    })
    .then((data) => {
        navigate('/user/settings')
    })
    .catch((err) => {
        setError(err.response.data.error)
    })
  }

  return (
    <>
      <Navbar />
      <title>Polaroid | Settings</title>
      <div class="settings-main">
        <div class="settings-header">
          Account Settings
        </div>
        <form class="main-container" onSubmit={submitHandler}>
          <div class="info-container">
            <div class="section-header">Profile</div>
            <label for="username" class="label-input">Username</label>
            <input class="input-field" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" autoComplete="off" />

            <label for="email" class="label-input">Email Address</label>
            <input class="input-field" type="email" name="email" value={user.data.email} id="email" disabled />

            <div class="section-header">
              <div>Change password</div>
              <div class="alert-zone" id="alert-zone"></div>
            </div>
            <label class="label-input" for="origPs">Original Password</label>
            <input class="settings_pasword-box" name="originalPassword" type="password" value={originalPassword} onChange={(e) => setPassword(e.target.value)} id="origPs" autoComplete="off" placeholder='Enter old password' />

            <label class="label-input" for="password-input">New password</label>
            <input class="settings_pasword-box" name="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id="password-input" autoComplete="off" placeholder='Enter new password' />

            <label class="label-input" for="repassword-input">Re-enter new password</label>
            <input class="settings_pasword-box" name="reenterNewPassword" onChange={(e) => setRepeatNewPassword(e.target.value)} type="password" id="repassword-input" autoComplete="off" placeholder='Enter same password again' />
            <p style={{ color: "red" }}> {error} </p>
            <div class="buttons-div">
              <a href="/user/deactivate">
                <button type="button" class="btn btn-outline-danger">
                  DEACTIVATE ACCOUNT
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                  </svg>
                </button>
              </a>
              <button type="submit" class="btn btn-outline-info" id="submit-button">
                SAVE CHANGES
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default Settings