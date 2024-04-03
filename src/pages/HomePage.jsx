import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useAuthenticatedRequest from '../hooks/useAuthenticatedRequest';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, loading, error, fetchData } = useAuthenticatedRequest();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchTerm) {
            return;
        }
        
        // Send a request to the backend to display information about a food item of interest
        const url = `http://localhost:5000/api/searchfood/${encodeURIComponent(searchTerm)}`;
        fetchData(url);
    };

    /*
        TODO:
        1. Set searchHistory as fetched from the backend server initially ... fetch using axios and setSearchHistory whenever the page is loaded instead of updating the values locally as here.

        2. Send a request to the backend to display information about a food item of interest, at the same time updating the user's search history table => use to tailor personalisation.

        3. Have another list which displays the user's personalised suggestions based on their search history (obtained from backend application also).
    */
   return (
        <div className='flex justify-center items-center pt-5'>
            <form onSubmit={handleSubmit} className='flex items-center space-x-2'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    className='px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm'
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-blue-600 transition-all duration-150"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>

        </div>
   );
};

export default HomePage;