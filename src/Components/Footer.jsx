import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const templateParams = {
      email: email,
      message: message,
    };

    emailjs
      .send(
        'service_gwb7p78',    // Your service ID
        'template_seep82i',    // Your template ID
        templateParams,
        'v5aPguYOmfofDxXmy'         // Your user ID (check EmailJS dashboard for the actual user ID)
      )
      .then(
        (response) => {
          console.log('Email sent successfully:', response);  // Log successful response
          setStatus('Message sent successfully!');
          setEmail('');
          setMessage('');
        },
        (error) => {
          console.error('Error sending email:', error);  // Log error for debugging
          setStatus(`Error sending message. Please try again. Error: ${error.text}`);
        }
      );
  };

  return (
    <div className="container-fluid">
      <section className="row bg-secondary p-4">
        {/* About Us Section */}
        <div className="col-md-4">
          <h4 className="text-center">About Us</h4>
          <p>We sell the best electronics for your taste.</p>
          <p>Every electronic on sale is fresh from the Manufacturer!</p>
        </div>

        {/* Contact Us Section */}
        <div className="col-md-4">
          <h4 className="text-center">Contact Us</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <textarea
              placeholder="Please leave a message"
              rows="7"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <br />
            <br />
            <input
              type="submit"
              value="Send Message"
              className="btn btn-outline-dark"
            />
            <br />
            <br />
            {status && <p>{status}</p>}
          </form>
        </div>

        {/* Stay Connected Section */}
        <div className="col-md-4">
          <h4 className="text-center">Stay Connected</h4>
          <br />
          <p>
            Visit our various social media platforms and get an early preview
            of our products.
          </p>
          <Link to="https://x.com/">
            <img src="images/x.png" alt="" width="50px" height="50px" />
          </Link>

          <Link to="https://instagram.com/">
            <img src="images/in.png" alt="" width="50px" height="50px" />
          </Link>

          <Link to="https://www.facebook.com/">
            <img src="images/fb.png" alt="" width="50px" height="50px" />
          </Link>

          <Link to="https://www.linkedin.com/">
            <img src="images/linkedin.png" alt="" width="50px" height="50px" />
          </Link>
          <br />
          <br />

          <a
            href="https://wa.me/254794766524"  // Replace with your actual number
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success text-white"
          >
            Chat or Call on WhatsApp
          </a>

          <br />
          <br />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center p-2">
        <h5>Developed by Ryantech&copy;2025. All rights reserved</h5>
      </footer>
    </div>
  );
};

export default Footer;
