import { Navigate } from "react-router-dom";


export const PublicRoute = ({ isAuth, children }) => {

    return isAuth ? <Navigate to="/" /> : children; // Si esta el usuario logueado navegamos a JournalScrenn
}                                                   // Sino al children de esta ruta osea authRouter