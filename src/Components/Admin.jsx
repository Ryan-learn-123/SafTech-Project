// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import Footer from "./Footer"; // Assuming you have this footer component

// const AdminRoute = () => {
//   const [adminDetails, setAdminDetails] = useState({ name: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false); // Tracks loading state
//   const [error, setError] = useState(""); // Tracks errors
//   const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
//   const navigate = useNavigate();

//   // Function to handle the admin login
//   const handleAdminLogin = async () => {
//     try {
//       setLoading(true);
//       setError("");  // Clear any previous errors

//       // Send login data to the backend for authentication
//       const response = await axios.post(
//         "https://ryan2025.pythonanywhere.com/api/admin/login", // Your backend login endpoint
//         adminDetails,
//         { withCredentials: true } // Optional: Used to send cookies along with requests
//       );

//       console.log(response.data); // Log the response for debugging purposes

//       // If login is successful and the role is 'admin', redirect to the dashboard
//       if (response.data.success && response.data.role === "admin") {
//         // Optionally, store the admin's token or admin details in localStorage
//         localStorage.setItem('adminToken', response.data.token || ''); // Store token or admin ID

//         // Navigate to the admin dashboard after a successful login
//         navigate("/admindashboard"); // Redirect to admin dashboard after successful login
//       } else {
//         // If credentials are invalid or user isn't an admin
//         setError("Invalid credentials or not an admin.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("An error occurred during login. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle input changes (name, email, password)
//   const handleChange = (e) => {
//     setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
//   };

//   // Handle pressing the Enter key (to submit the form)
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Prevents form submission on Enter key
//       handleAdminLogin(); // Trigger login function on Enter key press
//     }
//   };

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="bg getproducts-background">
//         <div className="row justify-content-center mt-4">
//           <nav className="m-4">
//             <Link to="/" className="btn btn-dark mx-2">Home</Link>
//           </nav>

//           <div className="col-md-6 card shadow p-4">
//             <h2>Admin Login</h2>

//             {/* Display error message if there is any */}
//             {error && <div className="text-danger">{error}</div>}
            
//             {/* Admin Name input */}
//             <div className="form-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="name"
//                 value={adminDetails.name}
//                 onChange={handleChange}
//                 placeholder="Enter Admin Name"
//                 required
//                 onKeyDown={handleKeyDown} // Listen for Enter key
//               />
//             </div>
//             <br />

//             {/* Admin email input */}
//             <div className="form-group">
//               <input
//                 type="email"
//                 className="form-control"
//                 name="email"
//                 value={adminDetails.email}
//                 onChange={handleChange}
//                 placeholder="Enter Admin Email"
//                 required
//                 onKeyDown={handleKeyDown} // Listen for Enter key
//               />
//             </div>
//             <br />

//             {/* Admin password input with toggle visibility */}
//             <div className="form-group position-relative">
//               <input
//                 type={showPassword ? "text" : "password"} // Toggle password visibility
//                 className="form-control"
//                 name="password"
//                 value={adminDetails.password}
//                 onChange={handleChange}
//                 placeholder="Enter Admin Password"
//                 required
//                 onKeyDown={handleKeyDown} // Listen for Enter key
//               />
//               {/* Toggle button to show/hide password */}
//               <button 
//                 type="button" 
//                 className="btn btn-outline-secondary position-absolute"
//                 style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//             <br />

//             {/* Submit button */}
//             <button
//               onClick={handleAdminLogin}
//               className="btn btn-dark"
//               disabled={loading} // Disable button while loading
//             >
//               {loading ? "Logging in..." : "Login as Admin"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Footer Component */}
//       <Footer />
//     </div>
//   );
// };

// export default AdminRoute;

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import Footer from "./Footer";

// const AdminRoute = () => {
//   const [adminDetails, setAdminDetails] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const submitForm = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "https://ryan2025.pythonanywhere.com/api/admin/login",
//         JSON.stringify({ name: adminDetails.name, email: adminDetails.email, password: adminDetails.password }),
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success && response.data.role === "admin") {
//         localStorage.setItem("adminToken", response.data.token || "");

//         if (location.state?.redirectTo === "/singleproduct" && location.state.product) {
//           navigate("/singleproduct", {
//             state: { product: location.state.product },
//           });
//         } else {
//           navigate("/admindashboard");
//         }
//       } else {
//         setError("Invalid credentials or not an admin.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="bg getproducts-background">
//         <div className="row justify-content-center mt-4">
//           <nav className="m-4">
//             <Link to="/" className="btn btn-dark mx-2">Home</Link>
//           </nav>

//           <div className="col-md-6 card shadow p-4">
//             <h2>Admin Login</h2>
//             <p className="btn btn-danger">ADMINS ONLY. Users to Sign In to View their profile</p>

//             {error && <b className="text-danger">{error}</b>}
//             {isLoading && <b className="text-warning">Please wait...</b>}

//             <form onSubmit={submitForm}>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   required
//                   placeholder="Enter Admin Name"
//                   className="form-control"
//                   value={adminDetails.name}
//                   onChange={(e) => setAdminDetails({ ...adminDetails, name: e.target.value })}
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="email"
//                   required
//                   placeholder="Enter Admin Email"
//                   className="form-control"
//                   value={adminDetails.email}
//                   onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="password"
//                   required
//                   placeholder="Enter Admin Password"
//                   className="form-control"
//                   value={adminDetails.password}
//                   onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
//                 />
//               </div>

//               <div className="text-warning">
//                 <small>
//                   Forgot your password? 
//                   <Link to="/changepassword" state={{ email: adminDetails.email }} className="ms-2">Change your password</Link>
//                 </small>
//               </div>

//               <button className="btn btn-dark mt-3" type="submit" disabled={isLoading}>
//                 {isLoading ? "Logging in..." : "Login as Admin"}
//               </button>
//             </form>

//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default AdminRoute;

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import Footer from "./Footer";  // Assuming you have this Footer component

// const AdminRoute = () => {
//   const [adminDetails, setAdminDetails] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const submitForm = async (e) => {
//     e.preventDefault();
//     setError("");  // Reset any error messages
//     setIsLoading(true);  // Show loading state

//     try {
//       // Make the API request to the backend
//       const response = await axios.post(
//         "https://ryan2025.pythonanywhere.com/api/admin/login",
//         JSON.stringify({ email: adminDetails.email, password: adminDetails.password }),
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Check if the response is successful and the role is admin
//       if (response.data.success && response.data.role === "admin") {
//         localStorage.setItem("adminToken", response.data.token || ""); // Store the admin token

//         // Redirect to the admin dashboard
//         navigate("/admindashboard");
//       } else {
//         setError("Invalid credentials or not an admin.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setIsLoading(false); // Hide loading state
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="bg getproducts-background">
//         <div className="row justify-content-center mt-4">
//           <nav className="m-4">
//             <Link to="/" className="btn btn-dark mx-2">Home</Link>
//           </nav>

//           <div className="col-md-6 card shadow p-4">
//             <h2>Admin Login</h2>
//             <p className="btn btn-danger">ADMINS ONLY. Users must sign in to view their profile</p>

//             {error && <b className="text-danger">{error}</b>}
//             {isLoading && <b className="text-warning">Please wait...</b>}

//             <form onSubmit={submitForm}>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   required
//                   placeholder="Enter Admin Name"
//                   className="form-control"
//                   value={adminDetails.name}
//                   onChange={(e) => setAdminDetails({ ...adminDetails, name: e.target.value })}
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="email"
//                   required
//                   placeholder="Enter Admin Email"
//                   className="form-control"
//                   value={adminDetails.email}
//                   onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="password"
//                   required
//                   placeholder="Enter Admin Password"
//                   className="form-control"
//                   value={adminDetails.password}
//                   onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
//                 />
//               </div>

//               <div className="text-warning">
//                 <small>
//                   Forgot your password? 
//                   <Link to="/changepassword" state={{ email: adminDetails.email }} className="ms-2">Change your password</Link>
//                 </small>
//               </div>

//               <button className="btn btn-dark mt-3" type="submit" disabled={isLoading}>
//                 {isLoading ? "Logging in..." : "Login as Admin"}
//               </button>
//             </form>

//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default AdminRoute;

import axios from "axios";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Footer from "./Footer";

const AdminLogin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isWeakPassword, setIsWeakPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Function to check password strength
    const checkPasswordStrength = (pwd) => {
        const isStrong = pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd);
        setIsWeakPassword(!isStrong);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

    // Submit form handler
    const submitForm = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://ryan2025.pythonanywhere.com/api/admin/login", // Use your admin login API URL
                JSON.stringify({ name, email, password, id }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success && response.data.role === "admin") {
                localStorage.setItem("adminToken", response.data.token || "");
                navigate("/admindashboard");  // Redirect to admin dashboard
            } else {
                setError(response.data.message || "Invalid login credentials");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="bg getproducts-background">
                <div className="row justify-content-center mt-4">
                    <nav className="m-4">
                        <Link to="/" className="btn btn-dark mx-2">Home</Link>
                    </nav>

                    <div className="col-md-6 card shadow p-4">
                        <h2>Admin Login</h2>
                        {error && <b className="text-danger">{error}</b>}
                        {isLoading && <b className="text-warning">Please wait...</b>}

                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    placeholder="Enter Admin Name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="Enter Admin Email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="Enter Admin Password"
                                    className="form-control"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    id="id"
                                    type="text"
                                    required
                                    placeholder="Enter Admin ID"
                                    className="form-control"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </div>

                            {isWeakPassword && (
                                <div className="text-warning">
                                    <small>Password is weak. 
                                        <Link to="/changepassword" state={{ identifier: email }} className="ms-2">Would you like to change your password?</Link>
                                    </small>
                                </div>
                            )}

                            <button className="btn btn-dark mt-3" type="submit" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login as Admin"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
};

export default AdminLogin;





