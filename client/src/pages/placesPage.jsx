
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav.jsx";
import { useEffect, useState } from "react";
import axios from 'axios';
import PlaceImg from "../PlaceImg.jsx";


export default function PlacesPage() {
  const [places,setPlaces]=useState([]);
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/user-places`).then(({data})=>{
      setPlaces(data);
    });
  },[]);
  return (
    <div>
      <AccountNav/>
        <div className="text-center mt-10">
          <Link
            to={"/account/places/new"}
            className="bg-green-900 py-2 px-6 rounded-full text-white inline-flex gap-1 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Add new Place
          </Link>
        </div>
<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {places.length > 0 && places.map(place => (
    <Link
      key={place._id}
      to={'/account/places/' + place._id}
      className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
    >
      <div className="relative h-48 w-full">
        <PlaceImg place={place}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
          {place.title}
        </h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {place.description}
        </p>
      </div>
    </Link>
  ))}
</div>
      
    </div>
  );
}
