import React, { useState } from 'react';

// This new component manages the expanding/collapsing of each resource item
const ResourceItem = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left p-6 hover:bg-gray-50 focus:outline-none"
            >
                <div className="flex items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mr-4">
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 text-green-800 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-6 pb-6 pt-2">
                    <div className="prose text-gray-600 max-w-none">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function HostingResourcesPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">Hosting Resources</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know to become a successful host, from listing your space to delighting your guests.
                    </p>
                </div>
                <div className="space-y-6 max-w-4xl mx-auto">
                    <ResourceItem title="Perfecting Your Listing" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}>
                        <p>Your listing is your storefront. Start with a compelling title that highlights a key feature, like "Cozy Cabin with Mountain Views." In your description, be detailed and honest. Describe what makes your place unique, mention nearby attractions, and set clear expectations. A well-written description builds trust and helps guests imagine themselves in your space.</p>
                    </ResourceItem>

                    <ResourceItem title="Photography Guide" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
                        <p>High-quality photos are the most important factor in attracting guests. Use natural light whenever possible by opening curtains and shooting during the day. Tidy up each room before taking pictures. Capture wide shots to show the whole space, but also include photos of unique details and amenities. A good set of photos tells a story and makes your listing irresistible.</p>
                    </ResourceItem>

                    <ResourceItem title="Pricing Your Space" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}>
                        <p>Setting the right price is key to maximizing your earnings. Start by researching similar listings in your area to understand the market rate. Consider seasonality—you can charge more during peak tourist seasons or local events. Offering discounts for weekly or monthly stays can also attract longer-term guests and ensure your calendar stays full.</p>
                    </ResourceItem>

                    <ResourceItem title="Guest Communication" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}>
                        <p>Great communication leads to great reviews. Respond to inquiries and booking requests as quickly as possible. Before check-in, send a friendly message with clear instructions, including directions and how to access the property. A small welcome message on the day of arrival is a nice touch. Being responsive and helpful makes guests feel valued and cared for.</p>
                    </ResourceItem>

                    <ResourceItem title="Cleaning and Safety" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}>
                        <p>A clean and safe environment is a top priority for guests. Develop a consistent cleaning checklist to ensure every part of your space is spotless between stays. Stock up on essentials like soap, toilet paper, and fresh linens. For safety, ensure you have a working smoke detector, a carbon monoxide detector if needed, and a first-aid kit. Providing a fire extinguisher is also highly recommended.</p>
                    </ResourceItem>

                    <ResourceItem title="Understanding Local Laws" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}>
                        <p>Before you start hosting, it's important to understand the laws and regulations in your area. Many cities have specific rules regarding short-term rentals, such as requiring a permit or license. You may also need to collect and remit local tourism or hotel taxes. Researching your local government's website is the best place to start to ensure you are hosting responsibly and legally.</p>
                    </ResourceItem>
                </div>
            </div>
        </div>
    );
}

