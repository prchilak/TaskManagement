import { login, signup } from '../controllers/auth.controller.js';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';

import { authLimiter } from '../middlewares/rateLimit.middleware.js';
import express from 'express';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.post('/signup', authLimiter, validate(registerSchema), signup);
router.post('/login', authLimiter, validate(loginSchema), login);

export default router;