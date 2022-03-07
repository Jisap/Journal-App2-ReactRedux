import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForms';

export const LoginScreen = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.ui)

    const [ formValues, handleInputChange ] = useForm({ // Valores del formulario y función que lo modifica
        email: 'nando@gmail.com',
        password: '123456',
    })

    const {email, password} = formValues; // Desestructuramos de los valores del formulario que inputs necesitamos

    const handleLogin = (e) => {                    // Cuando se toca el boton de submit del formulario se dispara 
        e.preventDefault();                         // la acción de logueo
        console.log(email, password)
        dispatch( startLoginEmailPassword( email, password ) )
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() )
    }

    return (
        <div>

            <h3 
                className="auth__title"
                className="animate__animated animate__fadeIn"    
            >Login</h3>

            <form onSubmit={ handleLogin }>

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>

                    </div>
                </div>

                <Link 
                    className="link"
                    to="/auth/register">
                    Create new account
                </Link>

            </form>

        </div>
    )
}
