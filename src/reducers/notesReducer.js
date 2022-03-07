/*
{ 
    notes:[],
    active: null,
    active:{
        id: 'esiekjh2k3j42kj23khmnk',
        title:'',
        imageUrl:'',
        date: 2424242566757
    }
}
*/

import { types } from "../types/types";

const initialState = {
    notes:[],
    active: null,
}

export const notesReducer = ( state = initialState , action ) => {

    switch (action.type) {
        
        case types.notesActive:            // Crea el campo active = action.payload = activeNote( doc.id, newNote ) proveniente de startNewNote
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        case  types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }

        
        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]    // Establece las notes en el state
            }
        
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id // Si la id de la note coincide con la del payload
                    ? action.payload.note                 // devolvemos la nota del payload que queremos actualizar  
                    : note                                // Sino la dejamos como esta.  
                )
            }

        case types.notesDelete:
            return{
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload ) // Filtramos la nota cuya id coincida con la del payload
            }

        case types.notesLogoutCleaning:
            return{
                ...state,
                active: null,
                notes: []
            }


        default:
            return state;
    }
}
