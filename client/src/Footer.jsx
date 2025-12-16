import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-white transition">
        {children}
    </a>
);

export default function Footer() {
    return (
        <footer className="bg-green-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Support Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Support</h3>
                    <ul className="space-y-2 text-green-200">
                        <li><Link to="/help" className="hover:underline hover:text-white">Help Center</Link></li>
                        <li><Link to="/contact" className="hover:underline hover:text-white">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Hosting Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Hosting</h3>
                    <ul className="space-y-2 text-green-200">
                        <li><Link to="/account/places/new" className="hover:underline hover:text-white">List your space</Link></li>
                        <li><Link to="/resources" className="hover:underline hover:text-white">Hosting resources</Link></li>
                    </ul>
                </div>

                {/* About Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4">About</h3>
                    <ul className="space-y-2 text-green-200">
                        <li><Link to="/about" className="hover:underline hover:text-white">About us</Link></li>
                        <li><Link to="/privacy" className="hover:underline hover:text-white">Privacy Policy</Link></li>
                    </ul>
                </div>

                 {/* Logo Section */}
                 <div className="flex items-center justify-center md:justify-end col-span-2 md:col-span-1">
                    <Link to="/" className="flex items-center gap-2 text-white">
                        {/* --- CORRECTED SVG LOGO --- */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9">
                            <circle cx="12" cy="12" r="9.25" stroke="white" strokeWidth="1.5"/>
                            <path d="M12 7.5L7 11.5V17H10V14H14V17H17V11.5L12 7.5Z" fill="#a7f3d0"/>
                        </svg>
                        {/* --- END OF CORRECTION --- */}
                        <span className="font-extrabold text-2xl tracking-tight" style={{fontFamily: "'Poppins', sans-serif"}}>
                            Stayzyy
                        </span>
                    </Link>
                </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="bg-green-950">
                 <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-green-300 text-sm">
                        &copy; {new Date().getFullYear()} Stayzyy, Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 sm:mt-0">
                        <SocialIcon href="https://facebook.com">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </SocialIcon>
                        <SocialIcon href="https://twitter.com">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </SocialIcon>
                        <SocialIcon href="https://instagram.com">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427.465C9.793 2.013 10.147 2 12.315 2zm0 1.623c-2.378 0-2.705.01-3.668.053-1.01.046-1.597.2-1.99.37a3.272 3.272 0 00-1.215.82 3.272 3.272 0 00-.82 1.215c-.17.393-.324.98-.37 1.99-.043.963-.053 1.29-.053 3.668s.01 2.705.053 3.668c.046 1.01.2 1.597.37 1.99a3.272 3.272 0 00.82 1.215 3.272 3.272 0 001.215.82c.393.17.98.324 1.99.37.963.043 1.29.053 3.668.053s2.705-.01 3.668-.053c1.01-.046 1.597-.2 1.99-.37a3.272 3.272 0 001.215-.82 3.272 3.272 0 00.82-1.215c.17-.393.324-.98.37-1.99.043-.963.053-1.29.053-3.668s-.01-2.705-.053-3.668c-.046-1.01-.2-1.597-.37-1.99a3.272 3.272 0 00-.82-1.215 3.272 3.272 0 00-1.215-.82c-.393-.17-.98-.324-1.99-.37-.963-.043-1.29-.053-3.668-.053z" clipRule="evenodd" /></svg>
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
}

