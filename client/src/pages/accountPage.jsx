import { useContext } from "react";
import { userContext } from "../userContext";
import { Link, useParams,Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import PlacesPage from "./placesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function AccountPage(){
    const[redirect,setRedirect]=useState(null);
    const{ready,user,setUser}=useContext(userContext);
    let{subpage}=useParams();
    if(subpage===undefined){
        subpage='profile';
    }

if(!ready){
    return 'Loading..........'
}

if(ready&&!user&&!redirect){
    return <Navigate to={'/login'}/>
}

async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
}


if(redirect){
    return <Navigate to={redirect}/>;
}

return(
    <div>
        <AccountNav/>
       
{subpage === 'profile' && (
  <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg text-center">
    <h2 className="text-2xl font-semibold mb-2 text-green-900">Welcome, {user.name}!</h2>
    <p className="text-gray-600 mb-4">Email: <span className="font-medium">{user.email}</span></p>
    <hr className="my-4 border-gray-300" />

    <button onClick={logout}
      className="mt-4 px-8 py-2 bg-green-900 text-white rounded-full text-lg font-medium transition transform hover:bg-green-800 hover:scale-105 active:scale-95"
    >
      Log Out
    </button>
  </div>
)}
{
    subpage==='places'&&(
        <div><PlacesPage/></div>
    )
}
    </div>
)
}