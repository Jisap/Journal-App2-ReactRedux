import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForms';
import  validator  from 'validator'
import { useDispatch } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui )

    const [ formValues, handleInputChange ] = useForm({ // Valores del formulario y función que lo modifica
        name: 'nando2',
        email: 'nando2@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const { name, email, password, password2 } = formValues;  

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch( startRegisterWithEmailPasswordName(email, password, name) )

        if( isFormValid()){                             // Si isFormValid devuelve un true se dispara el mensaje de ok
            console.log('Formulario correcto');
            dispatch( removeError() )
        }   
    }

    const isFormValid = () => {
        if (validator.isEmpty(name)) {
            dispatch(setError('Invalid name'))
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Invalid email'))
            return false
        } else if ((!validator.equals(password, password2)) || password.length < 5) {
            dispatch(setError('Invalid password'))
            return false
        }
        dispatch( removeError())
        return true;
    }

    return (
        <div>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn"    
            >

                {
                    msgError && (
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                    )    
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value = { name }
                    onChange={ handleInputChange }
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="mail"
                    className="auth__input"
                    autoComplete="off"
                    value = { email }
                    onChange={ handleInputChange }
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value = { password }
                    onChange={ handleInputChange }
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value = { password2 }
                    onChange={ handleInputChange }
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link 
                    className="link"
                    to="/auth/login">
                    Already registered ?
                </Link>

            </form>

        </div>
    )
}
