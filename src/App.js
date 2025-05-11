import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React, { useState } from "react";
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import AddProducts from './Components/AddProducts';
import GetProducts from './Components/GetProducts';
import SingleProduct from './Components/SingleProduct';
import Chatbot from './Components/Chatbot';
import ProfilePage from './Components/Profile';
import ChangePassword from './Components/ChangePassword';
import CategoryProducts from './Components/CategoryProducts';
import Cart from "./Components/Cart";
import Checkout from './Components/Checkout';
import SubscriptionComponent from './Components/Subscription';
// import SubscribeButton from './Components/SubscribeButton'; 
// import SubscriptionComponent from './Components/Subscription'; 



function App() {
  const [user, setUser] = useState(null); 

  const [cart, setCart] = useState([]);

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product_id !== productId));
  };

  return (
    <Router>
      <div className="App">
      <header className="App-header">
        <h1>SafTech Shop</h1> 
        </header>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn setUser={setUser}/>}/>
          <Route path="/addproducts" element={<AddProducts/>}/>
          <Route path="/" element={<GetProducts cart={cart} setCart={setCart}/>}/>
          <Route path="/singleproduct" element={<SingleProduct/>}/>
          <Route path="/chatbot" element={<Chatbot/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/changepassword" element={<ChangePassword/>} />
          <Route path="/category/:categoryName" element={<CategoryProducts />} />
          <Route path="/cart"element={<Cart cart={cart} removeFromCart={removeFromCart} />}/>
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/subscriptions" element={<SubscriptionComponent/>} />
          


        </Routes>
     </div>
    </Router>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
// import SignUp from './Components/SignUp';
// import SignIn from './Components/SignIn';
// import AddProducts from './Components/AddProducts';
// import GetProducts from './Components/GetProducts';
// import SingleProduct from './Components/SingleProduct';
// import Chatbot from './Components/Chatbot';
// import ProfilePage from './Components/Profile';
// import ChangePassword from './Components/ChangePassword';
// import CategoryProducts from './Components/CategoryProducts';
// import Cart from './Components/Cart';
// import Checkout from './Components/Checkout';
// import SubscribeButton from './Components/SubscribeButton'; // Import the SubscribeButton
// import SubscriptionComponent from './Components/Subscription'; // Import the SubscriptionComponent

// function App() {
//   const [user, setUser] = useState(null); // User data, assuming user login is handled elsewhere

//   const [cart, setCart] = useState([]);

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.product_id !== productId));
//   };

//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <h1>SafTech Shop</h1>
//         </header>

//         {/* Add SubscribeButton to the homepage */}
//         {/* <div style={{ margin: "20px 0", textAlign: "center" }}>
//           <SubscribeButton user={user} />
//         </div> */}

//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/signin" element={<SignIn setUser={setUser} />} />
//           <Route path="/addproducts" element={<AddProducts />} />
//           <Route path="/" element={<GetProducts cart={cart} setCart={setCart} />} />
//           <Route path="/singleproduct" element={<SingleProduct />} />
//           <Route path="/chatbot" element={<Chatbot />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/changepassword" element={<ChangePassword />} />
//           <Route path="/category/:categoryName" element={<CategoryProducts />} />
//           <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
//           <Route path="/checkout" element={<Checkout />} />

//           {/* Add route for SubscriptionComponent */}
//           
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


