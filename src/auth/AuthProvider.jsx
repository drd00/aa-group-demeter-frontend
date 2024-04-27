import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRecoilState } from 'recoil';
import { userState as userAtom, profileDataState as profileAtom, settingsState as settingsAtom, loadingState } from '../shared_state/Atoms';
import { onAuthStateChanged } from 'firebase/auth';
import useAuthenticatedRequest from '../hooks/useAuthenticatedRequest';
import auth from './FirebaseConfig';

const AuthProvider = ( { children } ) => {
    const setUser = useSetRecoilState(userAtom);
    const setProfile = useSetRecoilState(profileAtom);
    const setSettings = useSetRecoilState(settingsAtom);
    const [_loading, setLoading] = useRecoilState(loadingState);

    const { makeRequest } = useAuthenticatedRequest();

    useEffect(() => {
        async function fetchProfile() {
            const response = await makeRequest('http://localhost:8000/profile', 'GET', null);

            return response;
        }

        async function fetchSettings() {
            const response = await makeRequest('http://localhost:8000/settings', 'GET', null);

            return response;
        }

        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser({ email: user.email, uid: user.uid });
                // Fetch profile data
                try {
                    const response = await fetchProfile();
                    if (response !== null) {
                        setProfile(response.data);
                    } else {
                        setProfile(null);
                    }
                } catch (error) {
                    setProfile(null);
                } finally {
                    setLoading(false);
                }

                // Fetch settings data
                try {
                    const response = await fetchSettings();
                    if (response !== null) {
                        setSettings(response.data);
                    } else {
                        setSettings(null);
                    }
                } catch (error) {
                    setSettings(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setUser(null);
                setProfile(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [setUser, setProfile, setSettings, setLoading]);

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