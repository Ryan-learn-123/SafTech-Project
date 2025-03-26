import axios from "axios";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Footer from "./Footer";

const SignIn = () => {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [success, setSuccess] = useState("");
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setSuccess("");
            setLoading("Please wait ...");

            const data = new FormData ()
            data.append("username",username);
            data.append("password",password)

            const response = await axios.get("https://ryan2025.pythonanywhere.com/api/signin",data);

            if(data.response.user) {
                localStorage.clear("user")
                localStorage.setItem("user", JSON.stringify(data.response.user))
                navigate("/")
            } else {
                setLoading("")
                setError(response.data.message);
            }

        } catch (error) {
            setLoading("");
            setError(error.response.data.message);
        }
    };

    return ( 
    <div className="container-fluid">
         <div className="bg getproducts-background">
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Sign In</h2>
                <b className="text-success">{success}</b>
                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>

                <form onSubmit={submitForm}>
                    <input type="text" required placeholder="Enter Username" className="form-control" onChange={(e) => setUsername(e.target.value)} /> <br />
                    <input type="password" required placeholder="Enter Password" className="form-control" onChange={(e) => setUsername(e.target.value)} /> <br />
                    <button className="btn btn-dark" type="submit">Sign In</button> <br />
                </form>

                <p>Don't have an account ? <Link to = "/signup">Sign Up</Link> </p>
            </div> <br />
           <hr />
            <br />
            <br />
            <Footer/>
        </div>
    </div>
    </div>
     );
}
 
export default SignIn;