import './App.css';
import React from "react";
import {Routes, Route } from 'react-router-dom';
import IndexPage from './pages/indexPage';
import LayOut from '../Layout';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import axios from 'axios';

import { UserContextProvider } from './userContext.jsx';
import AccountPage from './pages/accountPage.jsx';
import PlacesPage from './pages/placesPage.jsx';
import PlacesForm from './pages/placesFormPage.jsx';
import PlacePage from './pages/PlacePage.jsx';
import BookingsPage from './pages/BookingsPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import { SearchContextProvider } from './SearchContext.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import HelpPage from './pages/HelpPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HostingResourcesPage from './pages/hostingResources.jsx';
import AboutUsPage from './pages/AboutPage.jsx';
import PrivacyPolicyPage from './pages/PirvacyPage.jsx';

axios.defaults.baseURL=import.meta.env.VITE_API_URL;
axios.defaults.withCredentials=true;

function App() {
  return (
    <>
      <UserContextProvider>
      <SearchContextProvider>
        <Routes>
          <Route path='/' element={<LayOut/>}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesForm />} />
          <Route path='/account/places/:id' element={<PlacesForm />} />
          <Route path='/place/:id' element={<PlacePage/>} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/help' element={<HelpPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/resources' element={<HostingResourcesPage/>} />
          <Route path='/about' element={<AboutUsPage/>} />
          <Route path='/privacy' element={<PrivacyPolicyPage/>} />
          </Route>

        </Routes>
      </SearchContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App