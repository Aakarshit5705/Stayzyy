import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

export default function PaymentPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); // State to track payment processing

    if (!state || !state.bookingData) {
        navigate('/');
        return null;
    }
    const { bookingData } = state;

    const handlePayment = async (e) => {
        e.preventDefault();
        if (isProcessing) return; // Prevent multiple submissions

        setIsProcessing(true); // Set processing to true immediately

        try {
            const response = await axios.post('/bookings', bookingData);
            const bookingId = response.data._id;

            setShowSuccessPopup(true);

            setTimeout(() => {
                navigate(`/account/bookings/${bookingId}`);
            }, 3000);

        } catch (err) {
            console.error("Failed to finalize booking:", err);
            if (err.response && err.response.status === 409) {
                 alert('It looks like you have already booked this for the selected dates.');
            } else {
                alert('There was an error confirming your booking. Please try again.');
            }
            setIsProcessing(false); // Re-enable the button if an error occurs
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
                {/* --- Left Side: Booking Summary --- */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">{bookingData.place.title}</h3>
                            <p className="text-sm text-gray-500">{bookingData.place.address}</p>
                        </div>
                        <div className="flex justify-between border-t pt-4">
                            <span className="text-gray-600">Check-in</span>
                            <span className="font-semibold">{format(new Date(bookingData.checkIn), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Check-out</span>
                            <span className="font-semibold">{format(new Date(bookingData.checkOut), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex justify-between border-t pt-4">
                            <span className="text-lg font-bold">Total Price</span>
                            <span className="text-lg font-bold text-green-700">${bookingData.price}</span>
                        </div>
                    </div>
                </div>

                {/* --- Right Side: Dummy Payment Form --- */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm your Payment</h2>
                    <form onSubmit={handlePayment} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Card Number</label>
                            <input type="text" placeholder="**** **** **** 1234" className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                            <input type="text" placeholder="John Doe" className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none" required />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                <input type="text" placeholder="MM/YY" className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none" required />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">CVC</label>
                                <input type="text" placeholder="123" className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none" required />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isProcessing} // Disable button when processing
                            className="w-full flex justify-center items-center gap-2 bg-green-900 text-white font-bold py-3 rounded-lg mt-6 hover:bg-green-800 transition transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
                        >
                            {isProcessing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Pay Now'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* --- Success Popup --- */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-10 rounded-2xl shadow-2xl text-center transform scale-100 transition-transform duration-300">
                        <div className="mx-auto bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">Payment Successful!</h2>
                        <p className="text-gray-600 mt-2">Redirecting to your booking details...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
