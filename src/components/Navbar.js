import {
  NavBar,
  Container,
  LinkContainer,
  useContext,
  Badge,
  Nav,
  NavDropdown,
  Link,
  useLocation,
  Store,
  useNavigate,
} from '../Imports';
import SearchBox from './SearchBox';
import GeoLocation from './GeoLocation';

const CustomNavbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { state } = useContext(Store);
  const { cart } = state;
  const { userInfo } = state;
  const location = useLocation();
  const navigate = useNavigate();

  const SignOutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };
  return (
    <NavBar bg="dark" variant="dark">
      <Link onClick={() => navigate(-1)}>
        {location.pathname !== '/' && (
          <i className="fa fa-arrow-left text-white align-arrow-right ms-3">
            Back
          </i>
        )}
      </Link>
      <Container>
        <LinkContainer to="/">
          <NavBar.Brand>EShop</NavBar.Brand>
        </LinkContainer>
        {location.pathname !== '/' ? (
          <LinkContainer to="/">
            <NavBar.Brand>Home</NavBar.Brand>
          </LinkContainer>
        ) : null}

        <nav className="d-flex align-items-center w-50 ms-auto">
          <SearchBox />
        </nav>
        <Nav className="ms-auto d-flex justify-content-end">
          <Link to="/cart" className="nav-link">
            <i className="fas fa-shopping-cart"> </i>
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
\          {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <LinkContainer to="/profile">
                <NavDropdown.Item>User Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/orderhistory">
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <Link
                className="dropdown-item"
                to="#signout"
                onClick={SignOutHandler}
              >
                Sign Out
              </Link>
            </NavDropdown>
          ) : (
            <Link className="nav-link" to="/signin">
              Sign In
            </Link>
          )}
        </Nav>
      </Container>
    </NavBar>
  );
};

export default CustomNavbar;
