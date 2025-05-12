// const Navbar = () => {
//     return ( 
//         <section className="row">
//         <div className="col-md-12">
//             <div className="navbar navbar-expand-md navbar-light bg-light">
//                 <Link to = "" className="navbar-brand">SafTech</ Link>

//                 <button className="navbar-toggler" data-bs-target="#prada" data-bs-toggle="collapse">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="prada">
//                     <div className="navbar-nav">
//                         <Link to = "/" className="nav-link">Home</ Link>
//                         <Link to = "/addproducts" className="nav-link">Add Products</ Link>
//                     </div>

//                     <div className="navbar-nav ms-auto">
//                         <Link to = "/signin" className="nav-link">Login</ Link>
//                         <Link to = "/signup" className="nav-link">Register</ Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//      </section>
//      );
// }
 
// export default Navbar;

// // account icon in vs code terminal sign out on the account signed in. New terminal;(git add .) .Then hit enter.Login into ur own github.  
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';



const AddProduct = () => {

let[product_name, setProductName] = useState('');
let[product_desc, setProductDesc] = useState('');
let[product_cost, setProductCost] = useState('');
let[product_photo, setProductPhoto] = useState('');

const navigate = useNavigate();

 

const user = localStorage.getItem("user");

const checkUser = () => {
if (!user) {
localStorage.clear();
return navigate("/signin");
}
}

useEffect(() => checkUser (), [user]);

let fileinputref = useRef(null);


let[loading, setLoading] = useState('')
let[error, setError] = useState('')
let[success, setSuccess] = useState('')



 

 

const submitForm = async (e)=> {
e.preventDefault();
try {
setError('')
setSuccess('')
setLoading('Please wait...')


const data = new FormData();
data.append('product_name', product_name)
data.append('product_desc', product_desc)
data.append('product_cost', product_cost)
data.append('product_photo', product_photo)

const response = await axios.post('https://Wanjieeeee.pythonanywhere.com/api/addproduct', data)
setLoading('')
setSuccess(response.data.success)
setProductName("")
setProductDesc("")
setProductCost("")
fileinputref.current.value = "";

 
} catch (error) {
setLoading('')
setError(error.message)
}
}

return (
<div className="container-fluid">


<div className="row mt-4 pb-5 justify-content-center">
{/* <nav className="m4">
<Link className="btn btn-dark mx-2" to= '/'>Home</Link>
<Link className="btn btn-dark mx-2" to= '/addproducts'>Add product</Link>
<Link className="btn btn-dark mx-2" to= '/signin'>Sign in</Link>
<Link className="btn btn-dark mx-2" to= '/signup'>Sign up</Link>

</nav> */}
<Navbar/>

<div className="col-md-6 p-4 card shadow">
<h2>Add Product</h2>
<b className="text-warning">{loading}</b>
<b className="text-danger">{error}</b>
<b className="text-success">{success}</b>


<form onSubmit={submitForm}>
<input type="text" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} value={product_name}required className="form-control" /> <br />
<textarea name="" id="" className="form-control" required onChange={(e)=> setProductDesc(e.target.value)} value={product_desc} placeholder="Product description"></textarea>
<br />
<input type="number" placeholder="Product Cost" required onChange={(e)=> setProductCost(e.target.value)} value={product_cost} className="form-control" /> <br />
<p>Product Photo</p>
<input type="file" id="fileInput" ref={fileinputref} required onChange={(e) => setProductPhoto(e.target.files[0]) } className="form-control" /> <br />
<button className="btn btn-primary" type="submit" >Add products</button>

</form> <br />
</div>
</div>
</div>
);
}

 
export default AddProduct;