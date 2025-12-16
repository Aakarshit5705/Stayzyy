import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../userContext.jsx";
import toast from "react-hot-toast"; // Import toast

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(userContext);

    async function handleLogin(ev) {
        ev.preventDefault();
        const loginPromise = axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });

        toast.promise(loginPromise, {
            loading: 'Logging in...',
            success: (response) => {
                setUser(response.data);
                setRedirect(true); 
                return 'Login successful! Welcome back.'; 
            },
            error: (err) => {
                if (err.response && err.response.status === 404) {
                    return 'User not found. Please check your email.';
                } else if (err.response && err.response.status === 422) {
                    return 'Incorrect password. Please try again.';
                }
                return 'Login failed. Please try again later.';
            }
        });
    }

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="flex grow items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {/* Title */}
                <h1 className="text-3xl font-extrabold text-center text-green-900 mb-6">
                    Welcome Back
                </h1>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
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
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-3 text-gray-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Register Link */}
                <p className="text-center text-gray-600 text-sm">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-green-900 font-semibold hover:underline"
                    >
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
}

