import React from 'react';

const PolicySection = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-green-900 mb-4">{title}</h2>
        <div className="prose prose-lg text-gray-600 max-w-none">
            {children}
        </div>
    </div>
);

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">Privacy Policy</h1>
                    <p className="mt-4 text-lg text-gray-500">Last updated: October 5, 2025</p>
                </div>

                <PolicySection title="Introduction">
                    <p>
                        Welcome to Stayzyy App. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
                    </p>
                </PolicySection>

                <PolicySection title="Information We Collect">
                    <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                    <ul>
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the application or when you choose to participate in various activities related to the application, such as bookings and online chat.</li>
                        <li><strong>Booking Information:</strong> When you make a booking, we collect information related to that transaction, including the details of the property, dates of stay, and payment information (which is handled by a third-party payment processor).</li>
                    </ul>
                </PolicySection>

                <PolicySection title="How We Use Your Information">
                    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the application to:</p>
                    <ul>
                        <li>Create and manage your account.</li>
                        <li>Email you regarding your account or bookings.</li>
                        <li>Process your bookings and send you confirmation and other transactional emails.</li>
                        <li>Enable user-to-user communications between you and a host.</li>
                        <li>Improve our application and your user experience.</li>
                    </ul>
                </PolicySection>

                <PolicySection title="Data Security">
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                    </p>
                </PolicySection>

                <PolicySection title="Your Privacy Rights">
                    <p>
                        You may at any time review or change the information in your account or terminate your account by logging into your account settings and updating your account. Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases.
                    </p>
                </PolicySection>

                <PolicySection title="Contact Us">
                    <p>
                        If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:msd40551@gmail.com" className="text-green-800 hover:underline">msd40551@gmail.com</a>.
                    </p>
                </PolicySection>
            </div>
        </div>
    );
}
