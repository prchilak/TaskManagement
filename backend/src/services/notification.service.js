import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { getIO } from '../socket/index.js';

export const createNotification = async (sender, data) => {
    const { title, message, userId } = data;

    let users = [];

    if (userId) {
        users = [userId];
    } else {
        const allUsers = await User.find({}, '_id');
        users = allUsers.map(u => u._id.toString());
    }

    const notifications = users.map(uId => ({
        userId: uId,
        title,
        message
    }));

    const saved = await Notification.insertMany(notifications);

    const io = getIO();

    saved.forEach(n => {
        io.to(n.userId.toString()).emit('notification', n);
    });

    return saved;
};

export const getNotifications = async (userId, query) => {
    const { page = 1, limit = 10 } = query;

    const skip = (page - 1) * limit;

    const [data, total, unreadCount] = await Promise.all([
        Notification.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        Notification.countDocuments({ userId }),

        Notification.countDocuments({ userId, isRead: false })
    ]);

    return {
        data,
        unreadCount,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const markAsRead = async (userId, id) => {
    return Notification.findOneAndUpdate(
        { _id: id, userId },
        { isRead: true },
        { new: true }
    );
};

export const deleteNotification = async (userId, id) => {
    return Notification.findOneAndDelete({ _id: id, userId });
};