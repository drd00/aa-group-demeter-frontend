import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useAuthenticatedRequest from '../hooks/useAuthenticatedRequest';
import useDebounce from '../hooks/useDebounce';
import { profileDataState as profileAtom, userState as userAtom } from '../shared_state/Atoms';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const nav = useNavigate();
    const { makeRequest } = useAuthenticatedRequest();
    const user = useRecoilValue(userAtom);
    const profileData = useRecoilValue(profileAtom);
    const debouncedUser = useDebounce(user, 500);

    const [diaryEntries, setDiaryEntries] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (debouncedUser === null) {
            nav('/landing');
        }
    }, [debouncedUser]);

    useEffect(() => {
        async function fetchDiaryEntries() {
            const response = await makeRequest('http://localhost:8000/diary', 'GET');
            if (response.status === 200) {
                const data = response.data;
                setDiaryEntries(data); // Set diaryEntries directly to the received data
            } else {
                // Handle HTTP error response
                console.error('HTTP Error: ', response.status);
            }
        }

        async function fetchRecommendations() {
            const response = await makeRequest('http://localhost:8000/prob-recommendations', 'GET');
            if (response.status === 200) {
                const data = response.data;
                console.log(data);
                setRecommendations(data.recommendations);
            } else {
                console.error('HTTP Error: ', response.status);
            }
        }
        fetchDiaryEntries();
        fetchRecommendations();
    }, []);

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
        <>
            <h1 className='text-center text-3xl font-bold my-5'>Hello, {profileData['firstName']}. Here&apos;s what&apos;s on today&apos;s diary.</h1>
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
            <div className="text-center mt-24 mb-8">  {/* Increased top margin */}
    <div className="uppercase text-gray-700 font-bold">More Recommendations</div>
    <div className="border-t border-gray-300 mt-2 mx-auto w-1/4"></div>  {/* Small separator */}
</div>
            <h2 className='text-center text-xl font-bold mt-10'>Some recommendations, based on your past activity and profile.</h2>

            <h4 className='text-center text-sm font-light mt-10 mb-5'>We consider the your weight, height and app activity to help you out.</h4>
        <div style={styles.container}>
            <div style={styles.header}>Recommendations</div>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Product</th>
                    <th style={styles.th}>Benefits</th>
                </tr>
                </thead>
                <tbody>
                    {recommendations.map((rec, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{rec[0]}</td>
                            <td style={styles.td}>{rec[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default HomePage;