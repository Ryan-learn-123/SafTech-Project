import { Link } from "react-router-dom";
const Carousel = () => {
    return ( 
    <div className="container-fluid">
        <div>
        <section className="row">
            <div className="col-md-12">
                <div className="carousel slide" id="mycarousel" data-bs-ride="carousel">
                    <div className="carousel-inner">

                        <div className="carousel-item active" data-bs-interval="5000">
                        <img src="images/imac-1999636_640.webp" alt="" className="d-block w-100" height= "500px"/>
                        <div className="carousel-caption">
                        </div>
                        </div>

                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="images/phone-1869510_640.jpg" alt="" className="d-block w-100" height= "500px" />
                        </div>

                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="images/headphone-1672628_640.webp" alt="" className="d-block w-100" height= "500px"/>
                        </div>

                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="images/keyboard-6950764_640.jpg" alt="" className="d-block w-100" height= "500px"/>
                        </div>

                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="images/cameras-3480569_640.jpg" alt="" className="d-block w-100" height= "500px"/>
                        </div>

                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="images/internet-3589685_640.jpg" alt="" className="d-block w-100" height= "500px"/>
                        </div>

                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="images/giphy.webp" alt="" className="d-block w-100" height= "500px"/>
                        </div>
                </div>

                    <Link to="#mycarousel" className="carousel-control-prev" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                    </Link >
                    
                    <Link to="#mycarousel" className="carousel-control-next" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                    </Link >

                </div>
            </div>
        </section>
     </div>
    </div>
                    
     );
}
 
export default Carousel;