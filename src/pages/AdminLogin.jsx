import { useEffect, useState } from "react";
import "../styles/Login.css"
import { useNavigate } from "react-router";
import axios from "axios";

const AdminLogin = (props) => {

    const { adminLogin, setAdminLogin } = props

    const [isInvalidEmail, setIsInvalidEmail] = useState(false)
    const [alertZone, setAlertZone] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [submitDisabled, setSubmitDisabled] = useState(false)

    const [emailOutline, setEmailOutline] = useState("none")
    const [emailBG, setEmailBG] = useState("#a3d4ec")
    const [passwordOutline, setPasswordOutline] = useState("none")
    const [passwordBG, setPasswordBG] = useState("#a3d4ec")

    const navigate = useNavigate()

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

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            if (username === "admin" && password === "Admin@123") {
                setAdminLogin(true)
                navigate('/admin/dashboard')
            }
            else {
                setAlertZone("Admin credentials are incorrect!")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="mainLogin">
            <div className="div-container">
                <img src="/assets/Logo.png" onClick={() => navigate("/")} alt="picture" className="logo" />
                <div className="text-div">
                    <form id="loginForm" onSubmit={submitHandler}>
                        <div className="head-div">Admin Log In</div>
                        <div className="email-div">
                            <label
                                htmlFor="email-input"
                                className="email-label"
                                style={{ opacity: "70%" }}
                            >
                                Username
                            </label>
                            <input
                                value={username}
                                onFocus={() => onFocusinEmail()}
                                onBlur={() => onFocusoutEmail()}
                                type="text"
                                name="email"
                                onChange={(e) => setUsername(e.target.value)}
                                className="email-box"
                                placeholder="input@example.com"
                                id="email-input"
                                required
                                autoComplete="off"
                                onInvalid={(e) => e.target.setCustomValidity("Username can not be empty")}
                                onInput={e => e.target.setCustomValidity('')}
                                style={{ backgroundColor: emailBG, outline: emailOutline }}
                            />
                        </div>
                        <div className="pass-div">
                            <label
                                htmlFor="password-input"
                                className="password-label"
                                style={{ opacity: "70%" }}
                            >
                                Password
                            </label>
                            <input
                                value={password}
                                onFocus={() => onFocusinPass()}
                                onBlur={() => onFocusoutPass()}
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="password-box"
                                placeholder="Password"
                                id="password-input"
                                required
                                autoComplete="off"
                                onInvalid={(e) => e.target.setCustomValidity("Password can not be empty")}
                                onInput={e => e.target.setCustomValidity('')}
                                style={{ backgroundColor: passwordBG, outline: passwordOutline }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-info"
                            style={{ width: "100%" }}
                            id="submit-button"
                            disabled={submitDisabled}
                        >
                            Log In
                        </button>
                    </form>
                    <hr></hr>
                    <div className="error-div" id="alert-zone">
                        {alertZone}
                    </div>
                </div>
                <div className="img-div"></div>
            </div>
        </div>
    );
};

export default AdminLogin;
