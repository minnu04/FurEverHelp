import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { validateBody } from '../utils/validateRequest.js';

const router = express.Router();

router.post(
	'/login',
	validateBody({
		email: { required: true, type: 'email' },
		password: { required: true, type: 'string', minLength: 6 },
	}),
	loginUser
);

router.post(
	'/register',
	validateBody({
		name: { required: true, type: 'string', minLength: 2 },
		email: { required: true, type: 'email' },
		password: { required: true, type: 'string', minLength: 6 },
		confirmPassword: { required: true, type: 'string', minLength: 6 },
	}),
	registerUser
);

export default router;