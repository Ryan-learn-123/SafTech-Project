// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const Checkout = () => {
//   const img_url = "https://ryan2025.pythonanywhere.com/static/images/";
//   const [cart, setCart] = useState([]);
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//   const grandTotal = cart.reduce(
//     (sum, item) => sum + item.product_cost * (item.quantity || 1),
//     0
//   );

//   const submitForm = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading("Please wait ... Processing Payment ...");

//     try {
//       const data = new FormData();
//       data.append("amount", grandTotal);
//       data.append("phone", phone);

//       const response = await axios.post("https://ryan2025.pythonanywhere.com/api/mpesa_payment", data);
//       setLoading("");
//       setSuccess(response.data.message);
//     } catch (error) {
//       setLoading("");
//       setError(error.message);
//     }
//   };

//   if (cart.length === 0) {
//     return <p>Your cart is empty.</p>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2>Checkout</h2>

//       {cart.map((item) => (
//         <div key={item.product_id} className="card mb-3 p-3">
//           <img
//             src={img_url + item.product_photo}
//             alt={item.product_name}
//             style={{ width: "100px", height: "100px", objectFit: "cover" }}
//           />
//           <div>
//             <h5>{item.product_name}</h5>
//             <p>Quantity: {item.quantity}</p>
//             <p>Price per unit: KES {item.product_cost}</p>
//             <p>Total: KES {item.product_cost * item.quantity}</p>
//           </div>
//         </div>
//       ))}

//       <h4>Grand Total: KES {grandTotal}</h4>

//       <b className="text-warning">{loading}</b>
//       <b className="text-danger">{error}</b>
//       <b className="text-success">{success}</b>

//       <form onSubmit={submitForm}>
//         <input
//           type="tel"
//           required
//           placeholder="Enter Mpesa No 254XXXXXXX"
//           onChange={(e) => setPhone(e.target.value)}
//           className="form-control"
//         />
//         <br />
//         <button className="btn btn-success">Pay Now</button>
//       </form>

//       <br />
//       <Link to="/" className="btn btn-dark">Back to Home</Link>
//     </div>
//   );
// };

// export default Checkout;

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const img_url = "https://ryan2025.pythonanywhere.com/static/images/";
  const [cart, setCart] = useState([]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.product_cost * (item.quantity || 1),
    0
  );

  // Handle payment form submission
  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading("Please wait ... Processing Payment ...");

    try {
      const data = new FormData();
      data.append("amount", grandTotal);
      data.append("phone", phone);

      const response = await axios.post(
        "https://ryan2025.pythonanywhere.com/api/mpesa_payment",
        data
      );

      setSuccess(response.data.message);
      setCart([]); // clear cart on success
      localStorage.removeItem("cart");
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading("");
    }
  };

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      {cart.map((item) => (
        <div key={item.product_id} className="card mb-3 p-3 d-flex flex-row align-items-center">
          <img
            src={img_url + item.product_photo}
            alt={item.product_name}
            style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "1rem" }}
          />
          <div>
            <h5>{item.product_name}</h5>
            <p>Quantity: {item.quantity}</p>
            <p>Price per unit: KES {item.product_cost}</p>
            <p>Total: KES {item.product_cost * item.quantity}</p>
          </div>
        </div>
      ))}

      <div className="card p-3 mb-4">
        <h4>Grand Total: <span className="text-success">KES {grandTotal}</span></h4>
      </div>

      {/* Feedback messages */}
      {loading && <p className="text-warning">{loading}</p>}
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}

      {/* Mpesa Payment Form */}
      <form onSubmit={submitForm} className="mb-4">
        <input
          type="tel"
          required
          placeholder="Enter Mpesa No 254XXXXXXX"
          onChange={(e) => setPhone(e.target.value)}
          className="form-control mb-3"
        />
        <button className="btn btn-success">Pay Now</button>
      </form>

      <Link to="/" className="btn btn-dark">Back to Home</Link>
    </div>
  );
};

export default Checkout;
