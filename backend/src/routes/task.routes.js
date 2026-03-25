import {
    createTask,
    deleteTask,
    getTasks,
    updateTask,
} from '../controllers/task.controller.js';
import {
    createTaskSchema,
    updateTaskSchema,
} from '../validators/task.validator.js';

import authCheck from '../middlewares/auth.middleware.js';
import express from 'express';
import { validate } from '../middlewares/validate.js';

const router = express.Router();



router.post('/', authCheck, validate(createTaskSchema), createTask);
router.put('/:id', authCheck, validate(updateTaskSchema), updateTask);
router.get('/', authCheck, getTasks);
router.delete('/:id', authCheck, deleteTask);

export default router;