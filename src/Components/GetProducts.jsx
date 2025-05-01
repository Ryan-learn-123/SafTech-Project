import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Footer from "./Footer";
import Carousel from "./Carousel";

const GetProducts = () => {

    let [products, setProducts] = useState([]);
    let [error, setError] = useState("");
    let [loading, setLoading] = useState("");
    let[filteredProducts, setFilteredProducts] = useState([]);

    const img_url = "https://ryan2025.pythonanywhere.com/static/images/"
    const navigate = useNavigate();

    const getProducts = async () => {
        setError("")
        setLoading("Please wait ... Receiving Products...");
        try {
            const response = await axios.get("https://ryan2025.pythonanywhere.com/api/getproducts");
            setProducts(response.data);
            setFilteredProducts(response.data);
            setLoading("");
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    const handleSearch = (value) => {
        const filtered = products && products.filter ((product) =>
            product.product_name.toLowerCase ().includes(value.toLowerCase())
        )
        setFilteredProducts(filtered);
    };

    // useEffect(function, dependancy) 
    useEffect(() => {
        getProducts();
    }, []);
    return ( 
        <div className="container-fluid">
            <div className="row getproducts-background">
                <h3>Available Products</h3> <br /> <br />
                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>
                {/* navbar */}
                
                <nav className="m-4">
                    <Link to = "/"className="btn btn-dark mx-2">Home</Link>
                    <Link to = "/addproducts"className="btn btn-dark mx-2">Add Product</Link>
                    <Link to = "/signin"className="btn btn-dark mx-2">Sign In</Link>
                    <Link to = "/signup"className="btn btn-dark mx-2">Sign Up</Link>
                    <Link to = "/chatbot"className="btn btn-dark mx-2">ChatBot</Link>
                    

                </nav>
                {/* carousel */}
                <Carousel/>
                {/* content */}
                <br /> 
                <br />
                <hr />

                <h6>Our Products on sale;</h6>
                <hr />
                <div className="justify-content-center m-3">
                    <div className="col-md-6">
                        <input type="text" placeholder="Search for products by name" className="form-control" onChange={(e) => handleSearch(e.target.value)}/>
                    </div>
                </div>
                {filteredProducts.map((product) => (
                    <div className="col-md-4 justify-content-center mb-4">
                        
                        <br /> <br />
                        
                    <div className="card shadow">
                        <img src={img_url + product.product_photo} className="product_img" alt="" />
                        <div className="card-body">
                            <h5 className="mt-2">{product.product_name}</h5>
                            <p className="text-muted">{product.product_desc.slice(0,10)}</p>
                            <b className="text-dark">KES:{product.product_cost} </b>
                            <button className="btn btn-dark w-100" onClick={() => navigate("/singleproduct", { state : {product}})}>View Product</button>
                        </div>
                    </div>
                </div>
                ))}
             {/* footer */}
             
             <Footer/>
           </div>
        </div>
     );
}
 
export default GetProducts;