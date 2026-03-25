import * as service from '../services/notification.service.js';

export const createNotification = async (req, res) => {
    try {
        const result = await service.createNotification(req.user, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getNotifications = async (req, res) => {
    const result = await service.getNotifications(
        req.user.userId,
        req.query
    );
    res.json(result);
};

export const markAsRead = async (req, res) => {
    const result = await service.markAsRead(
        req.user.userId,
        req.params.id
    );

    if (!result) return res.status(404).json({ message: 'Not found' });

    res.json(result);
};

export const deleteNotification = async (req, res) => {
    const result = await service.deleteNotification(
        req.user.userId,
        req.params.id
    );

    if (!result) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Deleted' });
};