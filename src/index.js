import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
  React,
  ReactDOM,
  App,
  axios,
  HelmetProvider,
  StoreProvider,
} from './Imports';
axios.defaults.baseURL = 'https://eshop-server-9jd8.onrender.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StoreProvider>
);
