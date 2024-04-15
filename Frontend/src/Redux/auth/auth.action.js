import { GET_AUTH_FAILURE, GET_AUTH_SUCCESS, GET_TERMS_ACCEPTED } from "./auth.types";


export const handleTerms=()=>dispatch=>{
    try {
        dispatch({type:GET_TERMS_ACCEPTED})
        
    } catch (error) {
        
    }
}
export const handleLogout=() => dispatch=> {
    try {
        dispatch({type:GET_AUTH_FAILURE})
        
    } catch (error) {
        
    }
}