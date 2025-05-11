// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// const SubscriptionComponent = () => {
//   const [subscribers, setSubscribers] = useState([]); // List of subscribers
//   const [openIndex, setOpenIndex] = useState(null); // Which accordion is open
//   const [currentUser, setCurrentUser] = useState(null); // Current logged-in user
//   const navigate = useNavigate(); // Navigation hook for redirection

//   // Fetch current user and subscribers list from localStorage when component mounts
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('subscribedUser')); // Get current user
//     setCurrentUser(storedUser);

//     const storedSubscribers = JSON.parse(localStorage.getItem('subscribersList')) || []; // Get subscribers list
//     setSubscribers(storedSubscribers);
//   }, []);

//   // Handle unsubscribe logic
//   const handleUnsubscribe = () => {
//     if (!currentUser || !currentUser.email || !currentUser.name) {
//       console.error("No user is currently logged in or user info is missing.");
//       return;
//     }

//     // Filter out the current user from the subscribers list (matching both email and name)
//     const updatedSubscribers = subscribers.filter(
//       (sub) => !(sub.email === currentUser.email && sub.name === currentUser.name)
//     );

//     // Update localStorage
//     localStorage.setItem('subscribersList', JSON.stringify(updatedSubscribers));
//     localStorage.removeItem('subscribedUser'); // Remove the current user's subscription

//     // Update state and navigate to the homepage
//     setSubscribers(updatedSubscribers);
//     navigate('/');
//   };

//   return (
//     <div className="btn-primary mx-2">
//       <div className="subscription-container">
//         <nav className="m-4">
//           <Link to="/" className="btn btn-dark mx-2">Home</Link>
//         </nav>

//         <h2>Members</h2>
//         <div className="accordion">
//           {subscribers.map((sub, index) => {
//             // Check if this subscriber is the current user
//             const isCurrentUser = currentUser?.email === sub.email && currentUser?.name === sub.name;

//             return (
//               <div key={index} className="accordion-item">
//                 {/* <h2 className="accordion-header">
//                   <button
//                     className="accordion-button collapsed"
//                     onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target={`#collapse${index}`}
//                     aria-expanded={openIndex === index}
//                     aria-controls={`collapse${index}`}
//                   >
//                     {index + 1}. {sub.name || 'No Name'} - {sub.email}
//                   </button>
//                 </h2> */}
//                 <h2 className="accordion-header">
//                 <button
//                     className="accordion-button collapsed"
//                     onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target={`#collapse${index}`}
//                     aria-expanded={openIndex === index}
//                     aria-controls={`collapse${index}`}
//                 >
//                     {index + 1}. {sub.name ? sub.name : 'No Name'} - {sub.email}
//                 </button>
//                 </h2>


//                 {openIndex === index && (
//                   <div className="accordion-body">
//                     <p><strong>Name:</strong> {sub.name || 'No Name'}</p>
//                     <p><strong>Email:</strong> {sub.email}</p>

//                     {/* Show unsubscribe button only for the current user */}
//                     {isCurrentUser && (
//                       <button
//                         className="btn btn-danger"
//                         onClick={handleUnsubscribe}
//                       >
//                         Unsubscribe
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionComponent;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// const SubscriptionComponent = () => {
//   const [subscribers, setSubscribers] = useState([]); // List of subscribers
//   const [openIndex, setOpenIndex] = useState(null); // Which accordion is open
//   const [currentUser, setCurrentUser] = useState(null); // Current logged-in user
//   const navigate = useNavigate(); // Navigation hook for redirection

//   // Fetch current user and subscribers list from localStorage when component mounts
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('subscribedUser'));
//     setCurrentUser(storedUser);

//     const storedSubscribers = JSON.parse(localStorage.getItem('subscribersList')) || [];
//     setSubscribers(storedSubscribers);
//   }, []);

//   // Handle unsubscribe logic
//   const handleUnsubscribe = () => {
//     if (!currentUser || !currentUser.email || !currentUser.name) {
//       console.error("No user is currently logged in or user info is missing.");
//       return;
//     }

//     // Filter out the current user from the subscribers list (matching both email and name)
//     const updatedSubscribers = subscribers.filter(
//       (sub) => !(sub.email === currentUser.email && sub.name === currentUser.name)
//     );

//     // Update localStorage
//     localStorage.setItem('subscribersList', JSON.stringify(updatedSubscribers));
//     localStorage.removeItem('subscribedUser'); // Remove the current user's subscription

//     // Update state and navigate to the homepage
//     setSubscribers(updatedSubscribers);
//     navigate('/');
//   };

//   return (
//     <div className="btn-primary mx-2">
//       <div className="subscription-container">
//         <nav className="m-4">
//           <Link to="/" className="btn btn-dark mx-2">Home</Link>
//         </nav>

//         <h2>Members</h2>
//         <div className="accordion">
//           {subscribers.map((sub, index) => {
//             // Check if this subscriber is the current user
//             const isCurrentUser = currentUser?.email === sub.email && currentUser?.name === sub.name;

//             return (
//               <div key={index} className="accordion-item">
//                 <h2 className="accordion-header">
//                   <button
//                     className="accordion-button collapsed"
//                     onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target={`#collapse${index}`}
//                     aria-expanded={openIndex === index}
//                     aria-controls={`collapse${index}`}
//                   >
//                     {index + 1}. {sub.name || 'No Name'} - {sub.email}
//                   </button>
//                 </h2>

//                 {openIndex === index && (
//                   <div className="accordion-body">
//                     <p><strong>Name:</strong> {sub.name || 'Nameless'}</p>
//                     <p><strong>Email:</strong> {sub.email}</p>

//                     {/* Show unsubscribe button only for the current user */}
//                     {isCurrentUser && (
//                       <button
//                         className="btn btn-danger"
//                         onClick={handleUnsubscribe}
//                       >
//                         Unsubscribe
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionComponent;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SubscriptionComponent = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('subscribedUser'));
    setCurrentUser(storedUser);

    const storedSubscribers = JSON.parse(localStorage.getItem('subscribersList')) || [];
    setSubscribers(storedSubscribers);
  }, []);

  const handleUnsubscribe = () => {
    if (!currentUser || !currentUser.email) {
      console.error("No user is currently logged in or user info is missing.");
      return;
    }

    const updatedSubscribers = subscribers.filter(
      (sub) => sub.email !== currentUser.email
    );

    localStorage.setItem('subscribersList', JSON.stringify(updatedSubscribers));
    localStorage.removeItem('subscribedUser');

    setSubscribers(updatedSubscribers);
    navigate('/');
  };

  return (
    <div className="btn-primary mx-2">
      <div className="subscription-container">
        <nav className="m-4">
          <Link to="/" className="btn btn-dark mx-2">Home</Link>
        </nav>

        <h2>Members</h2>
        <div className="accordion">
          {subscribers.map((sub, index) => {
            const isCurrentUser = currentUser?.email === sub.email;

            return (
              <div key={index} className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded={openIndex === index}
                    aria-controls={`collapse${index}`}
                  >
                    {index + 1}. {isCurrentUser ? `${sub.email} (YOUR SUBSCRIBED ACCOUNT)` : sub.email}
                  </button>
                </h2>

                {openIndex === index && (
                  <div className="accordion-body">
                    <p><strong>Email:</strong> {sub.email}</p>
                    {isCurrentUser && (
                      <button
                        className="btn btn-danger"
                        onClick={handleUnsubscribe}
                      >
                        Unsubscribe
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionComponent;

