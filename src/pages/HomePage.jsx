import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useAuthenticatedRequest from '../hooks/useAuthenticatedRequest';

const HomePage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const { makeRequest } = useAuthenticatedRequest();

    const [diaryEntries, setDiaryEntries] = useState([]);
    useEffect(() => {
        async function fetchDiaryEntries() {
            const response = await fetch('http://localhost:8000/diary'); // change to backend api
            if (response.ok) {
                const data = await response.json();
                setDiaryEntries(data); // Set diaryEntries directly to the received data
            } else {
                // Handle HTTP error response
                console.error('HTTP Error: ', response.status);
            }
        }
        fetchDiaryEntries();
    }, []);


    // fix this stuff
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchTerm) {
            return;
        }

        // Send a request to the backend to display information about a food item of interest
        const url = `http://localhost:8000/api/searchfood/${encodeURIComponent(searchTerm)}`;

        let response = await makeRequest(url, 'GET', null);

        if (response.status === 200) {
            console.log('Food item found:', response.data);
            // Update the UI with the found food item
            // setFoodItem(response.data);
        }
    };
    const styles = {
        container: {
            background: '#FFF',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            maxWidth: '600px',
            margin: '20px auto'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            margin: '0',
            padding: '0',
        },
        th: {
            textTransform: 'uppercase',
            fontSize: '14px',
            fontWeight: 'normal',
            color: '#000',
            borderBottom: '2px solid #000',
            padding: '20px 10px',
            textAlign: 'left'
        },
        td: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
            color: '#000',
            fontSize: '14px',
        },
        header: {
            padding: '20px 10px',
            fontWeight: 'bold',
            background: 'linear-gradient(to bottom, #f9f9f9, #e9e9e9)',
            textTransform: 'uppercase',
            fontSize: '16px',
            textAlign: 'left',
            borderBottom: '2px solid #000',
        }
    };
    return (
        <div style={styles.container}>
            {/* Search box and other UI elements... */}

            <div style={styles.header}>Today Diary</div>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Food</th>
                    <th style={styles.th}>Calories</th>
                    <th style={styles.th}>Protein</th>
                </tr>
                </thead>
                <tbody>
                {diaryEntries.map(entry => (
                    <tr key={entry.uid}>
                    <td style={styles.td}>{entry.date}</td>
                        <td style={styles.td}>{entry.food}</td>
                        <td style={styles.td}>{entry.calories}</td>
                        <td style={styles.td}>{entry.protein}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomePage;