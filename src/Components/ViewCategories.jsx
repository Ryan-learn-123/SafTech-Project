import React, { useState } from 'react';

const ViewCategories = ({ categories }) => {
    const [activeCategory, setActiveCategory] = useState(null);

    const toggleCategory = (categoryId) => {
        setActiveCategory(activeCategory === categoryId ? null : categoryId);
    };

    return (
        <div>
            {categories.map((category) => (
                <div key={category.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '5px', padding: '1rem' }}>
                    <div
                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => toggleCategory(category.id)}
                    >
                        {category.name}
                    </div>
                    {activeCategory === category.id && (
                        <div style={{ marginTop: '0.5rem' }}>
                            {category.products.map((product) => (
                                <div key={product.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px' }}>
                                    <p><strong>Name:</strong> {product.name}</p>
                                    <p><strong>Description:</strong> {product.description}</p>
                                    <p><strong>Price:</strong> ${product.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ViewCategories;