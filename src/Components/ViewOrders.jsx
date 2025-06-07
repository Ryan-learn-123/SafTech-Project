// import React, { useState } from 'react';
// import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
// // import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// // const ViewOrders = () => {
//     // const [orders, setOrders] = useState([
//     //     {
//     //         id: 1,
//     //         user: 'John Doe',
//     //         time: '2023-10-01 10:30 AM',
//     //         products: [
//     //             { name: 'Product A', quantity: 2, price: '$20' },
//     //             { name: 'Product B', quantity: 1, price: '$15' },
//     //         ],
//     //     },
//     //     {
//     //         id: 2,
//     //         user: 'Jane Smith',
//     //         time: '2023-10-02 02:15 PM',
//     //         products: [
//     //             { name: 'Product C', quantity: 3, price: '$30' },
//     //             { name: 'Product D', quantity: 1, price: '$25' },
//     //         ],
//     //     },
//     // ]);

//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>
//                 User Orders
//             </Typography>
//             {orders.map((order) => (
//                 <Accordion key={order.id}>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography>
//                             Order by {order.user} - {order.time}
//                         </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Typography variant="h6">Products:</Typography>
//                         <ul>
//                             {order.products.map((product, index) => (
//                                 <li key={index}>
//                                     {product.name} - Quantity: {product.quantity}, Price: {product.price}
//                                 </li>
//                             ))}
//                         </ul>
//                     </AccordionDetails>
//                 </Accordion>
//             ))}
//         </div>
//     );
// // };

// export default ViewOrders;