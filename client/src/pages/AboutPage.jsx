import React from 'react';

const TeamMemberCard = ({ name, title, imageUrl, description }) => (
    <div className="text-center">
        <img className="mx-auto h-40 w-40 rounded-full object-cover shadow-lg" src={imageUrl} alt={name} />
        <h3 className="mt-6 text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-green-800 font-semibold">{title}</p>
        <p className="mt-2 text-gray-600">{description}</p>
    </div>
);

export default function AboutUsPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-green-900 text-white text-center py-20 lg:py-32">
                 <div className="absolute inset-0 bg-black opacity-30"></div>
                 <div className="relative max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Welcome to Stayzyy</h1>
                    <p className="mt-4 text-lg md:text-xl text-green-200">
                        Your next great adventure starts here. Discover unique places to stay and create unforgettable memories.
                    </p>
                </div>
            </div>

            {/* Our Mission Section */}
            <div className="py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">Our Mission</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Our mission is to make travel accessible and enjoyable for everyone. We believe that discovering the world should be a seamless and enriching experience. We connect travelers with a diverse range of accommodations, from cozy city apartments to serene countryside homes, ensuring every journey is a memorable one.
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
             <div className="bg-gray-50 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">Our Story</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Founded in 2025, Stayzyy App started as a simple idea: to create a platform that was not only functional but also inspiring. Frustrated with overly complicated booking websites, our founder set out to build an application that was clean, intuitive, and focused on the user. What began as a solo project has grown into a passion for helping people explore the world with ease and confidence.
                    </p>
                </div>
            </div>


            {/* Meet the Founder Section */}
            <div className="py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-green-900 sm:text-4xl mb-12">Meet the Founder</h2>
                    <TeamMemberCard
                        name="Aakarshit Khejuria"
                        title="Founder & Lead Developer"
                        imageUrl="https://placehold.co/400x400/22c55e/ffffff?text=AK"
                        description="As the sole developer behind Stayzyy, Aakarshit is passionate about creating clean, user-friendly applications that solve real-world problems. This project is a testament to his dedication to quality and craftsmanship in software development."
                    />
                </div>
            </div>
        </div>
    );
}
