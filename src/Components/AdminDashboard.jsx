import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Top Navigation Buttons */}
      <div style={styles.topButtons}>
        <button style={styles.topButton} onClick={() => navigate('/')}>
          Back to Home
        </button>
        <button style={styles.topButton} onClick={() => navigate('/messages')}>
          View Messages
        </button>
      </div>

      {/* Cards Container */}
      <div style={styles.cardsContainer}>
        {/* Card 1: Add Products */}
        <div style={styles.card}>
            <button
                style={styles.cardButton}
                onClick={() => navigate('/addproducts')}
            >
                Add Products
            </button>
        </div>

        {/* Card 2: Categories */}
        <div style={styles.card}>
          <button
            style={styles.cardButton}
            onClick={() => navigate('/viewcategories')}
          >
            Categories
          </button>
        </div>

        {/* Card 3: View Users */}
        <div style={styles.card}>
          <button
            style={styles.cardButton}
            onClick={() => navigate('/viewusers')}
          >
            View Users
          </button>
        </div>

        {/* Card 4: Orders (or another category) */}
        <div style={styles.card}>
          <button
            style={styles.cardButton}
            onClick={() => navigate('/vieworders')}
          >
            Orders
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple inline styles for demo purposes
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  topButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginBottom: '30px',
  },
  topButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '25px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  cardButton: {
    padding: '12px 25px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  },
};

export default AdminDashboard;
