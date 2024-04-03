import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { userState as userAtom } from '../shared_state/Atoms';
import { profileDataState } from '../shared_state/Atoms';
import { useRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';
import useAuthenticatedRequest from '../hooks/useAuthenticatedRequest';
import auth from './FirebaseConfig';

const AuthProvider = ( { children } ) => {
    const [_userState, setUserState] = useRecoilState(userAtom);
    const [_userProfileState, setProfileDataState] = useRecoilState(profileDataState);
    const { data, _loading, _error, fetchData } = useAuthenticatedRequest();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserState(user.email);

                // Fetch user profile data
                // use uid for keys in the backend DB
                const url = `http://localhost:5000/api/profile/${user.uid}`;
                await fetchData(url);
                setProfileDataState(data);
            } else {
                setUserState('');
            }
        });
    });

    return (
        <>
        { children }
        </>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;