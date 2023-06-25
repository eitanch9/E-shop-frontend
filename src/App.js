import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Container from 'react-bootstrap/Container';
import CartPage from './pages/CartPage';
import Navbar from './components/Navbar';
import SignInPage from './pages/SignInPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressPage from './pages/ShippingAddressPage';
import SignUpPage from './pages/SignUpPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import SubmitOrderPage from './pages/SubmitOrderPage';
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allpage">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar />
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/place-order/order/:id" element={<OrderPage />} />
              <Route path="/place-order" element={<SubmitOrderPage />} />
              <Route path="/payment" element={<PaymentMethodPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
