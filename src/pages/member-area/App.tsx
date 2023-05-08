import axios from "axios"
import { useEffect } from "react"

export const App = () => {
    
    useEffect(()=>{
        axios.get('https://reqres.in/api/users/1').then(res => console.log(res.data))
    })
    
    return(
        <>
        
        
        </>
    )
}