import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { userContext } from "./src/userContext.jsx";
import { useSearch } from "./src/SearchContext.jsx";

export default function Header() {
    const { user, setUser } = useContext(userContext);
    const { searchTerm, setSearchTerm, handleSearch, resetSearch } = useSearch();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const submitSearch = (e) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    const handleLogoClick = () => {
        resetSearch();
    }

    async function logout() {
        await axios.post('/logout');
        setIsMenuOpen(false);
        navigate('/');
        setUser(null);
    }

    // Effect to close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="shadow-md bg-white sticky top-0 z-50">
            <header className="flex justify-between items-center px-4 md:px-6 py-3 max-w-7xl mx-auto">
                {/* --- UPDATED LOGO AND BRAND NAME --- */}
                <Link to={"/"} onClick={handleLogoClick} className="flex items-center gap-2 text-green-900 hover:text-green-800 transition">
                    {/* New Stayzyy SVG Logo */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#064e3b"/>
                        <path d="M12 5.5l-5 4.5v6h3v-4h4v4h3v-6l-5-4.5z" fill="#34d399"/>
                    </svg>
                    <span className="font-extrabold text-2xl tracking-tight" style={{fontFamily: "'Poppins', sans-serif"}}>
                        Stayzyy
                    </span>
                </Link>
                {/* --- END OF UPDATE --- */}

                {/* Search Bar */}
                <form onSubmit={submitSearch} className="flex items-center border-2 border-gray-200 rounded-full py-2 px-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <input type="text" placeholder="Start your search" className="focus:outline-none px-2 w-32 sm:w-64" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    <button type="submit" className="bg-green-900 hover:bg-green-800 text-white rounded-full p-2.5 transition transform hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>

                {/* User Section with Dropdown */}
                <div className="flex items-center gap-4">
                    <Link to={user ? '/account/places/new' : '/login'} className="hidden md:block font-semibold text-gray-700 hover:text-green-900 bg-gray-100 hover:bg-gray-200 transition-all duration-300 py-2.5 px-5 rounded-full">
                        List your space
                    </Link>
                    <div className="relative" ref={menuRef}>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-3 border border-gray-300 rounded-full py-2 px-3 hover:shadow-md transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <div className="bg-gray-500 text-white rounded-full p-1 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                            {!!user && (
                                <div className="hidden lg:block font-semibold">
                                    {user.name}
                                </div>
                            )}
                        </button>

                        {isMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border z-10 overflow-hidden">
                                {user ? (
                                    <>
                                        <Link to={'/account'} className="block px-4 py-3 hover:bg-gray-100 transition font-semibold text-gray-800">My Profile</Link>
                                        <Link to={'/account/bookings'} className="block px-4 py-3 hover:bg-gray-100 transition font-semibold text-gray-800">My Bookings</Link>
                                        <Link to={'/account/places'} className="block px-4 py-3 hover:bg-gray-100 transition font-semibold text-gray-800">My Accommodations</Link>
                                        <div className="border-t"></div>
                                        <Link to={'/help'} className="block px-4 py-3 hover:bg-gray-100 transition font-semibold text-gray-800">Help Center</Link>
                                        <Link to={'/contact'} className="block px-4 py-3 hover:bg-gray-100 transition font-semibold text-gray-800">Contact Us</Link>
                                        <div className="border-t"></div>
                                        <button onClick={logout} className="w-full text-left px-4 py-3 hover:bg-gray-100 transition font-semibold text-red-600">Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to={'/login'} className="block px-4 py-3 hover:bg-gray-100 transition font-semibold text-gray-800">Login</Link>
                                        <Link to={'/register'} className="block px-4 py-3 hover:bg-gray-100 transition font-semibold text-gray-800">Sign Up</Link>
                                        <div className="border-t"></div>
                                        <Link to={'/help'} className="block px-4 py-3 hover:bg-gray-100 transition font-semibold text-gray-800">Help Center</Link>
                                        <Link to={'/contact'} className="block px-4 py-3 hover:bg-gray-100 transition font-semibold text-gray-800">Contact Us</Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

