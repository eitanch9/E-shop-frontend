// Importing necessary dependencies and components
import {
  axios,
  useLocation,
  useNavigate,
  Container,
  useContext,
  useEffect,
  useState,
  Store,
  getError,
  Helmet,
  USER_SIGNIN,
  Form,
  Link,
  Button,
  toast,
} from '../Imports';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  // Extracting 'redirect' parameter from the URL, if it exists
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  // Initializing state variables for email and password
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Accessing global state and dispatch function from the context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/v1/users/signup', {
        name,
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
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignUpPage;
