import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Products from './components/Products';
import UserAuth from './components/UserAuth';
import Account from './components/Account';
import { useEffect } from 'react';
import store from './store';
import { userDetails } from './actions/userAction';
import Dashboard from './components/admin/dashboard/Dashboard';
import MyOrder from './components/MyOrder';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Cart from './components/Cart';
import Shipping from './components/Shipping';
import ConfirmOrder from './components/ConfirmOrder';
import Payment from './components/Payment.js';
import axios from 'axios';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SuccessPayment from './components/successPayment.js';
import OrderDetails from './components/OrderDetails.js';
function App() {
  const [stripeKey, setStripeApiKey] = React.useState();
  const getStripeaApiKey = async () => {
    try{
    const config = { Headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true }, withCredentials: true };
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/stripeApiKey`, config);
    setStripeApiKey(data.stripeApiKey);
  }catch(error){
    console.log("stripeApiKey", error);
  }
  }

  useEffect(() => {
    store.dispatch(userDetails());
    getStripeaApiKey();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/details/:id' Component={ProductDetails} />
        <Route exact path='/products' Component={Products} />
        <Route exact path='/login' Component={UserAuth} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute >
              <Account />
            </ProtectedRoute>
          }
        />
        <Route exact path='/shipping' Component={Shipping} />
        <Route exact path='/order/confirm' Component={ConfirmOrder} />
        {stripeKey && <Route
          path="/process/payment"
          element={
            <ProtectedRoute>
              <Elements stripe={loadStripe(stripeKey)}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />}
        <Route exact path='/success' Component={SuccessPayment} />
        <Route exact path='/order/me' Component={MyOrder} />
        <Route exact path='/order/:id' Component={OrderDetails} />
        <Route exact path='/cart' Component={Cart} />
        <Route exact path='/admin/dashboard' Component={Dashboard} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
