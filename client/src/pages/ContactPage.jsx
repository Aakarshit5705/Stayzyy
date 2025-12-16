import React from 'react';

const InfoCard = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <div className="text-gray-600 mt-1">{children}</div>
        </div>
    </div>
);

export default function ContactPage() {
    const address = "Connaught Place, New Delhi, Delhi 110001, India";
    const email = "msd40551@gmail.com";
    const phone = "+91 91030 00000";

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Get in Touch
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        We're here to help. Contact us with any questions or concerns you may have.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Address Card */}
                    <InfoCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        }
                        title="Our Office"
                    >
                        <p>{address}</p>
                    </InfoCard>

                    {/* Email Card */}
                    <InfoCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        }
                        title="Email Us"
                    >
                        <a href={`mailto:${email}`} className="text-green-700 hover:underline">{email}</a>
                    </InfoCard>

                    {/* Phone Card */}
                    <InfoCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        }
                        title="Call Us"
                    >
                        <p>{phone}</p>
                    </InfoCard>
                </div>

                {/* Embedded Map */}
                <div className="mt-16">
                    <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
