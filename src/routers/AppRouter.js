import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import {  startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState( true )
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
       firebase.auth().onAuthStateChanged( async( user ) => {      // Observable que vigila el estado de la autenticación (cambios de users)
           if( user?.uid){                                         // Si hay un user.uid ( sino lo hay devuelve null )
               dispatch( login (user.uid, user.displayName ))      // lo loguea en la app y cambia el state.
               setIsLoggedIn( true )
               
               dispatch(startLoadingNotes( user.uid ))
                

            } else {
                setIsLoggedIn( false )
            }
           setChecking(false)
       })

    },[ dispatch, setChecking, setIsLoggedIn ])

    if ( checking ){                        // Hasta que el observable no termine de comprobar la autenticación del user
        return(                             // mostramos el h1
            <h1>Espere...</h1>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={
                    <PublicRoute isAuth={ isLoggedIn }>
                        <AuthRouter /> 
                    </PublicRoute>
                }/>

                <Route path="/" element={
                    <PrivateRoute isAuth={isLoggedIn}>
                        <JournalScreen />
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
        
     
            
        
    )
}
