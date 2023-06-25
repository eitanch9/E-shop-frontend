// Importing necessary dependencies and components
import {
  axios, useLocation, useNavigate, Container, useContext, useEffect, useState, Store,
  getError, Helmet, USER_SIGNIN, Form, Link, Button, toast
} from '../Imports';

const SignInPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  // Extracting 'redirect' parameter from the URL, if it exists
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  // Initializing state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Accessing global state and dispatch function from the context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/users/signin', {
        email,
        password,
      });

      // Dispatching a user sign-in action with the received data
      ctxDispatch({ type: USER_SIGNIN, payload: data });

      // Storing user information in local storage
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Navigating to the specified redirect URL or the home page
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  // useEffect hook to check if the user is already signed in
  useEffect(() => {
    if (userInfo) {
      // Navigating to the specified redirect URL or the home page
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
        <div className="mb-3">
          Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInPage;
