import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscribeButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the currently signed-in user from localStorage or other methods
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    if (userFromStorage) {
      setCurrentUser(userFromStorage);
    }

    // Check if the user is already subscribed (from localStorage)
    const storedUser = JSON.parse(localStorage.getItem('subscribedUser'));
    if (storedUser) {
      setIsSubscribed(true);
      setSubscribers(JSON.parse(localStorage.getItem('subscribersList')) || []);
    }
  }, []);

  const handleSubscribe = () => {
    if (!currentUser) return;

    // Mark the user as subscribed and store it in localStorage
    const newSubscriber = { name: currentUser.name, email: currentUser.email };
    const updatedSubscribers = [...subscribers, newSubscriber];

    localStorage.setItem('subscribedUser', JSON.stringify(newSubscriber));
    localStorage.setItem('subscribersList', JSON.stringify(updatedSubscribers));

    setIsSubscribed(true);
    setSubscribers(updatedSubscribers); // Update state with the new list of subscribers
  };

  const handleViewSubscriptions = () => {
    navigate('/subscriptions'); // Navigate to the subscriptions page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {!isSubscribed ? (
        <button onClick={handleSubscribe} className="btn btn-success mx-2">Subscribe</button>
      ) : (
        <button onClick={handleViewSubscriptions} className="btn btn-secondary mx-2">View Subscriptions</button>
      )}
    </div>
  );
};

export default SubscribeButton;
