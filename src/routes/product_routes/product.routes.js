import { Router } from "express";
import { getAllProducts,createProduct, deleteProduct } from '../../controllers/product_controllers/product.controllers.js'; 
import { upload } from "../../middlewares/multer.middleware.js"


const router = Router()

// get product route (GET request)
router.get('/all', getAllProducts);

// Create product route (POST request)


router.post('/create', upload.fields([
    {
        name: "images",
        maxCount: 5
    },
   
]),   createProduct);



// Delete product route (DELETE request)
router.delete('/delete/:id', deleteProduct);

// // Update product route (PUT request)
// router.put('/:id', updateProduct);

// Test route to check if the server is running
router.get('/test', (req, res) => {
    res.send('Server is running');
});

export default router;