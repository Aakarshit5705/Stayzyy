import { Outlet } from "react-router-dom";
import Header from "./header.jsx";
import Footer from "./src/Footer.jsx";
import { Toaster } from "react-hot-toast";
import Chatbot from "./src/pages/Chatbot.jsx";

export default function LayOut() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Chatbot/>
      <Footer />
    </div>
  );
}

