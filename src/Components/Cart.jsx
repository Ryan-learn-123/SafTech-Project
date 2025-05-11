// import React from "react";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const Cart = ({ cart, removeFromCart }) => {
//   const img_url = "https://ryan2025.pythonanywhere.com/static/images/";

//   return (
//     <div className="container mt-4">
//       <h2>Your Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cart.map(item => (
//             <div key={item.product_id} className="card mb-3 p-3 d-flex flex-row align-items-center">
//               <img
//                 src={img_url + item.product_photo}
//                 alt={item.product_name}
//                 style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "1rem" }}
//               />
//               <div>
//                 <h5>{item.product_name}</h5>
//                 <p>Quantity: {item.quantity || 1}</p>
//                 <p>Price per unit: KES {item.product_cost}</p>
//                 <p>Total: KES {item.product_cost * (item.quantity || 1)}</p>
//                 <button onClick={() => removeFromCart(item.product_id)} className="btn btn-danger">
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="card p-3 mt-4">
//             <h4>
//               Grand Total: KES{" "}
//               {cart.reduce((sum, item) => sum + item.product_cost * (item.quantity || 1), 0)}
//             </h4>
//             <Link to="/singleproduct" className="btn btn-success mt-2">Proceed to Checkout</Link>
//           </div>
//         </>
//       )}

//       <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
//     </div>
//   );
// };

// export default Cart;

// import React from "react";
// import { Link } from "react-router-dom";

// const Cart = ({ cart, removeFromCart }) => {
//   const img_url = "https://ryan2025.pythonanywhere.com/static/images/";

//   return (
//     <div className="container mt-4">
//       <h2>Your Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div
//               key={item.product_id}
//               className="card mb-3 p-3 d-flex flex-row align-items-center"
//             >
//               <img
//                 src={img_url + item.product_photo}
//                 alt={item.product_name}
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   objectFit: "cover",
//                   marginRight: "1rem",
//                 }}
//               />
//               <div>
//                 <h5>{item.product_name}</h5>
//                 <p>Quantity: {item.quantity || 1}</p>
//                 <p>Price per unit: KES {item.product_cost}</p>
//                 <p>Total: KES {item.product_cost * (item.quantity || 1)}</p>
//                 <button
//                   onClick={() => removeFromCart(item.product_id)}
//                   className="btn btn-danger"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="card p-3 mt-4">
//             <h4>
//               Grand Total: KES{" "}
//               {cart.reduce(
//                 (sum, item) => sum + item.product_cost * (item.quantity || 1),
//                 0
//               )}
//             </h4>
//             {/* Pass the first item from the cart to /singleproduct */}
//             <Link
//               to={{
//                 pathname: "/singleproduct",
//                 state: { product: cart[0] }, // Pass the first product as state
//               }}
//               className="btn btn-success mt-2"
//             >
//               Proceed to Checkout
//             </Link>
//           </div>
//         </>
//       )}

//       <Link to="/" className="btn btn-dark mt-3">
//         Back to Home
//       </Link>
//     </div>
//   );
// };

// export default Cart;

// import React from "react";
// import { Link } from "react-router-dom";

// const Cart = ({ cart, removeFromCart }) => {
//   const img_url = "https://ryan2025.pythonanywhere.com/static/images/";

//   return (
//     <div className="container mt-4">
//       <h2>Your Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div
//               key={item.product_id}
//               className="card mb-3 p-3 d-flex flex-row align-items-center"
//             >
//               <img
//                 src={img_url + item.product_photo}
//                 alt={item.product_name}
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   objectFit: "cover",
//                   marginRight: "1rem",
//                 }}
//               />
//               <div>
//                 <h5>{item.product_name}</h5>
//                 <p>Quantity: {item.quantity || 1}</p>
//                 <p>Price per unit: KES {item.product_cost}</p>
//                 <p>Total: KES {item.product_cost * (item.quantity || 1)}</p>
//                 <button
//                   onClick={() => removeFromCart(item.product_id)}
//                   className="btn btn-danger"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="card p-3 mt-4">
//             <h4>
//               Grand Total: KES{" "}
//               {cart.reduce(
//                 (sum, item) => sum + item.product_cost * (item.quantity || 1),
//                 0
//               )}
//             </h4>
//             {/* Pass the first item from the cart to /singleproduct */}
//             <Link
//               to={{
//                 pathname: "/checkout",
//                 state: { product: cart[0] }, // Pass the first product as state
//               }}
//               className="btn btn-success mt-2"
//             >
//               Proceed to Checkout
//             </Link>
//           </div>
//         </>
//       )}

//       <Link to="/" className="btn btn-dark mt-3">
//         Back to Home
//       </Link>
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, removeFromCart }) => {
  const img_url = "https://ryan2025.pythonanywhere.com/static/images/";

  // Save cart to localStorage on render
  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.product_id} className="card mb-3 p-3 d-flex flex-row align-items-center">
              <img
                src={img_url + item.product_photo}
                alt={item.product_name}
                style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "1rem" }}
              />
              <div>
                <h5>{item.product_name}</h5>
                <p>Quantity: {item.quantity || 1}</p>
                <p>Price per unit: KES {item.product_cost}</p>
                <p>Total: KES {item.product_cost * (item.quantity || 1)}</p>
                <button onClick={() => removeFromCart(item.product_id)} className="btn btn-danger">
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="card p-3 mt-4">
            <h4>
              Grand Total: KES{" "}
              {cart.reduce((sum, item) => sum + item.product_cost * (item.quantity || 1), 0)}
            </h4>
            <Link to="/checkout" className="btn btn-success mt-2">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}

      <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
    </div>
  );
};

export default Cart;
