import {
  useEffect,
  useReducer,
  axios,
  Loading,
  MessageBox,
  GET_SUCCESS,
  GET_FAIL,
  GET_REQUEST,
  homePageReducer,
  Row,
  Col,
  ProductItem,
  Helmet,
} from '../Imports';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  main: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const HomePage = () => {
  const [{ loading, error, products }, dispatch] = useReducer(homePageReducer, {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const res = await axios.get('/api/v1/products');
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: err.message });
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <div className="carousel">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={'main'}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div>
            <img
              className="carousel-image"
              src="https://m.media-amazon.com/images/I/61PRFOFwuRL._SX3000_.jpg"
              alt="carousel"
            />
          </div>
          <div>
            <img
              className="carousel-image"
              src="https://m.media-amazon.com/images/I/71Lv8RkYimL._SX3000_.jpg"
              alt="carousel"
            />
          </div>
          <div>
            <img
              className="carousel-image"
              src="https://m.media-amazon.com/images/I/71tMlGMklPL._SX3000_.jpg"
              alt="carousel"
            />
          </div>
          <div>
            <img
              className="carousel-image"
              src="https://m.media-amazon.com/images/I/71rzmcWTcTL._SX3000_.jpg"
              alt="carousel"
            />
          </div>
        </Carousel>
      </div>
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="product-list">
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product.token} lg={3} md={4} sm={6} className="mb-5">
                  <ProductItem product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
