import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const userContext=createContext();

export function UserContextProvider({children}){
const [user,setUser]=useState(null);
const [ready,setReady]=useState(false);
useEffect(()=>{
    if(!user){
        axios.get(`${import.meta.env.VITE_API_URL}/profile`).then(({data})=>{
            setUser(data);
            setReady(true);
        });
    }
},[]);
return(
    <userContext.Provider value={{user,setUser,ready}}>
        {children}
    </userContext.Provider>
)
}