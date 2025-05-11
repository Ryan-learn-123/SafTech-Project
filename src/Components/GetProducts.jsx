import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SubscribeButton from './SubscribeButton'; 
import Footer from "./Footer";
import Carousel from "./Carousel";

const GetProducts = ({ cart, setCart }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [categories, setCategories] = useState({});
    const navigate = useNavigate();

    // Retrieve user information from localStorage
    let user = null;
    try {
        const rawUser = localStorage.getItem("user");
        user = rawUser ? JSON.parse(rawUser) : null;
    } catch (e) {
        console.error("Invalid user data in localStorage:", e);
        localStorage.removeItem("user");
    }

    const img_url = "https://ryan2025.pythonanywhere.com/static/images/";

    // Function to fetch products
    const getProducts = async () => {
        setError("");
        setLoading("Please wait ... Receiving Products...");
        try {
            const response = await fetch("https://ryan2025.pythonanywhere.com/api/getproducts");
            const data = await response.json();

            if (Array.isArray(data)) {
                setProducts(data);
                const grouped = data.reduce((acc, product) => {
                    const normalizedCategory = (product.product_category || "").trim().toLowerCase();
                    if (!acc[normalizedCategory]) {
                        acc[normalizedCategory] = [];
                    }
                    acc[normalizedCategory].push(product);
                    return acc;
                }, {});
                setCategories(grouped);
            } else {
                setError("Invalid product data received.");
            }
        } catch (err) {
            setError("Failed to load products. Please try again.");
        } finally {
            setLoading("");
            setIsPageLoading(false);
        }
    };

    // UseEffect to load products once the page is loaded
    useEffect(() => {
        if (!sessionStorage.getItem("isLoaded")) {
            setTimeout(() => {
                getProducts();
                sessionStorage.setItem("isLoaded", "true");
            }, 3000);
        } else {
            getProducts();
            setIsPageLoading(false);
        }
    }, []);

    // Scroll-based scaling effect for product cards
    useEffect(() => {
        const scaleProductsOnScroll = () => {
            const cards = document.querySelectorAll('.product-card');
            const windowHeight = window.innerHeight;
            const centerY = window.scrollY + windowHeight / 2;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenterY = rect.top + rect.height / 2 + window.scrollY;
                const distance = Math.abs(centerY - cardCenterY);
                const scale = Math.max(0.8, 1 - (distance / windowHeight) * 0.4);
                const opacity = Math.max(0.6, 1 - (distance / windowHeight) * 0.6);

                card.style.transform = `scale(${scale})`;
                card.style.opacity = opacity;
            });
        };

        window.addEventListener('scroll', scaleProductsOnScroll);
        return () => window.removeEventListener('scroll', scaleProductsOnScroll);
    }, []);

    // Loading screen component
    const LoadingScreen = () => (
        <div className="loading-screen">
            <div className="loading-header">
                <h1>Welcome to SafTech Shop...</h1>
            </div>
            <div className="spinner"></div>
        </div>
    );

    // Handle "Show More" button click for category
    const handleShowMore = (category) => {
        if (!user) {
            navigate("/signin", {
                state: {
                    redirectTo: `/category/${encodeURIComponent(category)}`,
                },
            });
        } else {
            navigate(`/category/${encodeURIComponent(category)}`);
        }
    };

    // Main JSX rendering
    return (
        <div className="hero-banner">
        <div className="container-fluid">
            {isPageLoading ? (
                <LoadingScreen />
            ) : (
                <div className="row getproducts-background">
                    <h3>Available Products</h3>
                    <b className="text-warning">{loading}</b>
                    <b className="text-danger">{error}</b>

                    <nav className="m-4">
                        {user ? (
                            <>
                                <Link to="/profile" className="btn btn-dark mx-2">View Profile</Link> 
                                <Link to="/addproducts" className="btn btn-dark mx-2">Add Products</Link> 
                                <div style={{ marginTop: '20px', textAlign: 'center'}}><SubscribeButton /></div> <br />
                                <Link to="/cart" className="btn btn-warning mx-2">View Cart ({cart.length})</Link><br /> <br />
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => {
                                        localStorage.clear();
                                        navigate("/");
                                    }}
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/signin" className="btn btn-dark mx-2">Sign In</Link>
                                <Link to="/signup" className="btn btn-dark mx-2">Sign Up</Link>
                               
                            </>
                        )}
                        <Link to="/chatbot" className="btn btn-dark mx-2">ChatBot</Link>
                    </nav>

                    {user && (
                        <div className="mx-4 my-2">
                            <p className="text-white">Welcome, {user.username}</p>
                        </div>
                    )}

                    <Carousel />

                    <hr />
                    <h6>Our Products on sale:</h6>
                    <hr />

                    {Object.entries(categories).map(([category, items]) => (
                        <div key={category} className="mb-5">
                            <div className="p-2 mb-3" style={{ backgroundColor: "black" }}>
                                <h4 style={{ color: "limegreen" }}>{category}</h4>
                            </div>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {items.slice(0, 3).map((product) => (
                                    <div className="col" key={product.product_id}>
                                        <div className="card shadow product-card">
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
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (user) {
                                                            navigate("/singleproduct", { state: { product } });
                                                        } else {
                                                            navigate("/signin", {
                                                                state: {
                                                                    redirectTo: "/singleproduct",
                                                                    product,
                                                                },
                                                            });
                                                        }
                                                    }}
                                                >
                                                    View Product
                                                </button> <br />
                                                <button
                                                    className="btn btn-success mt-2"
                                                    onClick={() => {
                                                        if (!user) {
                                                        navigate("/signin", {
                                                            state: {
                                                            redirectTo: "/", // or keep the current category or product page
                                                            },
                                                        });
                                                        return;
                                                        }

                                                        const existing = cart.find(item => item.product_id === product.product_id);
                                                        if (existing) {
                                                        const updatedCart = cart.map(item =>
                                                            item.product_id === product.product_id
                                                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                                                            : item
                                                        );
                                                        setCart(updatedCart);
                                                        } else {
                                                        setCart([...cart, { ...product, quantity: 1 }]);
                                                        }
                                                    }}
                                                    >
                                                    Add to Cart
                                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-dark"
                                    onClick={() => handleShowMore(category)}
                                >
                                    Show More {category} Products
                                </button>
                            </div>
                        </div>
                    ))}

                    <Footer />
                </div>
            )}
        </div>
        </div>

        
    );
};

export default GetProducts;

