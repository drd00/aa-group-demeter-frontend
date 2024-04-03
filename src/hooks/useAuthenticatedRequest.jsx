import { useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const useAuthenticatedRequest = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (url) => {
        setLoading(true);
        setError(null);

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                throw new Error('User is not logged in');
            }

            const idToken = await user.getIdToken(true);

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            setData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
};

export default useAuthenticatedRequest;