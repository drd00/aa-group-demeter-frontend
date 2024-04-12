import React, { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { searchResultsState } from '../shared_state/SearchState';
import debounce from 'lodash.debounce';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const search = async (query) => {
        setIsLoading(true);
        setError('');
        try {
            // API call logic
            const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const results = await response.json();
            setSearchResults(results);
        } catch (error) {
            setError('Failed to fetch search results');
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Use debounce for the anti-shake search function
    const debouncedSearch = useCallback(debounce(search, 300), []);

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        //debouncedSearch(query);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        debouncedSearch(searchQuery);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Search for your favourite foods</h1>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
                <input
                    className="flex-1 border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Type a food name..."
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                    Search
                </button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="list-disc pl-5 mt-4">
                {searchResults.map((food, index) => (
                    <li key={index} className="mb-2">{food.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;
