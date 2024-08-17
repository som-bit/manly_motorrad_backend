import { Router } from "express";
import { createCategory } from '../../controllers/categories_controller/categories.controller.js';


const router = Router()




router.post('/create', createCategory);



export default router;