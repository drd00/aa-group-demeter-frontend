import { userState as userAtom } from '../shared_state/Atoms';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

const NavMenu = () => {
    const [userState, _setUserState] = useRecoilState(userAtom);
    return (<>
        <nav className='bg-gray-800 text-white'>
            <div className='max-w-6xl mx-auto px-4'>
                <div className='flex justify-between'>
                    <div className='flex space-x-4'>
                        <div>
                            <Link to='/' className='flex items-center py-5 px-2 text-gray-200 hover:text-gray-400 no-underline'>Project Demeter</Link>
                        </div>
                        <div className='hidden md:flex items-center space-x-1'>
                            <Link to='/about' className='p6-5 px-3 hover:text-gray-400'>About</Link>
                        </div>
                    </div>
                    <div className='hidden md:flex items-center space-x-1'>
                        {!userState && (
                            <Link to='/auth' className='py-2 px-3 bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-300'>Login</Link>
                        )}
                        {userState && (
                            <>
                                <span className='text-xs text-gray-500'>{userState}</span>
                                <Link to='/auth' className='py-2 px-3 bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-300'>Sign out</Link>
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