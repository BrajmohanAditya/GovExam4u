import express from 'express';
import registerUser from '../controllers/register.js';
import login from '../controllers/login.js';
import getUser from '../controllers/getUser.js';
import auth from '../middlewares.js/auth.js';

const router = express.Router();
router.post('/register', registerUser); // frontend userRoute.jsx meh ya /register milaga. 
router.post('/login', login);
router.get('/',auth, getUser);
export default router;