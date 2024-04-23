import React, { useState, useCallback } from 'react';
import useAuthenticatedRequest from '../hooks/useAuthenticatedRequest';
import debounce from 'lodash.debounce';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [addedItems, setAddedItems] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { makeRequest } = useAuthenticatedRequest();

    const search = async (query) => {
        setIsLoading(true);
        setError('');
        try {
            // API call logic
            const response = await makeRequest(`http://localhost:8000/searchfood/${encodeURIComponent(query)}`, 'GET');
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const results = response.data.foods;
            setSearchResults(results);
            console.log(searchResults);
            console.log(results);
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

    const addItem = async (item) => {
        try {
            const postData = {'food': item.name, 'calories': item.nutrients.ENERC_KCAL, 'protein': item.nutrients.PROCNT, 'fat': item.nutrients.FAT, 'carbs': item.nutrients.CHOCDF};
            const response = await makeRequest('http://localhost:8000/diary', 'POST', JSON.stringify(postData));
            if (response.status === 200) {
                setAddedItems(new Set(addedItems.add(item.name)));
                console.log('Item added to diary');
                return true;
            } else {
                console.error('Failed to add item to diary');
                return false;
            }
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
        </div>
    );
};

export default SearchPage;
