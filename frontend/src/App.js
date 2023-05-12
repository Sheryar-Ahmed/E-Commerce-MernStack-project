import './App.css';
import { BrowserRouter as Router, route } from 'react-router-dom';
import Header from './components/layout/header';
function App() {
  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
