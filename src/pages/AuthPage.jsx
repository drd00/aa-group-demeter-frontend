import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import auth from '../auth/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { userState as userAtom } from '../shared_state/Atoms';

const AuthPage = () => {
    const [userState, _setUserState] = useRecoilState(userAtom);
    const [emailState, setEmailState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [renderLogin, setRenderLogin] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        if (userState) {
            setRenderLogin(false);
        } else {
            setRenderLogin(true);
        }
    }, [userState]);

    function navHome() {
        nav('/');
    }

    async function createUserAccount() {
        try {
            await createUserWithEmailAndPassword(auth, emailState, passwordState);
            await signInWithEmailAndPassword(auth, emailState, passwordState);
            navHome();
        } catch (err) {
            if (err instanceof Error) {
                console.log(`Sign-up error: ${err.message}`);
            }
        }

        setPasswordState('');
    }

    async function logIn() {
        try {
            await signInWithEmailAndPassword(auth, emailState, passwordState);
            navHome();
        } catch (err) {
            if (err instanceof Error) {
                console.log(`Login error: ${err.message}`);
            }
        }

        setPasswordState('');
    }

    async function logOut() {
        try {
            await signOut(auth);
        } catch (err) {
            if (err instanceof Error) {
                console.log(`Logout error: ${err.message}`);
            }
        }
    }

    if (renderLogin) {  // user is not signed in already
        return (
            <>
                <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                    <form className='p-6 bg-white rounded-lg shadow-md max-w-lg w-full mx-4'>
                        <div className='form-group mb-4'>
                            <label htmlFor='email'>Email address</label>
                            <input type='email' className='form-control' value={emailState} id='email' aria-describedby='email' placeholder='Enter email' onChange={(e) => {
                                setEmailState(e.target.value);
                            }} />
                        </div>
                        <div className='form-group mb-6'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' value={passwordState} className='form-control' id='password' placeholder='Password' onChange={(e) => {
                                setPasswordState(e.target.value);
                            }}/>
                        </div>
                        <div className='mt-4 text-center'>
                            <button type='button' className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mb-3 transition duration-400' onClick={async () => {
                                await logIn();
                            }}>Log in</button>
                        </div>
                        <div className='my-4 flex items-center justify-center'>
                            <div className='h-px bg-gray-300 w-full'></div>
                        </div>
                        <div className='mt-6 text-center'>
                            <p className='text-sm text-gray-500'>New user?</p>
                            <button type='button' className='w-full bg-gray-400 text-white border border-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline transition duration-400' onClick={async () => {
                                await createUserAccount();
                            }}>Sign up</button>
                        </div>
                    </form>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className='p-7 flex items-center justify-center'>
                    <h1 className='font-medium'>You are already signed in. What would you like to do?</h1><br />
                    <br />
                </div>
                <div className='p-2 flex items-center justify-center'>
                    <button className='btn btn-primary p-2 m-2' onClick={async () => {
                        await logOut();
                        navHome();
                    }}>Log out
                    </button>
                    <button className='btn btn-secondary p-2 m-2' onClick={() => {
                        navHome();
                    }}>Go home</button>
                </div>
        </>
        );
    }
};

export default AuthPage;