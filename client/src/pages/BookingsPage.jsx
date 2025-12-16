import { useEffect } from "react";
import AccountNav from "../AccountNav.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import PlaceImg from "../PlaceImg.jsx";
import Dates from "../Dates.jsx";

export default function BookingsPage(){
    const [bookings,setBookings]=useState([]);
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/bookings`).then(response=>{
            setBookings(response.data)

        })
    })
    return(
        <div>
            <AccountNav/>
<div className="mt-8 space-y-6">
  {bookings.length==0&&(
    <p className="text-center mt-16 text-gray-500 text-4xl" >No Bookings yet</p>
  )}
  {bookings.length > 0 &&
    bookings.map((booking) => (
      <Link
        to={`/account/bookings/${booking._id}`}
        key={booking._id}
        className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md 
                   border border-gray-200 hover:shadow-xl hover:scale-[1.02] 
                   transition-all duration-300 ease-in-out group"
      >
        <div className="relative w-full aspect-[4/3] md:w-72 md:aspect-auto flex-shrink-0">
          <div className="absolute inset-0">
            <PlaceImg place={booking.place} />

          </div>
        </div>

        {/* --- Content Section (No Changes) --- */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
              {booking.place.title}
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>

              {booking.place.address}
            </p>
          </div>
          <Dates booking={booking}/>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">Total price:</span>
            <span className="text-2xl font-bold text-green-600">
              ${booking.price}
            </span>
          </div>
        </div>
      </Link>
    ))}
</div>

        </div>
    )
}
