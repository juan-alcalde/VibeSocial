import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { Icon } from "../icons/icon"
import home from "../img/home new.png"
import logout from "../img/logout.png"
import search from "../img/search.png"


export const NavBar = () => {
    const navigate = useNavigate()

    return (
            <>
                <header className="header">
                    <Icon/>
                    <div class="search-bar">
  <input type="text" class="search-input" placeholder="Search"/>
  <span class="search-icon"><img src={search} alt="Icon" style={{ width: '16px', height: 'auto', marginBottom: '3%' }} /></span>
</div>
                        <nav>
                    
                            <ul className="navbar">
                                    <li className="navbar-item active">
                                        <Link className="navbar-Link" to="/"><img src={home} alt="Icon" style={{ width: '17px', height: 'auto', marginBottom: '3%' }} /> Home</Link>
                                    </li>
                                    <li className="navbar-item active">
                                        <Link className="navbar-Link" to="/comp">Component</Link>
                                    </li>
                                        
                            </ul>
                        </nav>
                            {localStorage.getItem("juanapp_user") ?  <Link className="logout-Link" to="" onClick={() => {localStorage.removeItem("juanapp_user"); navigate("/", {replace: true}) }}>Logout <img src={logout} alt="Icon" style={{ width: '17px', height: 'auto', marginBottom: '3%' }}></img></Link> : ""}                        
                </header>
         </>
    )
}

