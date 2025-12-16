import { Link, useLocation } from "react-router-dom"

export default function AccountNav(){
    const {pathname}=useLocation();
    let subpage=pathname.split('/')?.[2];
    if(subpage==undefined){
        subpage='profile';
    }
    function LinkClasses(type=null){
    let classes="py-2 px-6  text-lg rounded-full inline-flex gap-2";
    if(type===subpage){
        classes+=" bg-green-900 text-white ";
    }
    else{
        classes+=" bg-gray-200"
    }
    return classes;
}
    return(
        <>
        <nav className="w-full flex mt-8 gap-2 justify-center pl-15">
        <Link to={'/account'} className={LinkClasses('profile')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        My Profile</Link>
        <Link to={'/account/bookings'} className={LinkClasses('bookings')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        My Bookings</Link>
        <Link to={'/account/places'} className={LinkClasses('places')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
        My Accommodations</Link>
       </nav>
        </>
    )
}