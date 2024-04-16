import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import auth from '../auth/FirebaseConfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {userState as userAtom} from '../shared_state/Atoms';


const AuthPage = () => {
    const [userState, _setUserState] = useRecoilState(userAtom);
    const [emailState, setEmail] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false); // 新增：用户登录状态
    const [confirmPassword, setConfirmPassword] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (userState) {
            setLoggedIn(true); // 用户存在，认为用户已登录
        } else {
            setLoggedIn(false); // 用户不存在，认为用户未登录
        }
    }, [userState]);

    function navHome() {
        nav('/');
    }

    async function createUserAccount() {
        if (passwordState !== confirmPassword) {
            // 密码和确认密码不匹配
            alert('Passwords do not match.');
            clearForm();
            return; // 提前返回，不继续执行注册
        }
        try {
            await createUserWithEmailAndPassword(auth, emailState, passwordState);
            await signInWithEmailAndPassword(auth, emailState, passwordState);
            navHome();
        } catch (err) {
            if (err instanceof Error) {
                alert(`Sign-up error: ${err.message}`);
                clearForm();
                return; // 提前返回，不继续执行注册
            }
        }

        clearForm();
        setShowSignUp(false);
        setShowLogin(false);
    }

    async function logIn() {
        console.log(passwordState); // 调试：查看提交时的密码状态
        try {
            await signInWithEmailAndPassword(auth, emailState, passwordState);
            // 仅在登录成功后设置状态和导航
            setLoggedIn(true);
            //_setUserState(auth); // 确保这个状态更新的逻辑是正确的
            navHome();
        } catch (err) {
            if (err instanceof Error) {
                alert(`Login error: ${err.message}`);
            }
            // 可能需要在这里处理登录失败的状态，比如清除表单或更新UI提示用户
        }
    }

    function clearForm() {
        setEmail('');
        setPasswordState('');
        setConfirmPassword('');
    }


    const switchToSignUp = () => {
        setShowLogin(false);
        setShowSignUp(true);
    };

    const switchToLogin = () => {
        setShowSignUp(false);
        setShowLogin(true);
    };

    const navToLogin = () => {
        // 跳转到登录页面的逻辑
        history.push('/login');
    };


    if (showLogin) {
        return (
            <>
                <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                    <form className='p-6 bg-white rounded-lg shadow-md max-w-lg w-full mx-4'>
                        <div className='form-group mb-4'>
                            <label htmlFor='email'>Email address</label>
                            <input type='email' className='form-control' id='email' placeholder='Enter email'
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='form-group mb-6'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='form-control' id='password' placeholder='Password'
                                   onChange={(e) => setPasswordState(e.target.value)}/>
                        </div>
                        <button type='button'
                                className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mb-3 transition duration-400'
                                onClick={logIn}>Log in
                        </button>
                        <button type='button'
                                className='w-full bg-gray-400 text-white border border-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline transition duration-400'
                                onClick={switchToSignUp}>Sign up
                        </button>
                    </form>
                </div>
            </>
        );
    } else if (showSignUp) {
        return (
            <>
                {/*<NavMenu onLogout={handleLogout} />*/}
                <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                    <form className='p-6 bg-white rounded-lg shadow-md max-w-lg w-full mx-4'>
                        <div className='form-group mb-4'>
                            <label htmlFor='email'>Email address</label>
                            <input type='email' className='form-control' id='email' placeholder='Enter email'
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='form-group mb-4'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='form-control' id='password' placeholder='Password'
                                   onChange={(e) => setPasswordState(e.target.value)}/>
                        </div>
                        <div className='form-group mb-6'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input type='password' className='form-control' id='confirmPassword'
                                   placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>


                        <button type='button'
                                className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mb-3 transition duration-400'
                                onClick={createUserAccount}>Sign Up
                        </button>
                        <button type='button'
                                className='w-full bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline transition duration-400'
                                onClick={switchToLogin}>Back to Log in
                        </button>
                    </form>
                </div>
            </>
        );
    }
};
export default AuthPage;