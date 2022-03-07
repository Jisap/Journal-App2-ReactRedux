import { types } from "../types/types"


export const setError = ( err ) => ({   // Establece msgError con el arg
    type: types.uiSetError,
    payload: err
})
export const removeError = () => ({     // Establece el msgError como null
    type: types.uiRemoveError,
})

export const startLoading = () => ({
    type: types.uiStartLoading
})
export const finishLoading = () => ({
    type: types.uiFinishLoading
})
