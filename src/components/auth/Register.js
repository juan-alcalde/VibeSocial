import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Register.css"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("honey_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main className="register--Container">
            <section>
            <form className="register-Form" onSubmit={handleRegister}>
                <h2>Create A Free Account!</h2>
                <fieldset>
                    <label htmlFor="fullName">Full Name</label>
                    <input onChange={updateCustomer} type="text" id="fullName" className="form-control" placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email address</label>
                    <input onChange={updateCustomer} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="registerPassword">Password</label>
                    <input type="password" id="registerPassword" className="form-control" placeholder="Password"  />
                </fieldset>
                <fieldset>
                    <label htmlFor="ComfirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" className="form-control" placeholder="Password"  />
                </fieldset>
                <fieldset>
                    <input type="checkbox" id="terms" />
                    <label htmlFor="email"> Accept Terms & Conditions</label>
                </fieldset>
                <fieldset>
                    <button type="submit" className="submit-btn">Register</button>
                </fieldset>
                <section className="link--register">
                    <label>Already have an account?
                        <Link to="/login"> sign in here</Link>
                    </label>
                </section>
            </form>
            </section>
        </main>
    );
};
