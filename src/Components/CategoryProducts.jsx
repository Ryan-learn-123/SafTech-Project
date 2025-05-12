import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("Loading products...");
    const navigate = useNavigate();

    let user = null;
    try {
        const rawUser = localStorage.getItem("user");
        user = rawUser ? JSON.parse(rawUser) : null;
    } catch (e) {
        console.error("Invalid user data in localStorage:", e);
        localStorage.removeItem("user");
    }

    const img_url = "https://ryan2025.pythonanywhere.com/static/images/";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://ryan2025.pythonanywhere.com/api/getproducts");
                const data = await response.json();

                if (!Array.isArray(data)) {
                    setError("Invalid product data received.");
                    return;
                }

                const normalizedCategory = categoryName.trim().toLowerCase();
                const filtered = data.filter(product =>
                    product.product_category?.trim().toLowerCase() == normalizedCategory
                );

                setProducts(filtered);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load category products.");
            } finally {
                setLoading("");
            }
        };

        fetchProducts();
    }, [categoryName]);

    const handleViewProduct = (product) => {
        if (!user) {
            navigate("/signin", {
                state: {
                    redirectTo: "/singleproduct",
                    product,
                },
            });
        } else {
            navigate("/singleproduct", { state: { product } });
        }
    };

    return (
        <div className="container-fluid">
            <div className="row getproducts-background">
                <div className="p-3" style={{ backgroundColor: "black" }}>
                    <h3 style={{ color: "limegreen" }}>{categoryName} Products</h3>
                </div>

                {loading && <b className="text-warning">{loading}</b>}
                {error && <b className="text-danger">{error}</b>}

                <button className="btn btn-dark my-3 mx-2" onClick={() => navigate("/")}>
                    Back to Home
                </button>

                {products.length === 0 && !loading && !error && (
                    <p className="text-center text-muted">No products found in this category.</p>
                )}

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {products.map((product) => (
                        <div className="col" key={product.product_id}>
                            <div className="card shadow">
                                <img
                                    src={img_url + product.product_photo}
                                    className="product_img"
                                    alt={product.product_name}
                                />
                                <div className="card-body">
                                    <h5 className="mt-2">{product.product_name}</h5>
                                    <p className="text-muted">{product.product_desc.slice(0, 10)}...</p>
                                    <b className="text-dark">KES: {product.product_cost}</b>
                                    <button
                                        className="btn btn-dark w-100 mt-2"
                                        onClick={() => handleViewProduct(product)}
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default CategoryProducts;

