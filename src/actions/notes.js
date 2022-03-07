import Swal from "sweetalert2"
import { db } from "../firebase/firebaseConfig"
import { fileUpload } from "../helpers/fileUpload"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"



export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth            // getState es similar al useSelector pero de redux
        
        const newNote = {
            title : '',
            body:'',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal2/notes`).add( newNote ) // Añade a firebase una nota nueva
    
        dispatch( activeNote( doc.id, newNote )) // Modifica el state para añadir el campo active con el contenido de la nota.
        dispatch( addNewNote( doc.id, newNote ))
    }
}

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const activeNote = ( id, note ) => ({
    
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid )           // Cargamos las notas de firebase con el helper loadNotes
        dispatch( setNotes( notes ))                   // Establecemos en el state el listado de notes []
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => { 
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;        // id del usuario

        if( !note.url ){                        // Si no viene el url
            delete note.url                     // borramos la prop de la note
        }

        const noteToFirestore = { ...note }     // Nota actualizada a grabar
        delete noteToFirestore.id               // Borramos la id de la nota antigua para no duplicarla en firebase

                      // id user             // id nota          // Contenido de la nota
        await db.doc(`${ uid }/journal2/notes/${ note.id }`).update( noteToFirestore ) // Grabación de la nota
    
        dispatch( refreshNote( note.id, noteToFirestore ))          // Disparamos la action que actualiza la nota en el state
    
        Swal.fire('Saved', note.title, 'success');
    }
} 

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active: activeNote } = getState().notes;    // Obtenemos la nota activa del state y la renombramos

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload( file );           // Subimos a cloudinary la imagen y obtenemos su url
        activeNote.url = fileUrl;                           // Introducimos en la activeNote esa url

        dispatch( startSaveNote( activeNote ) )             // Disparamos la action que graba la nota pero con la url actualizada

        Swal.close()
    }
}

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
        const uid = getState().auth.uid;                                // Obtenemos el id del usuario
        await db.doc(`/${ uid }/journal2/notes/${ id }`).delete();      // Petición de borrado a firebase
        dispatch( deleteNote( id ) );                                   // Borramos del state la nota
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})