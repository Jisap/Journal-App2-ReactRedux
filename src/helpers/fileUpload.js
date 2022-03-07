


export const fileUpload = async ( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/downe22q2/upload';

    const formData = new FormData() // Formulario para peticiones https

    formData.append('upload_preset', 'React-journal2'); // Añadimos el upload_preset
    formData.append('file', file);                      // Añadimos el file a subir    

    try {
        
        const resp = await fetch( cloudUrl, {           // Petición a cloudinary
            method: 'POST',
            body: formData
        });

        if( resp.ok ){                                  // Si la subida fue bien
            const cloudResp = await resp.json();        // obtenemos la resp e 
            return cloudResp.secure_url;                // y devolvemos la url a usar en el state
        }else{
            throw await resp.json();
        }


    } catch (error) {
        console.log(error);
    }
}