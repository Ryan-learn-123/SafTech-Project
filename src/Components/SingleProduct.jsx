// import axios from "axios"
// import { useState } from "react";
// import { useLocation,Link} from "react-router-dom";

// const SingleProduct = () => {

//     const img_url = "https://ryan2025.pythonanywhere.com/static/images/"
//     const {product} = useLocation().state || {};

//     let [phone, setPhone] = useState("");
//     let [loading, setLoading] = useState("");
//     let [error, setError] = useState("");
//     let [success, setSuccess] = useState("");

//     const submitForm = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");
//         setLoading("Please wait ... Processing Payment ...");

//     const [cart, setCart] = useState([]);

//     const addToCart = (product) => {
//     const existing = cart.find((item) => item.product_id === product.product_id);
//     if (existing) {
//         setCart(cart.map(item =>
//         item.product_id === product.product_id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ));
//     } else {
//         setCart([...cart, { ...product, quantity: 1 }]);
//     }
//     };

//     const removeFromCart = (productId) => {
//     setCart(cart.filter(item => item.product_id !== productId));
//     };

       
//         try {
//             const data = new FormData();
//            data.append("amount", product.product_cost);
//            data.append("phone", phone);

//            const response = await axios.post("https://ryan2025.pythonanywhere.com/api/mpesa_payment", data);
//            setLoading("");
//            setSuccess(response.data.message);
//         } catch (error) {
//             setLoading("");
//             setError(error.message);
//         }
//     };
//     return ( 
//         <div className="container-fluid getproducts-background">
//             <div className="row justify-content-center mt-3 ">
//             <nav className="m-4">
//                 <Link to = "/"className="btn btn-dark mx-2">Back To Home</Link>
//                 <Link to="/cart" className="btn btn-warning mx-2">View Cart ({cart.length})</Link>


//             </nav>
//             <div className="col-md-3 card shadow">
//                 <img src={img_url + product.product_photo}  alt= {product.product_name} />
                
//             </div>
//             <div className="col-md-3 card shadow">
//                 <h2>{product.product_name}</h2>
//                 <h3 className="text-warning">{product.product_cost}</h3>
//                 <p className="text-muted">{product.product_desc}</p>

//                 <b className="text-warning">{loading}</b>
//                 <b className="text-danger">{error}</b>
//                 <b className="text-success">{success}</b>

//                 <form onSubmit={submitForm}>
//                     <input type="number" readOnly  value = {product.product_cost} className = "form-control" /> <br />

//                     <input type="tel" required placeholder="Enter Mpesa No 254XXXXXXX" onChange={(e) => setPhone(e.target.value)} className="form-control" /> <br />
//                     <button className="btn btn-success">Pay Now</button> <br /> <br />
                    

//                 </form>
                
//             </div>
//         </div>
//         </div>
//      );
// }
 
// export default SingleProduct;

// import axios from "axios";
// import { useState } from "react";
// import { useLocation, Link } from "react-router-dom";

// const SingleProduct = () => {
//   const img_url = "https://ryan2025.pythonanywhere.com/static/images/";

//   // Safely access the product data passed via location state
//   const { product } = useLocation().state || {};

//   // Check if the product is available before attempting to render
//   if (!product) {
//     return <p>Product not found. Please go back and try again.</p>;
//   }

//   const [cart, setCart] = useState([]); // Cart state
//   const [phone, setPhone] = useState(""); // Phone number for payment
//   const [loading, setLoading] = useState(""); // Loading state
//   const [error, setError] = useState(""); // Error state
//   const [success, setSuccess] = useState(""); // Success state

//   // Add product to the cart
//   const addToCart = (product) => {
//     const existing = cart.find((item) => item.product_id === product.product_id);
//     if (existing) {
//       setCart(cart.map(item =>
//         item.product_id === product.product_id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   // Remove product from the cart
//   const removeFromCart = (productId) => {
//     setCart(cart.filter(item => item.product_id !== productId));
//   };

//   // Handle payment form submission
//   const submitForm = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading("Please wait ... Processing Payment ...");

//     try {
//       const data = new FormData();
//       data.append("amount", product.product_cost);
//       data.append("phone", phone);

//       const response = await axios.post("https://ryan2025.pythonanywhere.com/api/mpesa_payment", data);
//       setLoading(""); // Reset loading state
//       setSuccess(response.data.message); // Display success message
//     } catch (error) {
//       setLoading(""); // Reset loading state
//       setError(error.message); // Display error message
//     }
//   };

//   return (
//     <div className="container-fluid getproducts-background">
//       <div className="row justify-content-center mt-3">
//         <nav className="m-4">
//           <Link to="/" className="btn btn-dark mx-2">Back To Home</Link>
//           <Link to="/cart" className="btn btn-warning mx-2">
//             View Cart ({cart.length})
//           </Link>
//         </nav>

//         {/* Product Image Section */}
//         <div className="col-md-3 card shadow">
//           <img src={img_url + product.product_photo} alt={product.product_name} />
//         </div>

//         {/* Product Details Section */}
//         <div className="col-md-3 card shadow">
//           <h2>{product.product_name}</h2>
//           <h3 className="text-warning">{product.product_cost}</h3>
//           <p className="text-muted">{product.product_desc}</p>

//           {/* Display loading, error, and success messages */}
//           <b className="text-warning">{loading}</b>
//           <b className="text-danger">{error}</b>
//           <b className="text-success">{success}</b>

//           {/* Payment Form */}
//           <form onSubmit={submitForm}>
//             <input
//               type="number"
//               readOnly
//               value={product.product_cost}
//               className="form-control"
//             />
//             <br />
//             <input
//               type="tel"
//               required
//               placeholder="Enter Mpesa No 254XXXXXXX"
//               onChange={(e) => setPhone(e.target.value)}
//               className="form-control"
//             />
//             <br />
//             <button className="btn btn-success">Pay Now</button>
//             <br />
//             <br />
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;

import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const SingleProduct = () => {
  const img_url = "https://ryan2025.pythonanywhere.com/static/images/";

  const { product } = useLocation().state || {};

  // Check if the product is available before attempting to render
  if (!product) {
    return <p>Product not found. Please go back and try again.</p>;
  }

  const [cart, setCart] = useState([]); // Cart state
  const [phone, setPhone] = useState(""); // Phone number for payment
  const [loading, setLoading] = useState(""); // Loading state
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success state

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart); // Update the state with cart data from localStorage
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    }
  }, [cart]);

  // Add product to the cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.product_id === product.product_id);
    if (existing) {
      setCart(cart.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Handle payment form submission
  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading("Please wait ... Processing Payment ...");

    try {
      const data = new FormData();
      data.append("amount", product.product_cost);
      data.append("phone", phone);

      const response = await axios.post("https://ryan2025.pythonanywhere.com/api/mpesa_payment", data);
      setLoading(""); // Reset loading state
      setSuccess(response.data.message); // Display success message
    } catch (error) {
      setLoading(""); // Reset loading state
      setError(error.message); // Display error message
    }
  };

  return (
    
    <div className="hero-banner">
      <div className="container-fluid getproducts-background">
      <div className="row justify-content-center mt-3">
        <nav className="m-4">
          <Link to="/" className="btn btn-dark mx-2">Back To Home</Link>
          <Link to="/cart" className="btn btn-warning mx-2">
            View Cart 
          </Link>
        </nav>

        {/* Product Image Section */}
        <div className="col-md-3 card shadow">
          <img src={img_url + product.product_photo} alt={product.product_name} />
        </div>

        {/* Product Details Section */}
        <div className="col-md-3 card shadow">
          <h2>{product.product_name}</h2>
          <h3 className="text-warning">{product.product_cost}</h3>
          <p className="text-muted">{product.product_desc}</p>

          {/* Display loading, error, and success messages */}
          <b className="text-warning">{loading}</b>
          <b className="text-danger">{error}</b>
          <b className="text-success">{success}</b>

          {/* Add to Cart Button */}
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          {/* Payment Form */}
          <form onSubmit={submitForm}>
            <input
              type="number"
              readOnly
              value={product.product_cost}
              className="form-control"
            />
            <br />
            <input
              type="tel"
              required
              placeholder="Enter Mpesa No 254XXXXXXX"
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
            />
            <br />
            <button className="btn btn-success">Pay Now</button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SingleProduct;
