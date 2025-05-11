import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    let strength = "Strong password";
    let error = "";

    if (password.length < 5) {
      strength = "Weak: Minimum 5 characters";
      error = "Too short";
    } else if (!/\d/.test(password)) {
      strength = "Weak: Must contain a number";
      error = "No number";
    } else if (!/[A-Z]/.test(password)) {
      strength = "Weak: Must contain uppercase";
      error = "No uppercase";
    } else if (!/[a-z]/.test(password)) {
      strength = "Weak: Must contain lowercase";
      error = "No lowercase";
    } else if (!/[!@#$%^&*]/.test(password)) {
      strength = "Weak: Add special character";
      error = "No special char";
    }

    setPasswordStrength(strength);
    setPasswordError(error);
  };

  const generatePassword = () => {
    const generated = "S@f3P@ssW0rd#2025";
    setFormData(prev => ({ ...prev, password: generated }));
    setShowSuggestion(true);
    setPasswordStrength("Strong password");
    setPasswordError("");
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading("Submitting...");
    setError("");

    try {
      const response = await axios.post("https://ryan2025.pythonanywhere.com/api/signup", {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess(response.data.success);
        localStorage.setItem("user", JSON.stringify(formData));
        navigate("/"); // Redirect
      } else {
        setError(response.data.error || "Unexpected error, please try again.");
      }
    } catch (err) {
      setError("Signup failed. Try again.");
    } finally {
      setLoading("");
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
            <h2>Sign Up</h2>
            {loading && <b className="text-warning">{loading}</b>}
            {success && <b className="text-success">{success}</b>}
            {error && <b className="text-danger">{error}</b>}

            <form onSubmit={submitForm} autoComplete="on">
              <input
                type="text"
                name="username"
                placeholder="Enter Name"
                required
                className="form-control"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
              /><br />

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                required
                className="form-control"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              /><br />

              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone No."
                required
                className="form-control"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
              /><br />

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  required
                  className="form-control"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button type="button" className="btn btn-outline-secondary" onClick={toggleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <small className={`form-text ${passwordError ? "text-danger" : "text-success"}`}>
                {passwordStrength}
              </small>

              {showSuggestion && (
                <div className="alert alert-info mt-2">
                  <strong>Suggested password:</strong> <code>{formData.password}</code><br />
                  This password will be offered to save by your browser.
                </div>
              )}

              <button
                type="button"
                className="btn btn-light my-3"
                onClick={generatePassword}
              >
                Suggest a Strong Password
              </button>

              <br />

              <button
                type="submit"
                className="btn btn-dark"
                disabled={passwordError}
              >
                Sign Up
              </button>
            </form>
            <p className="mt-3">Already have an account? <Link to="/signin">Sign In</Link></p>
          </div>

          <Footer />
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
