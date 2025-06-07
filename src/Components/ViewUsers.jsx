import React, { useState } from 'react';

const ViewUsers = ({ users }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <h2>View Users</h2>
            {users.map((user, index) => (
                <div key={user.user_id} style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <div
                        style={{
                            padding: '10px',
                            backgroundColor: '#f7f7f7',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        onClick={() => toggleAccordion(index)}
                    >
                        <span>{user.name}</span>
                        <span>{activeIndex === index ? '-' : '+'}</span>
                    </div>
                    {activeIndex === index && (
                        <div style={{ padding: '10px', backgroundColor: '#fff' }}>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>User ID:</strong> {user.user_id}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ViewUsers;