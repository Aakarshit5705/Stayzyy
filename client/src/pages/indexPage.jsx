import React from "react";
import { Link } from "react-router-dom";
import { useSearch } from '../SearchContext';

export default function IndexPage() {
    const { places, loading, searchTerm, resetSearch } = useSearch();

    // Render a loading message while data is being fetched
    if (loading) {
        return (
            <div className="text-center mt-16">
                <h2 className="text-2xl font-semibold text-gray-700">Loading places...</h2>
            </div>
        );
    }

    return (
        <div>
            {/* --- Clear Search Button (shows only when a search is active) --- */}
            {searchTerm && (
                <div className="text-center mb-8">
                    <button
                        onClick={resetSearch}
                        className="py-2 px-6 bg-white border border-gray-300 hover:bg-gray-100 hover:shadow-md rounded-full text-gray-700 font-semibold transition-all duration-300 inline-flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        Clear search results for "{searchTerm}"
                    </button>
                </div>
            )}

            {/* Places Grid */}
            <div className="mt-8 gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {places.length > 0 ? (
                    places.map((place) => (
                        <Link
                            to={'/place/' + place._id}
                            key={place._id}
                            className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-1 cursor-pointer group"
                        >
                            {/* Image */}
                            <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
                                {place.photos?.[0] && (
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/uploads/` + place.photos[0]}
                                        alt={place.title}
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105 group-hover:rotate-1"
                                    />
                                )}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/30 rounded-bl-3xl pointer-events-none"></div>
                            </div>
                            {/* Info */}
                            <div className="p-4">
                                <h2 className="font-extrabold text-lg mb-1 text-gray-900 group-hover:text-blue-500 transition-colors duration-300">
                                    {place.address}
                                </h2>
                                <h3 className="text-gray-500 truncate mb-3">{place.title}</h3>
                                <div className="text-gray-800 font-semibold text-md relative inline-block after:block after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-300 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300">
                                    ${place.price} / night
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-200/50 to-transparent pointer-events-none"></div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center mt-16">
                        <h2 className="text-2xl font-semibold text-gray-700">No places found</h2>
                        <p className="text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

