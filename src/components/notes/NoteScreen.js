import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForms'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes); // Seleccionamos active y la renombramos a note
    const [ formValues, handleInputChange, reset ] = useForm( note ); // (*)
    const { body, title, id } = formValues;

    //id de la nota activa seleccionada
    const activeId = useRef(note.id); // Referencia a una variable mutable que no renderiza el componente si cambia

    useEffect(() => {                       // Cada vez que seleccionemos una nota cambiamos los valores del noteScreen a mostrar
        //valor nuevo  //valor viejo
        if( note.id !== activeId.current ){ // Si la nota del useSelector cambia respecto de la del useRef
            reset( note )                   // reseteamos la nota a la del useSelector
            activeId.current = note.id      // y establecemos la nueva referencia
        }    
    }, [note, reset])

    const dispatch = useDispatch()

    useEffect(() => {                                          // UseEffect para cambiar el state de la nota activa cambiamos el contenido 
       dispatch( activeNote(formValues.id, {...formValues}) ); // El estado inicial del hook useForm recoge el state de la note (*)

    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch( startDeleting(id))
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />
            
            <div className="notes__content">
                
                <input 
                    className="notes__title-input"
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                >
                </textarea>

                {
                    (note.url) &&
                        (
                            <div className="notes__image">
                                <img 
                                    src={ note.url }
                                    alt="image"
                                />
                            </div>
                        )
                }

            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>
        
        </div>
    )
}
