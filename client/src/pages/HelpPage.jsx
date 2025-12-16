import React, { useState } from 'react';

const faqs = [
    {
        question: "How do I book a place?",
        answer: "To book a place, simply navigate to the listing you're interested in, select your check-in and check-out dates, specify the number of guests, and click the 'Reserve' button. You'll then be guided to our secure payment page to finalize your booking."
    },
    {
        question: "What is the cancellation policy?",
        answer: "Cancellation policies vary by host and are listed on each property's page. Generally, you can receive a full refund if you cancel at least 14 days before check-in. Please review the specific policy for your chosen listing before booking."
    },
    {
        question: "How can I contact the host?",
        answer: "Once your booking is confirmed, you will receive an email with the host's contact information. You can also message the host directly through our platform from your 'My Bookings' page to coordinate check-in details and ask any questions."
    },
    {
        question: "Is the payment process secure?",
        answer: "Absolutely. We partner with industry-leading payment processors to handle all transactions. Your payment information is encrypted and never stored on our servers, ensuring your data is always safe and secure."
    },
    {
        question: "How do I list my own property?",
        answer: "We'd love to have you! Simply click on the 'List your space' button in the header, and you'll be taken to our host portal. From there, you can easily create a new listing, add photos, set your price, and publish your property to our platform."
    }
];

const FaqItem = ({ faq, index, activeIndex, toggleFAQ }) => {
    const isOpen = index === activeIndex;
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
            >
                <span>{faq.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
            >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
        </div>
    );
};

export default function HelpPage() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">Help Center</h1>
                    <p className="mt-3 text-lg text-gray-600">Find answers to your questions below.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            faq={faq}
                            index={index}
                            activeIndex={activeIndex}
                            toggleFAQ={toggleFAQ}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
