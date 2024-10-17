import { Router } from "express";
import { createCategory, deleteCategory } from '../../controllers/categories_controller/categories.controller.js';
import { authenticate, authorize } from '../../middlewares/authentication_middleware/authentication.middleware.js';


const router = Router()




router.post('/create', authenticate, authorize(true), createCategory);


router.delete('/delete/:id', authenticate, authorize(true),  deleteCategory);

export default router;