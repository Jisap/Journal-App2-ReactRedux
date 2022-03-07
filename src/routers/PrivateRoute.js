
import { Navigate } from "react-router-dom"



export const PrivateRoute = ({ isAuth, children }) => {

    return isAuth ? children : <Navigate to="/auth/login" /> // Si esta el usuario logueado navegamos al children: JournalScreen
}                                                            // Sino navegaremos al login.       