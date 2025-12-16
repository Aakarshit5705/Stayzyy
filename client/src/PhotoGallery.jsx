import { useState } from "react";

export default function PhotoGallery({place}){
    const[showAllPhotos,setShowAllPhotos]=useState(false);
    if (showAllPhotos) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 flex justify-between items-center px-8 py-6 bg-black/60 backdrop-blur-md border-b border-gray-700">
        <h2 className="text-3xl font-bold text-white tracking-wide mr-">
          Photos of {place.title}
        </h2>
        <button
          onClick={() => setShowAllPhotos(false)}
          className="flex items-center gap-2 bg-white text-black py-2 px-5 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 
              1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 
              1 1-1.06 1.06L12 13.06l-5.47 
              5.47a.75.75 0 0 1-1.06-1.06L10.94 
              12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
          Close
        </button>
      </div>

      {/* Image Grid */}
      <div className="px-8 py-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {place?.photos?.length > 0 &&
          place.photos.map((photo, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl border border-gray-700"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${photo}`}
                alt=""
                className="w-full h-[400px] object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
    return(
                <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2 rounded-2xl overflow-hidden">
                {/* Main Image */}
                <div className="overflow-hidden">
                    {place.photos?.[0] && (
                        <img onClick={() => setShowAllPhotos(true)} 
                             className="w-full h-full object-cover cursor-pointer aspect-video lg:aspect-auto transition-transform hover:scale-105 duration-300" 
                             src={`${import.meta.env.VITE_API_URL}/uploads/${place.photos[0]}`} alt="Main property view"/>
                    )}
                </div>
                {/* Small Image Grid */}
                <div className="hidden lg:grid grid-cols-2 gap-2">
                    {place.photos?.slice(1, 5).map((photo, index) => (
                        <div key={index} className="overflow-hidden">
                             <img onClick={() => setShowAllPhotos(true)} 
                                  className="w-full h-full object-cover cursor-pointer aspect-square transition-transform hover:scale-105 duration-300" 
                                  src={`${import.meta.env.VITE_API_URL}/uploads/${photo}`} alt={`View ${index + 2}`}/>
                        </div>
                    ))}
                </div>
            </div>
             {/* Show all photos button appears on top of the gallery */}
            <button onClick={() => setShowAllPhotos(true)} 
                    className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-black font-semibold py-2 px-4 rounded-lg shadow-md border border-gray-300 hover:bg-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                Show all photos
            </button>
        </div>
    )
}