import {
  useContext,
  Link,
  Card,
  Button,
  Rating,
  Store,
  ADD_TO_CART,
} from '../Imports';

const ProductItem = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (item.countInStock < quantity) {
      window.alert('Sorry, this item is unavailable');
    }
    ctxDispatch({
      type: ADD_TO_CART,
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="product-card">
      <Link to={`/product/${product.token}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body className="d-flex flex-column  justify-content-end">
        <Link to={`/product/${product.token}`}>
          <Card.Title className="custom-title">{product.title}</Card.Title>
        </Link>
        <Rating rating={product.rating} />
        <Card.Text>
          <strong>{product.price}$</strong>
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product, product.quantity)}>
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
