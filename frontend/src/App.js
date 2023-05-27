import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Products from './components/Products';
import UserAuth from './components/UserAuth';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/details/:id' Component={ProductDetails} />
        <Route exact path='/products' Component={Products} />
        <Route exact path='/login' Component={UserAuth} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
