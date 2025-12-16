import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PhotoUploader from "../photosUploader.jsx";
import Perks from "./Perks.jsx";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import { useEffect } from "react";



export default function PlacesForm(){
  const{id}=useParams();
  const[title,setTitle]=useState('');
  const[address,setAddress]=useState('');
  const[addedPhotos,setAddedPhotos]=useState([]);
  const[description,setDescription]=useState('');
  const[perks,setPerks]=useState([]);
  const[extraInfo,setExtraInfo]=useState('');
  const[checkIn,setCheckIn]=useState('');
  const[checkOut,setCheckOut]=useState('');
  const[maxGuests,setMaxGuests]=useState(1);
  const[price,setPrice]=useState(0);
  const [redirect,setRedirect]=useState(false);


  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get('places/'+id)
    .then(response=>{
      const{data}=response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    })

  },[id])
    async function handleSubmit(e){
    e.preventDefault();
    const placeData={title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price};
    if(id){
      //update

      await axios.put('/places',{id,...placeData});
      setRedirect(true);
      console.log(redirect);

    }
    else{
      //PostNew
      await axios.post('/places',placeData);
      setRedirect(true);
      
    }
    
    
  };
 

  if(redirect){
    return <Navigate to={'/account/places'}/>
  }
    return(
        <>
        <div>
          <AccountNav/>
          <form className="max-w-5xl mx-auto mt-5 bg-white p-10 rounded-3xl shadow-2xl space-y-10 border border-gray-200" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-1">Title</h2>
              <p className="text-gray-500 text-sm mb-3">Add some catchy title...</p>
              <input
                type="text"
                placeholder="Add Title"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-900 focus:border-green-900 transition shadow-sm"
               value={title} onChange={e=>setTitle(e.target.value)}
              />
            </div>

            {/* Address */}
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-1">Address</h2>
              <p className="text-gray-500 text-sm mb-3">Add address of your place...</p>
              <input
                type="text"
                placeholder="Address"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-900 focus:border-green-900 transition shadow-sm"
                value={address} onChange={e=>setAddress(e.target.value)}
              />
            </div>

            {/* Photos */}
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-1">Photos</h2>
              <p className="text-gray-500 text-sm mb-3">More = Better</p>
              < PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-1">Description</h2>
              <p className="text-gray-500 text-sm mb-3">Add valid description...</p>
              <textarea
                className="w-full border rounded-xl px-4 py-3 h-28 focus:ring-2 focus:ring-green-900 focus:border-green-900 transition shadow-sm"
                value={description} onChange={e=>setDescription(e.target.value)}
              />
            </div>

            {/* Perks */}
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-1">Perks</h2>
              <p className="text-gray-500 text-sm mb-4">Check all the perks of your place...</p>
              <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks selected={perks} onChange={setPerks}/>
              </div>
            </div>

            {/* Extra Info */}
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-1">Extra Info</h2>
              <p className="text-gray-500 text-sm mb-3">Rules etc...</p>
              <textarea
                className="w-full border rounded-xl px-4 py-3 h-20 focus:ring-2 focus:ring-green-900 focus:border-green-900 transition shadow-sm"
                value={extraInfo} onChange={e=>setExtraInfo(e.target.value)}
              />
            </div>

            {/* Check In/Out */}
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-1">Check In & Out Time</h2>
              <p className="text-gray-500 text-sm mb-3">Add Check In and Out Time etc...</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div>
                  <h3 className="mb-1 font-semibold">Check In Time</h3>
                  <input
                    type="text"
                    placeholder="14:00"
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-900 focus:border-green-900 transition shadow-sm"
                    value={checkIn} onChange={e=>setCheckIn(e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Check Out Time</h3>
                  <input
                    type="text"
                    placeholder="12:00"
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-900 focus:border-green-900 transition shadow-sm"
                    value={checkOut} onChange={e=>setCheckOut(e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Max Guests</h3>
                  <input
                    type="number"
                    placeholder="6.."
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-900 focus:border-green-900 transition shadow-sm"
                    value={maxGuests} onChange={e=>setMaxGuests(e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Price Per Night</h3>
                  <input
                    type="number"
                    placeholder="$"
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-900 focus:border-green-900 transition shadow-sm"
                    value={price} onChange={e=>setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div>
              <button
                type="submit"
                className="bg-green-900 p-4 w-full rounded-2xl text-white text-xl font-bold shadow-lg hover:bg-green-800 active:scale-95 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        </>
    )
}