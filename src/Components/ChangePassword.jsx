// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import Footer from "./Footer";

// // Helper to generate secure password
// const generateSecurePassword = () => {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
//   let password = "";
//   for (let i = 0; i < 12; i++) {
//     password += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return password;
// };

// const ChangePassword = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [identifier, setIdentifier] = useState("");
//   const [prevPassword, setPrevPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     if (location.state?.identifier) {
//       setIdentifier(location.state.identifier);
//     } else {
//       setError("No identifier found. Please sign in again.");
//     }
//   }, [location.state]);

//   const handleGeneratePassword = () => {
//     if (!prevPassword) {
//       setError("Please enter your current password before generating a new one.");
//       return;
//     }
//     setError("");
//     setNewPassword(generateSecurePassword());
//   };

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("identifier", identifier);
//       formData.append("new_password", newPassword);
//       formData.append("old_password", prevPassword); // Optional: if backend wants to verify

//       const authToken = localStorage.getItem("authToken");

//       const response = await axios.post(
//         "https://ryan2025.pythonanywhere.com/api/change_password",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         setSuccess("Password changed successfully.");
//         localStorage.setItem("authToken", response.data.token);
//         if (response.data.user) {
//           localStorage.setItem("user", JSON.stringify(response.data.user));
//         }
//         setTimeout(() => navigate("/"), 1500);
//       } else {
//         setError(response.data.message || "Password change failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Error during password change:", err);
//       setError("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
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
//             <h2>Change Password</h2>

//             {error && <b className="text-danger">{error}</b>}
//             {success && <b className="text-success">{success}</b>}
//             {loading && <b className="text-warning">Updating...</b>}

//             <form onSubmit={handleChangePassword}>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={identifier}
//                   readOnly
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Enter Current Password"
//                   value={prevPassword}
//                   onChange={(e) => setPrevPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="form-control"
//                   placeholder="Enter New Password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   required
//                   disabled={!prevPassword}
//                 />
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-secondary mb-3"
//                 onClick={handleGeneratePassword}
//                 disabled={!prevPassword}
//               >
//                 Generate Secure Password
//               </button>

//               <div className="mb-3">
//                 <input
//                   type="checkbox"
//                   id="showPassword"
//                   checked={showPassword}
//                   onChange={handleTogglePassword}
//                 />
//                 <label htmlFor="showPassword" className="mx-2">Show Password</label>
//               </div>

//               <button type="submit" className="btn btn-dark" disabled={!prevPassword || !newPassword}>
//                 {loading ? "Confirming..." : "Confirm"}
//               </button>

//               <div className="mt-3">
//                 <Link
//                   to="/signin"
//                   state={{ redirectTo: "/changepassword" }}
//                   className="text-primary text-decoration-underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ChangePassword;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

// Helper to generate secure password
const generateSecurePassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPrevPassword, setShowPrevPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (location.state?.identifier) {
      setIdentifier(location.state.identifier);
    } else {
      setError("No identifier found. Please sign in again.");
    }
  }, [location.state]);

  const handleGeneratePassword = () => {
    if (!prevPassword) {
      setError("Please enter your current password before generating a new one.");
      return;
    }
    setError("");
    setNewPassword(generateSecurePassword());
  };

  const handleTogglePrevPassword = () => {
    setShowPrevPassword(!showPrevPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("identifier", identifier);
      formData.append("new_password", newPassword);
      formData.append("old_password", prevPassword); // Optional: if backend wants to verify

      const authToken = localStorage.getItem("authToken");

      const response = await axios.post(
        "https://ryan2025.pythonanywhere.com/api/change_password",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.success) {
        // Save the updated user data and token in localStorage
        localStorage.setItem("authToken", response.data.token);
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        setSuccess("Password changed successfully.");

        // Automatically redirect the user to the GetProducts page ("/")
        setTimeout(() => {
          navigate("/"); // Redirect to GetProducts
        }, 1500);
      } else {
        setError(response.data.message || "Password change failed. Try again.");
      }
    } catch (err) {
      console.error("Error during password change:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <div className="hero-banner">
       <div className="container-fluid">
      <div className="bg getproducts-background">
        <div className="row justify-content-center mt-4">
          <nav className="m-4">
            <Link to="/" className="btn btn-dark mx-2">Home</Link>
          </nav>

          <div className="col-md-6 card shadow p-4">
            <h2>Change Password</h2>

            {error && <b className="text-danger">{error}</b>}
            {success && <b className="text-success">{success}</b>}
            {loading && <b className="text-warning">Updating...</b>}

            <form onSubmit={handleChangePassword}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={identifier}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <input
                  type={showPrevPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Current Password"
                  value={prevPassword}
                  onChange={(e) => setPrevPassword(e.target.value)}
                  required
                />
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="showPrevPassword"
                    checked={showPrevPassword}
                    onChange={handleTogglePrevPassword}
                  />
                  <label className="form-check-label" htmlFor="showPrevPassword">
                    Show Current Password
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={!prevPassword}
                />
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="showNewPassword"
                    checked={showNewPassword}
                    onChange={handleToggleNewPassword}
                  />
                  <label className="form-check-label" htmlFor="showNewPassword">
                    Show New Password
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-secondary mb-3"
                onClick={handleGeneratePassword}
                disabled={!prevPassword}
              >
                Generate Secure Password
              </button>
              <br />

              <button type="submit" className="btn btn-dark" disabled={!prevPassword || !newPassword}>
                {loading ? "Confirming..." : "Confirm"}
              </button>

              
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
};

export default ChangePassword;
