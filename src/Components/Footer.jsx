import { Link } from "react-router-dom";
const Footer = () => {
    return ( 
       <div className="container-fluid">
         {/* <div> */}
        <section class="row bg-secondary p-4">
             <div class="col-md-4">
                 <h4 class="text-center">About Us</h4>
                 <p>We sell the best electronics for your taste.</p>
                 <p>Every electronic on sale is fresh from the Manufacturer !</p>
             </div>
    
             <div class="col-md-4">
                 <h4 class="text-center">Contact Us</h4>
                 <form action="">
                     <input type="email" placeholder="Enter Email" class="form-control"/><br/>
                     <textarea placeholder="Please leave a message" rows="7" class="form-control"></textarea><br/>
                     <br/>
                     <input type="submit" value="Send Message" class="btn btn-outline-dark"/><br/><br/>
                 </form><br /><br />
             </div>
    
             <div class="col-md-4">
                 <h4 class="text-center">Stay Connected</h4>
                 <br/>
                 <p>Visit our various social media platforms and get an early preview of our products.</p>
                 <Link to="https://x.com/">
                     <img src="images/x.png" alt="" width="50px" height = "50px" />
                 </Link >
                 
                 <Link to="https://instagram.com/">
                     <img src="images/in.png" alt="" width="50px" height = "50px"/>
                 </Link >

                 <Link to="https://www.facebook.com/">
                     <img src="images/fb.png" alt="" width="50px" height = "50px"/>
                 </Link >

                 <Link to="https://www.linkedin.com/">
                     <img src="images/linkedin.png" alt="" width="50px" height = "50px"/>
                 </Link >
                 <br/><br/>
                 
                 <button className="btn btn-dark text-white " ><Link to="/">SafTech SHOP</Link ></button>   <br /> <br />           
             </div><br /><br />
             <br /><br />
            
             
        </section>
        
        <footer class="bg-dark text-white text-center p-2">
             <h5>Developed by Ryantech&copy;2025. All rights reserved</h5>
        </footer>     
        </div>
     );
}
 
export default Footer;