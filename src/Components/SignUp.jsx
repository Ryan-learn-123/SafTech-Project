import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const SignUp = () => {

    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState("");
    let [success, setSuccess] = useState("");
    let [error, setError] = useState("");

    // const togglePassword = () => {
    //     const pdinput = document.getElementById("password");
    //     let type = pdinput.getAttribute("type");
    
    //     if (type === "password") {
    //       type = "text";
    //     } else {
    //       type = "password";
    //     }
    
    //     pdinput.setAttribute("type", type);
    //   };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            setLoading("Please wait as we submit your data");
            setSuccess("");
            setError("");
            const data = new FormData();
            data.append("username", username);
            data.append("email", email);
            data.append("phone", phone);
            data.append("password", password);
          

            const response = await axios.post("https://ryan2025.pythonanywhere.com/api/signup", data);

            console.log(response)
            setLoading("");
            setSuccess(response.data.success);
            setUsername("");
            setEmail("");
            setPhone("");
            setPassword("");

        } catch (error) {
           setLoading("");
           setError("Something went wrong. Please try again"); 
        }
    };
    return ( 
       <div className="container-fluid">
        {/* <Navbar/> */}
         <div className="bg getproducts-background">
            <div className="row justify-content-center mt-4">
                <div className="col-md-6 card shadow p-4">
                    <h2>Sign Up</h2>
                    <b className="text-warning">{loading}</b>
                    <b className="text-success">{success}</b>
                    <b className="text-danger">{error}</b>

                    <form onSubmit={submitForm}>
                        <input type="text" placeholder="Enter Name" required value={username} className="form-control" onChange={(e) => setUsername(e.target.value)} /> <br />

                        <input type="email" placeholder="Enter Email" required value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} /> <br />

                        <input type="tel" placeholder="Enter Phone No." required value={phone} className="form-control" onChange={(e) => setPhone(e.target.value)} /> <br />

                        <input type="password" placeholder="Enter Password" required value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} /> <br />

                        {/* <span className="input-group-text" onClick={togglePassword}>
                          <i className="bi bi-eye-slash"></i>
                        </span> */}
                        <button type="submit" className="btn btn-dark">Sign Up</button>
                    </form> 
                    
                </div> <br /> <br />
                <br /> <br />
                <br />
                <br />
                <br /><br />
                <br /><br />
                <Footer/>
            </div>
        </div>
       </div>
     );
}
 
export default SignUp;