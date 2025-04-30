import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import AddProducts from './Components/AddProducts';
import GetProducts from './Components/GetProducts';
import SingleProduct from './Components/SingleProduct';
import Chatbot from './Components/Chatbot';


// import Products from './Components/Products';


function App() {
  return (
    <Router>
      <div className="App">
      <header className="App-header">
        <h1>SafTech Shop</h1> 
        </header>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/addproducts" element={<AddProducts/>}/>
          <Route path="/" element={<GetProducts/>}/>
          <Route path="/singleproduct" element={<SingleProduct/>}/>
          <Route path="/chatbot" element={<Chatbot/>}/>

          {/* <Route path="/products" element={<Products/>}/> */}
        </Routes>
     </div>
    </Router>
  );
}

export default App;
