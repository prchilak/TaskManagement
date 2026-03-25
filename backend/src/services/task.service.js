import Task from '../models/Task.js';

export const createTask = async (userId, data) => {
    return Task.create({ ...data, userId });
};

export const getTasks = async (userId, query) => {
    const {
        page = 1,
        limit = 10,
        search = '',
        status
    } = query;

    const skip = (page - 1) * limit;

    const filter = {
        userId
    };

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    if (status) {
        filter.status = status;
    }

    const [tasks, total] = await Promise.all([
        Task.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        Task.countDocuments(filter)
    ]);

    return {
        data: tasks,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const updateTask = async (userId, taskId, data) => {
    return Task.findOneAndUpdate(
        { _id: taskId, userId },
        data,
        { new: true }
    );
};

export const deleteTask = async (userId, taskId) => {
    return Task.findOneAndDelete({ _id: taskId, userId });
};