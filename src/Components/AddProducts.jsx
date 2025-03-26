import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";

const AddProducts = () => {
    let [product_name, setProductName] = useState("");
    let [product_desc, setProductDesc] = useState("");
    let [product_cost, setProductCost] = useState("");
    let [product_photo, setProductPhoto] = useState("");
    let [product_category, setProductCategory] = useState("")

    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setSuccess("");
            setLoading("Please wait ...");
            
            const data = new FormData();
            data.append("product_name", product_name);
            data.append("product_desc", product_desc);
            data.append("product_cost", product_cost);
            data.append("product_photo", product_photo);
            data.append("product_category", product_category);
            
            const response = await axios.post("https://ryan2025.pythonanywhere.com/api/addproduct", data);
            
            setLoading("");
            setSuccess(response.data.success);
            setProductName("");
            setProductDesc("");
            setProductCost("");
            setProductPhoto("");
            console.log(response.data);
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    return ( 

        <div className="container-fluid">
        <div className="bg getproducts-background ">
        <div className="row justify-content-center mt-4">
        <nav className="m-4">
                <Link to = "/"className="btn btn-dark mx-2">Home</Link>
                <Link to = "/addproducts"className="btn btn-dark mx-2">Add Product</Link>
                <Link to = "/signin"className="btn btn-dark mx-2">Sign In</Link>
                <Link to = "/signup"className="btn btn-dark mx-2">Sign Up</Link>
                
            </nav>
            <div className="col-md-6 card shadow p-4">
                    <h2>Add Products</h2>
                    <b className="text-warning">{loading}</b>
                    <b className="text-danger">{error}</b>
                    <b className="text-success">{success}</b>
                    <form onSubmit={submitForm}>
                        <input type="text" placeholder="Enter Product Name" required className="form-control" value={product_name} onChange={(e) => setProductName(e.target.value)}/> <br />

                        <textarea name="" id="" className="form-control" placeholder="Product Description" required value={product_desc} onChange={(e) => setProductDesc(e.target.value)}></textarea> <br />
                        <input type="text" placeholder="Enter Product Category" required className="form-control" value={product_category} onChange={(e) => setProductCategory(e.target.value)}/> <br />

                        <input type="number" placeholder="Product Cost" required value={product_cost} onChange={(e) => setProductCost(e.target.value)} className="form-control" /> <br />

                        <p>Product Photo</p>
                        <input type="file" required className="form-control" onChange={(e) => setProductPhoto(e.target.files[0])}/> <br />

                        <button className="btn btn-dark" type="submit">Add Product</button> <br /> 
                    </form>   
            </div> <br /> <br />
        
     </div> <br />
     <hr />
     <hr />
     <hr />
     <hr />
     
     <hr /><br /><br /><br /> <br /><br />

     <Carousel/> 
     <Footer/>
    </div>

        </div>
    
     );
}
 
export default AddProducts;

