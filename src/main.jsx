import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './auth/AuthProvider';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </RecoilRoot>
);
