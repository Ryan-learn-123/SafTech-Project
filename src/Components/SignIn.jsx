import axios from "axios";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Footer from "./Footer";

const SignIn = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isWeakPassword, setIsWeakPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const checkPasswordStrength = (pwd) => {
        const isStrong = pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd);
        setIsWeakPassword(!isStrong);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };


    const submitForm = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://ryan2025.pythonanywhere.com/api/signin",
                JSON.stringify({ identifier, password }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.user) {
                localStorage.clear();
                localStorage.setItem("user", JSON.stringify(response.data.user));

                if (location.state?.redirectTo === "/singleproduct" && location.state.product) {
                    navigate("/singleproduct", {
                        state: { product: location.state.product },
                    });
                } else {
                    navigate("/");
                }
            } else {
                setError(response.data.message || "Invalid login");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
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
                        <h2>Sign In</h2>
                        {error && <b className="text-danger">{error}</b>}
                        {isLoading && <b className="text-warning">Please wait...</b>}

                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <input
                                    id="identifier"
                                    type="text"
                                    required
                                    placeholder="Enter Username / Email / Phone"
                                    className="form-control"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            </div>

                            {/* <div className="mb-3">
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="Enter Password"
                                    className="form-control"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div> */}
                            <div className="mb-3 position-relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"} // Toggle between text and password
                                required
                                placeholder="Enter Password"
                                className="form-control"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            
                            {/* Toggle button at the end of the input */}
                            <button 
                                type="button"
                                className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                            </div>

                            <div className="mt-3">
                                <Link
                                to="/signin"
                                state={{ redirectTo: "/changepassword" }}
                                className="text-primary text-decoration-underline"
                                >
                                Forgot password?
                                </Link>
                            </div>

                            {isWeakPassword && (
                                <div className="text-warning">
                                    <small>Password is weak. 
                                        <Link to="/changepassword" state={{ identifier }} className="ms-2">Would you like to change your password?</Link>
                                    </small>
                                </div>
                            )}

                            <button className="btn btn-dark mt-3" type="submit" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <p className="mt-3">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
        </div>
    );
};

export default SignIn;
