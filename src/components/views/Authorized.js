import { Navigate, useLocation } from "react-router-dom"
import "../views/appview.css"

export const Authorized = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("juanapp_user")) {
        return children
    }
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}

