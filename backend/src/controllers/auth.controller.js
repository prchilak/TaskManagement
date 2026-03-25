import * as authService from '../services/auth.service.js';

import { asyncHandler } from '../utils/asyncHandler.js';

export const signup = asyncHandler(async (req, res) => {
    const user = await authService.signup(req.body);
    res.status(201).json(user);
});

export const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.json(result);
});