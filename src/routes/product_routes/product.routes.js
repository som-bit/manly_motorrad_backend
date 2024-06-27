import express from 'express';
// import { createProduct, } from '../../controllers/product_controllers/product.controllers.js'; 

const router = express.Router();

// Create product route (POST request)
// router.post('/create', createProduct);

// // Delete product route (DELETE request)
// router.delete('/:id', deleteProduct);

// // Update product route (PUT request)
// router.put('/:id', updateProduct);

// Test route to check if the server is running
router.get('/test', (req, res) => {
    res.send('Server is running');
});

export default router;