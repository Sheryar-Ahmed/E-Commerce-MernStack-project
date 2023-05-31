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
import Dashboard from './components/Dashboard';

function App() {
  useEffect(() => {
    store.dispatch(userDetails());
  }, [])
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/details/:id' Component={ProductDetails} />
        <Route exact path='/products' Component={Products} />
        <Route exact path='/login' Component={UserAuth} />
        <Route exact path='/profile' Component={Account} />
        <Route exact path='/dashboard' Component={Dashboard} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
