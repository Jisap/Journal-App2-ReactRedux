import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig'
import { finishLoading, startLoading } from "./ui"
import Swal from 'sweetalert2'
import { noteLogout } from "./notes"

export const startLoginEmailPassword =  ( email, password ) => {
    return ( dispatch ) => {                                          // El dispatch Lo proporciona thunk
            
        dispatch( startLoading() )

        firebase.auth().signInWithEmailAndPassword( email, password ) // firebase logea un usuario en base a los args del form
            .then(({user}) => {
                dispatch(login( user.email, user.password))
                dispatch( finishLoading() )
            })
            .catch( e => {
                console.log(e)
                dispatch( finishLoading() )
                Swal.fire('Error', e.message, 'error')
            })
    }
}
 
export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider ) // firebase crea un usuario en base a las credenciales de google
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName ))
            })
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )   // firebase crea un usuario en base a los args del form
            .then(  async({ user }) => {
                await user.updateProfile({ displayName: name })             // actualizamos el displayName
                dispatch(login( user.uid, user.displayName ))               // modificamos el state (logeo)
            })
            .catch( e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const login = ( uid, displayName ) => ({
    
    type:types.login,
    payload:{
        uid,
        displayName
    }

})

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut()
        dispatch( logout() )
        dispatch( noteLogout())
    }
}

export const logout = () => ({
    type: types.logout,

})