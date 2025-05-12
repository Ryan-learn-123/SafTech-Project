// import React, { useEffect, useState, useRef } from 'react';
// import Footer from "./Footer";
// import { useNavigate, Link } from "react-router-dom";

// const DEFAULT_PROFILE = 'https://www.instagram.com/static/images/anonymousUser.jpg/23c3b6b1973f.jpg';

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [purchasedProducts, setPurchasedProducts] = useState([]);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [editFields, setEditFields] = useState({ username: '', phone: '', password: '' });
//   const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE);
//   const fileInputRef = useRef(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     const storedImage = localStorage.getItem('profileImage');
//     const purchasedIds = JSON.parse(localStorage.getItem('purchased_products')) || [];

//     setUser(storedUser);
//     if (storedUser) {
//       setEditFields({ username: storedUser.username, phone: storedUser.phone, password: '' });
//     }
//     setProfileImage(storedImage || DEFAULT_PROFILE);

//     fetch('/api/getproducts')
//       .then(res => res.json())
//       .then(data => {
//         const purchases = data.filter(product => purchasedIds.includes(product.product_id));
//         setPurchasedProducts(purchases);
//       });
//   }, []);

//   const handleInputChange = (e) => {
//     setEditFields({ ...editFields, [e.target.name]: e.target.value });
//   };

//   const isPasswordStrong = (pwd) => {
//     return pwd.length >= 5 &&
//       /[A-Z]/.test(pwd) &&
//       /[0-9]/.test(pwd) &&
//       /[^A-Za-z0-9]/.test(pwd);
//   };

//   const generateStrongPassword = () => {
//     const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const lower = "abcdefghijklmnopqrstuvwxyz";
//     const numbers = "0123456789";
//     const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
//     const allChars = upper + lower + numbers + symbols;

//     let password = '';
//     password += upper[Math.floor(Math.random() * upper.length)];
//     password += lower[Math.floor(Math.random() * lower.length)];
//     password += numbers[Math.floor(Math.random() * numbers.length)];
//     password += symbols[Math.floor(Math.random() * symbols.length)];

//     for (let i = 4; i < 12; i++) {
//       password += allChars[Math.floor(Math.random() * allChars.length)];
//     }

//     return password;
//   };

//   const handleSave = () => {
//     const updatedUser = { ...user, ...editFields };
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//     setUser(updatedUser);
//     alert('Profile updated!');
//     setMenuOpen(false);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const imageUrl = reader.result;
//       setProfileImage(imageUrl);
//       localStorage.setItem('profileImage', imageUrl);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleRemoveImage = () => {
//     setProfileImage(DEFAULT_PROFILE);
//     localStorage.removeItem('profileImage');
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const scroll = (dir) => {
//     const container = document.getElementById('carouselTrack');
//     container.scrollBy({ left: dir * 300, behavior: 'smooth' });
//   };

//   if (!user) return <p>Loading profile...</p>;

//   return (
//     <div className="container-fluid btn btn-dark">
//       <div className="profile-wrapper" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
//         {/* Navbar */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="btn btn-secondary mx-2">
//           <h2>{user.username}'s Profile</h2>
//           <div style={{ fontSize: '28px', cursor: 'pointer' }} className="btn btn-dark mx-2" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
//         </div>

//         {/* Profile section */}
//         <div style={{ display: 'flex', marginTop: '20px' }}>
//           {/* Profile Picture */}
//           <div style={{ flex: '1', textAlign: 'center' }}>
//             <img
//               src={profileImage}
//               alt="Profile"
//               style={{
//                 width: '150px',
//                 height: '150px',
//                 objectFit: 'cover',
//                 borderRadius: '50%',
//                 border: '2px solid #ccc',
//               }}
//             />
//             <div style={{ marginTop: '10px' }}>
//               <input ref={fileInputRef} type="file" onChange={handleImageChange} accept="image/*" />
//               <br /><br /><br />
//               <button onClick={handleRemoveImage} style={{ marginTop: '5px' }}>Remove Picture</button>
//             </div>
//           </div>

//           {/* User Info */}
//           <div style={{ flex: '3', paddingLeft: '30px' }}>
//             <p><strong>Username:</strong> {user.username}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Phone:</strong> {user.phone}</p>

//             {menuOpen && (
//               <div style={{ marginTop: '20px' }} className="btn btn-secondary">
//                 <input
//                   type="text"
//                   name="username"
//                   value={editFields.username}
//                   onChange={handleInputChange}
//                   placeholder="New Username"
//                   style={{ display: 'block', marginBottom: '10px', width: '100%' }}
//                 />
//                 <input
//                   type="text"
//                   name="phone"
//                   value={editFields.phone}
//                   onChange={handleInputChange}
//                   placeholder="New Phone"
//                   style={{ display: 'block', marginBottom: '10px', width: '100%' }}
//                 />
//                 <input
//                   type="password"
//                   name="password"
//                   autoComplete="new-password"
//                   value={editFields.password}
//                   onChange={handleInputChange}
//                   placeholder="New Password"
//                   style={{ display: 'block', marginBottom: '10px', width: '100%' }}
//                 />
//                 {!isPasswordStrong(editFields.password) && editFields.password && (
//                   <small className="text-warning">Password is weak.</small>
//                 )}
//                 <button
//                   className="btn btn-sm btn-outline-light mt-2 me-2"
//                   onClick={() =>
//                     setEditFields({
//                       ...editFields,
//                       password: generateStrongPassword()
//                     })
//                   }
//                 >
//                   Auto Generate Password
//                 </button>
//                 <button onClick={handleSave} className="btn btn-success mt-2">Save Changes</button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Products Carousel */}
//         <h3 style={{ marginTop: '40px' }}>Your Purchased Products</h3>
//         {purchasedProducts.length > 0 ? (
//           <div className="carousel-container" style={{ position: 'relative' }}>
//             <button className="arrow left" onClick={() => scroll(-1)}>&#10094;</button>
//             <div
//               id="carouselTrack"
//               className="carousel-track"
//               style={{
//                 display: 'flex',
//                 overflowX: 'auto',
//                 scrollBehavior: 'smooth',
//                 gap: '20px',
//                 padding: '10px 0'
//               }}
//             >
//               {purchasedProducts.map(product => (
//                 <div
//                   className="card"
//                   key={product.product_id}
//                   style={{
//                     minWidth: '200px',
//                     padding: '10px',
//                     border: '1px solid #ccc',
//                     borderRadius: '8px',
//                     textAlign: 'center'
//                   }}
//                 >
//                   <img
//                     src={`/static/images/${product.product_photo}`}
//                     alt={product.product_name}
//                     style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
//                   />
//                   <h4>{product.product_name}</h4>
//                   <p>{product.product_desc}</p>
//                   <p><strong>Status:</strong> Purchased</p>
//                 </div>
//               ))}
//             </div>
//             <button className="arrow right" onClick={() => scroll(1)}>&#10095;</button>
//           </div>
//         ) : (
//           <p className="no-items" style={{ marginTop: '20px' }}>
//             No Items Purchased. Purchase to view your items here.
//           </p>
//         )}

//         <nav className="m-4">
//           <Link to="/" className="btn btn-success">Back to Home</Link>
//         </nav>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState, useRef } from 'react';
import Footer from './Footer';
import { useNavigate, Link } from 'react-router-dom';

const DEFAULT_PROFILE = 'https://www.instagram.com/static/images/anonymousUser.jpg/23c3b6b1973f.jpg';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editFields, setEditFields] = useState({ username: '', phone: '', password: '' });
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedImage = localStorage.getItem('profileImage');
    const purchasedIds = JSON.parse(localStorage.getItem('purchased_products')) || [];

    setUser(storedUser);
    if (storedUser) {
      setEditFields({ username: storedUser.username, phone: storedUser.phone, password: '' });
    }
    setProfileImage(storedImage || DEFAULT_PROFILE);

    fetch('/api/getproducts')
      .then((res) => res.json())
      .then((data) => {
        const purchases = data.filter((product) => purchasedIds.includes(product.product_id));
        setPurchasedProducts(purchases);
      });
  }, []);

  const handleInputChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const isPasswordStrong = (pwd) => {
    return (
      pwd.length >= 5 &&
      /[A-Z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[^A-Za-z0-9]/.test(pwd)
    );
  };

  const generateStrongPassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    const allChars = upper + lower + numbers + symbols;

    let password = '';
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password;
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...editFields };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Profile updated!');
    setMenuOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file (we only allow one file)
    if (!file) return; // If no file is selected, return early

    const reader = new FileReader();

    // Add error handling for FileReader
    reader.onerror = () => {
      console.error('Error reading the file.');
      alert('Failed to read the image file. Please try again.');
    };

    reader.onloadend = () => {
      const imageUrl = reader.result; // Result will be a data URL (base64 string)
      setProfileImage(imageUrl); // Update the profile image in state
      localStorage.setItem('profileImage', imageUrl); // Save the base64 image string in localStorage
    };

    // Trigger the file reading
    reader.readAsDataURL(file); // Reads the file as a base64 string
  };

  const handleRemoveImage = () => {
    setProfileImage(DEFAULT_PROFILE);
    localStorage.removeItem('profileImage');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const scroll = (dir) => {
    const container = document.getElementById('carouselTrack');
    container.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="hero-banner">
       <div className="container-fluid btn btn-dark">
      <div className="profile-wrapper" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        {/* Navbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="btn btn-secondary mx-2">
          <h2>{user.username}'s Profile</h2>
          <div style={{ fontSize: '28px', cursor: 'pointer' }} className="btn btn-dark mx-2" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
        </div>

        {/* Profile section */}
        <div style={{ display: 'flex', marginTop: '20px' }}>
          {/* Profile Picture */}
          <div style={{ flex: '1', textAlign: 'center' }}>
            <img
              src={profileImage}
              alt="Profile"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '2px solid #ccc',
              }}
            />
            <div style={{ marginTop: '10px' }}>
              <input ref={fileInputRef} type="file" onChange={handleImageChange} accept="image/*" />
              <br />
              <br />
              <br />
              <button onClick={handleRemoveImage} style={{ marginTop: '5px' }}>Remove Picture</button>
            </div>
          </div>

          {/* User Info */}
          <div style={{ flex: '3', paddingLeft: '30px' }}>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>

            {menuOpen && (
              <div style={{ marginTop: '20px' }} className="btn btn-secondary">
                <input
                  type="text"
                  name="username"
                  value={editFields.username}
                  onChange={handleInputChange}
                  placeholder="New Username"
                  style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  name="phone"
                  value={editFields.phone}
                  onChange={handleInputChange}
                  placeholder="New Phone"
                  style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={editFields.password}
                  onChange={handleInputChange}
                  placeholder="New Password"
                  style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                />
                {!isPasswordStrong(editFields.password) && editFields.password && (
                  <small className="text-warning">Password is weak.</small>
                )}
                <button
                  className="btn btn-sm btn-outline-light mt-2 me-2"
                  onClick={() =>
                    setEditFields({
                      ...editFields,
                      password: generateStrongPassword()
                    })
                  }
                >
                  Auto Generate Password
                </button>
                <button onClick={handleSave} className="btn btn-success mt-2">Save Changes</button>
              </div>
            )}
          </div>
        </div>

        {/* Products Carousel */}
        <h3 style={{ marginTop: '40px' }}>Your Purchased Products</h3>
        {purchasedProducts.length > 0 ? (
          <div className="carousel-container" style={{ position: 'relative' }}>
            <button className="arrow left" onClick={() => scroll(-1)}>&#10094;</button>
            <div
              id="carouselTrack"
              className="carousel-track"
              style={{
                display: 'flex',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                gap: '20px',
                padding: '10px 0'
              }}
            >
              {purchasedProducts.map(product => (
                <div
                  className="card"
                  key={product.product_id}
                  style={{
                    minWidth: '200px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}
                >
                  <img
                    src={`/static/images/${product.product_photo}`}
                    alt={product.product_name}
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <h4>{product.product_name}</h4>
                  <p>{product.product_desc}</p>
                  <p><strong>Status:</strong> Purchased</p>
                </div>
              ))}
            </div>
            <button className="arrow right" onClick={() => scroll(1)}>&#10095;</button>
          </div>
        ) : (
          <p className="no-items" style={{ marginTop: '20px' }}>
            No Items Purchased. Purchase to view your items here.
          </p>
        )}

        <nav className="m-4">
          <Link to="/" className="btn btn-success">Back to Home</Link>
        </nav>
      </div>
      <Footer />
    </div>
    </div>
   
  );
};

export default ProfilePage;
