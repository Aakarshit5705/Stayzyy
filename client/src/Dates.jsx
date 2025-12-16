

import {differenceInCalendarDays, format} from 'date-fns'
export default function Dates({booking}){
    return(
                  <div className="flex items-center justify-between my-4 border-y border-gray-200 py-3">
             <div className="text-center">
                <div className="text-xs text-gray-500">CHECK-IN</div>
                <div className="font-semibold text-gray-800">{format(new Date(booking.checkIn), "dd MMM yyyy")}</div>
             </div>
             <div className="flex flex-col items-center text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
                <span className="text-sm font-bold mt-1">
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}{" "} nights
                </span>
             </div>
             <div className="text-center">
                <div className="text-xs text-gray-500">CHECK-OUT</div>
                <div className="font-semibold text-gray-800">{format(new Date(booking.checkOut), "dd MMM yyyy")}</div>
             </div>
          </div>
    )
}