import { useEffect, useState } from 'react';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchTerm) {
            return;
        }
        setSearchHistory([searchTerm, ...searchHistory]);
        setSearchTerm('');
    };

    /*
        TODO:
        1. Set searchHistory as fetched from the backend server initially ... fetch using axios and setSearchHistory whenever the page is loaded instead of updating the values locally as here.

        2. Send a request to the backend to display information about a food item of interest, at the same time updating the user's search history table => use to tailor personalisation.

        3. Have another list which displays the user's personalised suggestions based on their search history (obtained from backend application also).
    */

    return (
        <>
            <h1>Home</h1>
            <div className="flex flex-col items-center pt-9 h-screen">
                <form onSubmit={handleSubmit} className="flex border-2 rounded-lg overflow-hidden">
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search foods..."
                        className="px-4 py-2 w-80"
                    />
                    <button type="submit" className="flex items-center justify-center px-4 border-l">
                        Search
                    </button>
                </form>
            <ul className="mt-8 w-80">
                {searchHistory && searchHistory.map((search, index) => (
                    <li key={index} className="border-b border-gray-200 py-2">
                        {search}
                    </li>
                ))}
            </ul>
            </div>
        </>
    );
};

export default HomePage;