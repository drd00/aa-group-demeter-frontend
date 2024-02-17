import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { userState as userAtom } from '../shared_state/Atoms';
import { useRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './FirebaseConfig';

const AuthProvider = ( { children } ) => {
    const [_userState, setUserState] = useRecoilState(userAtom);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserState(user.email);
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