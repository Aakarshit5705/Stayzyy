import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const SearchContext = createContext();

export function useSearch() {
    return useContext(SearchContext);
}

export function SearchContextProvider({ children }) {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAllPlaces = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/places');
            setPlaces(response.data);
        } catch (error) {
            console.error("Failed to fetch all places:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (term) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (term) {
                params.append('destination', term);
            }
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/places?${params.toString()}`);
            setPlaces(response.data);
        } catch (error) {
            console.error("Failed to fetch filtered places:", error);
        } finally {
            setLoading(false);
        }
    };

    const resetSearch = () => {
        setSearchTerm('');
        fetchAllPlaces();
    };

    useEffect(() => {
        fetchAllPlaces();
    }, []);

    const value = {
        places,
        loading,
        searchTerm,
        setSearchTerm,
        handleSearch,
        resetSearch, 
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

