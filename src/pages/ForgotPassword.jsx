import { useEffect, useState } from "react";
import "../styles/Login.css"
import { useNavigate } from "react-router";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUser, userActions } from "../features/userSlice";
import { green } from "@mui/material/colors";

const ForgotPassword = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const User = useAppSelector((state) => state.user)

    const [otpSuccess, setOTPSuccess] = useState("")
    const [otpError, setOTPError] = useState("")

    const [verifyOTPSuccess, setVerifyOTPSuccess] = useState("")
    const [verifyOTPError, setVerifyOTPError] = useState("")

    const [passChangeSuccess, setPassChangeSuccess] = useState("")
    const [passChangeError, setPassChangeError] = useState("")

    const [isInvalidEmail, setIsInvalidEmail] = useState(false)
    const [alertZone, setAlertZone] = useState("")

    const [email, setEmail] = useState("")
    const [disableEmailField, setDisableEmailField] = useState(false)

    const [otp, setOTP] = useState("")
    
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [submitDisabled, setSubmitDisabled] = useState(false)

    const [emailOutline, setEmailOutline] = useState("none")
    const [emailBG, setEmailBG] = useState("#a3d4ec")
    const [passwordOutline, setPasswordOutline] = useState("none")
    const [passwordBG, setPasswordBG] = useState("#a3d4ec")

    // useEffect(() => {
    //     emailValidation()
    //     onFocusoutEmail()
    //     onFocusoutPass()
    //     disableButton()
    // }, [])

    function emailValidation() {
        var emailRegex = /\S+@\S+\.\S+/;

        if (email === "" || !email.match(emailRegex)) {
            setAlertZone("Please enter a valid email address")
            setIsInvalidEmail(true);
        } else {
            setAlertZone("")
            setIsInvalidEmail(false);
        }

        onFocusoutEmail();
        disableButton();

        return !isInvalidEmail;
    }

    function onFocusinEmail() {
        setEmailOutline("none")
        setEmailBG("white")
    }

    function onFocusinPass() {
        setPasswordOutline("none")
        setPasswordBG("white")
    }

    function onFocusoutEmail() {
        if (isInvalidEmail) {
            setEmailBG("#eb9898")
            setEmailOutline("2px solid red")
        } else {
            setEmailBG("#a3d4ec")
            setEmailOutline("none")
        }
    }

    function onFocusoutPass() {
        setPasswordBG("#a3d4ec")
    }

    function disableButton() {
        if (isInvalidEmail) {
            setSubmitDisabled(true)
        } else {
            setSubmitDisabled(false)
        }
    }

    const sendOTP = async () => {
        axios.post("https://polaroid-backend.onrender.com/forgotpassword", {
            email: email
        })
        .then((data) => {
            console.log(data.data)
            setOTPSuccess("OTP Sent Successfully! Please check your inbox!")
            setOTPError("")
            setDisableEmailField(true)
        })
        .catch((err) => {
            console.log(err)
            setOTPSuccess("")
            setOTPError("OTP was not sent! Check if an account with this email exists and try again!")
        })
    }

    const verifyOTP = async () => {
        axios.post("https://polaroid-backend.onrender.com/verifyotp", {
            otp: otp,
            email: email
        })
        .then((data) => {
            console.log(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const changePassword = async (e) => {
        e.preventDefault()
        axios.post("https://polaroid-backend.onrender.com/changepassword", {
            email: email,
            password: password
        })
        .then((data) => {
            console.log(data.data)
            navigate('/user/login')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (User.isLoggedIn) navigate('/')
    }, [])

    return (
        <div className="mainLogin">
            <div className="div-container">
                <img src="/assets/Logo.png" onClick={() => navigate("/")} alt="picture" className="logo" />
                <div className="text-div">
                    <form id="loginForm" onChange={() => emailValidation()} onSubmit={changePassword}>
                        <div className="head-div">Reset Password</div>
                        <div className="email-div">
                            <label
                                htmlFor="email-input"
                                className="email-label"
                                style={{ opacity: "70%" }}
                            >
                                Email address
                            </label>
                            <input
                                value={email}
                                onFocus={() => onFocusinEmail()}
                                onBlur={() => onFocusoutEmail()}
                                type="text"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="email-box"
                                placeholder="input@example.com"
                                id="email-input"
                                required
                                autoComplete="off"
                                onInvalid={(e) => e.target.setCustomValidity("Email Address can not be empty")}
                                onInput={e => e.target.setCustomValidity('')}
                                style={{ backgroundColor: emailBG, outline: emailOutline }}
                            />
                        </div>
                        <button
                            onClick={() => sendOTP()}
                            className="btn btn-outline-info"
                            style={{ width: "100%" }}
                            id="submit-button"
                            disabled={submitDisabled}
                        >
                            Send OTP
                        </button>
                        <div className="error-div" id="alert-zone">
                            {otpError}
                        </div>
                        <div style={{ color: green }}>
                            {otpSuccess}
                        </div>

                        

                        <div className="pass-div">
                            <label
                                htmlFor="otp-input"
                                className="password-label"
                                style={{ opacity: "70%" }}
                            >
                                Enter OTP
                            </label>
                            <input
                                value={otp}
                                onFocus={() => onFocusinEmail()}
                                onBlur={() => onFocusoutEmail()}
                                type="text"
                                name="email"
                                onChange={(e) => setOTP(e.target.value)}
                                className="email-box"
                                placeholder="k7e28g"
                                id="otp-input"
                                required
                                autoComplete="off"
                                onInvalid={(e) => e.target.setCustomValidity("Email Address can not be empty")}
                                onInput={e => e.target.setCustomValidity('')}
                                style={{ backgroundColor: emailBG, outline: emailOutline }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-info"
                            style={{ width: "100%" }}
                            id="submit-button"
                            disabled={submitDisabled}
                        >
                            Log in
                        </button>
                    </form>
                    <div className="login-div">
                        New to Polaroid ? <a onClick={() => navigate("/user/register")}>Join now</a>
                    </div>
                    {/* <div class="error-div" id="alert-zone"> <%= error %> </div> */}
                    <div className="error-div" id="alert-zone">
                        {alertZone}
                    </div>
                    <div className="login-div">
                        {" "}
                        <a onClick={() => navigate('/user/forgotpassword')}>Forgot Password?</a>{" "}
                    </div>
                </div>
                <div className="img-div"></div>
            </div>
        </div>
    );
};

export default ForgotPassword;
