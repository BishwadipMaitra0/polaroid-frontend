import React, { useEffect, useState, useRef } from 'react'
import "../styles/Login.css"
import { useNavigate } from 'react-router'
import { useAppSelector } from '../app/hooks'
import axios from 'axios'

const AdminRegister = (props) => {

    const {adminLogin, setAdminLogin} = props

    const [error, setError] = useState("")
    const [error2, setError2] = useState("")
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [sbDisabled, setDisabled] = useState(false)

    const [isPassSame, setIsPassSame] = useState(true)
    const [isInvalidEmail, setIsInvalidEmail] = useState(false)
    const [isPassStrong, setIsPassStrong] = useState(true)

    const nameRef = useRef(null)
    const passRef = useRef(null)
    const rePassRef = useRef(null)

    const altert1Ref = useRef(null)
    const altert2Ref = useRef(null)

    function onFocusoutRePass() {
        if (!isPassSame || !isPassStrong) {
            rePassRef.current.style.backgroundColor = "#eb9898";
            rePassRef.current.style.outline = "2px solid red";
        }
        else {
            rePassRef.current.style.backgroundColor = "#a3d4ec";
            rePassRef.current.style.outline = "none";
        }
    }

    function disableButton() {
        if (!isPassSame || isInvalidEmail || !isPassStrong) {
            setDisabled((val) => {
                val = true
                return val
            })
        }
        else {
            setDisabled((val) => {
                val = false
                return val
            })
        }
    }

    function onFocusoutName() {
        nameRef.current.style.backgroundColor = "#a3d4ec";
    }

    function onFocusoutPass() {
        if (!isPassSame || !isPassStrong) {
            passRef.current.style.backgroundColor = "#eb9898";
            passRef.current.style.outline = "2px solid red";
        }
        else {
            passRef.current.style.outline = "none";
            passRef.current.style.backgroundColor = "#a3d4ec";
        }
    }

    function onFocusinName() {
        nameRef.current.style.outline = "none";
        nameRef.current.style.backgroundColor = "white";
    }

    function onFocusinPass() {
        passRef.current.style.outline = "none";
        passRef.current.style.backgroundColor = "white";
    }

    function onFocusinRePass() {
        rePassRef.current.style.outline = "none";
        rePassRef.current.style.backgroundColor = "white";
    }

    function strongPassCheck() {
        var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;

        var pass = password;

        if ((pass != "") && !pass.match(passRegex))
            setIsPassStrong((val) => {
                val = false
                return val
            })
        else
            setIsPassStrong((val) => {
                val = true
                return val
            })

        return isPassStrong;
    }

    function CheckPassword() {
        // console.log('checkPassword');

        var pass = password;
        var repass = repeatPassword;

        // console.log(password)
        // console.log(repeatPassword)

        if (pass !== repass) {
            // console.log(password)
            // console.log(repeatPassword)


            setIsPassSame((val) => {
                val = false
                return val
            })
        }
        else {
            // console.log("pass is true")
            // console.log(password)
            // console.log(repeatPassword)


            setIsPassSame((val) => {
                val = true
                return val
            })
        }

        console.log("isPassSame: " + isPassSame)

        onFocusoutPass();
        onFocusoutRePass();
        disableButton();

        return isPassSame;
    }

    function validateForm() {
        var passValidation;
        var passStrength;

        passValidation = CheckPassword();
        passStrength = strongPassCheck();

        if ((passValidation === false) && ((passStrength === false) || (passStrength === true))) {
            altert1Ref.current.innerHTML = "Password does not match";
        }
        else if ((passValidation === true) && (passStrength === false)) {
            altert2Ref.current.innerHTML = "Please enter a strong password";
        }
        else {
            altert1Ref.current.innerHTML = "";
            altert2Ref.current.innerHTML = "";
        }

        return passValidation && passStrength;
        
    }

    const submitHandler = async (e) => {
        console.log("hi")
        e.preventDefault()
        const res = await axios.post("http://localhost:3500/admin/createtheatreadmin", {
            username: username,
            password: password
        })
            .then((data) => {
                console.log(data)
                altert1Ref.current.innerHTML = data.data.message
            })
            .catch((err) => {
                console.log(err)
                // setError(err.response.data.error)
                altert1Ref.current.innerHTML = err.response.data.error
            })
    }

    useEffect(() => {
        if (!adminLogin) {
            navigate('/admin/login')
        }
    }, [])

    useEffect(() => {
        validateForm()
    }, [username, password, repeatPassword, isPassSame, isPassStrong])

    return (
        <div class="main-register">
            <div class="div-container">
                <img src="/assets/Logo.png" onClick={() => navigate('/')} class="logoreg" />
                <div class="text-div">
                    <form id="registerForm" onSubmit={submitHandler}>
                        <div class="head-div">Create a New Theatre Admin</div>

                        <div class="email-div">
                            <label htmlFor="name-input" class="email-label" style={{ opacity: "70%" }}>Username</label>
                            <input type="username" ref={nameRef} value={username} onChange={(e) => setUsername(e.target.value)} name="username" class="email-box" placeholder="Alex John" id="name-input" required autoComplete="off"
                                onFocus={onFocusinName}
                                onBlur={onFocusoutName}
                                onInvalid={(e) => e.target.setCustomValidity('Username can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                        </div>

                        <div class="pass-div">
                            <label htmlFor="password-input" class="password-label" style={{ opacity: "70%" }}>Password</label>
                            <input type="password" ref={passRef} value={password} onChange={(e) => setPassword(e.target.value)} name="password" class="password-box" placeholder="Password" id="password-input" required autoComplete="off"
                                onFocus={onFocusinPass}
                                onBlur={onFocusoutPass}
                                onInvalid={(e) => e.target.setCustomValidity('Password can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                        </div>

                        <div class="pass-div">
                            <label htmlFor="repassword-input" class="password-label" style={{ opacity: "70%" }}>Enter the password again</label>
                            <input type="password" ref={rePassRef} value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} name="re-password" class="password-box" placeholder="Password" id="repassword-input"
                                onFocus={onFocusinRePass}
                                onBlur={onFocusoutRePass}
                                required autoComplete="off" />

                        </div>

                        <button type="submit" class="btn btn-outline-info" style={{ width: "100%" }} id="submit-button" disabled={sbDisabled}>
                            Sign up
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </button>
                    </form>
                    <div class="pass-info">
                        Password must be minimum of 8 characters and maximum of 16 characters, atleast one uppercase letter, atleast one lowercase letter,
                        one number, one special character.
                    </div>
                    <div class="header-line"></div>
                    <div class="error-div" ref={altert1Ref} id="alert-zone-1"> {error} </div>
                    <div class="error-div" ref={altert2Ref} id="alert-zone-2"> {error2} </div>
                </div>
                <div class="img-div"></div>
            </div>
        </div>
    )
}

export default AdminRegister

