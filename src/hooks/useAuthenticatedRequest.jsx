import { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

const useAuthenticatedRequest = (url) => {
    const [_data, setData] = useState(null);
    const [_loading, setLoading] = useState(true);
    const [_error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const user = firebase.auth().currentUser;
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

        fetchData();
    }, [url]);
};