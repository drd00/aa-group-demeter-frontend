import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import NavMenu from './components/NavMenu';

function App() {
  return (
    <>
      <NavMenu />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </>
  );
}

export default App;
