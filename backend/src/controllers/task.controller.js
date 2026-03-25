import * as taskService from '../services/task.service.js';

import { asyncHandler } from '../utils/asyncHandler.js';

export const createTask = asyncHandler(async (req, res) => {
    try {
        const task = await taskService.createTask(req.user.userId, req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export const getTasks = asyncHandler(async (req, res) => {
    const tasks = await taskService.getTasks(req.user.userId, req.query);
    res.json(tasks);
});

export const updateTask = asyncHandler(async (req, res) => {
    const task = await taskService.updateTask(
        req.user.userId,
        req.params.id,
        req.body
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
    const task = await taskService.deleteTask(
        req.user.userId,
        req.params.id
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Deleted successfully' });
});