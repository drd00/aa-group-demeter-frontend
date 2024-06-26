import {Route, Routes, useNavigate} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import LoadingSpinner from './components/LoadingSpinner';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import NavMenu from './components/NavMenu';
import { signOut } from 'firebase/auth';
import auth from './auth/FirebaseConfig.js';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { userState as userAtom, profileDataState as profileAtom, loadingState } from './shared_state/Atoms.jsx';
import InitialSetup from './pages/InitialSetup.jsx';
import { useEffect } from 'react';
import useDebounce from './hooks/useDebounce.jsx';
import LandingPage from './pages/LandingPage.jsx';

function App() {
  const profile = useRecoilValue(profileAtom);
  const user = useRecoilValue(userAtom);
  const [ loading, _setLoading ]= useRecoilState(loadingState);
  const nav = useNavigate();

  const debouncedUser = useDebounce(user, 500);
  const debouncedProfile = useDebounce(profile, 500);
  const debouncedLoading = useDebounce(loading, 500);

  useEffect(() => {
    if (!debouncedLoading && debouncedProfile === null && debouncedUser !== null) {
      nav('/initial-setup');
    } else if (debouncedUser === null) {
      nav('/landing');
    } else {
      nav('/');
    }
  }, [debouncedLoading, debouncedProfile, debouncedUser]);

  const [_userState, setUserState] = useRecoilState(userAtom);
  function navHome() {
    nav('/');
  }

  const handleLogout = async () => {
    try {
      await signOut(auth); // 假设使用Firebase，调用其signOut方法
      // 登出成功，更新应用状态
      alert('User signed out successfully');
      // 这里可以重置应用的用户状态，例如：
      setUserState(null); // 假设你有一个状态变量跟踪用户的登录状态
      // 也可能需要导航用户回到登录页面或主页
      navHome(); // 假设你有一个函数navHome()来处理导航
    } catch (error) {
      // 处理可能发生的错误
      console.error('Sign out error:', error);
    }
    setUserState(null);
  };

  if (loading) {
    return (<LoadingSpinner />);
  }

  return (
    <>
      <NavMenu onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='initial-setup' element={<InitialSetup onSignOut={handleLogout}/>} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </>
  );
}

export default App;