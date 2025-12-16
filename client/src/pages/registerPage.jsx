import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"; // Import toast

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    async function registerUser(e) {
        e.preventDefault();
        
        // Use toast.promise to handle the entire registration flow
        const registerPromise = axios.post("/register", {
            name,
            email,
            password,
        });

        toast.promise(registerPromise, {
            loading: 'Creating your account...',
            success: () => {
                // On success, navigate to the login page
                navigate('/login');
                return 'Registration successful! Please log in.';
            },
            error: (err) => {
                // On error, display the specific message from the server
                if (err.response && err.response.data.error) {
                    return err.response.data.error;
                }
                return 'Registration failed. Please try again later.';
            }
        });
    }

    return (
        <div className="flex grow items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {/* Title */}
                <h1 className="text-3xl font-extrabold text-center text-green-900 mb-6">
                    Create an Account
                </h1>

                {/* Form */}
                <form onSubmit={registerUser} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="youremail@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-green-900 hover:bg-green-800 text-white py-2 rounded-lg font-semibold shadow-md transition duration-200"
                    >
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-3 text-gray-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Login Link */}
                <p className="text-center text-gray-600 text-sm">
                    Already a member?{" "}
                    <Link
                        to="/login"
                        className="text-green-900 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

