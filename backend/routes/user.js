import express from 'express';
import registerUser from '../controllers/user/register.js';
import login from '../controllers/user/login.js';
import getUser from '../controllers/user/getUser.js';
import auth from '../middlewares/auth.js';
import logout from '../controllers/user/logout.js';
import getAccess from '../controllers/user/getAccess.js';

const router = express.Router();
router.post('/register', registerUser); // frontend userRoute.jsx meh ya /register milaga. 
router.post('/login', login);
router.get('/',auth, getUser);
router.get('/logout', logout);
router.get('/access', auth, getAccess);

export default router;