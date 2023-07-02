import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container} from "react-bootstrap";
import  Form  from "react-bootstrap/Form"; 
import  Button  from "react-bootstrap/Button";
import { useContext,  useState } from "react";
import { Store } from "../store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { USER_SIGNIN } from "../action";


function SignupPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);


    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error('Passwords must match')
        }
        try {
            const { data } = await axios.post('/api/v1/users/signup', {
                name,
                email,
                password,
            });

            ctxDispatch({ type: USER_SIGNIN, payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');

        } 
        catch (err) {
            toast.error(getError(err));
        }
    };
    
    return(
        <Container className="small-container">
            <title title='Sign-up' />
            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
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
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Confirm</Form.Label>
                <Form.Control
                    type="Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Group>
            <div className="mb-3">
                <Button type="submit">Sign Up</Button>
            </div>
            <div className="mb-3">
                Already have an account?
                {' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
            </div>
        </Form>
        </Container>
    )
}
export default SignupPage;