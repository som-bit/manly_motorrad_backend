import { Router } from "express";
import { getAllProducts,createProduct, deleteProduct } from '../../controllers/product_controllers/product.controllers.js'; 
import { authenticate, authorize } from '../../middlewares/authentication_middleware/authentication.middleware.js';

import { upload } from "../../middlewares/multer.middleware.js"


const router = Router()

// get product route (GET request)
router.get('/all', authenticate, getAllProducts);

// Create product route (POST request)


router.post('/create', authenticate, authorize(true), 


upload.fields([
    {
        name: "images",
        maxCount: 5
    },
   
]), 


createProduct);



// Delete product route (DELETE request)
router.delete('/delete/:id', authenticate, authorize(true), deleteProduct);

// // Update product route (PUT request)
// router.put('/:id', updateProduct);

// Test route to check if the server is running
router.get('/test', (req, res) => {
    res.send('Server is running');
});

export default router;