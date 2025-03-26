const Navbar = () => {
    return ( 
        <section className="row">
        <div className="col-md-12">
            <div className="navbar navbar-expand-md navbar-light bg-light">
                <Link to = "" className="navbar-brand">SafTech</ Link>

                <button className="navbar-toggler" data-bs-target="#prada" data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="prada">
                    <div className="navbar-nav">
                        <Link to = "/" className="nav-link">Home</ Link>
                        <Link to = "/addproducts" className="nav-link">Add Products</ Link>
                    </div>

                    <div className="navbar-nav ms-auto">
                        <Link to = "/signin" className="nav-link">Login</ Link>
                        <Link to = "/signup" className="nav-link">Register</ Link>
                    </div>
                </div>
            </div>
        </div>
     </section>
     );
}
 
export default Navbar;

// account icon in vs code terminal sign out on the account signed in. New terminal;(git add .) .Then hit enter.Login into ur own github.  