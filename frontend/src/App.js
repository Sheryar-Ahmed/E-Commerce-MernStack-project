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
        <Route
          path="/profile"
          element={
            <ProtectedRoute >
              <Account />
            </ProtectedRoute>
          }
        />
        <Route exact path='/myorders' Component={MyOrder} />
        <Route exact path='/admin/dashboard' Component={Dashboard} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
