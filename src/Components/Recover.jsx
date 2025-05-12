// RecoverPassword.jsx
import { useState } from "react";
import axios from "axios";

const RecoverPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRecover = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    try {
      const response = await axios.post("https://ryan2025.pythonanywhere.com/api/recover", {
        identifier
      });

      if (response.data.success) {
        setMessage("Check your email or phone for recovery instructions.");
      } else {
        setError(response.data.error || "Recovery failed.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Recover Your Account</h3>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleRecover}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Email or Phone"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <br />
        <button className="btn btn-primary">Send Recovery Link</button>
      </form>
    </div>
  );
};

export default RecoverPassword;
