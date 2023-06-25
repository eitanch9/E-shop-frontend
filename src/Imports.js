import ReactDOM from 'react-dom/client';
import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  createContext,
  Fragment,
} from 'react';
import axios from 'axios';
import Loading from './components/Loading';
import MessageBox from './components/MessageBox';
import {
  GET_SUCCESS,
  GET_FAIL,
  GET_REQUEST,
  ADD_TO_CART,
  USER_SIGNIN,
  REMOVE_FROM_CART,
  USER_SIGNOUT,
  SAVE_PAYMENT_METHOD,
  CREATE_FAILED,
  CREATE_REQUEST,
  CREATE_SUCCEEDED,
  CLEAR_CART,
  SAVE_SHIPPING_ADDRESS,
} from './Actions';
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getError } from './utils';
import { Store } from './store';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Rating from './components/Rating';
import ProductItem from './components/ProductItem';
import { LinkContainer } from 'react-router-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import CustomNavbar from './components/Navbar';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './store';
import { homePageReducer } from './reducers/homePageReducer';
import { productPageReducer } from './reducers/productPageReducer';
import { storeReducer } from './reducers/storeReducer';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingAddressPage from './pages/ShippingAddressPage';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import CheckoutSteps from './components/CheckoutSteps';

export {
  useEffect,
  useReducer,
  axios,
  Loading,
  MessageBox,
  GET_SUCCESS,
  GET_FAIL,
  GET_REQUEST,
  useContext,
  ADD_TO_CART,
  useParams,
  useNavigate,
  Nav,
  Row,
  Col,
  getError,
  Store,
  useState,
  USER_SIGNIN,
  useLocation,
  Container,
  REMOVE_FROM_CART,
  Card,
  Button,
  ListGroup,
  Link,
  Rating,
  ProductItem,
  Badge,
  LinkContainer,
  NavBar,
  Spinner,
  Alert,
  Helmet,
  Form,
  Route,
  Routes,
  BrowserRouter,
  HomePage,
  ProductPage,
  CartPage,
  SignInPage,
  CustomNavbar,
  React,
  ReactDOM,
  App,
  HelmetProvider,
  StoreProvider,
  createContext,
  homePageReducer,
  productPageReducer,
  storeReducer,
  NavDropdown,
  USER_SIGNOUT,
  ShippingAddressPage,
  ToastContainer,
  CheckoutSteps,
  SAVE_PAYMENT_METHOD,
  CREATE_FAILED,
  CREATE_REQUEST,
  CREATE_SUCCEEDED,
  CLEAR_CART,
  toast,
  SAVE_SHIPPING_ADDRESS,
  Fragment,
};
