import {
  useContext,
  Store,
  Col,
  Row,
  Helmet,
  axios,
  ADD_TO_CART,
  GET_FAIL,
  REMOVE_FROM_CART,
  useNavigate,
  MessageBox,
  Link,
  ListGroup,
  Button,
  Card,
} from '../Imports';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CartPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // Function to update the quantity of an item in the cart
  const updateCartHandler = async (item, quantity) => {
    try {
      const { data } = await axios.get(`/api/v1/products/${item._id}`);
      if (data.countInStock < quantity) {
        window.alert('Sorry, this item is unavailable');
      }
      // Dispatch an action to add the item with updated quantity to the cart
      ctxDispatch({
        type: ADD_TO_CART,
        payload: { ...item, quantity },
      });
    } catch (err) {
      ctxDispatch({ type: GET_FAIL, payload: err.message });
    }
  };

  // Function to remove an item from the cart
  const removeItemHandler = (item) => {
    // Dispatch an action to remove the item from the cart
    ctxDispatch({
      type: REMOVE_FROM_CART,
      payload: item,
    });
  };

  // Function to handle the checkout process
  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  // Function to handle the drag and drop functionality
  const handleDragEnd = (result) => {
    // Dispatch an action to handle the drag and drop event
    ctxDispatch({
      type: 'DROP_END',
      payload: result,
    });
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Your cart is empty. <Link to="/">Start Shopping</Link>
            </MessageBox>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="list">
                {(provided) => (
                  <ListGroup
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {cartItems.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <ListGroup.Item
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={index}
                          >
                            <Row className="align-items-center">
                              <Col md={4}>
                                <img
                                  className="img-fluid rounded img-thumbnail"
                                  src={item.image}
                                  alt={item.title}
                                ></img>{' '}
                                <Link to={`/product/${item.token}`}>
                                  {item.title}
                                </Link>
                              </Col>
                              <Col md={3}>
                                <Button
                                  variant="light"
                                  disabled={item.quantity === 1}
                                  onClick={() =>
                                    updateCartHandler(item, item.quantity - 1)
                                  }
                                >
                                  <i className="fas fa-minus-circle"></i>
                                </Button>{' '}
                                <span>{item.quantity}</span>
                                <Button
                                  variant="light"
                                  disabled={item.quantity === item.countInStock}
                                  onClick={() =>
                                    updateCartHandler(item, item.quantity + 1)
                                  }
                                >
                                  <i className="fas fa-plus-circle"></i>
                                </Button>{' '}
                              </Col>
                              <Col md={3}>${item.price}</Col>
                              <Col md={2}>
                                <Button
                                  variant="light"
                                  onClick={() => removeItemHandler(item)}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>{' '}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}
                      </Draggable>
                    ))}
                  </ListGroup>
                )}
              </Droppable>
            </DragDropContext>
            // <ListGroup>
            //   {cartList.map((item) => (
            //     <ListGroup.Item key={item._id}>
            //       <Row className="align-items-center">
            //         <Col md={4}>
            //           <img
            //             className="img-fluid rounded img-thumbnail"
            //             src={item.image}
            //             alt={item.title}
            //           ></img>{' '}
            //           <Link to={`/product/${item.token}`}>{item.title}</Link>
            //         </Col>
            //         <Col md={3}>
            //           <Button
            //             variant="light"
            //             disabled={item.quantity === 1}
            //             onClick={() =>
            //               updateCartHandler(item, item.quantity - 1)
            //             }
            //           >
            //             <i className="fas fa-minus-circle"></i>
            //           </Button>{' '}
            //           <span>{item.quantity}</span>
            //           <Button
            //             variant="light"
            //             disabled={item.quantity === item.countInStock}
            //             onClick={() =>
            //               updateCartHandler(item, item.quantity + 1)
            //             }
            //           >
            //             <i className="fas fa-plus-circle"></i>
            //           </Button>{' '}
            //         </Col>
            //         <Col md={3}>${item.price}</Col>
            //         <Col md={2}>
            //           <Button
            //             variant="light"
            //             onClick={() => removeItemHandler(item)}
            //           >
            //             <i className="fas fa-trash"></i>
            //           </Button>{' '}
            //         </Col>
            //       </Row>
            //     </ListGroup.Item>
            //   ))}
            // </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items:) $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={() => checkoutHandler()}
                    >
                      Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
