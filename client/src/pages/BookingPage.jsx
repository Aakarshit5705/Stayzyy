import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddressLink from "../AddressLink";
import PhotoGallery from "../PhotoGallery";
import Dates from "../Dates";

export default function BookingPage() {
    const [booking, setBooking] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`$${import.meta.env.VITE_API_URL}/bookings`).then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    const handleCancelBooking = async () => {
        const toastId = toast.loading('Cancelling your booking...');
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`);
            toast.success('Booking cancelled successfully!', { id: toastId });
            navigate('/account/bookings');
        } catch (err) {
            toast.error('Failed to cancel booking. Please try again.', { id: toastId });
            console.error("Cancellation error:", err);
        }
        setShowCancelModal(false);
    };

    if (!booking) {
        return <div className="text-center mt-16 text-gray-500">Loading booking details...</div>;
    }

    return (
        <div className="my-8 max-w-4xl mx-auto px-4">
            <h1 className="text-3xl lg:text-4xl font-semibold">{booking.place.title}</h1>
            <AddressLink place={booking.place} />

            {/* Booking Information Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 my-6 shadow-lg">
                <div className="flex items-center gap-4 mb-5">
                    <div className="bg-indigo-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
                        Your Booking Info
                    </h2>
                </div>
                <div className="my-6">
                    <Dates booking={booking} />
                </div>
                <hr className="border-t border-gray-200" />
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-600">
                        Total Price
                    </span>
                    <span className="text-3xl font-extrabold text-green-900 tracking-tight">
                        ${booking.price}
                    </span>
                </div>
            </div>

            {/* --- NEW CANCELLATION BUTTON --- */}
            <div className="text-center my-8">
                <button onClick={() => setShowCancelModal(true)} className="bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Cancel this booking
                </button>
            </div>

            <PhotoGallery place={booking.place} />

            {/* --- CANCELLATION CONFIRMATION MODAL --- */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4">
                        <div className="mx-auto bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Confirm Cancellation</h2>
                        <p className="text-gray-600 mt-2">Are you sure you want to cancel this booking? Please note that cancellation charges may apply depending on the host's policy.</p>
                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setShowCancelModal(false)} className="flex-1 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition">
                                Go Back
                            </button>
                            <button onClick={handleCancelBooking} className="flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition">
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

