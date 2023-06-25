import {
  useParams,
  useEffect,
  useReducer,
  axios,
  Row,
  Col,
  Loading,
  MessageBox,
  getError,
  ListGroup,
  Store,
  useContext,
  useNavigate,
  GET_REQUEST,
  GET_FAIL,
  GET_SUCCESS,
  productPageReducer,
  ADD_TO_CART,
  Helmet,
  Rating,
  Card,
  Badge,
  Button,
} from '../Imports';

const ProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  // Use reducer hook to manage state and dispatch actions
  const [{ loading, error, product }, dispatch] = useReducer(
    productPageReducer,
    {
      loading: true,
      error: '',
      product: [],
    }
  );

  useEffect(() => {
    // Fetch product details from the server when the component mounts
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const res = await axios.get(`/api/v1/products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: getError(err) });
      }
    };
    getProducts();
  }, [token]);

  const addToCartHandler = async () => {
    // Add the product to the cart and navigate to the cart page
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    ctxDispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });
    navigate('/cart');
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                className="img-large"
                src={product.image}
                alt={product.title}
              ></img>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.title}</title>
                  </Helmet>
                  <h1>{product.title}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={product.rating}></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button onClick={addToCartHandler} variant="primary">
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
