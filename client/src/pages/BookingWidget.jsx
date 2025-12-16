import { useState, useContext, useEffect } from "react";
import { differenceInCalendarDays } from 'date-fns';
import { userContext } from "../userContext.jsx";
import { useNavigate } from "react-router-dom";

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const { user } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    // This function now correctly navigates to the payment page
    async function reservePlace() {
        if (!user) {
            return alert('Please log in to make a reservation.');
        }
        if (numberOfNights <= 0) {
            return alert('Please select valid check-in and check-out dates.');
        }

        // THE FIX IS HERE: We now create a single 'bookingData' object
        // that contains the FULL 'place' object, not just its ID.
        const bookingData = {
            place: place, // Pass the entire place object
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price: numberOfNights * place.price,
        };

        // Navigate to the payment page with the complete data
        navigate('/payment', { state: { bookingData } });
    }

    return (
        <div className="flex flex-col gap-5 p-6 rounded-2xl border border-gray-200 shadow-lg bg-white transition-all duration-300 hover:shadow-2xl">
             <div className="flex justify-between items-end">
                <span className="text-3xl font-extrabold text-gray-900">${place.price}</span>
                <span className="text-sm text-gray-500">/ night</span>
            </div>
            <hr className="border-gray-200" />
            <div className="rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-200">
                <div className="flex flex-col sm:flex-row">
                    <div className="py-3 px-4 flex-1 hover:bg-gray-50 transition-colors">
                        <label className="text-xs font-semibold text-gray-600 block">CHECK-IN</label>
                        <input type="date" className="w-full bg-transparent focus:outline-none mt-1 text-gray-800" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-t sm:border-t-0 sm:border-l border-gray-200 flex-1 hover:bg-gray-50 transition-colors">
                        <label className="text-xs font-semibold text-gray-600 block">CHECK-OUT</label>
                        <input type="date" className="w-full bg-transparent focus:outline-none mt-1 text-gray-800" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 hover:bg-gray-50 transition-colors">
                    <label className="text-xs font-semibold text-gray-600 block">GUESTS</label>
                    <input type="number" className="w-full bg-transparent focus:outline-none mt-1 text-gray-800" min="1" max={place.maxGuests} value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div>
                        <div className="py-3 px-4 hover:bg-gray-50 transition-colors">
                            <label className="text-xs font-semibold text-gray-600 block">Your Name</label>
                            <input type="text" className="w-full bg-transparent focus:outline-none mt-1 text-gray-800" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="py-3 px-4 hover:bg-gray-50 transition-colors">
                            <label className="text-xs font-semibold text-gray-600 block">Your Phone Number</label>
                            <input type="tel" className="w-full bg-transparent focus:outline-none mt-1 text-gray-800" placeholder="+91..." value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                    </div>
                )}
            </div>
            <button onClick={reservePlace} className="bg-green-900 text-white font-semibold w-full py-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Reserve
                {numberOfNights > 0 && (
                    <span className="text-white"> for ${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    );
}

