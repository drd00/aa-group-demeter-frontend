import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NavMenu from './components/NavMenu';

function App() {
  return (<>
    <NavMenu />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/about' element={<AboutPage />} />
    </Routes>
  </>
  );
}

export default App;
