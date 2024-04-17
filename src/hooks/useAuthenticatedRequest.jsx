import { useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const useAuthenticatedRequest = () => {
    const [error, setError] = useState(null);

    const makeRequest = async (url, method, postData) => {
        setError(null);
        const auth = getAuth();
        const user = auth.currentUser;
        const idToken = await auth.currentUser.getIdToken(true);

        try {

            if (!user) {
                throw new Error('User is not logged in');
            }

            let response;

            switch(method) {
                case 'GET':
                    response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    });
                    break;
                case 'POST':
                    response = await axios.post(url, postData, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${idToken}`,
                        },
                    });
                    break;
                case 'PUT':
                    response = await axios.put(url, postData, {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    });
                    break;
                default:
                    throw new Error('Invalid method');
            }
            return response;
        } catch (error) {
            setError(error.message);
            return null;
        } 
    };

    return { makeRequest, error };
};

export default useAuthenticatedRequest;