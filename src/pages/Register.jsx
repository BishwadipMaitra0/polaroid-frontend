import React, { useEffect, useState } from 'react'
import "../styles/Login.css"
import { useNavigate } from 'react-router'
import { useAppSelector } from '../app/hooks'
import axios from 'axios'

const Register = () => {

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [sbDisabled, setDisabled] = useState(false)

    const [isPassSame, setIsPassSame] = useState(true)
    const [isInvalidEmail, setIsInvalidEmail] = useState(false)
    const [isPassStrong, setIsPassStrong] = useState(true)

    const User = useAppSelector((state) => state.user)

    useEffect(() => {
        // console.log(User)
        if (User.status==="failed" && User.method==="login") {
            setError(User.error)
        }
        else if (User.status==="succeeded" && User.method==="login") {
            navigate("/")
        }

        if (User.isLoggedIn === true) {
            navigate('/', {replace: true})
        }
    }, [,User])

    function onFocusoutRePass() {
        if (!isPassSame || !isPassStrong) {
            document.getElementById('repassword-input').style.backgroundColor = "#eb9898";
            document.getElementById('repassword-input').style.outline = "2px solid red";
        }
        else {
            document.getElementById('repassword-input').style.backgroundColor = "#a3d4ec";
            document.getElementById('repassword-input').style.outline = "none";
        }
    }

    function disableButton() {
        if (!isPassSame || isInvalidEmail || !isPassStrong) {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }

    function onFocusoutEmail() {
        if (isInvalidEmail) {
            document.getElementById('email-input').style.backgroundColor = "#eb9898";
            document.getElementById('email-input').style.outline = "2px solid red";
        }
        else {
            document.getElementById('email-input').style.backgroundColor = "#a3d4ec";
            document.getElementById('email-input').style.outline = "none";
        }
    }

    function onFocusoutName() {
        document.getElementById('name-input').style.backgroundColor = "#a3d4ec";
    }

    function onFocusoutPass() {
        if (!isPassSame || !isPassStrong) {
            document.getElementById('password-input').style.backgroundColor = "#eb9898";
            document.getElementById('password-input').style.outline = "2px solid red";
        }
        else {
            document.getElementById('password-input').style.outline = "none";
            document.getElementById('password-input').style.backgroundColor = "#a3d4ec";
        }
    }

    function onFocusinEmail() {
        document.getElementById('email-input').style.outline = "none";
        document.getElementById('email-input').style.backgroundColor = "white";
    }

    function onFocusinName() {
        document.getElementById('name-input').style.outline = "none";
        document.getElementById('name-input').style.backgroundColor = "white";
    }

    function onFocusinPass() {
        document.getElementById('password-input').style.outline = "none";
        document.getElementById('password-input').style.backgroundColor = "white";
    }

    function onFocusinRePass() {
        document.getElementById('repassword-input').style.outline = "none";
        document.getElementById('repassword-input').style.backgroundColor = "white";
    }

    function strongPassCheck() {
        var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;

        var pass = password;

        if ((pass != "") && !pass.match(passRegex))
            setIsPassStrong(false);
        else
            setIsPassStrong(true);

        return isPassStrong;
    }

    function checkPassword() {
        console.log('checkPassword');

        var pass = password;
        var repass = repeatPassword;

        if (pass !== repass) {
            setIsPassSame(false);

        }
        else {
            setIsPassSame(true);
        }

        onFocusoutPass();
        onFocusoutRePass();
        disableButton();

        return isPassSame;
    }

    function checkEmail() {
        var emailRegex = /\S+@\S+\.\S+/;

        if ((email === '') || (!email.match(emailRegex))) {
            // document.getElementById('email-input').style.outline = "2px solid red";
            // document.getElementById('email-input').style.backgroundColor = "#eb9898";

            setIsInvalidEmail(true);
        }
        else {
            setIsInvalidEmail(false);
        }

        onFocusoutEmail();

        return !isInvalidEmail;
    }

    function validateForm() {
        var emailValidation;
        var passValidation;
        var passStrength;

        emailValidation = checkEmail();
        passValidation = checkPassword();
        passStrength = strongPassCheck();

        if ((emailValidation === false) && (passValidation === false) && ((passStrength === false) || (passStrength === true))) {
            document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
            document.getElementById('alert-zone-2').innerHTML = "Password does not match";
        }
        else if ((emailValidation === false) && (passValidation === true) && (passStrength === false)) {
            document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
            document.getElementById('alert-zone-2').innerHTML = "Please enter a strong password";
        }
        else if ((emailValidation === false) && (passValidation === true) && (passStrength === true)) {
            document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
            document.getElementById('alert-zone-2').innerHTML = "";
        }
        else if ((emailValidation === true) && (passValidation === false) && ((passStrength === false) || (passStrength === true))) {
            document.getElementById('alert-zone-1').innerHTML = "Password does not match";
            document.getElementById('alert-zone-2').innerHTML = "";
        }
        else if (passStrength === false) {
            document.getElementById('alert-zone-1').innerHTML = "Please enter a strong password";
            document.getElementById('alert-zone-2').innerHTML = "";
        }
        else {
            document.getElementById('alert-zone-1').innerHTML = "";
            document.getElementById('alert-zone-2').innerHTML = "";
        }

        return emailValidation && passValidation && passStrength;
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const res = await axios.post("http://localhost:3500/user/register", {
            email: email,
            username: username,
            password: password
        })
        .then((data) => {
            console.log(data)
            navigate('/user/login')
        })
        .catch((err) => {
            console.log(err)
            setError(err.response.data.error)
        })
    }

    return (
        <div class="main-register">
            <div class="div-container">
                <img src="/assets/Logo.png" onClick={() => navigate('/')} class="logoreg" />
                <div class="text-div">
                    <form id="registerForm" onChange={() => validateForm()} onSubmit={submitHandler}>
                        <div class="head-div">Sign up</div>

                        <div class="email-div">
                            <label htmlFor="email-input" class="email-label" style={{ opacity: "70%" }}>Email address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" class="email-box" placeholder="input@example.com" id="email-input" required autoComplete="off"
                                onInvalid={(e) => e.target.setCustomValidity('Email Address can not be empty')}
                                onFocus={onFocusinEmail}
                                onBlur={onFocusoutEmail}
                                onInput={(e) => e.target.setCustomValidity('')} 
                                />
                        </div>

                        <div class="email-div">
                            <label htmlFor="name-input" class="email-label" style={{ opacity: "70%" }}>Username</label>
                            <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" class="email-box" placeholder="Alex John" id="name-input" required autoComplete="off"
                                onFocus={onFocusinName}
                                onBlur={onFocusoutName}
                                onInvalid={(e) => e.target.setCustomValidity('Username can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')} 
                                />
                        </div>

                        <div class="pass-div">
                            <label htmlFor="password-input" class="password-label" style={{ opacity: "70%" }}>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" class="password-box" placeholder="Password" id="password-input" required autoComplete="off"
                                onFocus={onFocusinPass}
                                onBlur={onFocusoutPass}
                                onInvalid={(e) => e.target.setCustomValidity('Password can not be empty')}
                                onInput={(e) => e.target.setCustomValidity('')} 
                                />
                        </div>

                        <div class="pass-div">
                            <label htmlFor="repassword-input" class="password-label" style={{ opacity: "70%" }}>Enter the password again</label>
                            <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} name="re-password" class="password-box" placeholder="Password" id="repassword-input" 
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
                    <div class="login-div">Already have an account ? <a href="/user/login">Log in</a></div>
                    <div class="pass-info">
                        Password must be minimum of 8 characters and maximum of 16 characters, atleast one uppercase letter, atleast one lowercase letter,
                        one number, one special character.
                    </div>
                    <div class="header-line"></div>
                    <div class="error-div" id="alert-zone-1"> {error} </div>
                    <div class="error-div" id="alert-zone-2"></div>
                </div>
                <div class="img-div"></div>
            </div>
        </div>
    )
}

export default Register