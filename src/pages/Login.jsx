import { useState } from "react";
import "../styles/Login.css"
import { useNavigate } from "react-router";

const Login = () => {

    const navigate = useNavigate()

    const [isInvalidEmail, setIsInvalidEmail] = useState(false)
    const [alertZone, setAlertZone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitDisabled, setSubmitDisabled] = useState(false)

    const [emailOutline, setEmailOutline] = useState("none")
    const [emailBG, setEmailBG] = useState("#a3d4ec")
    const [passwordOutline, setPasswordOutline] = useState("none")
    const [passwordBG, setPasswordBG] = useState("#a3d4ec")
    
    function emailValidation() {
        var emailRegex = /\S+@\S+\.\S+/;
        
        if (email == "" || !email.match(emailRegex)) {
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

    return (
        <div className="mainLogin">
            <div className="div-container">
                <img src="/assets/Logo.png" onClick={() => navigate("/")} alt="picture" className="logo" />
                <div className="text-div">
                    <form id="loginForm" onChange={() => emailValidation()}>
                        <div className="head-div">Log in</div>
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
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
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
                            Log in
                        </button>
                    </form>
                    <div className="login-div">
                        New to Polaroid ? <a href="/user/register">Join now</a>
                    </div>
                    {/* <div class="error-div" id="alert-zone"> <%= error %> </div> */}
                    <div className="error-div" id="alert-zone">
                        {alertZone}
                    </div>
                    <div className="login-div">
                        {" "}
                        <a href="/user/forgotpassword">Forgot Password?</a>{" "}
                    </div>
                </div>
                <div className="img-div"></div>
            </div>
        </div>
    );
};

export default Login;
