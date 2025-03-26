// import axios from "axios"
// import { useEffect, useState } from "react";
// import { useNavigate,Link } from "react-router-dom";

// const Products = () => {

//     let [products, setProducts] = useState([]);
//     let [error, setError] = useState("");
//     let [loading, setLoading] = useState("");

//     const img_url = "https://ryan2025.pythonanywhere.com/static/images/"
//     const navigate = useNavigate();

//     const showProducts = async () => {
//         setError("")
//         setLoading("Please wait ... Receiving Products...");
//         try {
//             const response = await axios.get("https://ryan2025.pythonanywhere.com/api/getproducts");
//             setProducts(response.data);
//             setLoading("");
//         } catch (error) {
//             setLoading("");
//             setError(error.message);
//         }
//     };

//     // useEffect(function, dependancy) 
//     useEffect(() => {
//         showProducts();
//     }, [])
//     return ( 
//         <div className="container-fluid">
//             <div className="row">
//             <h3>Available Products</h3> <br /> <br />
//             <b className="text-warning">{loading}</b>
//             <b className="text-danger">{error}</b>
//             {/* navbar */}
            
//             <nav className="m-4">
//                 <Link to = "/"className="btn btn-dark mx-2">Home</Link>
//                 <Link to = "/addproducts"className="btn btn-dark mx-2">Add Product</Link>
//                 <Link to = "/signin"className="btn btn-dark mx-2">Sign In</Link>
//                 <Link to = "/signup"className="btn btn-dark mx-2">Sign Up</Link>
                

//             </nav>
//             {/* carousel */}
//             {/* <Carousel/> */}
//             {/* content */}
//             <br /> 
//             <br />
//             <br />
//             <br />

            
            
//             {products.map((product) => (
//                 <div className="col-md-4 justify-content-center mb-4">
                    
//                     <br /> <br />
                    
//                   <div className="card shadow">
//                       <img src={img_url + product.product_photo} className="product_img" alt="" />
//                       <div className="card-body">
//                           <h5 className="mt-2">{product.product_name}</h5>
//                           <p className="text-muted">{product.product_desc.slice(0,10)}</p>
//                           <b className="text-warning">KES {product.product_cost} </b>
//                           <button className="btn btn-dark w-100" onClick={() => navigate("/getproducts", { state : {product}})}>View Product</button>
//                       </div>
//                   </div>
//               </div>
//             ))}
//              {/* footer */}
//              {/* <Footer/> */}
//            </div>
//         </div>
        
//      );
// }
 
// export default Products;