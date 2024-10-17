import { Router } from "express";
import { createUser, login } from '../../controllers/user_controllers/user.controllers.js';


const router = Router()



// User registration
router.post('/register', createUser);

// User login
router.post('/login', login);

// // Protected route example
// router.get('/protected', authenticate, authorize('admin'), (req, res) => {
//     res.status(200).json({ message: "Welcome to the protected route!" });
// });

export default router;

