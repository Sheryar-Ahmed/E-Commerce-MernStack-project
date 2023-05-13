import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' Component={Home} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
