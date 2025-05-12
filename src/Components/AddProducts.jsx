import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";

const AddProducts = () => {
    const [product_name, setProductName] = useState("");
    const [product_desc, setProductDesc] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [product_photo, setProductPhoto] = useState("");
    const [product_category, setProductCategory] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [isSubscribed, setIsSubscribed] = useState(false);

    const navigate = useNavigate();

    // Check if user is subscribed on component mount
    useEffect(() => {
        const subscribedUser = JSON.parse(localStorage.getItem('subscribedUser'));
        if (subscribedUser && subscribedUser.email) {
            setIsSubscribed(true);
        } else {
            navigate('/'); // redirect to home if not subscribed
        }
    }, [navigate]);

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
            setProductCategory("");
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    return (
        <div className="hero-banner">
        <div className="container-fluid">
            <div className="bg getproducts-background">
                <div className="row justify-content-center mt-4">
                    <nav className="m-4">
                        <Link to="/" className="btn btn-dark mx-2">Back</Link>
                    </nav>

                    {isSubscribed && (
                        <div className="col-md-6 card shadow p-4">
                            <h2>Add Products</h2>
                            <b className="text-warning">{loading}</b>
                            <b className="text-danger">{error}</b>
                            <b className="text-success">{success}</b>

                            <form onSubmit={submitForm}>
                                <input
                                    type="text"
                                    placeholder="Enter Product Name"
                                    required
                                    className="form-control"
                                    value={product_name}
                                    onChange={(e) => setProductName(e.target.value)}
                                /> <br />

                                <textarea
                                    className="form-control"
                                    placeholder="Product Description"
                                    required
                                    value={product_desc}
                                    onChange={(e) => setProductDesc(e.target.value)}
                                ></textarea> <br />

                                <input
                                    type="text"
                                    placeholder="Enter Product Category"
                                    required
                                    className="form-control"
                                    value={product_category}
                                    onChange={(e) => setProductCategory(e.target.value)}
                                /> <br />

                                <input
                                    type="number"
                                    placeholder="Product Cost"
                                    required
                                    value={product_cost}
                                    onChange={(e) => setProductCost(e.target.value)}
                                    className="form-control"
                                /> <br />

                                <p>Product Photo</p>
                                <input
                                    type="file"
                                    required
                                    className="form-control"
                                    onChange={(e) => setProductPhoto(e.target.files[0])}
                                /> <br />

                                <button className="btn btn-dark" type="submit">Add Product</button> <br />
                            </form>
                        </div>
                    )}
                </div><br />
      <br /><br /><br /> <br /><br />
     <br />
      <br />
      <br /><br />
      <br /><br />

                <br /><br /><br /><br /><br />
                
            </div>
        </div>
        <Carousel />
        <Footer />
        </div>
    );
};

export default AddProducts;
