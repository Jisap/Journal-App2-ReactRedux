import { db } from "../firebase/firebaseConfig"


export const loadNotes = async( uid ) => {
    
    const notesSnap = await db.collection(`${ uid }/journal2/notes`).orderBy("date").get() // Petición a firebase;
    
    
    const notes = []

    notesSnap.forEach( snapHijo => {    // Recorrido de la resp y añadido de cada elemento a notes[]
        notes.push({
            id: snapHijo.id, 
            ...snapHijo.data(),
        })
    })

    console.log(notes)

    return notes
}