import { userState as userAtom } from '../shared_state/Atoms';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

const NavMenu = ({onLogout}) => {
    const [userState, _setUserState] = useRecoilState(userAtom);
    return (
        <>
            <nav className='bg-white text-black'>
                <div className='max-w-6xl mx-auto px-4'>
                    <div className='flex justify-between'>
                        <div className='flex space-x-4'>
                            <div>
                                <Link to='/' className='flex items-center py-5 px-2 text-gray-800 hover:text-gray-600 no-underline text-xl'>FitAssist</Link>
                            </div>
                            <div className='hidden md:flex items-center space-x-1'>
                                <Link to='/profile' className='py-5 px-3 hover:text-gray-600'>Profile</Link>
                            </div>
                            <div className='hidden md:flex items-center space-x-1'>
                                <Link to='/settings' className='py-5 px-3 hover:text-gray-600'>Settings</Link>
                            </div>
                        </div>
                        <div className='hidden md:flex items-center space-x-1'>
                            {!userState && (
                                <Link to='/auth' className='py-2 px-3 bg-gray-300 text-gray-800 border border-gray-400 rounded hover:bg-gray-400'>Login</Link>
                            )}
                            {userState && (
                                <>
                                    <span className='text-xs text-gray-800'>{userState}</span>
                                    <Link to='/auth' className='py-2 px-3 bg-gray-300 text-gray-800 border border-gray-400 rounded hover:bg-gray-400' onClick={onLogout}>Sign out</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavMenu;