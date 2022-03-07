import { useState } from 'react';


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);   // Values representa los valores del formulario

    const reset = ( newFormState = initialState ) => {    // Reseteo de los valores del formulario a unos nuevos dados por args
        setValues( newFormState );
    }


    const handleInputChange = ({ target }) => {         // Función para cambiar el valor de uno de los imputs del form

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    return [ values, handleInputChange, reset ];

}