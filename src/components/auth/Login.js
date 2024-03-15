import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import icon from '../img/audio-waves.png'
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("juanapp_user", JSON.stringify({
                        id: user.id
                       
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return ( <>
     
        <main className="loginPage--Container">
             <text className="loginLogoText"> <img src={icon} alt="Icon" style={{ width: '80px', height: 'auto' }} /> Vibe Social </text>
                 <section >
                     <form className="login--Form" onSubmit={handleLogin}>
                             <h2 className="login-Title"> Login</h2>
                            <fieldset>
                                <label htmlFor="inputEmail"> Email Address </label>
                                <input type="email"
                                    value={email}
                                    onChange={evt => set(evt.target.value)}
                                    className="form-control"
                                    placeholder="Email address"
                                    required autoFocus />

                                <label htmlFor="inputPassword"> Password </label>
                                <input type="password"
                                    
                                    className="form-control"
                                    placeholder="Password"
                                     />
                            </fieldset>
                            <fieldset>
                                <button className="submit-btn" type="submit"> Sign In </button>
                            </fieldset>

                                <section className="link--register">
                                    <label>Not a member yet ? <Link to="/register"> sign up</Link> </label>
                                </section>
                     </form> 
            </section>
        </main>
        </>)
}

