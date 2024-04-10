import {Route, Routes, useNavigate} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import NavMenu from './components/NavMenu';
import {signOut} from 'firebase/auth';
import auth from './auth/FirebaseConfig.js';
import {useRecoilState} from 'recoil';
import {userState as userAtom} from './shared_state/Atoms.jsx';

function App() {
  const nav = useNavigate();
  const [userState, _setUserState] = useRecoilState(userAtom);
  function navHome() {
    nav('/');
  }

  const handleLogout = async () => {
    try {
      await signOut(auth); // 假设使用Firebase，调用其signOut方法
      // 登出成功，更新应用状态
      alert('User signed out successfully');
      // 这里可以重置应用的用户状态，例如：
      _setUserState(false); // 假设你有一个状态变量跟踪用户的登录状态
      // 也可能需要导航用户回到登录页面或主页
      navHome(); // 假设你有一个函数navHome()来处理导航
    } catch (error) {
      // 处理可能发生的错误
      console.error('Sign out error:', error);
    }
    _setUserState(false);
  };


  return (<>
    <NavMenu isLoggedIn={userState} onLogout={handleLogout}/>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/settings' element={<SettingsPage />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Routes>
  </>
  );
}

export default App;
