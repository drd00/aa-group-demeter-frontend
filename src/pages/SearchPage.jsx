import React, { useState, useCallback } from 'react';
import useAuthenticatedRequest from '../hooks/useAuthenticatedRequest';
import debounce from 'lodash.debounce';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [addedItems, setAddedItems] = useState(new Set());
    const [similarRecommendations, setSimilarRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { makeRequest } = useAuthenticatedRequest();

    const search = async (query) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await makeRequest(`http://localhost:8000/searchfood/${encodeURIComponent(query)}`, 'GET');
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const results = response.data.foods;
            setSearchResults(results);
        } catch (error) {
            setError('Failed to fetch search results');
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const getSimilarRecommendations = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response =  await makeRequest('http://localhost:8000/get_food_preference', 'GET');
            const result =  response.data.food_list;
            setSimilarRecommendations(result); 

            console.log("hello" ,similarRecommendations.length)
        } catch (error) {
            setError('Failed to fetch similar recommendations');
            setSimilarRecommendations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedSearch = useCallback(debounce(search, 300), [search]);

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        debouncedSearch(searchQuery);
    };

    const addItem = async (item) => {
        try {
            // Add item logic
        } catch (error) {
            console.error('Failed to add item to diary', error);
            return false;
        }
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
            <button onClick={getSimilarRecommendations} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-4">
                Similar users also liked
            </button>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {searchResults.map((item, index) => (
                    <li key={index} className='flex justify-between items-center border-b border-gray-300 py-2'>
                        <div className='flex flex-col'>
                            <span className='text-gray-800 font-semibold'>{item.name}</span>
                            <span className='text-gray-600'>Calories: {item.nutrients.ENERC_KCAL.toFixed(2)}</span>
                            <span className='text-gray-600'>Protein: {item.nutrients.PROCNT.toFixed(2)} g</span>
                            <span className='text-gray-600'>Fat: {item.nutrients.FAT.toFixed(2)} g</span>
                        </div>
                        <button
                            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded transition-all duration-300 ${addedItems.has(item.name) ? 'bg-green-800' : ''}`}
                            onClick={() => addItem(item)}
                            disabled={addedItems.has(item.name)}
                        >
                            {addedItems.has(item.name) ? 'Added' : 'Add'}
                        </button>
                    </li>
                ))}
            </ul>
            {similarRecommendations.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Food Preferences</h2>
                    <ul>
                        {similarRecommendations.map((food, index) => (
                            <li key={index} className='flex justify-between items-center border-b border-gray-300 py-2'>
                                <div className='flex flex-col'>
                                    <span className='text-gray-800 font-semibold'>{food.food}</span>
                                    <span className='text-gray-600'>Calories: {food.calories}</span>
                                    <span className='text-gray-600'>Protein: {food.protein} g</span>
                                    <span className='text-gray-600'>Fat: {food.fat} g</span>
                                    <span className='text-gray-600'>Carbs: {food.carbs} g</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
